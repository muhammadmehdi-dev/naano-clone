import type { Config } from 'tailwindcss';

/**
 * tailwind.config.ts
 *
 * Tailwind v4 still reads this for IDE intellisense, plugins, and
 * content scanning. The authoritative design tokens live in
 * `src/app/globals.css` via the `@theme` directive.
 *
 * Colors extracted from live naano.com (light) and translated to
 * our premium dark-mode B2B SaaS aesthetic.
 */
const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Extracted & translated from naano.com ────────────────────
      colors: {
        // Canvas / backgrounds (dark clone)
        bg: {
          base:     '#0a0f1e', // naano light: #f8fafc sky-mesh → dark: deep navy
          surface:  '#111827', // naano card white → dark: gray-900
          elevated: '#1a2235', // slightly lifted surface
          overlay:  '#1f2d47', // modals / dropdowns
        },
        // Borders (naano uses slate-200/80 → dark clone)
        border: {
          subtle:   '#1e293b',
          default:  '#2d3f5c',
          strong:   '#3b5270',
        },
        // Text (naano slate-950 / slate-600 → flipped)
        text: {
          primary:   '#f1f5f9', // naano: #090d16 → flipped
          secondary: '#94a3b8', // naano: #475569 → muted
          muted:     '#475569',
        },
        // naano.com black CTA → our blue/indigo gradient CTA
        accent: {
          blue:    '#3b82f6', // primary interaction color
          indigo:  '#6366f1', // secondary / gradient end
          glow:    '#60a5fa', // glow / highlight
          purple:  '#8b5cf6',
          emerald: '#10b981', // live / active states
          amber:   '#f59e0b', // warnings / budget
          rose:    '#f43f5e', // negative / error
        },
        // naano.com match score blue → kept
        naano: {
          blue:      '#2563eb', // naano.com brand blue
          navy:      '#090d16', // naano.com primary CTA bg
          skyLight:  '#e0f2fe', // naano.com page gradient
        },
      },

      // ── Typography (extracted from naano.com) ────────────────────
      fontFamily: {
        sans:  ['var(--font-geist-sans)', 'Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono:  ['var(--font-geist-mono)', 'JetBrains Mono', 'Fira Code', 'monospace'],
        // naano.com uses Inter / Plus Jakarta Sans
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },

      // ── Font sizes (naano.com scale) ─────────────────────────────
      fontSize: {
        // Hero H1: 48–72px, tight tracking, lh 1.08
        'hero':    ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '700' }],
        // Section H2
        'section': ['clamp(1.875rem, 4vw, 3rem)',  { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '700' }],
        // Card title
        'card-title': ['1.25rem',                  { lineHeight: '1.3',  fontWeight: '700' }],
        // Metric number
        'metric': ['clamp(1.875rem, 3vw, 2.25rem)', { lineHeight: '1',   fontWeight: '700' }],
        // Badge
        'badge':  ['0.6875rem',                    { lineHeight: '1',    letterSpacing: '0.08em', fontWeight: '600' }],
      },

      // ── Border radius (naano.com: 16px cards, pill buttons) ──────
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        // naano uses rounded-2xl (16px) and rounded-3xl (24px) for cards
        // rounded-full for buttons and badges
      },

      // ── Box shadows ───────────────────────────────────────────────
      boxShadow: {
        // naano.com card shadow (on light)
        'card-light': '0 8px 30px rgba(0, 0, 0, 0.04)',
        // Our dark clone equivalents
        'card-dark':  '0 4px 24px rgba(0, 0, 0, 0.3)',
        'glow-blue':  '0 0 20px rgba(59, 130, 246, 0.3), 0 0 40px rgba(59, 130, 246, 0.1)',
        'glow-indigo':'0 0 20px rgba(99, 102, 241, 0.3), 0 0 40px rgba(99, 102, 241, 0.1)',
        'cta-glow':   '0 4px 20px rgba(59, 130, 246, 0.4)',
        // naano.com match score badge glow
        'match-badge':'0 0 8px rgba(37, 99, 235, 0.25)',
      },

      // ── Backdrop blur (glassmorphism) ─────────────────────────────
      // naano.com: backdrop-blur-md (12px) on cards and navbar
      backdropBlur: {
        xs: '4px',
        sm: '8px',
        md: '12px',  // naano.com standard
        lg: '16px',  // our heavy glass effect
        xl: '20px',
        '2xl': '24px',
      },

      // ── Animations ────────────────────────────────────────────────
      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(59, 130, 246, 0.4)' },
          '50%':       { boxShadow: '0 0 20px rgba(59, 130, 246, 0.8), 0 0 40px rgba(59, 130, 246, 0.3)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'fade-in-up':      'fade-in-up 0.5s ease forwards',
        'fade-in':         'fade-in 0.3s ease forwards',
        'pulse-glow':      'pulse-glow 2s ease-in-out infinite',
        'shimmer':         'shimmer 2s linear infinite',
        'slide-in-right':  'slide-in-right 0.4s ease forwards',
      },

      // ── Grid templates (marketplace card grid) ───────────────────
      // naano.com: 3-col auto-fill cards, ~320px min
      gridTemplateColumns: {
        'marketplace': 'repeat(auto-fill, minmax(300px, 1fr))',
        'campaigns':   'repeat(auto-fill, minmax(360px, 1fr))',
      },

      // ── Transition timing ─────────────────────────────────────────
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
