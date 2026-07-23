@AGENTS.md
# ModelNestAI — Full Project Build Prompt

## Project Overview
Build a production-ready **AI Model/Tool Marketplace** called **ModelNestAI** where logged-in users can list AI tools/subscriptions for sale at discounted prices and purchase them via Stripe. Single-role system (no admin/vendor role separation — every logged-in user can both sell and buy).

## Tech Stack
**Frontend:**
- Next.js 14+ (App Router), TypeScript (strict mode)
- Tailwind CSS
- shadcn/ui components
- react-icons
- Recharts (for dashboard stats)

**Animation:**
- Lenis (global smooth scroll)
- GSAP + ScrollTrigger (hero timeline, scroll reveals, stat counters)
- Framer Motion (component-level micro-interactions, page transitions, hover states)
- React Bits (ready-made effects: text reveal, spotlight cards, animated backgrounds)

**Backend:**
- Express.js + TypeScript (separate server, NOT Next.js API routes)
- MongoDB using the **native `mongodb` driver** (no Mongoose)
- Better Auth (Express integration, JWT-based sessions)
- Stripe (Checkout + webhooks)

**Architecture:** Monorepo with two folders — `/client` (Next.js) and `/server` (Express). Client communicates with server exclusively via REST API through a centralized `apiClient`.

## Design System
**Theme:** Dark AND Light mode toggle — MANDATORY. Must look polished in both. Persist user preference (localStorage + system preference fallback).

**Aesthetic:** Modern, futuristic, tech-forward. Glassmorphism cards, soft gradient glow borders, gradient mesh backgrounds, consistent `rounded-2xl` radius across all cards/components.

**Colors (max 3 primary + neutral):**
- Neutral: near-black (`#0A0A0F`) for dark bg / near-white for light bg
- Primary: electric violet/indigo
- Accent: cyan/teal
- Use CSS variables for full theme-ability (light/dark switch via `next-themes` or shadcn theme pattern)

**Fonts (use exactly these 3):**
- Headings: `Space Grotesk` (bold, techy)
- Body: `Inter`
- Numbers/price/code: `JetBrains Mono`

## Responsiveness
MANDATORY full responsiveness across mobile, tablet, and desktop for every single page and component. Test breakpoints: 375px, 768px, 1024px, 1440px+. Cards: 1 column mobile, 2 columns tablet, 4 columns desktop.

## Data Models (TypeScript interfaces, MongoDB native driver)
```ts
User { _id, name, email, passwordHash, image?, createdAt }

AIListing {
  _id, title, category: 'Chatbot'|'Image'|'Video'|'Coding'|'Writing'|'Other',
  shortDescription, fullDescription, price, originalPrice, discountPercent,
  image, features: string[], rating: number, reviewCount: number,
  sellerId: ObjectId, createdAt
}

Review { _id, listingId, userId, userName, rating, comment, createdAt }

Purchase { _id, listingId, buyerId, stripeSessionId, amount, status: 'pending'|'completed', createdAt }
```

## Pages & Routes
| Route | Access | Contents |
|---|---|---|
| `/` | Public | Navbar, Hero (60-70vh, GSAP animated, CTA), 7+ sections (Featured Listings, Categories, How It Works, Stats counter, Testimonials, Newsletter, FAQ, Final CTA), Footer |
| `/explore` | Public | Search bar, filters (category + price range minimum), sort (price/rating/newest), pagination, 4-column responsive grid, skeleton loaders |
| `/listing/[id]` | Public | Image gallery, description, features/specs, reviews section, related listings, Buy Now (Stripe) |
| `/login`, `/register` | Public | Better Auth forms, validation, error handling, "Demo Login" auto-fill button |
| `/items/add` | Protected (redirect to /login) | Form: title, category, short desc, full desc, price, originalPrice, image URL, features |
| `/items/manage` | Protected | Table/grid of own listings, View/Delete actions |
| `/dashboard` | Protected | Purchase history, sales stats via Recharts |
| `/about`, `/contact` | Public | Real, non-placeholder content |
| `/checkout/success` | Protected | Stripe success confirmation |

**Navbar:** Logged out → min 3 routes. Logged in → min 5 routes (Home, Explore, Add Item, Manage Items, Dashboard). Sticky/fixed, fully responsive with mobile hamburger menu, theme toggle button always visible.

## Folder Structure
```
/client
  /app
    /(public)/...
    /(protected)/...
  /components
    /ui (shadcn)
    /sections (Hero, Features, Stats, Testimonials, FAQ, Newsletter, CTA)
    /shared (Navbar, Footer, Card, SkeletonCard, ThemeToggle)
    /animations (LenisProvider, GsapReveal, MotionWrapper)
  /core
    apiClient.ts
  /services
    api.ts        // server-side fetch, no "use server"
    actions.ts     // client mutations
  /lib
    utils.ts, auth-client.ts
  /types

/server
  /src
    /config       // db.ts, stripe.ts
    /routes       // auth, listings, reviews, purchases
    /controllers
    /middleware   // auth guard, error handler
    /models       // TS interfaces + collection helpers
    /lib          // better-auth setup
    server.ts
```

## Core Rules
- NO placeholder/lorem ipsum content anywhere — all copy must be real and contextual to ModelNestAI
- All cards: identical height, width, border-radius, shadow style
- Skeleton loaders on every data-fetching list/grid
- Every button and link must be functional
- Clean, minimal, senior-level code — reusable components, no duplication
- Consistent spacing scale (Tailwind spacing tokens only, no arbitrary magic numbers unless necessary)

## Build Order (follow strictly, step by step, do not skip ahead)
1. Express server setup (TS config, folder structure, MongoDB native driver connection)
2. Next.js client setup (Tailwind, shadcn init, fonts, theme provider for dark/light)
3. Better Auth integration (Express side + Next client side) + demo login button
4. MongoDB collections + TypeScript model interfaces + CRUD helper functions
5. Core reusable components (Navbar w/ theme toggle, Footer, Card, Skeleton, Buttons)
6. Animation infrastructure (Lenis provider, GSAP setup, Framer Motion wrapper components)
7. Landing page — Hero + all 7+ sections
8. Explore page — search, filter, sort, pagination, API wiring
9. Listing details page — reviews, related items
10. Add/Manage items protected pages
11. Stripe checkout + webhook integration
12. Dashboard with Recharts
13. About/Contact pages
14. Full responsive QA pass + dark/light theme QA pass on every page
15. Deployment (client → Vercel, server → Render/Railway) + seed demo user/admin credentials

## Deliverables Required at End
- Live URL (client + server)
- GitHub repo links (client + server)
- Demo credentials: one regular user email/password (auto-fillable via Demo Login button)
