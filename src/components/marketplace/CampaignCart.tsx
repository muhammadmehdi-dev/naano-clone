'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, X, Sparkles } from 'lucide-react';
import { MOCK_CREATORS, formatNumber } from '@/lib/mock-data';

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

  if (selectedCreatorIds.length === 0) return null;

  const selectedCreators = selectedCreatorIds
    .map((id) => MOCK_CREATORS.find((c) => c.id === id))
    .filter(Boolean);

  const totalSpend = selectedCreators.reduce((sum, c) => sum + (c?.basePriceEur ?? 0), 0);
  const totalImpressions = selectedCreators.reduce((sum, c) => sum + (c?.avgImpressions ?? 0), 0);
  const totalLeads = selectedCreators.reduce((sum, c) => sum + (c?.avgLeadsPerPost ?? 0), 0);

  function handleLaunch() {
    setIsLaunching(true);
    setTimeout(() => {
      router.push('/campaigns/camp-001');
    }, 400);
  }

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 p-4 pointer-events-none flex justify-center">
      <div className="w-full max-w-4xl rounded-full bg-white/95 backdrop-blur-md px-6 py-3.5 shadow-2xl border border-slate-200/90 pointer-events-auto flex items-center justify-between gap-4 animate-in slide-in-from-bottom-4 duration-200">
        {/* Left: Creator Avatars */}
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2">
            {selectedCreators.map((c) => (
              <div key={c?.id} className="relative group/avatar">
                <img
                  src={c?.avatarUrl}
                  alt={c?.name}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  title={c?.name}
                />
                <button
                  type="button"
                  onClick={() => c && onRemoveCreator(c.id)}
                  className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-rose-500 text-white flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity"
                >
                  <X size={8} />
                </button>
              </div>
            ))}
          </div>

          <div>
            <span className="text-xs font-bold text-[#090d16] block">
              {selectedCreators.length} creator{selectedCreators.length > 1 ? 's' : ''} booked
            </span>
            <button
              type="button"
              onClick={onClearAll}
              className="text-[11px] text-slate-400 hover:text-slate-600 underline"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Center: Realtime Stats */}
        <div className="hidden sm:flex items-center gap-8 text-center">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Total Budget
            </span>
            <span className="text-sm font-extrabold text-[#090d16]">€{totalSpend}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Est. Views
            </span>
            <span className="text-sm font-extrabold text-blue-600">
              {formatNumber(totalImpressions)}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">
              Est. Leads
            </span>
            <span className="text-sm font-extrabold text-emerald-600">~{totalLeads}</span>
          </div>
        </div>

        {/* Right: Black Pill Action */}
        <button
          type="button"
          onClick={handleLaunch}
          disabled={isLaunching}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold text-white bg-[#090d16] hover:bg-slate-800 shadow-md transition-all cursor-pointer disabled:opacity-50 flex-shrink-0"
        >
          {isLaunching ? (
            <span>Setting up...</span>
          ) : (
            <>
              <Sparkles size={13} className="text-blue-400" />
              <span>Launch Campaign</span>
              <ArrowRight size={13} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
