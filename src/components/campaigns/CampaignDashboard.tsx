'use client';

import React, { useState } from 'react';
import {
  Eye,
  MousePointer2,
  Users,
  TrendingDown,
  Download,
  Share2,
  Calendar,
  Target,
  Wallet,
  BarChart3,
  ArrowLeft,
} from 'lucide-react';
import Link from 'next/link';
import type { Campaign } from '@/types';
import { formatEur, formatNumber, getCampaignCreators } from '@/lib/mock-data';
import KpiCard from './KpiCard';
import PerformanceTable from './PerformanceTable';
import ActivityFeed from './ActivityFeed';

interface CampaignDashboardProps {
  campaign: Campaign;
}

const STATUS_COLORS = {
  Active:    { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', text: '#6ee7b7', dot: '#10b981' },
  Draft:     { bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.3)', text: '#94a3b8', dot: '#64748b' },
  Completed: { bg: 'rgba(99,102,241,0.12)', border: 'rgba(99,102,241,0.3)', text: '#a5b4fc', dot: '#6366f1' },
};

const GOAL_ICON = {
  'Brand Awareness': Target,
  'Lead Generation': Users,
  'Product Launch': BarChart3,
  'Thought Leadership': Target,
  'Pipeline Acceleration': TrendingDown,
};

function formatDateRange(start: string, end: string) {
  const fmt = (d: string) => new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${fmt(start)} — ${fmt(end)}`;
}

function BudgetProgress({ spent, total }: { spent: number; total: number }) {
  const pct = Math.min((spent / total) * 100, 100);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span style={{ color: '#64748b' }}>Budget utilization</span>
        <span style={{ color: '#94a3b8' }}>
          {formatEur(spent)} / {formatEur(total)} ({pct.toFixed(0)}%)
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1e293b' }}>
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${pct}%`,
            background: pct > 80 ? '#f59e0b' : 'linear-gradient(90deg, #3b82f6, #6366f1)',
          }}
        />
      </div>
    </div>
  );
}

