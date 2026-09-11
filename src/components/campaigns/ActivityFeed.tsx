'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Zap, MousePointer2, UserCheck, Star, TrendingUp } from 'lucide-react';

interface ActivityEvent {
  id: string;
  type: 'click' | 'signup' | 'demo' | 'lead' | 'view';
  persona: string;
  company: string;
  action: string;
  creatorName: string;
  timestamp: Date;
}

const PERSONAS = [
  { persona: 'VP of Engineering', company: 'Acme Corp' },
  { persona: 'Founder & CEO', company: 'TechFlow' },
  { persona: 'Head of Growth', company: 'DataPulse' },
  { persona: 'CTO', company: 'Stackr.io' },
  { persona: 'VP of Sales', company: 'RevenueOS' },
  { persona: 'Director of Product', company: 'Novu Labs' },
  { persona: 'Chief Revenue Officer', company: 'Qonto' },
  { persona: 'Head of DevRel', company: 'Supabase' },
  { persona: 'VP Marketing', company: 'Personio' },
  { persona: 'Founding Engineer', company: 'Linear' },
  { persona: 'Principal PM', company: 'Vercel' },
  { persona: 'GTM Lead', company: 'Rippling' },
  { persona: 'CFO', company: 'Pleo' },
  { persona: 'VP of Engineering', company: 'Pitch' },
  { persona: 'Head of Platform', company: 'Miro' },
];

const ACTIONS = [
  { type: 'click' as const, action: 'clicked attribution link', icon: MousePointer2 },
  { type: 'signup' as const, action: 'signed up for free trial', icon: UserCheck },
  { type: 'demo' as const, action: 'booked a product demo', icon: Star },
  { type: 'lead' as const, action: 'submitted a contact form', icon: TrendingUp },
  { type: 'view' as const, action: 'viewed pricing page (3 min)', icon: Zap },
];

const CREATORS = ['Marcus Riedel', 'Priya Nambiar', 'Aisha Okonkwo', 'Tobias Krüger', 'Leila Vasquez'];

const EVENT_COLORS = {
  click: { bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.25)', icon: '#60a5fa', IconComp: MousePointer2 },
  signup: { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.25)', icon: '#34d399', IconComp: UserCheck },
  demo: { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.25)', icon: '#fbbf24', IconComp: Star },
  lead: { bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.25)', icon: '#a5b4fc', IconComp: TrendingUp },
  view: { bg: 'rgba(139, 92, 246, 0.12)', border: 'rgba(139, 92, 246, 0.25)', icon: '#c4b5fd', IconComp: Zap },
};

function formatAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  return `${Math.floor(minutes / 60)}h ago`;
}

function generateEvent(): ActivityEvent {
  const persona = PERSONAS[Math.floor(Math.random() * PERSONAS.length)];
  const action = ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  const creator = CREATORS[Math.floor(Math.random() * CREATORS.length)];
  return {
    id: `evt-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    type: action.type,
    persona: persona.persona,
    company: persona.company,
    action: action.action,
    creatorName: creator,
    timestamp: new Date(),
  };
}

// Seed 12 initial events spread over last 30 minutes
function seedInitialEvents(): ActivityEvent[] {
  return Array.from({ length: 12 }, (_, i) => {
    const evt = generateEvent();
    evt.timestamp = new Date(Date.now() - (12 - i) * 150000 - Math.random() * 60000);
    return evt;
  });
}

export default function ActivityFeed() {
  const [events, setEvents] = useState<ActivityEvent[]>(seedInitialEvents);
  const [tick, setTick] = useState(0);

  // Increment tick every 10s to re-render timestamps
  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 10_000);
    return () => clearInterval(interval);
  }, []);

  // Add a new event every 8–14 seconds
  useEffect(() => {
    const schedule = () => {
      const delay = 8000 + Math.random() * 6000;
      return setTimeout(() => {
        setEvents((prev) => [generateEvent(), ...prev.slice(0, 19)]);
        timerRef.current = schedule();
      }, delay);
    };
    const timerRef = { current: schedule() };
    return () => clearTimeout(timerRef.current);
  }, []);

  return (
    <div
      className="rounded-xl flex flex-col overflow-hidden"
      style={{
        background: 'linear-gradient(145deg, #111827 0%, #1a2235 100%)',
        border: '1px solid #2d3f5c',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: '#1e293b' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
            style={{ boxShadow: '0 0 6px rgba(52, 211, 153, 0.8)' }}
          />
          <span className="text-sm font-semibold" style={{ color: '#f1f5f9' }}>
            Live Attribution Feed
          </span>
        </div>
        <span
          className="text-xs px-2 py-0.5 rounded-full font-medium"
          style={{ background: 'rgba(16, 185, 129, 0.12)', color: '#6ee7b7', border: '1px solid rgba(16, 185, 129, 0.25)' }}
        >
          {events.length} events
        </span>
      </div>

      {/* Event list */}
      <div className="flex-1 overflow-y-auto" style={{ maxHeight: '520px' }}>
        {events.map((evt, idx) => {
          const colors = EVENT_COLORS[evt.type];
          const Icon = colors.IconComp;
          return (
            <div
              key={evt.id}
              className="flex gap-3 px-4 py-3 border-b transition-all duration-300"
              style={{
                borderColor: '#1e293b',
                opacity: idx === 0 ? 1 : Math.max(0.4, 1 - idx * 0.04),
                animation: idx === 0 ? 'fade-in-up 0.4s ease forwards' : undefined,
              }}
            >
              {/* Icon */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
              >
                <Icon size={12} style={{ color: colors.icon }} />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <p className="text-xs leading-relaxed" style={{ color: '#cbd5e1' }}>
                  <span className="font-semibold" style={{ color: '#f1f5f9' }}>
                    {evt.persona}
                  </span>{' '}
                  at{' '}
                  <span className="font-medium" style={{ color: '#93c5fd' }}>
                    {evt.company}
                  </span>{' '}
                  {evt.action}
                </p>
                <p className="text-xs" style={{ color: '#475569' }}>
                  via{' '}
                  <span style={{ color: '#64748b' }}>{evt.creatorName}</span>
                  {' · '}
                  <span>{formatAgo(evt.timestamp)}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div
        className="px-4 py-2.5 border-t"
        style={{ borderColor: '#1e293b' }}
      >
        <p className="text-xs text-center" style={{ color: '#334155' }}>
          Attribution powered by naano tracking pixels · UTM-level precision
        </p>
      </div>
    </div>
  );
}
