'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap,
  LayoutGrid,
  Megaphone,
  BarChart3,
  ChevronDown,
  Bell,
  Settings,
  Menu,
  X,
} from 'lucide-react';

// ─── Demo Mode Context ────────────────────────────────────────────────────────
// We export a simple event bus so any page can react to demo mode activation
export const DEMO_MODE_EVENT = 'naano:demo-mode-activated';

interface NavLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

function NavLink({ href, icon, label, active }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`
        flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150
        ${active
          ? 'bg-white/10 text-white'
          : 'text-slate-400 hover:text-white hover:bg-white/5'
        }
      `}
    >
      <span className={`w-4 h-4 ${active ? 'text-blue-400' : ''}`}>{icon}</span>
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoActive, setDemoActive] = useState(false);
  const [notifPulse, setNotifPulse] = useState(true);

  // Persist demo mode in sessionStorage so all pages know
  useEffect(() => {
    const stored = sessionStorage.getItem('naano-demo-mode');
    if (stored === 'true') setDemoActive(true);
  }, []);

  function activateDemoMode() {
    setDemoActive(true);
    sessionStorage.setItem('naano-demo-mode', 'true');
    // Fire a custom event so page components can react immediately
    window.dispatchEvent(new CustomEvent(DEMO_MODE_EVENT));
  }

  const navLinks = [
    { href: '/marketplace', icon: <LayoutGrid size={16} />, label: 'Marketplace' },
    { href: '/campaigns', icon: <Megaphone size={16} />, label: 'Campaigns' },
    { href: '/analytics', icon: <BarChart3 size={16} />, label: 'Analytics' },
  ];

  return (
    <>
      <header
        className="sticky top-0 z-50 w-full"
        style={{
          background: 'rgba(10, 15, 30, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(45, 63, 92, 0.6)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* ── Logo ─────────────────────────────────────────────────── */}
            <Link href="/" className="flex items-center gap-2.5 group" id="nav-logo">
              {/* Icon mark */}
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}
              >
                <Zap size={14} className="text-white" fill="white" />
              </div>

              {/* Wordmark */}
              <div className="flex items-center gap-1.5">
                <span
                  className="text-lg font-bold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #f1f5f9 0%, #94a3b8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  naano
                </span>

                {/* Glow badge */}
                <span
                  className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide uppercase"
                  style={{
                    background: 'rgba(59, 130, 246, 0.15)',
                    border: '1px solid rgba(59, 130, 246, 0.35)',
                    color: '#93c5fd',
                    boxShadow: '0 0 8px rgba(59, 130, 246, 0.25)',
                    animation: 'pulse-glow 3s ease-in-out infinite',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
                  B2B
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav Links ─────────────────────────────────────── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <NavLink
                  key={link.href}
                  href={link.href}
                  icon={link.icon}
                  label={link.label}
                  active={pathname.startsWith(link.href)}
                />
              ))}
            </nav>

            {/* ── Right Side Actions ────────────────────────────────────── */}
            <div className="flex items-center gap-2">

              {/* Demo mode indicator badge (shown when active) */}
              {demoActive && (
                <span
                  className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    color: '#6ee7b7',
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Demo Live
                </span>
              )}

              {/* Notifications */}
              <button
                id="nav-notifications"
                className="relative w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150"
                aria-label="Notifications"
              >
                <Bell size={16} />
                {notifPulse && (
                  <span
                    className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-400"
                    style={{ boxShadow: '0 0 6px rgba(59, 130, 246, 0.8)' }}
                  />
                )}
              </button>

              {/* Settings */}
              <button
                id="nav-settings"
                className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150"
                aria-label="Settings"
              >
                <Settings size={16} />
              </button>

              {/* Divider */}
              <div className="hidden sm:block w-px h-5 bg-slate-700 mx-1" />

              {/* ⚡ Instant Demo Mode CTA */}
              {!demoActive ? (
                <Link
                  id="nav-demo-mode-btn"
                  href="/campaigns/demo"
                  onClick={activateDemoMode}
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:scale-105 active:scale-100"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    color: 'white',
                    boxShadow: '0 2px 12px rgba(59, 130, 246, 0.35)',
                  }}
                  aria-label="Activate instant demo mode"
                >
                  <Zap size={13} fill="currentColor" />
                  Instant Demo
                </Link>
              ) : (
                <Link
                  href="/campaigns"
                  id="nav-view-campaigns-btn"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:opacity-90"
                  style={{
                    background: 'rgba(16, 185, 129, 0.15)',
                    border: '1px solid rgba(16, 185, 129, 0.35)',
                    color: '#6ee7b7',
                  }}
                >
                  <BarChart3 size={13} />
                  View Campaigns
                </Link>
              )}

              {/* Avatar */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                  color: 'white',
                }}
                aria-label="User avatar"
              >
                M
              </div>

              {/* Mobile menu toggle */}
              <button
                id="nav-mobile-menu-btn"
                className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                onClick={() => setMobileOpen((o) => !o)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={16} /> : <Menu size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile Dropdown ───────────────────────────────────────────── */}
        {mobileOpen && (
          <div
            className="md:hidden border-t px-4 py-3 space-y-1 animate-fade-in"
            style={{ borderColor: 'rgba(45, 63, 92, 0.6)', background: 'rgba(10, 15, 30, 0.95)' }}
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                icon={link.icon}
                label={link.label}
                active={pathname.startsWith(link.href)}
              />
            ))}
            <div className="pt-2 border-t" style={{ borderColor: 'rgba(45, 63, 92, 0.6)' }}>
              {!demoActive ? (
                <Link
                  id="nav-mobile-demo-btn"
                  href="/campaigns/demo"
                  onClick={() => { activateDemoMode(); setMobileOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold"
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
                    color: 'white',
                  }}
                >
                  <Zap size={13} fill="currentColor" />
                  ⚡ Instant Demo Mode
                </Link>
              ) : (
                <Link
                  href="/campaigns"
                  id="nav-mobile-campaigns-btn"
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold"
                  style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#6ee7b7' }}
                  onClick={() => setMobileOpen(false)}
                >
                  <BarChart3 size={13} />
                  View Live Campaigns
                </Link>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
