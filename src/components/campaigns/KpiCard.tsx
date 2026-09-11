'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KpiCardProps {
  id: string;
  label: string;
  value: string;
  subValue?: string;
  badge?: {
    text: string;
    type: 'up' | 'down' | 'neutral';
  };
  icon: React.ReactNode;
  accentColor: string; // CSS color string
  description?: string;
}

export default function KpiCard({
  id,
  label,
  value,
  subValue,
  badge,
  icon,
  accentColor,
  description,
}: KpiCardProps) {
  const BadgeIcon =
    badge?.type === 'up' ? TrendingUp : badge?.type === 'down' ? TrendingDown : Minus;

  const badgeColors = {
    up: { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)', text: '#6ee7b7' },
    down: { bg: 'rgba(244, 63, 94, 0.12)', border: 'rgba(244, 63, 94, 0.3)', text: '#fda4af' },
    neutral: { bg: 'rgba(100, 116, 139, 0.12)', border: 'rgba(100, 116, 139, 0.3)', text: '#94a3b8' },
  };

  const bc = badge ? badgeColors[badge.type] : null;

  return (
    <div
      id={id}
      className="relative overflow-hidden rounded-xl p-5 flex flex-col gap-3 transition-all duration-200 hover:translate-y-[-2px]"
      style={{
        background: 'linear-gradient(145deg, #111827 0%, #1a2235 100%)',
        border: '1px solid #2d3f5c',
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
      }}
    >
      {/* Accent glow strip */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl"
        style={{ background: accentColor }}
      />

      {/* Top row */}
      <div className="flex items-start justify-between">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
          style={{ background: `${accentColor}20`, border: `1px solid ${accentColor}40` }}
        >
          <span style={{ color: accentColor }}>{icon}</span>
        </div>

        {badge && bc && (
          <span
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
            style={{ background: bc.bg, border: `1px solid ${bc.border}`, color: bc.text }}
          >
            <BadgeIcon size={10} />
            {badge.text}
          </span>
        )}
      </div>

      {/* Value */}
      <div className="flex flex-col gap-0.5">
        <span
          className="text-2xl font-bold tracking-tight"
          style={{ color: '#f1f5f9' }}
        >
          {value}
        </span>
        {subValue && (
          <span className="text-xs font-medium" style={{ color: accentColor }}>
            {subValue}
          </span>
        )}
      </div>

      {/* Label + description */}
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium" style={{ color: '#94a3b8' }}>
          {label}
        </span>
        {description && (
          <span className="text-xs" style={{ color: '#475569' }}>
            {description}
          </span>
        )}
      </div>
    </div>
  );
}
