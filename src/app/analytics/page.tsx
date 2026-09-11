'use client';

import React from 'react';
import Link from 'next/link';
import {
  BarChart3,
  TrendingUp,
  Target,
  ArrowUpRight,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { MOCK_CAMPAIGNS, MOCK_CREATORS, formatEur, formatNumber } from '@/lib/mock-data';

export default function AnalyticsPage() {
  const campaigns = MOCK_CAMPAIGNS;

  const totalSpend = campaigns.reduce((acc, c) => acc + c.totalSpend, 0);
  const totalImpressions = campaigns.reduce((acc, c) => acc + c.totalImpressions, 0);
  const totalClicks = campaigns.reduce((acc, c) => acc + c.totalClicks, 0);
  const totalLeads = campaigns.reduce((acc, c) => acc + c.totalLeads, 0);
  const blendedCtr = totalImpressions > 0 ? ((totalClicks / totalImpressions) * 100).toFixed(2) : '0.00';
  const blendedCac = totalLeads > 0 ? (totalSpend / totalLeads).toFixed(0) : '0';

  const nichePerformance = [
    { niche: 'DevRel & AI', creators: 3, spend: 14400, impressions: 620000, leads: 189, cac: 76, roas: 9.4 },
    { niche: 'B2B SaaS', creators: 4, spend: 18200, impressions: 840000, leads: 214, cac: 85, roas: 8.8 },
    { niche: 'Fintech', creators: 2, spend: 11200, impressions: 510000, leads: 110, cac: 101, roas: 7.2 },
    { niche: 'GTM & Sales', creators: 3, spend: 8400, impressions: 420000, leads: 70, cac: 120, roas: 6.1 },
  ];

  const topCreators = [
    {
      name: 'Priya Nambiar',
      handle: '@priya-nambiar',
      niche: 'DevRel & AI',
      impressions: 441000,
      leads: 112,
      roi: '11.4x',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=96&h=96&fit=crop&crop=face',
    },
    {
      name: 'Marcus Riedel',
      handle: '@marcus-riedel',
      niche: 'B2B SaaS',
      impressions: 298000,
      leads: 73,
      roi: '8.6x',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face',
    },
    {
      name: 'Stefan Hartmann',
      handle: '@stefan-hartmann',
      niche: 'Fintech',
      impressions: 201000,
      leads: 58,
      roi: '7.9x',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">
              <BarChart3 size={14} />
              <span>Cross-Campaign Attribution</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Portfolio Analytics</h1>
            <p className="text-sm text-slate-400 mt-1">
              Holistic performance attribution, channel ROI, and creator efficiency across all campaigns.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/campaigns/camp-001"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs text-white shadow-md transition-all"
              style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
            >
              <span>View Live Campaign</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Big 4 Macro Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Portfolio Impressions</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400">
              {formatNumber(totalImpressions)}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
              <ArrowUpRight size={12} />
              <span>+31.4% vs last period</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Attributed Clicks</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-indigo-400">
              {formatNumber(totalClicks)}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-indigo-300 mt-1">
              <span>{blendedCtr}% Blended CTR</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Qualified Signups / Leads</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">
              {totalLeads}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-300 mt-1">
              <span>8.9% Conversion to demo</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-slate-400 font-medium block mb-1">Blended CAC</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400">
              €{blendedCac}
            </span>
            <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-1">
              <ArrowUpRight size={12} />
              <span>-22% cheaper than paid ads</span>
            </div>
          </div>
        </div>

        {/* Niche Breakdown Table */}
        <div className="rounded-2xl p-6 bg-slate-900/70 border border-slate-800 mb-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Performance by Niche</h2>
              <p className="text-xs text-slate-400">Attribution segmented by B2B audience sector</p>
            </div>
            <span className="text-xs font-semibold text-blue-400">Real-time Verified</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950/60 text-[11px] uppercase tracking-wider text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">B2B Niche</th>
                  <th className="py-3 px-4">Active Creators</th>
                  <th className="py-3 px-4">Total Spend</th>
                  <th className="py-3 px-4">Delivered Views</th>
                  <th className="py-3 px-4">Attributed Leads</th>
                  <th className="py-3 px-4">Blended CAC</th>
                  <th className="py-3 px-4 text-right">Est. ROAS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {nichePerformance.map((row) => (
                  <tr key={row.niche} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-white">{row.niche}</td>
                    <td className="py-3.5 px-4">{row.creators} creators</td>
                    <td className="py-3.5 px-4">{formatEur(row.spend)}</td>
                    <td className="py-3.5 px-4 font-medium text-blue-400">
                      {formatNumber(row.impressions)}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-emerald-400">{row.leads}</td>
                    <td className="py-3.5 px-4">€{row.cac}</td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-indigo-400">
                      {row.roas}x
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performing Creators Leaderboard */}
        <div className="rounded-2xl p-6 bg-slate-900/70 border border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Top Performing Creators</h2>
              <p className="text-xs text-slate-400">Highest attributable pipeline generation</p>
            </div>
            <Link
              href="/marketplace"
              className="text-xs text-blue-400 hover:text-blue-300 font-semibold"
            >
              Browse all 3,000+ creators →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topCreators.map((creator, i) => (
              <div
                key={creator.name}
                className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-blue-500/30"
                    />
                    <span className="absolute -top-1 -left-1 w-4.5 h-4.5 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center">
                      #{i + 1}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white">{creator.name}</h3>
                    <p className="text-[11px] text-slate-400">{creator.niche}</p>
                    <span className="text-[10px] text-emerald-400 font-semibold">
                      {creator.leads} leads ({creator.roi} ROI)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs font-bold text-blue-400 block">
                    {formatNumber(creator.impressions)}
                  </span>
                  <span className="text-[10px] text-slate-500">impressions</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
