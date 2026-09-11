'use client';

import React, { useState, useMemo } from 'react';
import {
  Lock,
  LayoutGrid,
  Store,
  Handshake,
  Layers,
  MessageSquare,
  CreditCard,
  Search,
  Users,
  Globe2,
  Target,
} from 'lucide-react';
import { MOCK_CREATORS } from '@/lib/mock-data';
import type { Creator, Niche } from '@/types';
import CreatorCard from './CreatorCard';
import CreatorModal from './CreatorModal';
import CampaignCart from './CampaignCart';

const NICHES: (Niche | 'All')[] = [
  'All',
  'DevRel & AI',
  'B2B SaaS',
  'Fintech',
  'GTM & Sales',
];

export default function MarketplaceSection() {
  const [selectedNiche, setSelectedNiche] = useState<Niche | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>(['c-aymane', 'c-emma']);
  const [modalCreator, setModalCreator] = useState<Creator | null>(null);

  const filteredCreators = useMemo(() => {
    let list = [...MOCK_CREATORS];

    if (selectedNiche !== 'All') {
      list = list.filter((c) => c.niche === selectedNiche);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.headline.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          (c.nicheDisplay && c.nicheDisplay.toLowerCase().includes(q))
      );
    }

    return list;
  }, [selectedNiche, searchQuery]);

  function toggleCreatorSelection(id: string) {
    setSelectedCreatorIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleRemoveFromCart(id: string) {
    setSelectedCreatorIds((prev) => prev.filter((item) => item !== id));
  }

  function handleClearCart() {
    setSelectedCreatorIds([]);
  }

  return (
    <section id="marketplace" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Section Heading ── */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          {/* Badge pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/90 border border-slate-200 shadow-sm text-slate-800 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-600" />
            <span>The Naano creator marketplace</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#090d16] tracking-tight mb-4">
            Work with all the best creators.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Find the right B2B voices, compare their audience fit, and book every collaboration from one place.
          </p>

          {/* Category Pills & Search */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {NICHES.map((niche) => {
              const isActive = selectedNiche === niche;
              return (
                <button
                  key={niche}
                  onClick={() => setSelectedNiche(niche)}
                  className={`
                    px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer
                    ${
                      isActive
                        ? 'bg-[#090d16] text-white shadow-sm'
                        : 'bg-white/80 hover:bg-white text-slate-700 border border-slate-200/90 shadow-sm'
                    }
                  `}
                >
                  {niche === 'All' ? 'All Niches' : niche}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Browser Window Mockup (naano.co/marketplace) ── */}
        <div className="rounded-3xl bg-slate-50/80 border border-slate-200/90 shadow-2xl shadow-slate-200/60 overflow-hidden mb-16 backdrop-blur-sm">
          {/* macOS Browser Header */}
          <div className="px-5 py-3.5 bg-white border-b border-slate-200/80 flex items-center justify-between">
            {/* Window dots */}
            <div className="flex items-center gap-1.5 w-16">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>

            {/* URL bar */}
            <div className="flex items-center justify-center gap-1.5 px-6 py-1.5 rounded-full bg-slate-100/90 text-xs font-medium text-slate-600 border border-slate-200/60 max-w-md w-full">
              <Lock size={12} className="text-slate-400" />
              <span>naano.co/marketplace</span>
            </div>

            <div className="w-16" />
          </div>

          {/* Browser Workspace Layout */}
          <div className="flex min-h-[600px]">
            {/* Left App Sidebar */}
            <div className="hidden md:flex flex-col items-center py-6 px-3 bg-white border-r border-slate-200/80 space-y-6 w-16 flex-shrink-0">
              {/* App logo */}
              <div className="w-8 h-8 rounded-lg bg-[#090d16] flex items-center justify-center">
                <span className="text-white text-xs font-black">n</span>
              </div>

              {/* Sidebar icons */}
              <div className="flex flex-col items-center gap-5 text-slate-400">
                <button type="button" className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                  <LayoutGrid size={18} />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors"
                >
                  <Store size={18} />
                </button>
                <button type="button" className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                  <Handshake size={18} />
                </button>
                <button type="button" className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                  <Layers size={18} />
                </button>
                <button type="button" className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                  <MessageSquare size={18} />
                </button>
                <button type="button" className="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
                  <CreditCard size={18} />
                </button>
              </div>
            </div>

            {/* Main Creator Cards Grid */}
            <div className="flex-1 p-5 sm:p-8 bg-slate-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCreators.slice(0, 6).map((creator, idx) => (
                  <CreatorCard
                    key={creator.id}
                    creator={creator}
                    index={idx}
                    isSelected={selectedCreatorIds.includes(creator.id)}
                    onToggleSelect={toggleCreatorSelection}
                    onViewDetails={setModalCreator}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── 3 Value Proposition Cards (Direct from Screenshot 5) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 3,000+ vetted creators */}
          <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            {/* Visual: Avatars cluster */}
            <div className="flex items-center justify-center -space-x-3 mb-6 py-4">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face"
                className="w-12 h-12 rounded-full ring-2 ring-white object-cover"
                alt="Creator"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=96&h=96&fit=crop&crop=face"
                className="w-13 h-13 rounded-full ring-2 ring-white object-cover z-10"
                alt="Creator"
              />
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face"
                className="w-14 h-14 rounded-full ring-2 ring-white object-cover z-20"
                alt="Creator"
              />
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face"
                className="w-13 h-13 rounded-full ring-2 ring-white object-cover z-10"
                alt="Creator"
              />
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&h=96&fit=crop&crop=face"
                className="w-12 h-12 rounded-full ring-2 ring-white object-cover"
                alt="Creator"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#090d16] mb-1">3,000+ vetted creators</h3>
              <p className="text-sm text-slate-500">Specialist B2B voices, ready to collaborate.</p>
            </div>
          </div>

          {/* Card 2: Across 100 countries */}
          <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            {/* Visual: Flag badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 mb-6 py-4">
              <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">🇫🇷</span>
              <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">🇺🇸</span>
              <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">🇩🇪</span>
              <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">🇬🇧</span>
              <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">🇪🇸</span>
              <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">🇨🇦</span>
              <span className="text-2xl p-2 rounded-xl bg-slate-50 border border-slate-100 shadow-2xs">🇳🇱</span>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#090d16] mb-1">Across 100 countries</h3>
              <p className="text-sm text-slate-500">Local expertise with genuinely global reach.</p>
            </div>
          </div>

          {/* Card 3: Matched to your buyers */}
          <div className="rounded-3xl bg-white p-7 border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            {/* Visual: Matching node connector */}
            <div className="flex items-center justify-center gap-3 mb-6 py-4">
              <div className="flex flex-col items-center">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face"
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500"
                  alt="Creator"
                />
                <span className="text-[10px] text-slate-500 mt-1 font-medium">AI & SaaS creator</span>
              </div>

              <div className="border-t-2 border-dashed border-blue-400 w-12" />

              <div className="w-11 h-11 rounded-full bg-blue-50 border border-blue-200 text-blue-600 font-bold text-xs flex items-center justify-center">
                96%
              </div>

              <div className="border-t-2 border-dashed border-blue-400 w-8" />

              <div className="flex flex-col gap-1 text-[10px] font-semibold text-slate-700">
                <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">Founders</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">Sales leaders</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200">GTM teams</span>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#090d16] mb-1">Matched to your buyers</h3>
              <p className="text-sm text-slate-500">Audience fit comes before follower count.</p>
            </div>
          </div>
        </div>

        {/* Modal Inspection */}
        <CreatorModal
          creator={modalCreator}
          isOpen={modalCreator !== null}
          onClose={() => setModalCreator(null)}
          isSelected={modalCreator ? selectedCreatorIds.includes(modalCreator.id) : false}
          onToggleSelect={toggleCreatorSelection}
        />

        {/* Sticky Campaign Cart / Drawer */}
        <CampaignCart
          selectedCreatorIds={selectedCreatorIds}
          onRemoveCreator={handleRemoveFromCart}
          onClearAll={handleClearCart}
        />
      </div>
    </section>
  );
}
