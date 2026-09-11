import { redirect } from 'next/navigation';

/**
 * /campaigns/demo
 *
 * Instantly redirects to the first pre-seeded active campaign (camp-001)
 * so reviewers and demo viewers see a fully-populated dashboard without
 * needing to navigate or set up anything.
 *
 * Also triggered by the "⚡ Instant Demo Mode" Navbar button which links here.
 */
export default function DemoPage() {
  redirect('/campaigns/camp-001');
}
