'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Zap,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  Layers,
  ChevronDown,
  Quote,
  Eye,
  MousePointerClick,
  UserCheck,
  Check,
  Globe2,
  Lock,
} from 'lucide-react';
import MarketplaceSection from '@/components/marketplace/MarketplaceSection';
import { formatNumber } from '@/lib/mock-data';

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const workflowSteps = [
    {
      num: '01',
      title: 'Find creators your buyers trust',
      desc: 'Filter by B2B niche, verified LinkedIn metrics, audience demographics, and proprietary AI Fit Score matching your exact ICP.',
      tag: 'Discovery & Matching',
    },
    {
      num: '02',
      title: 'Build a campaign brief in minutes',
      desc: 'Set campaign goals, product angles, UTM attribution links, and creative guidelines in a standardized collaborative brief.',
      tag: 'Brief Builder',
    },
    {
      num: '03',
      title: 'Manage every collaboration',
      desc: 'Review post copy drafts, request edits, set scheduled publication slots, and coordinate approvals all in one streamlined workflow.',
      tag: 'Workflow & Content',
    },
    {
      num: '04',
      title: 'Track reach, clicks, and leads',
      desc: 'Real-time dashboard with server-side cookie attribution tracking post-level impressions, click-throughs, trials, and pipeline CAC.',
      tag: 'Attribution & Analytics',
    },
    {
      num: '05',
      title: 'Pay creators without the admin',
      desc: 'Consolidated monthly invoicing, escrow protection, and compliant international payouts across 100+ countries with zero tax hassle.',
      tag: 'Automated Payments',
    },
  ];

  const postShowcases = [
    {
      creator: 'Thomas Higadère',
      handle: '@thigadere',
      role: 'Head of Growth',
      sponsor: 'lemlist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=96&h=96&fit=crop&crop=face',
      impressions: 42800,
      clicks: 312,
      leads: 18,
      text: 'Outbound sales isn\'t dead — generic spam is. We analyzed 1.2M cold emails sent via lemlist last month. The top 1% all do this one specific personalisation hook 🧵',
    },
    {
      creator: 'Marina Panova',
      handle: '@marina-panova',
      role: 'Creative Tech Lead',
      sponsor: 'Abyssale',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&h=96&fit=crop&crop=face',
      impressions: 100000,
      clicks: 1600,
      leads: 320,
      text: 'How design teams at Figma & Canva automate 10,000+ localized ad variations with dynamic creative templates. Full technical breakdown and Figma token workflow:',
    },
    {
      creator: 'Eric Djavid',
      handle: '@eric-djavid',
      role: 'B2B Sales Advisor',
      sponsor: 'LEADBAY',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=face',
      impressions: 20000,
      clicks: 350,
      leads: 80,
      text: 'The CFO objection guide: 5 slide deck templates to get enterprise software deals approved before end of Q4. Save this for your next executive review.',
    },
  ];

  const faqs = [
    {
      q: 'What is Naano?',
      a: 'Naano is the premier B2B LinkedIn creator marketplace. Companies discover, collaborate with, and track vetted B2B industry creators for sponsored LinkedIn campaigns — each at a transparent, fixed price per post set by the creator.',
    },
    {
      q: 'How does pricing work for creator posts?',
      a: 'Every creator sets their own transparent rate per post (starting around €84 up to €4,000+ depending on audience tier and specialty). You only pay when deliverables are approved. Self-serve platform access is 100% free with no monthly subscription.',
    },
    {
      q: 'How does attribution and lead tracking work?',
      a: 'Naano generates unique, branded attribution links with UTM parameters for every creator. Our live tracking engine records clicks, conversion timestamps, and integrates with your CRM (HubSpot, Salesforce, Segment) to attribute pipeline directly to creator posts.',
    },
    {
      q: 'How are creators vetted on Naano?',
      a: 'Every creator undergoes rigorous verification: minimum 70% B2B decision-maker audience composition, verified LinkedIn post analytics, authentic engagement rates, and professional industry standing.',
    },
    {
      q: 'Can I launch campaigns in specific countries or languages?',
      a: 'Yes. Naano hosts creators across 100+ countries with strong presence across North America, the UK, Germany (DACH), France, and pan-European B2B tech ecosystems.',
    },
  ];

  const brandLogos = [
    'La Growth Machine',
    'gojiberry',
    'ChatSEO',
    'Abyssale',
    'BlogSEO',
    'lemlist',
    'Spendesk',
    'Personio',
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* ── 1. Hero Section ─────────────────────────────────────────────── */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/15 blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-indigo-600/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-900/90 text-slate-300 border border-slate-700/80 shadow-inner mb-6 hover:border-blue-500/50 transition-colors">
            <span className="font-bold text-blue-400">𝕏 in</span>
            <span className="w-1 h-1 rounded-full bg-slate-500" />
            <span>Where B2B brands work with creators</span>
            <ArrowRight size={13} className="text-slate-400" />
          </div>

          {/* Main H1 */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.08]">
            The B2B LinkedIn <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-500 bg-clip-text text-transparent">
              Creator Marketplace.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            Find the creators your buyers already trust, launch campaigns in days, and track the
            clicks, leads and pipeline generated by every post.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <a
              href="#marketplace"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm text-white shadow-xl shadow-blue-600/25 hover:shadow-blue-600/40 transition-all duration-200"
              style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
            >
              <span>Launch a campaign</span>
              <ArrowRight size={16} />
            </a>

            <Link
              href="/campaigns/demo"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-full font-bold text-sm text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all duration-200"
            >
              <Zap size={15} className="text-amber-400 fill-amber-400" />
              <span>⚡ Instant Demo Dashboard</span>
            </Link>

            <a
              href="#how-it-works"
              className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-6 py-4 rounded-full text-sm font-medium text-slate-300 hover:text-white transition-colors"
            >
              <span>See how Naano works</span>
              <ArrowRight size={14} />
            </a>
          </div>

          {/* Trust Banner & Logo Strip */}
          <div className="pt-8 border-t border-slate-800/80">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
              🛡 Trusted by modern B2B teams
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
              {brandLogos.map((brand) => (
                <span
                  key={brand}
                  className="text-sm sm:text-base font-bold text-slate-300 tracking-tight hover:text-white transition-colors"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Quote Banner ─────────────────────────────────────────────── */}
      <section className="py-12 border-y border-slate-800/80 bg-slate-950/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Quote size={24} className="text-blue-500 mx-auto mb-4 opacity-75" />
          <blockquote className="text-lg sm:text-2xl font-medium text-slate-200 leading-snug mb-4">
            &ldquo;We manage €10M+ of influence budget every year. For B2B, Naano simply makes our
            life easier.&rdquo;
          </blockquote>
          <p className="text-xs sm:text-sm text-slate-400">
            <strong className="text-white">David Zmirov</strong> — CEO, Zmirov Communication ·
            Influence agency
          </p>
        </div>
      </section>

      {/* ── 3. Creator Marketplace (Core Discovery Engine) ──────────────── */}
      <MarketplaceSection />

      {/* ── 4. 5-Step Workflow Section ─────────────────────────────────── */}
      <section id="how-it-works" className="py-20 md:py-28 border-t border-slate-800/80 bg-slate-950/60 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 mb-4">
              End-to-End Operating System
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Run creator campaigns from one place.
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Find the right voices, launch faster, and connect every post to measurable business results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflowSteps.map((step) => (
              <div
                key={step.num}
                className="group relative rounded-2xl p-6 bg-slate-900/60 border border-slate-800 hover:border-blue-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-blue-500/50 group-hover:text-blue-400 transition-colors mb-3">
                    {step.num}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-2">
                    {step.tag}
                  </span>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center text-[11px] font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                  <span>Learn more</span>
                  <ArrowRight size={12} className="ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Case Study & Live Post Showcase ─────────────────────────── */}
      <section className="py-20 md:py-28 border-t border-slate-800/80 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Case Study Header Card */}
          <div
            className="rounded-3xl p-8 md:p-12 mb-16 border relative overflow-hidden"
            style={{
              background: 'linear-gradient(145deg, rgba(17, 24, 39, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
              borderColor: 'rgba(59, 130, 246, 0.3)',
            }}
          >
            <div className="max-w-3xl">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-4 inline-block">
                Case Study · BlogSEO
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Real teams. Measurable pipeline.
              </h2>
              <blockquote className="text-base sm:text-xl text-slate-200 italic mb-6 leading-relaxed">
                &ldquo;Naano became one of our fastest acquisition channels. We know exactly what
                every creator brings to the table.&rdquo;
              </blockquote>
              <p className="text-xs sm:text-sm text-slate-400 mb-8">
                <strong className="text-white">Vincent Josse</strong> — CEO & Founder, BlogSEO
              </p>

              {/* Stat Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800 text-center sm:text-left">
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-white block">9</span>
                  <span className="text-xs text-slate-400">Creators Activated</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-blue-400 block">2,940</span>
                  <span className="text-xs text-slate-400">Qualified Clicks</span>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">512</span>
                  <span className="text-xs text-slate-400">Trials Started</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section: Live Performance Post Cards */}
          <div className="mb-10 text-center">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
              Verified Attribution In Action
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Real LinkedIn posts. Attributed results.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {postShowcases.map((post, idx) => (
              <div
                key={idx}
                className="rounded-2xl p-5 bg-slate-900/70 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={post.avatar}
                        alt={post.creator}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <span className="text-sm font-semibold text-white block">{post.creator}</span>
                        <span className="text-xs text-slate-400">{post.handle}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {post.sponsor}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed mb-4">
                    {post.text}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Reach</span>
                    <span className="text-xs font-bold text-white">{formatNumber(post.impressions)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Clicks</span>
                    <span className="text-xs font-bold text-blue-400">{post.clicks}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Leads</span>
                    <span className="text-xs font-bold text-emerald-400">{post.leads}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Aggregate Stats Banner ─────────────────────────────────── */}
      <section className="py-16 border-y border-slate-800/80 bg-slate-950/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4">
              <div className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-1">
                5M+
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Impressions Generated</p>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-5xl font-black text-blue-400 tracking-tight mb-1">
                30K+
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Attributed Leads</p>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-5xl font-black text-indigo-400 tracking-tight mb-1">
                2,000+
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Vetted Creators</p>
            </div>
            <div className="p-4">
              <div className="text-3xl sm:text-5xl font-black text-emerald-400 tracking-tight mb-1">
                5K+
              </div>
              <p className="text-xs sm:text-sm text-slate-400 font-medium">Posts Published</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Pricing Section ─────────────────────────────────────────── */}
      <section id="pricing" className="py-20 md:py-28 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 mb-4">
              Transparent Pricing
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
              Pricing.
            </h2>
            <p className="text-base sm:text-lg text-slate-300">
              Start free. Upgrade when you want your time back.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Self-Serve Card */}
            <div className="rounded-3xl p-8 bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Self-Serve
                </span>
                <p className="text-sm text-slate-300 mt-1 mb-4">Run it yourself.</p>
                <div className="text-4xl font-extrabold text-white mb-6">
                  €0 <span className="text-base font-normal text-slate-400">/ month</span>
                </div>

                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-blue-400" />
                    <span>Access 3,000+ vetted B2B LinkedIn creators</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-blue-400" />
                    <span>Direct brief submission & message threads</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-blue-400" />
                    <span>Standard UTM tracking & live attribution links</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-blue-400" />
                    <span>Pay only creator post fees with escrow protection</span>
                  </li>
                </ul>
              </div>

              <a
                href="#marketplace"
                className="w-full py-3.5 px-4 rounded-xl text-center font-bold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/10 transition-colors"
              >
                Start free →
              </a>
            </div>

            {/* Managed Campaigns Card */}
            <div
              className="rounded-3xl p-8 border relative flex flex-col justify-between"
              style={{
                background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)',
                borderColor: 'rgba(59, 130, 246, 0.6)',
                boxShadow: '0 0 30px rgba(59, 130, 246, 0.15)',
              }}
            >
              <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[11px] font-bold bg-blue-600 text-white">
                RECOMMENDED FOR TEAMS
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                  Managed Campaigns
                </span>
                <p className="text-sm text-slate-300 mt-1 mb-4">Get your time back.</p>
                <div className="text-4xl font-extrabold text-white mb-6">
                  Custom quote
                </div>

                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-400" />
                    <span>Dedicated B2B creator strategist & campaign architect</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-400" />
                    <span>Custom ICP creator sourcing, outreach & negotiation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-400" />
                    <span>Full copy review, creative direction & angle testing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-400" />
                    <span>Custom CRM integration (HubSpot/Salesforce)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-emerald-400" />
                    <span>Consolidated enterprise invoicing & performance guarantee</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/campaigns/demo"
                className="w-full py-3.5 px-4 rounded-xl text-center font-bold text-sm text-white transition-all shadow-lg shadow-blue-600/30"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
              >
                Book a strategy call →
              </Link>
            </div>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6 flex items-center justify-center gap-2">
            <Lock size={13} />
            <span>Campaign spend is separate. No lock-in. Cancel anytime.</span>
          </p>
        </div>
      </section>

      {/* ── 8. Interactive FAQ Accordion ───────────────────────────────── */}
      <section id="faq" className="py-20 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white tracking-tight mb-2">
              Frequently asked questions.
            </h2>
            <p className="text-sm text-slate-400">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-800/80 bg-slate-900/60 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-sm text-white hover:text-blue-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform duration-200 ${
                      openFaq === idx ? 'rotate-180 text-blue-400' : 'text-slate-400'
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Final CTA Banner ────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-3xl p-8 sm:p-14 text-center border relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(79, 70, 229, 0.1) 100%)',
              borderColor: 'rgba(59, 130, 246, 0.4)',
            }}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-blue-400 block mb-3">
              READY TO LAUNCH?
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Your next creator campaign starts here.
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8">
              Get a clear creator strategy, campaign format and estimated budget for your next launch.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#marketplace"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-white shadow-lg transition-all"
                style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
              >
                Explore Marketplace →
              </a>
              <Link
                href="/campaigns/demo"
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-bold text-sm text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-colors"
              >
                View Live Demo Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10. Footer ─────────────────────────────────────────────────── */}
      <footer className="py-12 border-t border-slate-800 bg-slate-950 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="w-6 h-6 rounded-lg flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)' }}
                >
                  <Zap size={12} className="text-white" fill="white" />
                </div>
                <span className="text-base font-bold text-white tracking-tight">naano</span>
              </div>
              <p className="text-xs text-slate-400 max-w-sm mb-4 leading-relaxed">
                The B2B LinkedIn Creator Performance Platform. Discover vetted voices, book campaigns, and track measurable revenue attribution.
              </p>
              <div className="flex items-center gap-3 text-slate-400">
                <span className="hover:text-white cursor-pointer">LinkedIn</span>
                <span>·</span>
                <span className="hover:text-white cursor-pointer">Twitter/X</span>
                <span>·</span>
                <span className="hover:text-white cursor-pointer">Status</span>
              </div>
            </div>

            <div>
              <span className="font-semibold text-white block mb-3">Product</span>
              <ul className="space-y-2">
                <li><a href="#marketplace" className="hover:text-white">Marketplace</a></li>
                <li><Link href="/campaigns" className="hover:text-white">Campaigns</Link></li>
                <li><Link href="/campaigns/demo" className="hover:text-white">Live Attribution</Link></li>
                <li><Link href="/analytics" className="hover:text-white">Analytics</Link></li>
              </ul>
            </div>

            <div>
              <span className="font-semibold text-white block mb-3">Solutions</span>
              <ul className="space-y-2">
                <li><span className="hover:text-white cursor-pointer">For Companies</span></li>
                <li><span className="hover:text-white cursor-pointer">For Creators</span></li>
                <li><span className="hover:text-white cursor-pointer">For Agencies</span></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
              </ul>
            </div>

            <div>
              <span className="font-semibold text-white block mb-3">Legal</span>
              <ul className="space-y-2">
                <li><span className="hover:text-white cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-white cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-white cursor-pointer">Cookie Preferences</span></li>
                <li><span className="hover:text-white cursor-pointer">Security</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <div>
              © {new Date().getFullYear()} Naano Technologies Inc. All rights reserved.
            </div>
            <div>
              Designed for high-growth B2B marketing teams.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
