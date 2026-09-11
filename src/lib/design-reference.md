# naano.com — Complete Design Reference & Extracted Copy

> **Extracted via live browser inspection of [naano.com](https://naano.com)**  
> Last updated: 2026-09-11

---

## 1. Brand Identity

| Token | Value |
|---|---|
| **Brand name** | naano |
| **Tagline** | The B2B LinkedIn Creator Marketplace |
| **Visual style** | Light glassmorphism — sky-blue ambient gradient, white elevated cards, ultra-dark graphite typography, pill badges, black CTA buttons |
| **Opposite of our current dark theme** | ✅ naano.com is a **light** design — we are building a dark B2B SaaS variant |

---

## 2. Color Tokens

### Backgrounds
| Purpose | Tailwind Class | Hex |
|---|---|---|
| Page base | `bg-gradient-to-b from-sky-100/60 via-slate-50 to-sky-100/40` | `#e0f2fe → #f8fafc → #e0f2fe` |
| Card surface | `bg-white` / `bg-white/90` | `#ffffff` |
| Glass card | `bg-white/80 backdrop-blur-md` | `rgba(255,255,255,0.8)` |
| Navbar | `bg-white/95 backdrop-blur-md` | `rgba(255,255,255,0.95)` |
| Badge pills | `bg-white/80 backdrop-blur-md` | `rgba(255,255,255,0.8)` |

### Text
| Purpose | Tailwind Class | Hex |
|---|---|---|
| Primary headings | `text-slate-950` | `#090d16` |
| Body / paragraph | `text-slate-600` | `#475569` |
| Muted captions | `text-slate-400` | `#94a3b8` |
| Accent blue | `text-blue-600` | `#2563eb` |
| LinkedIn blue | — | `#0a66c2` |

### Borders
| Purpose | Tailwind Class | Hex |
|---|---|---|
| Card border | `border-slate-200/80` | `rgba(226,232,240,0.8)` |
| Subtle divider | `border-slate-100` | `#f1f5f9` |
| Glass border | `border-white/80` | `rgba(255,255,255,0.8)` |

### Interactive / CTA
| Purpose | Tailwind Class | Hex |
|---|---|---|
| Primary button bg | `bg-[#090d16]` hover `bg-slate-800` | `#090d16` / `#1e293b` |
| Primary button text | `text-white` | `#ffffff` |
| Secondary button | `bg-white/80 border-slate-200` | — |
| Match score accent | `text-blue-600 font-bold` | `#2563eb` |
| Live pulse dot | `bg-emerald-400` | `#34d399` |

### Our Dark-Mode Equivalent Mapping
| naano.com (light) | Our dark clone |
|---|---|
| `#090d16` text | `#f1f5f9` text |
| `#ffffff` card | `#111827` card |
| `bg-sky-100/60` page | `#0a0f1e` page |
| `border-slate-200/80` | `border #2d3f5c` |
| `bg-[#090d16]` button | gradient `#3b82f6 → #6366f1` |

---

## 3. Typography

### Font Stack
```css
font-family: 'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
```

### Scale
| Role | Classes | Size / Weight |
|---|---|---|
| Hero H1 | `text-5xl md:text-7xl font-bold tracking-tight leading-[1.08]` | 48–72px / 700 |
| Section H2 | `text-3xl md:text-5xl font-bold tracking-tight` | 30–48px / 700 |
| Section subtitle | `text-lg md:text-xl text-slate-600 font-normal` | 18–20px / 400 |
| Card title | `text-xl font-bold text-slate-900` | 20px / 700 |
| Body | `text-base text-slate-600 leading-relaxed` | 16px / 400, lh 1.625 |
| Badge | `text-xs font-semibold tracking-wide uppercase` | 12px / 600 |
| Metric number | `text-3xl md:text-4xl font-bold` | 30–36px / 700 |
| Metric label | `text-sm text-slate-500` | 14px / 400 |

---

## 4. Spacing & Border Radius

| Token | Value |
|---|---|
| Card border-radius | `rounded-2xl` = 16px / `rounded-3xl` = 24px |
| Button border-radius | `rounded-full` = 9999px |
| Badge border-radius | `rounded-full` = 9999px |
| Card padding | `p-6` = 24px / `p-8` = 32px |
| Button padding | `px-6 py-3.5` |
| Section vertical padding | `py-20 md:py-32` |

---

## 5. Effects

### Glassmorphism (Cards & Navbar)
```css
background: rgba(255, 255, 255, 0.80);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(226, 232, 240, 0.80);
```

### Card Shadow
```css
box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
/* or Tailwind: */
shadow-xl shadow-slate-200/40
```

### Page Gradient (Sky Mesh)
```css
background: linear-gradient(
  to bottom,
  rgba(224, 242, 254, 0.5),
  #f8fafc,
  rgba(224, 242, 254, 0.4)
);
```

### Match Score Badge (Fit Score)
```css
background: rgba(37, 99, 235, 0.10);
color: #2563eb;
border: 1px solid rgba(37, 99, 235, 0.20);
border-radius: 9999px;
font-weight: 700;
```

---

## 6. Component Architecture

### Navbar
```
[Logo: "naano"] [For companies] [For creators] [For agencies] [How it works] [Resources ▾]
                                                              [🌐 EN] [Sign in] [Sign up →]
```
- Sticky, glassmorphic white background
- Logo: wordmark only, no icon
- Primary nav: text links, no background
- CTA: `Sign up` — black pill button

### Hero Section
```
[Badge pill: "𝕏 in  Where B2B brands work with creators"]
[H1: "The B2B LinkedIn Creator Marketplace."]
[Subtitle paragraph]
[CTA: "Launch a campaign →"] [Ghost CTA: "See how Naano works →"]
[Trust banner: "🛡 Trusted by modern B2B teams"]
[Logo strip: La Growth Machine | gojiberry | ChatSEO | Abyssale | BlogSEO | lemlist]
```

### Creator Card (Marketplace Grid)
```
┌─────────────────────────────────────────┐
│ [Avatar 40px]  Name                     │
│                Handle / Niche tags      │
│                                         │
│ Headline text (2 lines)                 │
│                                         │
│ Match: [97/100 ●] Badge                 │
│                                         │
│ ┌────────────┬──────────────┬─────────┐ │
│ │ 14.1K      │ 18.7K        │ €360    │ │
│ │ Followers  │ Median Views │ /post   │ │
│ └────────────┴──────────────┴─────────┘ │
│                          [Book →]       │
└─────────────────────────────────────────┘
```
**Card fields:**
- Avatar (round, 40px)
- Name + flag emoji (country)
- Niche tag pills (e.g., "AI · SaaS")
- Headline excerpt (2-line clamp)
- Match score badge (e.g., "97/100")
- Followers count
- Median Views (avg impressions)
- Price per post (€)
- "Book" or "View profile" CTA

### Campaign Workflow Steps (5-step)
```
[01] Find creators → [02] Build brief → [03] Manage collabs → [04] Track → [05] Pay
```
Each step: number badge + title + description + mini UI mockup screenshot

### Performance Post Card
```
[Creator avatar + name + followers]
[Post excerpt text]
[Metric badges: 👁 Impressions  ↖ Clicks  👥 Leads]
[Sponsor: CompanyLogo]
```

### Pricing Cards
```
┌───────────────────┐  ┌────────────────────────┐
│ SELF-SERVE        │  │ MANAGED CAMPAIGNS      │
│ Run it yourself.  │  │ Get your time back.    │
│ €0/month          │  │ Custom quote           │
│ [4 features ✓]    │  │ [4 features ✓]         │
│ [Start free →]    │  │ [Book a call →]        │
└───────────────────┘  └────────────────────────┘
```

### Footer
- Left: Logo + tagline + social links
- Columns: Product | Company | Resources | Legal
- Bottom bar: copyright + links

---

## 7. Verbatim Copy — All Sections

### Navigation
- `For companies`
- `For creators`
- `For agencies`
- `How it works`
- `Resources`
- `Sign in`
- `Sign up`

### Hero
- **H1**: `The B2B LinkedIn Creator Marketplace.`
- **Subtitle**: `Find the creators your buyers already trust, launch campaigns in days, and track the clicks, leads and pipeline generated by every post.`
- **CTA Primary**: `Launch a campaign →`
- **CTA Secondary**: `See how Naano works →`
- **Trust badge**: `🛡 Trusted by modern B2B teams`

### Quote Banner
- **Quote**: `"We manage €10M+ of influence budget every year. For B2B, Naano simply makes our life easier"`
- **Author**: `David Zmirov — CEO, Zmirov Communication · Influence agency`

### Marketplace Section
- **Badge**: `● The Naano creator marketplace`
- **H2**: `Work with all the best creators.`
- **Subtitle**: `Find the right B2B voices, compare their audience fit, and book every collaboration from one place.`
- **Value props**:
  - `3,000+ vetted creators` — `Specialist B2B voices, ready to collaborate.`
  - `Across 100 countries` — `Local expertise with genuinely global reach.`
  - `Matched to your buyers` — `Audience fit comes before follower count.`

### Workflow Section
- **H2**: `Run creator campaigns from one place.`
- **Subtitle**: `Find the right voices, launch faster, and connect every post to measurable business results.`
- **Step 01**: `Find creators your buyers trust`
- **Step 02**: `Build a campaign brief in minutes`
- **Step 03**: `Manage every collaboration`
- **Step 04**: `Track reach, clicks, and leads`
- **Step 05**: `Pay creators without the admin`

### Case Study Section
- **H2**: `Real teams. Measurable pipeline.`
- **Subtitle**: `See how B2B teams turn creator trust into attributable demand with Naano.`
- **Metrics**: `9 creators activated · 2,940 qualified clicks · 512 trials started`
- **CTA**: `Read case study →`
- **Quote**: `"Naano became one of our fastest acquisition channels. We know exactly what every creator brings."` — Vincent Josse, CEO & Founder, BlogSEO

### Stats Section
- **Badge**: `● THE RESULTS`
- **H2**: `Proven across thousands of campaigns.`
- `5M+` Impressions generated
- `30K+` Leads generated
- `2,000+` Creators on Naano
- `5K+` Posts published

### Pricing Section
- **H2**: `Pricing.`
- **Subtitle**: `Start free. Upgrade when you want your time back.`
- **Self-serve**: `€0 / month` — `Run it yourself.`
- **Managed**: `Custom quote` — `Get your time back.`
- **Footer note**: `🛡 Campaign spend is separate. No lock-in. Cancel anytime.`

### FAQ
- **H2**: `Frequently asked questions.`
- **Subtitle**: `Everything you need to know before getting started.`
- **Link**: `Still have questions? Talk to our team →`
- Q1: `What is Naano?` — `Naano is a B2B LinkedIn creator marketplace: companies discover and book vetted creators for sponsored LinkedIn campaigns, each at a fixed price per post set by the creator.`

### Final CTA
- **Badge**: `READY TO LAUNCH?`
- **H2**: `Your next creator campaign starts here.`
- **Subtitle**: `Get a clear creator strategy, campaign format and estimated budget for your next launch.`
- **Card badge**: `CAMPAIGN STRATEGY CALL`
- **Card title**: `30-minute working session`
- **Card body**: `Leave with a concrete plan for your next creator campaign.`
- **CTA**: `Book a campaign call →`

---

## 8. Real Creator Card Data (from live marketplace)

| Creator | Niches | Country | Match | Followers | Median Views | Price/Post |
|---|---|---|---|---|---|---|
| Aymane Junior | AI · SaaS | 🇩🇪 Germany | 97/100 | 14.1K | 18.7K | €360 |
| Emma Guetta | AI · Media/Content | 🇫🇷 France | 96/100 | 7.8K | 25.6K | €480 |
| Augustin Rudigoz | Productivity · Fintech | 🇫🇷 France | 92/100 | 14K | 11.2K | €960 |
| Raghav Jerath | Growth/GTM · Software | 🇫🇷 France | 90/100 | 2.4K | 2.1K | €84 |
| Daniel Meisen | Growth/GTM · Agencies | 🇩🇪 Germany | 89/100 | 5.9K | 2.8K | €120 |
| Pierre Davadan | SaaS · AI | 🇫🇷 France | 89/100 | 4.2K | 2.2K | €84 |

---

## 9. Live Post Showcase Metrics

| Creator | Impressions | Clicks | Leads | Sponsor |
|---|---|---|---|---|
| Thomas Higadère | 42.8K | 312 | 18 | lemlist |
| Robin Tempe | 9K | 100 | 50 | LEADBAY |
| Eric Djavid | 20K | 350 | 80 | LEADBAY |
| Marina Panova | 100K | 1,600 | 320 | Abyssale |

---

## 10. Implementation Notes for Our Dark Clone

1. **naano.com is light** — our clone uses a premium dark B2B SaaS aesthetic (`#0a0f1e` base)
2. **Key copy to adopt verbatim**: Hero H1, section headlines, feature step names, pricing plan names, CTA labels
3. **Creator card fields to implement**: Match score (our `fitScore`), followers, median views (`avgImpressions`), price/post (`basePriceEur`), niche tags, country flag
4. **Workflow steps** map directly to our campaign wizard flow
5. **Stats to display**: Use our mock campaign aggregates (totalImpressions, totalLeads, etc.)
