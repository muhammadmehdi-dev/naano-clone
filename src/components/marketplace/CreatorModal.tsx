'use client';

import React, { useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Sparkles,
  Check,
  Plus,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Eye,
  TrendingUp,
  Clock,
  Target,
  BarChart2,
} from 'lucide-react';
import type { Creator } from '@/types';
import { formatEur, formatNumber, getFitScoreColor } from '@/lib/mock-data';

interface CreatorModalProps {
  creator: Creator | null;
  isOpen: boolean;
  onClose: () => void;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
}

export default function CreatorModal({
  creator,
  isOpen,
  onClose,
  isSelected,
  onToggleSelect,
}: CreatorModalProps) {
  // Close on escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !creator) return null;

  const fitColor = getFitScoreColor(creator.fitScore);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ backgroundColor: 'rgba(5, 8, 18, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl my-8 border"
        style={{
          backgroundColor: '#0f172a',
          borderColor: 'rgba(59, 130, 246, 0.3)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 30px rgba(59, 130, 246, 0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div
          className="flex items-center justify-between px-6 py-4 border-b border-slate-800"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)' }}
        >
          <div className="flex items-center gap-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${fitColor}15`,
                color: fitColor,
                border: `1px solid ${fitColor}40`,
              }}
            >
              <Sparkles size={11} className="inline mr-1 -mt-0.5" />
              {creator.fitScore}/100 Match Score
            </span>
            <span className="text-xs text-slate-400">· {creator.niche}</span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
          {/* Creator Profile Overview */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={creator.avatarUrl}
                  alt={creator.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-blue-500/40"
                />
                {creator.verified && (
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-slate-900"
                    title="Verified Creator"
                  >
                    <ShieldCheck size={12} className="text-white" />
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">{creator.name}</h2>
                <p className="text-sm text-blue-400 font-medium">{creator.handle}</p>
                <p className="text-xs text-slate-400">{creator.location}</p>
              </div>
            </div>

            <div className="text-right sm:text-right w-full sm:w-auto p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
              <span className="text-[11px] text-slate-400 block">Pricing per Post</span>
              <span className="text-xl font-extrabold text-emerald-400">
                {formatEur(creator.basePriceEur)}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-sm text-slate-200 leading-relaxed">
            {creator.headline}
          </div>

          {/* Core Performance Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <BarChart2 size={13} className="text-blue-400" />
                <span>Followers</span>
              </div>
              <p className="text-base font-bold text-white">
                {formatNumber(creator.followers)}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Eye size={13} className="text-indigo-400" />
                <span>Median Views</span>
              </div>
              <p className="text-base font-bold text-white">
                {formatNumber(creator.avgImpressions)}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <TrendingUp size={13} className="text-emerald-400" />
                <span>CTR %</span>
              </div>
              <p className="text-base font-bold text-emerald-400">
                {creator.ctrPercent}%
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800">
              <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
                <Target size={13} className="text-amber-400" />
                <span>B2B Audience</span>
              </div>
              <p className="text-base font-bold text-amber-400">
                {creator.audienceB2BPercent}%
              </p>
            </div>
          </div>

          {/* Topics & Meta */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Content Focus & Tags
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {creator.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Sample LinkedIn Posts */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Top Performing LinkedIn Posts</span>
              <span className="text-[11px] text-slate-500 font-normal">Authentic Format</span>
            </h4>

            <div className="space-y-4">
              {creator.samplePosts.map((post, idx) => (
                <div
                  key={idx}
                  className="rounded-xl p-4 border border-slate-800/80 bg-slate-900/60 space-y-3 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={creator.avatarUrl}
                      alt={creator.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <span className="text-xs font-semibold text-white block">
                        {creator.name}
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Published · Verified Post
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                    {post.text}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={12} className="text-blue-400" />
                        {formatNumber(post.likes)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={12} className="text-slate-400" />
                        {post.comments} comments
                      </span>
                      <span className="flex items-center gap-1">
                        <Repeat2 size={12} className="text-slate-400" />
                        {post.reposts} reposts
                      </span>
                    </div>

                    <span className="font-semibold text-blue-400">
                      {formatNumber(post.impressions)} impressions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div
          className="flex items-center justify-between px-6 py-4 border-t border-slate-800"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.95)' }}
        >
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Clock size={13} />
            <span>Avg. response time: ~{creator.responseTimeHours}h</span>
          </div>

          <button
            type="button"
            onClick={() => onToggleSelect(creator.id)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer
              ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-700'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 shadow-lg shadow-blue-600/20'
              }
            `}
          >
            {isSelected ? (
              <>
                <Check size={16} />
                <span>Selected for Campaign</span>
              </>
            ) : (
              <>
                <Plus size={16} />
                <span>Add to Campaign ({formatEur(creator.basePriceEur)})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
