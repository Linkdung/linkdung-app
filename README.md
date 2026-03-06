# Linkdung

> * inspired Linktree clone with cartoon shadow aesthetics*

A full-featured link-in-bio platform  — halftone patterns, cartoon shadows, bold typography, and a dark/light theme that hits different.

---

## ✨ Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| **Nuxt** | 4.3.1 | Full-stack Vue framework |
| **Tailwind CSS** | 3.x | Utility-first styling |
| **TanStack Query** | 5.x | Server state / caching |
| **Pinia** | 2.x | Client state management |
| **Apollo** | 5.x | GraphQL client |
| **Apache ECharts** | 5.x | Analytics charts |
| **Vitest** | 2.x | Unit testing |
| **Netlify** | — | Hosting & deployment |

---

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/you/linkdung.git
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

---

## 📁 Project Structure

```
linkdung/
├── assets/
│   └── css/
│       └── main.css
├── components/
│   ├── SpiderWebCorners.vue  # Decorative SVG webs
│   ├── ui/                   # Reusable UI components
│   ├── links/                # Link card components
│   ├── profile/              # Profile components
│   └── theme/                # Theme components
├── composables/
│   └── useProfile.ts         # TanStack Query composables
├── layouts/
│   └── default.vue           # Main layout + navbar
├── pages/
│   ├── index.vue             # Public profile page
│   └── admin.vue             # Admin dashboard
├── plugins/
│   ├── vue-query.ts          # TanStack Query setup
│   └── pinia-persistence.client.ts
├── stores/
│   ├── profile.ts            # Profile + links state
│   └── theme.ts              # Dark/light theme
├── server/
│   └── api/                  # Nitro API routes
├── tests/
│   ├── setup.ts              # Test config
│   └── stores/               # Store unit tests
├── nuxt.config.ts            # Nuxt configuration
├── tailwind.config.ts        # Tailwind 
├── vitest.config.ts          # Test configuration
└── netlify.toml              # Netlify deployment
```

---

## 🎨 Design System

### Colors

```css
--spider-red:    #E23636   /* Miles' red */
--spider-blue:   #1A3A6B   /* City night */
--spider-yellow: #FFD700   /* Web gold */
--spider-pink:   #FF2D78   /* Gwen's dimension */
--spider-purple: #7B2FBE   /* Spider-Noir */
--spider-cyan:   #00D4FF   /* 2099 */
--spider-ink:    #1A1A2E   /* Panel black */
```

### Cartoon Shadow Classes

```html
<!-- Cartoon box-shadow components -->
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

- **Display**: `Bangers` — for titles, action text, buttons
- **Comic**: `Comic Neue` — for body text, descriptions
- **Marker**: `Permanent Marker` — for handwritten accents

---

## 🏗️ Features

### Public Profile Page (`/`)
- Avatar with comic border + floating spider badge
- Bio displayed in a speech bubble
- Social links as emoji buttons
- Link cards with 5 style variants
- Click tracking
- Smooth drag transitions
- Light/Dark theme

### Admin Dashboard (`/admin`)
- **Links tab**: Drag & drop reorder, add/edit/delete links, style picker, visibility toggle, highlight toggle
- **Profile tab**: Edit name, bio, username, avatar, social links
- **Analytics tab**: ECharts bar chart, click stats per link
- **Appearance tab**: Theme toggle, accent color picker, live preview

---

## 🧪 Testing

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# UI mode
npm run test:ui

# Coverage report
npm run test:coverage
```

---

## 🌐 Deployment (Netlify)

### Option A: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

### Option B: Git Integration

1. Push to GitHub
2. Connect repo in Netlify dashboard
3. Build command: `npm run generate`
4. Publish dir: `.output/public`
5. Set env vars in Netlify UI

### Environment Variables (Netlify)

Set these in **Netlify → Site Settings → Environment Variables**:

```
GRAPHQL_ENDPOINT=https://your-api.com/graphql
JWT_SECRET=your-production-secret
APP_URL=https://your-site.netlify.app
```

---

## GraphQL Setup (Optional)

Apollo is pre-configured. To use GraphQL:

1. Set `GRAPHQL_ENDPOINT` in `.env`
2. Use `useQuery` / `useMutation` from `@tanstack/vue-query` or Apollo composables
3. Define your queries in `composables/` or `graphql/` folder

---

## 📝 Scripts

```bash
npm run dev          # Development server
npm run build        # Build for Node server
npm run generate     # Static site generation (for Netlify)
npm run preview      # Preview production build
npm run lint         # ESLint check
npm run lint:fix     # Auto-fix lint errors
npm test             # Run tests
npm run typecheck    # TypeScript check
```

---

## Credits

Inspired by:
- Saweria's cartoon UI aesthetic
- Linktree's feature set