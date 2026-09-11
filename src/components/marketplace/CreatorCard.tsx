'use client';

import React, { useState } from 'react';
import { Star, Check } from 'lucide-react';
import type { Creator } from '@/types';
import { formatNumber } from '@/lib/mock-data';

interface CreatorCardProps {
  creator: Creator;
  index: number;
  isSelected: boolean;
  onToggleSelect: (id: string) => void;
  onViewDetails?: (creator: Creator) => void;
}

export default function CreatorCard({
  creator,
  index,
  isSelected,
  onToggleSelect,
  onViewDetails,
}: CreatorCardProps) {
  const [isStarred, setIsStarred] = useState(false);

  const displayNiche = creator.nicheDisplay || creator.niche;
  const displayNumber = creator.watermarkNumber || index + 1;
  const flag = creator.countryFlag || '🇪🇺';

  return (
    <div
      className={`
        relative flex flex-col justify-between rounded-2xl bg-white p-5 transition-all duration-200 overflow-hidden
        ${
          isSelected
            ? 'ring-2 ring-blue-600 shadow-md'
            : 'border border-slate-200/90 shadow-[0_4px_20px_-2px_rgba(15,23,42,0.04)] hover:shadow-[0_12px_24px_-4px_rgba(15,23,42,0.08)] hover:border-slate-300'
        }
      `}
    >
      {/* ── Top Bar: Checkbox, LinkedIn Icon, Watermark Number, Book button, Star ── */}
      <div className="flex items-center justify-between z-10 mb-2">
        {/* Left: Checkbox & LinkedIn Icon */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleSelect(creator.id)}
            className={`
              w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer
              ${
                isSelected
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : 'bg-white border-slate-300 hover:border-slate-400 text-transparent'
              }
            `}
            title={isSelected ? 'Deselect creator' : 'Select creator for campaign'}
          >
            <Check size={13} strokeWidth={3} className={isSelected ? 'text-white' : 'hidden'} />
          </button>

          {/* LinkedIn Icon */}
          <div className="w-5 h-5 rounded-full bg-[#0a66c2] flex items-center justify-center text-white text-[10px] font-bold">
            in
          </div>
        </div>

        {/* Right: Book Pill & Star Icon */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onToggleSelect(creator.id)}
            className={`
              px-3.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer
              ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#090d16]'
              }
            `}
          >
            {isSelected ? 'Booked' : 'Book'}
          </button>

          <button
            type="button"
            onClick={() => setIsStarred(!isStarred)}
            className="p-1 text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
            title="Save to favorites"
          >
            <Star
              size={16}
              className={isStarred ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}
            />
          </button>
        </div>
      </div>

      {/* ── Center Watermark & Creator Info ── */}
      <div className="relative flex flex-col items-center text-center pt-2 pb-4">
        {/* Big Watermark Number in background */}
        <span className="absolute -top-4 -left-1 text-6xl font-extrabold text-slate-100 select-none pointer-events-none tracking-tighter">
          {displayNumber}
        </span>

        {/* Subtle Watermark Naano Logo */}
        <div className="flex items-center justify-center gap-1 opacity-20 mb-2">
          <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#090D16" />
            <path d="M10 20C10 15.5817 13.5817 12 18 12H22V16H18C15.7909 16 14 17.7909 14 20H10Z" fill="#38BDF8" />
          </svg>
          <span className="text-xs font-bold text-[#090d16] tracking-tight">naano</span>
        </div>

        {/* Avatar */}
        <div className="relative mb-2.5">
          <img
            src={creator.avatarUrl}
            alt={creator.name}
            className="w-16 h-16 rounded-full object-cover ring-4 ring-white shadow-sm"
          />
        </div>

        {/* Name */}
        <h3
          onClick={() => onViewDetails && onViewDetails(creator)}
          className="text-base font-bold text-[#090d16] tracking-tight hover:text-blue-600 transition-colors cursor-pointer"
        >
          {creator.name}
        </h3>

        {/* Niche tag */}
        <p className="text-xs text-slate-500 font-medium mt-0.5">{displayNiche}</p>

        {/* Country Flag pill */}
        <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 text-[11px] font-medium text-slate-700 mt-2">
          <span>{flag}</span>
          <span>{creator.location}</span>
        </div>

        {/* Headline */}
        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mt-2.5 px-1 max-w-[280px]">
          {creator.headline}
        </p>
      </div>

      {/* ── Match Progress Bar ── */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-[11px] font-bold mb-1.5">
          <span className="text-blue-600 flex items-center gap-1 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 inline-block" />
            MATCHING
          </span>
          <span className="text-[#090d16]">{creator.fitScore}/100</span>
        </div>
        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-500"
            style={{ width: `${creator.fitScore}%` }}
          />
        </div>
      </div>

      {/* ── 3-Column Metrics Footer ── */}
      <div className="grid grid-cols-3 pt-3 border-t border-slate-100 text-center">
        <div>
          <span className="text-sm font-extrabold text-[#090d16] block">
            {formatNumber(creator.followers)}
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
            Followers
          </span>
        </div>

        <div className="border-x border-slate-100">
          <span className="text-sm font-extrabold text-[#090d16] block">
            {formatNumber(creator.avgImpressions)}
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
            Median Views
          </span>
        </div>

        <div>
          <span className="text-sm font-extrabold text-[#090d16] block">
            €{creator.basePriceEur}
          </span>
          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block mt-0.5">
            Post Cost
          </span>
        </div>
      </div>
    </div>
  );
}