export default function CampaignDashboard({ campaign }: CampaignDashboardProps) {
  const [copied, setCopied] = useState(false);

  const statusStyle = STATUS_COLORS[campaign.status];
  const GoalIcon = GOAL_ICON[campaign.goal] ?? Target;
  const creators = getCampaignCreators(campaign);

  // Derived metrics
  const blendedCac = campaign.totalLeads > 0
    ? campaign.totalSpend / campaign.totalLeads
    : 0;
  const spendPct = (campaign.totalSpend / campaign.budgetEur) * 100;

  function handleExportCsv() {
    const rows = [
      ['Creator', 'Status', 'Impressions', 'Clicks', 'Leads', 'Spend (EUR)', 'Est. ROI'],
      ...campaign.allocations.map((a) => {
        const creator = creators.find((c) => c.id === a.creatorId);
        const roi = a.leadsAttributed > 0 && a.allocatedBudgetEur > 0
          ? ((a.leadsAttributed * 3500) / a.allocatedBudgetEur).toFixed(1)
          : '0';
        return [
          creator?.name ?? a.creatorId,
          a.status,
          a.impressionsDelivered,
          a.clicksDelivered,
          a.leadsAttributed,
          a.allocatedBudgetEur,
          `${roi}x`,
        ];
      }),
    ];
    const csv = rows.map((r) => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${campaign.id}-performance.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col gap-6">

        {/* ── Back link ──────────────────────────────────────────────── */}
        <Link
          href="/campaigns"
          className="inline-flex items-center gap-1.5 text-sm transition-colors w-fit"
          style={{ color: '#475569' }}
          id="campaign-back-link"
        >
          <ArrowLeft size={14} />
          <span className="hover:underline" style={{ color: '#64748b' }}>All Campaigns</span>
        </Link>

        {/* ── Header card ────────────────────────────────────────────── */}
        <div
          className="rounded-2xl p-5 flex flex-col gap-4"
          style={{
            background: 'linear-gradient(145deg, #111827 0%, #1a2235 100%)',
            border: '1px solid #2d3f5c',
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Left: title + meta */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              {/* Status pill */}
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{ background: statusStyle.bg, border: `1px solid ${statusStyle.border}`, color: statusStyle.text }}
                  id="campaign-status-pill"
                >
                  <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: statusStyle.dot }} />
                  {campaign.status === 'Active' ? '● Live & Tracking' : campaign.status}
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                  style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}
                >
                  <GoalIcon size={10} />
                  {campaign.goal}
                </span>
              </div>

              {/* Title */}
              <h1
                className="text-xl sm:text-2xl font-bold leading-tight"
                style={{ color: '#f1f5f9' }}
                id="campaign-title"
              >
                {campaign.title}
              </h1>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-4 text-xs" style={{ color: '#64748b' }}>
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} />
                  {formatDateRange(campaign.startDate, campaign.endDate)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Users size={12} />
                  {campaign.selectedCreators.length} creators
                </span>
                <span className="flex items-center gap-1.5">
                  <Wallet size={12} />
                  {formatEur(campaign.budgetEur)} budget
                </span>
              </div>

              {/* Budget progress */}
              <div className="max-w-sm">
                <BudgetProgress spent={campaign.totalSpend} total={campaign.budgetEur} />
              </div>
            </div>

            {/* Right: action buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                id="campaign-export-csv"
                onClick={handleExportCsv}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 hover:bg-white/5"
                style={{ color: '#94a3b8', border: '1px solid #2d3f5c' }}
              >
                <Download size={13} />
                Export CSV
              </button>
              <button
                id="campaign-share-link"
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
                style={{
                  background: copied ? 'rgba(16,185,129,0.15)' : 'rgba(59,130,246,0.15)',
                  border: copied ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(59,130,246,0.3)',
                  color: copied ? '#6ee7b7' : '#93c5fd',
                }}
              >
                <Share2 size={13} />
                {copied ? 'Copied!' : 'Share Link'}
              </button>
            </div>
          </div>

          {/* Brief excerpt */}
          <div
            className="rounded-lg px-4 py-3 text-sm"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid #1e293b', color: '#64748b' }}
          >
            <span className="font-medium" style={{ color: '#475569' }}>Brief: </span>
            {campaign.brief}
          </div>
        </div>

        {/* ── KPI Cards Grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <KpiCard
            id="kpi-impressions"
            label="Total Impressions"
            value={formatNumber(campaign.totalImpressions)}
            subValue={`${formatEur(campaign.cpmEur)} CPM`}
            badge={{ text: '+18% vs benchmark', type: 'up' }}
            icon={<Eye size={16} />}
            accentColor="#3b82f6"
            description="Across all creator posts"
          />
          <KpiCard
            id="kpi-clicks"
            label="Attributed Clicks"
            value={formatNumber(campaign.totalClicks)}
            subValue={`${((campaign.totalClicks / campaign.totalImpressions) * 100).toFixed(1)}% CTR`}
            badge={{ text: '3.4% avg CTR', type: 'up' }}
            icon={<MousePointer2 size={16} />}
            accentColor="#6366f1"
            description="UTM-tracked click-throughs"
          />
          <KpiCard
            id="kpi-leads"
            label="Qualified Leads"
            value={campaign.totalLeads.toLocaleString()}
            subValue={`${((campaign.totalLeads / campaign.totalClicks) * 100).toFixed(1)}% conv. rate`}
            badge={{ text: `${campaign.totalLeads} signups`, type: 'up' }}
            icon={<Users size={16} />}
            accentColor="#10b981"
            description="Verified B2B decision-makers"
          />
          <KpiCard
            id="kpi-cac"
            label="Blended CAC"
            value={formatEur(blendedCac)}
            subValue={`${campaign.roas}× ROAS`}
            badge={{ text: '-12% vs target', type: 'up' }}
            icon={<TrendingDown size={16} />}
            accentColor="#f59e0b"
            description="Cost per qualified lead"
          />
        </div>

        {/* ── Main content: Table + Feed ──────────────────────────────── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Performance table — takes 2/3 */}
          <div className="xl:col-span-2">
            <PerformanceTable campaign={campaign} />
          </div>

          {/* Activity feed — takes 1/3 */}
          <div className="xl:col-span-1">
            <ActivityFeed />
          </div>
        </div>

        {/* ── Audience & Target context ───────────────────────────────── */}
        <div
          className="rounded-xl px-5 py-4 flex flex-col sm:flex-row gap-4 sm:items-center justify-between"
          style={{ background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}
        >
          <div className="flex flex-col gap-0.5">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#475569' }}>Target Audience</p>
            <p className="text-sm" style={{ color: '#94a3b8' }}>{campaign.targetAudience}</p>
          </div>
          <div className="flex items-center gap-6 text-center flex-shrink-0">
            <div>
              <p className="text-lg font-bold" style={{ color: '#f1f5f9' }}>{campaign.roas}×</p>
              <p className="text-xs" style={{ color: '#475569' }}>ROAS</p>
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: '#f1f5f9' }}>{formatEur(campaign.cplEur)}</p>
              <p className="text-xs" style={{ color: '#475569' }}>Cost / Lead</p>
            </div>
            <div>
              <p className="text-lg font-bold" style={{ color: '#f1f5f9' }}>{spendPct.toFixed(0)}%</p>
              <p className="text-xs" style={{ color: '#475569' }}>Budget Used</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
