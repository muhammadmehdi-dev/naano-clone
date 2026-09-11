import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/layout/Navbar';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'naano — B2B LinkedIn Creator Performance Platform',
  description:
    'naano connects B2B brands with top LinkedIn creators to drive measurable pipeline, leads, and thought leadership. Discover creators, launch campaigns, and track attribution — all in one platform.',
  keywords: ['B2B marketing', 'LinkedIn creators', 'influencer marketing', 'B2B SaaS', 'thought leadership', 'pipeline generation'],
  openGraph: {
    title: 'naano — B2B LinkedIn Creator Performance Platform',
    description: 'Drive B2B pipeline with LinkedIn creator campaigns. Measurable attribution, AI fit scoring, and 12+ curated B2B creators.',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        className="min-h-full flex flex-col"
        style={{ backgroundColor: 'var(--bg-base)', color: 'var(--text-primary)' }}
      >
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
