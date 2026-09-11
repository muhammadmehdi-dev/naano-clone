'use client';

import React, { useEffect } from 'react';
import {
  X,
  Sparkles,
  Check,
  Plus,
  ThumbsUp,
  MessageSquare,
  Repeat2,
  Clock,
  BarChart2,
  Eye,
  TrendingUp,
  Target,
} from 'lucide-react';
import type { Creator } from '@/types';
import { formatNumber } from '@/lib/mock-data';

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      style={{ backgroundColor: 'rgba(9, 13, 22, 0.4)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl my-8 bg-white border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 border border-blue-200">
              <Sparkles size={12} className="inline mr-1 -mt-0.5" />
              {creator.fitScore}/100 Match Score
            </span>
            <span className="text-xs text-slate-500 font-medium">
              · {creator.nicheDisplay || creator.niche}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="max-h-[75vh] overflow-y-auto p-6 space-y-6">
          {/* Creator Profile Overview */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-slate-100 shadow-sm"
              />
              <div>
                <h2 className="text-xl font-bold text-[#090d16] tracking-tight">{creator.name}</h2>
                <p className="text-xs text-blue-600 font-medium">{creator.handle}</p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {creator.countryFlag} {creator.location}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-right sm:text-right w-full sm:w-auto">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
                Price per Post
              </span>
              <span className="text-2xl font-extrabold text-[#090d16]">
                €{creator.basePriceEur}
              </span>
            </div>
          </div>

          {/* Headline */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
            {creator.headline}
          </div>

          {/* Core Performance Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <BarChart2 size={13} className="text-blue-600" />
                <span>Followers</span>
              </div>
              <p className="text-base font-extrabold text-[#090d16]">
                {formatNumber(creator.followers)}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <Eye size={13} className="text-blue-600" />
                <span>Median Views</span>
              </div>
              <p className="text-base font-extrabold text-[#090d16]">
                {formatNumber(creator.avgImpressions)}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <TrendingUp size={13} className="text-emerald-600" />
                <span>CTR %</span>
              </div>
              <p className="text-base font-extrabold text-emerald-600">
                {creator.ctrPercent}%
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                <Target size={13} className="text-blue-600" />
                <span>B2B Audience</span>
              </div>
              <p className="text-base font-extrabold text-blue-600">
                {creator.audienceB2BPercent}%
              </p>
            </div>
          </div>

          {/* Sample LinkedIn Posts */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Sample Verified LinkedIn Post</span>
              <span className="text-[11px] text-slate-400 font-normal">Authentic Performance</span>
            </h4>

            <div className="space-y-3">
              {creator.samplePosts.map((post, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl p-4.5 border border-slate-200 bg-white space-y-3 shadow-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <img
                      src={creator.avatarUrl}
                      alt={creator.name}
                      className="w-9 h-9 rounded-full object-cover"
                    />
                    <div>
                      <span className="text-xs font-bold text-[#090d16] block">
                        {creator.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {creator.headline.slice(0, 45)}...
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                    {post.text}
                  </p>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 text-[11px] text-slate-500">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <ThumbsUp size={12} className="text-blue-600" />
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

                    <span className="font-bold text-blue-600">
                      {formatNumber(post.impressions)} impressions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Clock size={13} />
            <span>Avg response time: ~{creator.responseTimeHours}h</span>
          </div>

          <button
            type="button"
            onClick={() => onToggleSelect(creator.id)}
            className={`
              flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer
              ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                  : 'bg-[#090d16] text-white hover:bg-slate-800 shadow-md'
              }
            `}
          >
            {isSelected ? (
              <>
                <Check size={14} />
                <span>Selected for Campaign</span>
              </>
            ) : (
              <>
                <Plus size={14} />
                <span>Book Creator (€{creator.basePriceEur})</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
