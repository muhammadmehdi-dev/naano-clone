'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  X,
  TrendingUp,
  Target,
  Eye,
  Euro,
  CheckCircle2,
} from 'lucide-react';
import { MOCK_CREATORS, formatEur, formatNumber } from '@/lib/mock-data';

interface CampaignCartProps {
  selectedCreatorIds: string[];
  onRemoveCreator: (id: string) => void;
  onClearAll: () => void;
}

export default function CampaignCart({
  selectedCreatorIds,
  onRemoveCreator,
  onClearAll,
}: CampaignCartProps) {
  const router = useRouter();
  const [isLaunching, setIsLaunching] = useState(false);
  const [campaignTitle, setCampaignTitle] = useState('B2B Pipeline Sprint');

  if (selectedCreatorIds.length === 0) return null;

  const selectedCreators = selectedCreatorIds
    .map((id) => MOCK_CREATORS.find((c) => c.id === id))
    .filter(Boolean);

  const totalSpend = selectedCreators.reduce((sum, c) => sum + (c?.basePriceEur ?? 0), 0);
  const totalImpressions = selectedCreators.reduce((sum, c) => sum + (c?.avgImpressions ?? 0), 0);
  const totalLeads = selectedCreators.reduce((sum, c) => sum + (c?.avgLeadsPerPost ?? 0), 0);
  const blendedCpm = totalImpressions > 0 ? (totalSpend / totalImpressions) * 1000 : 0;
  const blendedCpl = totalLeads > 0 ? totalSpend / totalLeads : 0;

  function handleLaunch() {
    setIsLaunching(true);
    // Simulate brief creation and route directly to live tracking dashboard
    setTimeout(() => {
      router.push('/campaigns/camp-001');
    }, 600);
  }

  return (
    <div className="fixed bottom-0 inset-x-0 z-40 p-4 sm:p-6 pointer-events-none">
      <div
        className="max-w-5xl mx-auto rounded-2xl p-4 sm:p-5 shadow-2xl pointer-events-auto border transition-all animate-in slide-in-from-bottom-5 duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(17, 24, 39, 0.96) 0%, rgba(10, 15, 30, 0.98) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'rgba(59, 130, 246, 0.5)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(59, 130, 246, 0.2)',
        }}
      >
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Left: Selected Creators preview & title */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 rounded-full bg-blue-600 text-white font-bold text-xs items-center justify-center ring-2 ring-blue-400/50">
                {selectedCreators.length}
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 block">
                  Campaign Draft
                </span>
                <span className="text-sm font-bold text-white">
                  {selectedCreators.length} Creator{selectedCreators.length > 1 ? 's' : ''} Selected
                </span>
              </div>
            </div>

            {/* Avatars Strip */}
            <div className="flex items-center -space-x-2 overflow-x-auto py-1">
              {selectedCreators.map((creator) => (
                <div key={creator?.id} className="relative group/avatar flex-shrink-0">
                  <img
                    src={creator?.avatarUrl}
                    alt={creator?.name}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-900"
                    title={creator?.name}
                  />
                  <button
                    onClick={() => creator && onRemoveCreator(creator.id)}
                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-600 hover:bg-rose-700 text-white flex items-center justify-center text-[10px] opacity-0 group-hover/avatar:opacity-100 transition-opacity cursor-pointer"
                    title={`Remove ${creator?.name}`}
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={onClearAll}
              className="text-[11px] text-slate-400 hover:text-rose-400 underline underline-offset-2 transition-colors cursor-pointer self-start sm:self-center"
            >
              Clear
            </button>
          </div>

          {/* Center: Live Real-time Projections */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-6 py-2 px-3 sm:px-4 rounded-xl bg-slate-900/80 border border-slate-800 w-full lg:w-auto text-center sm:text-left">
            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Total Budget
              </span>
              <span className="text-sm sm:text-base font-extrabold text-emerald-400">
                {formatEur(totalSpend)}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Est. Reach
              </span>
              <span className="text-sm sm:text-base font-extrabold text-blue-400">
                {formatNumber(totalImpressions)}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Est. Leads
              </span>
              <span className="text-sm sm:text-base font-extrabold text-indigo-400">
                ~{totalLeads}
              </span>
            </div>

            <div className="hidden sm:block">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">
                Blended CPM
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-300">
                €{blendedCpm.toFixed(1)}
              </span>
            </div>
          </div>

          {/* Right: Launch Button */}
          <div className="flex items-center gap-2 w-full lg:w-auto">
            <button
              onClick={handleLaunch}
              disabled={isLaunching}
              className="w-full lg:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-50"
              style={{
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                boxShadow: '0 4px 15px rgba(37, 99, 235, 0.4)',
              }}
            >
              {isLaunching ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Configuring Campaign...</span>
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  <span>Launch Campaign</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
