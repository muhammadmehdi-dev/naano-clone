import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { MOCK_CAMPAIGNS, getCreatorById } from '@/lib/mock-data';
import CampaignDashboard from '@/components/campaigns/CampaignDashboard';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return MOCK_CAMPAIGNS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const campaign = MOCK_CAMPAIGNS.find((c) => c.id === id);
  if (!campaign) return { title: 'Campaign Not Found — naano' };
  return {
    title: `${campaign.title} — naano Campaign Analytics`,
    description: `Live attribution dashboard for "${campaign.title}". ${campaign.totalLeads} qualified leads, ${campaign.totalImpressions.toLocaleString()} impressions, ${campaign.roas}× ROAS.`,
  };
}

export default async function CampaignDetailPage({ params }: PageProps) {
  const { id } = await params;
  const campaign = MOCK_CAMPAIGNS.find((c) => c.id === id);

  if (!campaign) notFound();

  return <CampaignDashboard campaign={campaign} />;
}
