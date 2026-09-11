'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Eye, MousePointer2, Users, DollarSign, TrendingUp, ChevronRight } from 'lucide-react';
import type { Campaign, Creator, CampaignCreatorAllocation } from '@/types';
import { getCreatorById, formatEur, formatNumber } from '@/lib/mock-data';
import PostPreviewModal from './PostPreviewModal';

interface PerformanceTableProps {
  campaign: Campaign;
}

const STATUS_STYLES: Record<CampaignCreatorAllocation['status'], { bg: string; border: string; text: string; dot: string }> = {
  Pending:     { bg: 'rgba(100,116,139,0.12)', border: 'rgba(100,116,139,0.3)', text: '#94a3b8', dot: '#64748b' },
  'Brief Sent':{ bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  text: '#fbbf24', dot: '#f59e0b' },
  'In Progress':{ bg: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)', text: '#93c5fd', dot: '#3b82f6' },
  Delivered:   { bg: 'rgba(99,102,241,0.12)',  border: 'rgba(99,102,241,0.3)', text: '#a5b4fc', dot: '#6366f1' },
  Approved:    { bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)', text: '#6ee7b7', dot: '#10b981' },
};

interface ModalState {
  creator: Creator;
  postIndex: number;
  allocationStatus: CampaignCreatorAllocation['status'];
}

export default function PerformanceTable({ campaign }: PerformanceTableProps) {
  const [modalState, setModalState] = useState<ModalState | null>(null);

  const rows = campaign.allocations.map((alloc) => ({
    alloc,
    creator: getCreatorById(alloc.creatorId),
  })).filter((r): r is { alloc: CampaignCreatorAllocation; creator: Creator } => !!r.creator);

  // ROI: estimated pipeline (leads × $3500 avg B2B deal) / spend
  const calcRoi = (leads: number, spend: number) =>
    spend > 0 ? ((leads * 3500) / spend).toFixed(1) : '—';

  const modalCreator = modalState?.creator;
  const modalPost = modalState ? modalCreator?.samplePosts[modalState.postIndex % (modalCreator?.samplePosts.length ?? 1)] : undefined;

  return (
    <>
      {/* Table */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: '1px solid #2d3f5c', background: 'linear-gradient(145deg, #111827 0%, #1a2235 100%)' }}
      >
        {/* Header */}
        <div
          className="px-4 py-3 border-b flex items-center justify-between"
          style={{ borderColor: '#1e293b' }}
        >
          <div className="flex items-center gap-2">
            <TrendingUp size={14} style={{ color: '#6366f1' }} />
            <span className="text-sm font-semibold" style={{ color: '#f1f5f9' }}>
              Creator Performance Breakdown
            </span>
          </div>
          <span className="text-xs" style={{ color: '#475569' }}>
            {rows.length} creators · click row to preview post
          </span>
        </div>

        {/* Scrollable table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ borderBottom: '1px solid #1e293b' }}>
                {['Creator', 'Status', 'Post Preview', 'Impressions', 'Clicks', 'Leads', 'Spend', 'Est. ROI'].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide"
                    style={{ color: '#475569' }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ alloc, creator }, idx) => {
                const status = STATUS_STYLES[alloc.status];
                const roi = calcRoi(alloc.leadsAttributed, alloc.allocatedBudgetEur);
                const ctr = alloc.impressionsDelivered > 0
                  ? ((alloc.clicksDelivered / alloc.impressionsDelivered) * 100).toFixed(2)
                  : '—';

                return (
                  <tr
                    key={alloc.creatorId}
                    id={`perf-row-${alloc.creatorId}`}
                    className="transition-colors duration-150 cursor-pointer group"
                    style={{ borderBottom: idx < rows.length - 1 ? '1px solid #1e293b' : 'none' }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(59,130,246,0.04)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = '')}
                    onClick={() => setModalState({ creator, postIndex: idx, allocationStatus: alloc.status })}
                  >
                    {/* Creator */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="relative flex-shrink-0">
                          <Image
                            src={creator.avatarUrl}
                            alt={creator.name}
                            width={32}
                            height={32}
                            className="rounded-full object-cover"
                            unoptimized
                          />
                          {creator.verified && (
                            <span
                              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full flex items-center justify-center text-white text-[7px] font-bold"
                              style={{ background: '#0a66c2' }}
                            >
                              ✓
                            </span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-semibold truncate" style={{ color: '#f1f5f9' }}>{creator.name}</p>
                          <p className="text-[11px] truncate" style={{ color: '#475569' }}>{creator.handle}</p>
                        </div>
                      </div>
                    </td>

                    {/* Status pill */}
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap"
                        style={{ background: status.bg, border: `1px solid ${status.border}`, color: status.text }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: status.dot }} />
                        {alloc.status}
                      </span>
                    </td>

                    {/* Post preview link */}
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1 text-xs font-medium group-hover:underline"
                        style={{ color: '#60a5fa' }}
                      >
                        <ExternalLink size={11} />
                        {alloc.postsDelivered}/{alloc.postsPlanned} live
                        <ChevronRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </span>
                    </td>

                    {/* Impressions */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-xs font-semibold" style={{ color: '#f1f5f9' }}>
                          {alloc.impressionsDelivered > 0 ? formatNumber(alloc.impressionsDelivered) : '—'}
                        </span>
                        <div className="flex items-center gap-1">
                          <Eye size={9} style={{ color: '#475569' }} />
                          <span className="text-[10px]" style={{ color: '#475569' }}>
                            {ctr}% CTR
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Clicks */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <MousePointer2 size={11} style={{ color: '#60a5fa' }} />
                        <span className="text-xs font-semibold" style={{ color: '#f1f5f9' }}>
                          {alloc.clicksDelivered > 0 ? formatNumber(alloc.clicksDelivered) : '—'}
                        </span>
                      </div>
                    </td>

                    {/* Leads */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <Users size={11} style={{ color: '#a5b4fc' }} />
                        <span className="text-xs font-bold" style={{ color: alloc.leadsAttributed > 50 ? '#34d399' : '#f1f5f9' }}>
                          {alloc.leadsAttributed > 0 ? alloc.leadsAttributed : '—'}
                        </span>
                      </div>
                    </td>

                    {/* Spend */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <DollarSign size={11} style={{ color: '#fbbf24' }} />
                        <span className="text-xs font-semibold" style={{ color: '#f1f5f9' }}>
                          {formatEur(alloc.allocatedBudgetEur)}
                        </span>
                      </div>
                    </td>

                    {/* ROI */}
                    <td className="px-4 py-3">
                      <span
                        className="text-xs font-bold"
                        style={{ color: parseFloat(roi) >= 5 ? '#34d399' : parseFloat(roi) >= 2 ? '#fbbf24' : '#94a3b8' }}
                      >
                        {roi === '—' ? '—' : `${roi}×`}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Post Preview Modal */}
      {modalState && modalCreator && modalPost && (
        <PostPreviewModal
          creator={modalCreator}
          post={modalPost}
          sponsorTag="@naano_platform"
          onClose={() => setModalState(null)}
        />
      )}
    </>
  );
}
