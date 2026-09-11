'use client';

import React from 'react';
import { Check, Plus, ShieldCheck, Sparkles, Eye } from 'lucide-react';
import type { Creator } from '@/types';
import { formatEur, formatNumber, getFitScoreColor } from '@/lib/mock-data';

interface CreatorCardProps {
  creator: Creator;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onViewDetails: (creator: Creator) => void;
}

export default function CreatorCard({
  creator,
  isSelected,
  onToggleSelect,
  onViewDetails,
}: CreatorCardProps) {
  const fitColor = getFitScoreColor(creator.fitScore);

  return (
    <div
      className={`
        group relative flex flex-col justify-between rounded-2xl p-5.5 transition-all duration-300
        ${
          isSelected
            ? 'ring-2 ring-blue-500/80 shadow-lg shadow-blue-500/10'
            : 'hover:border-slate-600/80 hover:shadow-xl hover:shadow-blue-950/20'
        }
      `}
      style={{
        background: isSelected
          ? 'linear-gradient(145deg, rgba(26, 34, 53, 0.95) 0%, rgba(17, 24, 39, 0.98) 100%)'
          : 'linear-gradient(145deg, rgba(17, 24, 39, 0.85) 0%, rgba(15, 23, 42, 0.85) 100%)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: isSelected
          ? '1px solid rgba(59, 130, 246, 0.6)'
          : '1px solid rgba(45, 63, 92, 0.5)',
      }}
    >
      {/* Top Header: Avatar, Name, Handle, Fit Score */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative flex-shrink-0">
              <img
                src={creator.avatarUrl}
                alt={creator.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-700/60 group-hover:ring-blue-500/50 transition-all"
              />
              {creator.verified && (
                <div
                  className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-blue-600 flex items-center justify-center ring-2 ring-slate-900"
                  title="Verified LinkedIn Creator"
                >
                  <ShieldCheck size={11} className="text-white" />
                </div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-base font-semibold text-white tracking-tight truncate group-hover:text-blue-300 transition-colors">
                  {creator.name}
                </h3>
              </div>
              <p className="text-xs text-slate-400 truncate">{creator.handle}</p>
              <p className="text-[11px] text-slate-500 truncate mt-0.5">{creator.location}</p>
            </div>
          </div>

          {/* Match Score Badge */}
          <div
            className="flex-shrink-0 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold"
            style={{
              backgroundColor: `${fitColor}15`,
              color: fitColor,
              border: `1px solid ${fitColor}40`,
            }}
            title={`Audience match score: ${creator.fitScore}/100`}
          >
            <Sparkles size={11} />
            <span>{creator.fitScore}/100</span>
          </div>
        </div>

        {/* Niche Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium tracking-wide"
            style={{
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              color: '#93c5fd',
              border: '1px solid rgba(59, 130, 246, 0.25)',
            }}
          >
            {creator.niche}
          </span>
          <span className="text-[11px] text-slate-400">
            {creator.audienceB2BPercent}% B2B audience
          </span>
        </div>

        {/* Headline */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4 min-h-[32px]">
          {creator.headline}
        </p>
      </div>

      {/* Stats Matrix */}
      <div>
        <div
          className="grid grid-cols-3 gap-2 py-2.5 px-3 rounded-xl mb-4"
          style={{
            backgroundColor: 'rgba(15, 23, 42, 0.6)',
            border: '1px solid rgba(45, 63, 92, 0.4)',
          }}
        >
          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              Followers
            </span>
            <span className="text-sm font-bold text-white tracking-tight">
              {formatNumber(creator.followers)}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              Median Views
            </span>
            <span className="text-sm font-bold text-blue-400 tracking-tight">
              {formatNumber(creator.avgImpressions)}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-medium">
              / Post
            </span>
            <span className="text-sm font-bold text-emerald-400 tracking-tight">
              {formatEur(creator.basePriceEur)}
            </span>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
          <button
            type="button"
            onClick={() => onViewDetails(creator)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all border border-slate-700/60 hover:border-slate-600 cursor-pointer"
          >
            <Eye size={13} />
            <span>Profile & Posts</span>
          </button>

          <button
            type="button"
            onClick={() => onToggleSelect(creator.id)}
            className={`
              flex items-center justify-center gap-1.5 py-2 px-3.5 rounded-lg text-xs font-semibold transition-all cursor-pointer
              ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 hover:bg-blue-700'
                  : 'bg-white/10 text-white hover:bg-white/15 border border-white/10'
              }
            `}
          >
            {isSelected ? (
              <>
                <Check size={13} />
                <span>Selected</span>
              </>
            ) : (
              <>
                <Plus size={13} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
