'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ChevronDown,
  Globe,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ── Brand Logo ─────────────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            {/* naano logo mark */}
            <div className="relative w-8 h-8 flex items-center justify-center">
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="32" height="32" rx="8" fill="#090D16" />
                {/* blue curved accent */}
                <path
                  d="M10 20C10 15.5817 13.5817 12 18 12H22V16H18C15.7909 16 14 17.7909 14 20H10Z"
                  fill="#38BDF8"
                />
                <circle cx="20" cy="18" r="2.5" fill="#3B82F6" />
              </svg>
            </div>
            {/* wordmark */}
            <span className="text-xl font-bold tracking-tight text-[#090d16] font-sans">
              naano
            </span>
          </Link>

          {/* ── Desktop Navigation Links ───────────────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-8 text-[13.5px] font-medium text-slate-700">
            <Link
              href="#marketplace"
              className="hover:text-[#090d16] transition-colors"
            >
              For companies
            </Link>

            <Link
              href="#how-it-works"
              className="hover:text-[#090d16] transition-colors"
            >
              For creators
            </Link>

            <Link
              href="#pricing"
              className="hover:text-[#090d16] transition-colors"
            >
              For agencies
            </Link>

            <a
              href="#how-it-works"
              className="hover:text-[#090d16] transition-colors"
            >
              How it works
            </a>

            <div className="relative">
              <button
                type="button"
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="flex items-center gap-1 hover:text-[#090d16] transition-colors"
              >
                <span>Resources</span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {resourcesOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-white p-2 shadow-xl border border-slate-200/80 animate-in fade-in slide-in-from-top-2 duration-150">
                  <Link
                    href="/campaigns/demo"
                    onClick={() => setResourcesOpen(false)}
                    className="block px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
                  >
                    ⚡ Demo Attribution Dashboard
                  </Link>
                  <Link
                    href="/marketplace"
                    onClick={() => setResourcesOpen(false)}
                    className="block px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded-lg"
                  >
                    Marketplace Directory
                  </Link>
                  <Link
                    href="/analytics"
                    onClick={() => setResourcesOpen(false)}
                    className="block px-3 py-2 text-xs text-slate-600 hover:bg-slate-50 rounded-lg"
                  >
                    Campaign Analytics
                  </Link>
                </div>
              )}
            </div>
          </nav>

          {/* ── Right CTAs ─────────────────────────────────────────────────── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Language Selector */}
            <button
              type="button"
              className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 px-2.5 py-1.5 rounded-full transition-colors"
            >
              <Globe size={14} className="text-slate-500" />
              <span>EN</span>
            </button>

            {/* Sign In button */}
            <Link
              href="/campaigns/demo"
              className="px-4 py-2 rounded-full text-xs font-semibold text-slate-900 bg-white border border-slate-300 hover:border-slate-400 hover:bg-slate-50 shadow-sm transition-all"
            >
              Sign in
            </Link>

            {/* Sign Up button */}
            <a
              href="#marketplace"
              className="px-5 py-2 rounded-full text-xs font-semibold text-white bg-[#090d16] hover:bg-slate-800 shadow-sm transition-all"
            >
              Sign up
            </a>
          </div>

          {/* ── Mobile Hamburger Button ────────────────────────────────────── */}
          <div className="flex lg:hidden items-center gap-2">
            <a
              href="#marketplace"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-[#090d16]"
            >
              Launch
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Dropdown ──────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md px-4 pt-3 pb-6 space-y-3">
          <Link
            href="#marketplace"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-800"
          >
            For companies
          </Link>
          <Link
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-800"
          >
            For creators
          </Link>
          <Link
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-800"
          >
            For agencies
          </Link>
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-slate-800"
          >
            How it works
          </a>
          <Link
            href="/campaigns/demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm font-medium text-blue-600"
          >
            ⚡ Live Campaign Dashboard
          </Link>

          <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
            <Link
              href="/campaigns/demo"
              className="flex-1 text-center py-2.5 rounded-full text-xs font-semibold border border-slate-300 text-slate-800"
            >
              Sign in
            </Link>
            <a
              href="#marketplace"
              className="flex-1 text-center py-2.5 rounded-full text-xs font-semibold bg-[#090d16] text-white"
            >
              Sign up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
