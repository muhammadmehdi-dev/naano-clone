'use client';

import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Users, Globe2, Target, CheckCircle2 } from 'lucide-react';
import { MOCK_CREATORS } from '@/lib/mock-data';
import type { Creator, Niche } from '@/types';
import CreatorCard from './CreatorCard';
import CreatorModal from './CreatorModal';
import CampaignCart from './CampaignCart';

const NICHES: (Niche | 'All')[] = [
  'All',
  'B2B SaaS',
  'DevRel & AI',
  'Fintech',
  'GTM & Sales',
];

type SortOption = 'fitScore' | 'followers' | 'avgImpressions' | 'priceAsc' | 'priceDesc';

export default function MarketplaceSection() {
  const [selectedNiche, setSelectedNiche] = useState<Niche | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('fitScore');
  const [selectedCreatorIds, setSelectedCreatorIds] = useState<string[]>(['c-001', 'c-002']);
  const [modalCreator, setModalCreator] = useState<Creator | null>(null);

  // Filter and sort creators
  const filteredCreators = useMemo(() => {
    let list = [...MOCK_CREATORS];

    // Filter by niche
    if (selectedNiche !== 'All') {
      list = list.filter((c) => c.niche === selectedNiche);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.handle.toLowerCase().includes(q) ||
          c.headline.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort
    list.sort((a, b) => {
      switch (sortBy) {
        case 'fitScore':
          return b.fitScore - a.fitScore;
        case 'followers':
          return b.followers - a.followers;
        case 'avgImpressions':
          return b.avgImpressions - a.avgImpressions;
        case 'priceAsc':
          return a.basePriceEur - b.basePriceEur;
        case 'priceDesc':
          return b.basePriceEur - a.basePriceEur;
        default:
          return 0;
      }
    });

    return list;
  }, [selectedNiche, searchQuery, sortBy]);

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
    <section id="marketplace" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            The Naano Creator Marketplace
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Work with all the best creators.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Find the right B2B voices, compare their audience fit, and book every collaboration from one place.
          </p>

          {/* 3 Core Value Prop Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <Users size={18} className="text-blue-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">3,000+ vetted creators</span>
                <span className="text-[11px] text-slate-400">Specialist B2B voices, ready to collab</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <Globe2 size={18} className="text-indigo-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Across 100 countries</span>
                <span className="text-[11px] text-slate-400">Local expertise, genuinely global reach</span>
              </div>
            </div>

            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
              <Target size={18} className="text-emerald-400 flex-shrink-0" />
              <div>
                <span className="text-xs font-bold text-white block">Matched to your buyers</span>
                <span className="text-[11px] text-slate-400">Audience fit comes before followers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div
          className="p-4 sm:p-5 rounded-2xl mb-8 space-y-4 border"
          style={{
            backgroundColor: 'rgba(17, 24, 39, 0.75)',
            borderColor: 'rgba(45, 63, 92, 0.6)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search creators by name, company, topic (PLG, AI, CFO, DevRel)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <SlidersHorizontal size={15} className="text-slate-400" />
              <label htmlFor="sort-creators" className="text-xs text-slate-400 font-medium">
                Sort:
              </label>
              <select
                id="sort-creators"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="fitScore">Highest Fit Score</option>
                <option value="followers">Most Followers</option>
                <option value="avgImpressions">Highest Median Views</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Niche Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            {NICHES.map((niche) => {
              const isActive = selectedNiche === niche;
              const count =
                niche === 'All'
                  ? MOCK_CREATORS.length
                  : MOCK_CREATORS.filter((c) => c.niche === niche).length;

              return (
                <button
                  key={niche}
                  onClick={() => setSelectedNiche(niche)}
                  className={`
                    flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer
                    ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                        : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700/80 border border-slate-700/50'
                    }
                  `}
                >
                  <span>{niche}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-blue-800/80 text-blue-100' : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between mb-6 text-xs text-slate-400">
          <span>
            Showing <strong className="text-white">{filteredCreators.length}</strong> B2B creators
            {selectedNiche !== 'All' ? ` in ${selectedNiche}` : ''}
          </span>
          <span>Click any card to inspect sample posts or select for campaign</span>
        </div>

        {/* Creators Grid */}
        {filteredCreators.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                isSelected={selectedCreatorIds.includes(creator.id)}
                onToggleSelect={toggleCreatorSelection}
                onViewDetails={setModalCreator}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 rounded-2xl bg-slate-900/50 border border-slate-800">
            <p className="text-slate-300 text-base font-semibold mb-2">No creators found</p>
            <p className="text-slate-400 text-xs max-w-sm mx-auto mb-4">
              We could not find any creators matching &quot;{searchQuery}&quot;. Try adjusting your keywords or clearing the filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedNiche('All');
              }}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Detail Modal */}
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
