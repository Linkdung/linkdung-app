# Linkdung

> *Linktree clone with cartoon shadow aesthetics*

A full-featured link-in-bio platform — halftone patterns, cartoon shadows, bold typography, and a dark/light theme that hits different.

---

# Part 1 — About the App

## What is Linkdung?

Linkdung is a **link-in-bio platform** (a Linktree alternative) with a cartoon/comic aesthetic.
Users create a public profile page that collects their links and social media, with full
customization over colors, background, and theme.

It ships with two surfaces:

- **Public profile page** that visitors see.
- **Admin dashboard** where the owner manages links, profile, analytics, and appearance.

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **Nuxt** (Vue 3) | 4.3.1 | Full-stack Vue framework (SSR via Nitro) |
| **Tailwind CSS** | 3.x | Utility-first styling + custom design system |
| **Pinia** | 2.x | Client state management (+ persisted state) |
| **TanStack Query** | 5.x | Server state / caching |
| **Apollo Client** | 5.x (`@nuxtjs/apollo`) | GraphQL client |
| **nuxt-auth-utils** | 0.5.x | OAuth + JWT cookie auth |
| **Apache ECharts** | 5.x | Analytics charts |
| **vue-draggable-plus** | 0.6.x | Drag & drop link reordering |
| **Lucide Icons** | 2.x | Icon set (prefix `Icon`) |
| **Vitest** | 2.x | Unit testing |
| **TypeScript** | 5.x | Strict mode |
| **Vercel** | — | Hosting & deployment (Nitro `vercel` preset) |

> Backend is a separate GraphQL service (PostgreSQL); this repo is the frontend/SSR app.

## Features

### Public Profile Page (`/`)
- Avatar with comic border + floating badge
- Bio displayed in a speech bubble
- Social links as emoji buttons
- Link cards with 5 style variants
- Click tracking
- Smooth drag transitions
- Light/Dark theme

### Admin Dashboard (`/admin`)
- **Links tab** — drag & drop reorder, add/edit/delete links, style picker, visibility toggle, highlight toggle
- **Profile tab** — edit name, bio, username, avatar, social links
- **Analytics tab** — ECharts bar chart, click stats per link
- **Appearance tab** — theme toggle, accent color picker, live preview

## Design System

### Colors

```css
--red:    #E23636   /* default accent */
--blue:   #1A3A6B
--yellow: #FFD700
--pink:   #FF2D78
--purple: #7B2FBE
--cyan:   #00D4FF
--ink:    #1A1A2E   /* panel black */
```

### Cartoon Shadow Classes

```html
<div class="comic-panel">Panel with hard shadow</div>
<button class="btn-comic btn-primary">Primary Button</button>
<a class="link-card">Default Link Card</a>
<a class="link-card-red">Red Variant</a>
<a class="link-card-blue">Blue Variant</a>
<a class="link-card-yellow">Yellow Variant</a>
<div class="speech-bubble">Speech bubble with tail</div>
<span class="action-text">POW! ZAP! WHAM!</span>
```

### Fonts

- **Display**: `Bangers` — titles, action text, buttons
- **Comic**: `Comic Neue` — body text, descriptions
- **Marker**: `Permanent Marker` — handwritten accents

---

# Part 2 — Developing the App

## Prerequisites

