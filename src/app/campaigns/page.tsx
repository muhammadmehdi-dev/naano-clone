'use client';

import React from 'react';
import Link from 'next/link';
import {
  Megaphone,
  Plus,
  ArrowRight,
  TrendingUp,
  Target,
  BarChart3,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { MOCK_CAMPAIGNS, getCreatorById, formatEur, formatNumber } from '@/lib/mock-data';

export default function CampaignsListPage() {
  const campaigns = MOCK_CAMPAIGNS;

  const totalSpend = campaigns.reduce((acc, c) => acc + c.totalSpend, 0);
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.totalImpressions, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.totalLeads, 0);

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
              <Megaphone size={14} />
              <span>Campaign Management</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Campaigns</h1>
            <p className="text-sm text-slate-400 mt-1">
              Track live B2B LinkedIn creator activations, attribution, and pipeline ROI.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-all"
              style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
            >
              <Plus size={14} />
              <span>Create Campaign</span>
            </Link>
          </div>
        </div>

        {/* Portfolio Aggregate Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Active Campaigns</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white">
              {campaigns.length}
            </span>
            <span className="text-[11px] text-emerald-400 block mt-1">● 100% On Schedule</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Total Allocated Spend</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">
              {formatEur(totalSpend)}
            </span>
            <span className="text-[11px] text-slate-400 block mt-1">Across 8 creators</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Total Impressions</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
              {formatNumber(totalImpressions)}
            </span>
            <span className="text-[11px] text-indigo-300 block mt-1">+24% vs benchmark</span>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Attributed Leads</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {totalLeads}
            </span>
            <span className="text-[11px] text-emerald-300 block mt-1">Avg CAC: €89 / lead</span>
          </div>
        </div>

        {/* Campaigns List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white mb-2">Active & Completed Campaigns</h2>

          {campaigns.map((camp) => {
            const creators = camp.selectedCreators
              .map((id) => getCreatorById(id))
              .filter(Boolean);

            const spendPercent = Math.min(
              100,
              Math.round((camp.totalSpend / camp.budgetEur) * 100)
            );

            return (
              <div
                key={camp.id}
                className="group rounded-2xl p-6 bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all duration-200"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left info */}
                  <div className="space-y-3 max-w-xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        {camp.status}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        {camp.goal}
                      </span>
                      <span className="text-xs text-slate-400">
                        {camp.startDate} to {camp.endDate}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors">
                        {camp.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-1 mt-1">{camp.brief}</p>
                    </div>

                    {/* Creators Avatars */}
                    <div className="flex items-center gap-3 pt-1">
                      <span className="text-xs text-slate-400 font-medium">Creators:</span>
                      <div className="flex items-center -space-x-2">
                        {creators.map((c) => (
                          <img
                            key={c?.id}
                            src={c?.avatarUrl}
                            alt={c?.name}
                            className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-900"
                            title={c?.name}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-slate-400">
                        ({creators.length} active)
                      </span>
                    </div>
                  </div>

                  {/* Center stats */}
                  <div className="grid grid-cols-3 gap-4 lg:gap-6 py-3 px-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center">
                    <div>
                      <span className="text-[11px] text-slate-400 block">Spend</span>
                      <span className="text-sm sm:text-base font-bold text-white">
                        {formatEur(camp.totalSpend)}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        of {formatEur(camp.budgetEur)}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 block">Impressions</span>
                      <span className="text-sm sm:text-base font-bold text-blue-400">
                        {formatNumber(camp.totalImpressions)}
                      </span>
                      <span className="text-[10px] text-slate-500 block">Delivered</span>
                    </div>

                    <div>
                      <span className="text-[11px] text-slate-400 block">Attributed Leads</span>
                      <span className="text-sm sm:text-base font-bold text-emerald-400">
                        {camp.totalLeads}
                      </span>
                      <span className="text-[10px] text-emerald-400 block">
                        {camp.roas}x Est. ROAS
                      </span>
                    </div>
                  </div>

                  {/* Right CTA */}
                  <div className="flex items-center justify-end">
                    <Link
                      href={`/campaigns/${camp.id}`}
                      className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-blue-500/50 transition-all w-full sm:w-auto"
                    >
                      <BarChart3 size={14} className="text-blue-400" />
                      <span>Live Dashboard</span>
                      <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
