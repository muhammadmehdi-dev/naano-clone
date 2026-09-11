// ─── Creator Types ──────────────────────────────────────────────────────────

export type Niche = 'B2B SaaS' | 'DevRel & AI' | 'Fintech' | 'GTM & Sales';

export type CampaignStatus = 'Draft' | 'Active' | 'Completed';

export interface SamplePost {
  text: string;
  likes: number;
  impressions: number;
  comments: number;
  reposts: number;
  postedAt: string; // ISO date string
}

export interface Creator {
  id: string;
  name: string;
  handle: string;       // LinkedIn handle e.g. "@marcus-taylor"
  avatarUrl: string;
  headline: string;     // LinkedIn headline / one-liner
  niche: Niche;
  location: string;
  followers: number;
  fitScore: number;     // 0–100 AI fit score
  basePriceEur: number; // per sponsored post in EUR
  avgImpressions: number;
  ctrPercent: number;   // click-through rate as percentage
  engagementRate: number; // % engagement rate
  audienceB2BPercent: number; // % of audience that is B2B decision-makers
  avgLeadsPerPost: number;
  samplePosts: SamplePost[];
  tags: string[];       // content topics e.g. ["PLG", "SaaS Metrics", "Pricing"]
  verified: boolean;
  responseTimeHours: number; // avg hours to respond to briefs
}

// ─── Campaign Types ──────────────────────────────────────────────────────────

export type CampaignGoal =
  | 'Brand Awareness'
  | 'Lead Generation'
  | 'Product Launch'
  | 'Thought Leadership'
  | 'Pipeline Acceleration';

export interface CampaignCreatorAllocation {
  creatorId: string;
  allocatedBudgetEur: number;
  postsPlanned: number;
  postsDelivered: number;
  impressionsDelivered: number;
  clicksDelivered: number;
  leadsAttributed: number;
  status: 'Pending' | 'Brief Sent' | 'In Progress' | 'Delivered' | 'Approved';
}

export interface Campaign {
  id: string;
  title: string;
  goal: CampaignGoal;
  budgetEur: number;
  status: CampaignStatus;
  startDate: string;
  endDate: string;
  selectedCreators: string[]; // array of Creator ids
  allocations: CampaignCreatorAllocation[];
  brief: string;
  targetAudience: string;
  // Aggregate attribution metrics
  totalSpend: number;
  totalImpressions: number;
  totalClicks: number;
  totalLeads: number;
  cplEur: number; // cost per lead
  cpmEur: number; // cost per mille impressions
  roas: number;   // return on ad spend (estimated pipeline value / spend)
}

// ─── App State Types ─────────────────────────────────────────────────────────

export interface AppState {
  creators: Creator[];
  campaigns: Campaign[];
  selectedCreatorIds: string[];
  activeCampaignId: string | null;
  isDemoMode: boolean;
}

export interface FilterState {
  niche: Niche | 'All';
  minFollowers: number;
  maxPriceEur: number;
  minFitScore: number;
  sortBy: 'fitScore' | 'followers' | 'ctrPercent' | 'avgImpressions' | 'basePriceEur';
  sortOrder: 'asc' | 'desc';
}
