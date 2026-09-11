import React from 'react';
import type { Metadata } from 'next';
import MarketplaceSection from '@/components/marketplace/MarketplaceSection';

export const metadata: Metadata = {
  title: 'Marketplace — naano B2B LinkedIn Creators',
  description:
    'Discover and book 3,000+ vetted B2B LinkedIn creators across SaaS, AI, Fintech, and GTM. Compare audience fit scores and median views.',
};

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100">
      <div className="pt-8">
        <MarketplaceSection />
      </div>
    </div>
  );
}