- **Node.js ≥ 20.12** (required — Nuxt 4 CLI uses `node:util.styleText`, added in 20.12)
- **npm** (or Bun; `bun.lock` is present but scripts use npm)

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/Linkdung/linkdung-app.git
cd linkdung
npm install
```

### 2. Environment

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Run Dev Server

```bash
npm run dev
# → http://localhost:3000
```

## Scripts

```bash
npm run dev          # Development server (http://localhost:3000)
npm run build        # SSR build (Nitro vercel preset → .vercel/output)
npm run generate     # Static site generation
npm run preview      # Preview production build
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix lint errors
npm run typecheck    # TypeScript validation
npm test             # Run all tests (Vitest)
npm run test:watch   # Test watch mode
```

## Project Structure

```
linkdung/
├── assets/css/main.css        # Design system, CSS variables, animations
├── components/
│   ├── admin/                 # Admin dashboard tab panels
│   ├── landing/               # Landing page sections
│   └── skeleton/              # Loading skeletons
├── composables/
│   ├── useProfile.ts          # TanStack Query → GraphQL → Pinia
│   ├── useAuth.ts             # Register / login / logout
│   ├── useAccentColor.ts
│   └── useLinkStyles.ts
├── graphql/
│   ├── fragments/             # ProfileCore, ProfilePublic, ProfileAdmin
│   ├── queries/               # getPublicProfile, getAdminProfile, getAnalytics, checkUsername
│   └── mutations/             # addLink, updateLink, removeLink, reorderLinks, register, login, ...
├── layouts/
│   ├── default.vue            # Navbar + main layout
│   └── blank.vue              # Error pages layout
├── pages/                     # File-based routes (index, profile, admin, login, ...)
├── plugins/                   # TanStack Query setup, Pinia persistence
├── stores/
│   ├── profile.ts             # Profile state (draft/published pattern)
│   ├── auth.ts                # Auth user + JWT token
│   └── theme.ts               # Dark/light theme
├── server/api/                # Nitro API routes
├── tests/                     # Vitest unit tests (Pinia stores)
├── nuxt.config.ts             # Nuxt configuration
├── tailwind.config.ts         # Tailwind config
├── vitest.config.ts           # Test configuration
└── vercel.json                # Vercel deployment (headers, framework)
```

## State Architecture (draft / published)

The `profile` store separates two states:

- **`published`** — final data shown on the public profile, persisted to `localStorage`.
- **`draft`** — admin working copy, only changes while editing.
- **`isDirty`** — computed: `JSON.stringify(draft) !== JSON.stringify(published)`.

```
Edit in admin → draft changes → isDirty = true
Save          → draft commits to published → isDirty = false
Discard       → draft resets to published
```

Data flow: `GraphQL → Apollo → TanStack Query (composables) → Pinia store → UI`.

## GraphQL

Apollo is pre-configured via `@nuxtjs/apollo`. `.gql` files are imported directly as
`DocumentNode`, with fragments resolved through the `#import` directive.

1. Set `GRAPHQL_ENDPOINT` in `.env`.
2. Define operations under `graphql/queries`, `graphql/mutations`, `graphql/fragments`.
3. Consume them via the composables in `composables/` (`useProfile.ts`, `useAuth.ts`).

Link mutations use **optimistic updates** — the UI changes immediately, the server confirms in the background.

## Testing

Tests live in `tests/` (Vitest + happy-dom), currently focused on Pinia store unit tests.

```bash
npm test             # run once
npm run test:watch   # watch mode
```

## Deployment (Vercel)

This app deploys as **SSR** using the Nitro `vercel` preset (`nuxt.config.ts`),
which outputs to `.vercel/output` (Build Output API v3) — auto-detected by Vercel.
Security & cache headers live in `vercel.json`. Node version is pinned via
`engines.node` (`20.x`) in `package.json`.

### Option A — Vercel CLI

```bash
npm install -g vercel
vercel login
vercel            # preview deploy
vercel --prod     # production deploy
```

### Option B — Git Integration

1. Push to GitHub.
2. Import the repo in the Vercel dashboard.
3. Framework preset auto-detects **Nuxt** (build command `nuxt build`); no extra
   config needed beyond `vercel.json`.
4. Set environment variables in the Vercel UI.

### Environment Variables (Vercel)

Set these in **Vercel → Project → Settings → Environment Variables**:

```
GRAPHQL_ENDPOINT=https://your-api.com/graphql
JWT_SECRET=your-production-secret
APP_URL=https://your-app.vercel.app
```

---

## Credits

Inspired by:
- Saweria's cartoon UI aesthetic
- Linktree's feature set
