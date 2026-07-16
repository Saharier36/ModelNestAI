# ModelNestAI

### Buy & Sell AI Tools at the Right Price

ModelNestAI is a full-stack marketplace where people can discover, buy, and sell discounted AI model subscriptions and tools — from ChatGPT and Claude to Midjourney and GitHub Copilot. This repository contains the **frontend client**, built with Next.js and TypeScript.

---

## ✨ Features

- Modern, animated landing page with 8+ sections
- Full dark/light theme support
- Fully responsive across mobile, tablet, and desktop
- Search, filter, sort, and paginated marketplace explore page
- Detailed listing pages with related items
- Email/password and Google authentication (Better Auth)
- Protected routes for adding and managing listings
- Profile editing with image upload
- Demo login for quick evaluation

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router, Turbopack) |
| Language | TypeScript |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| Icons | [react-icons](https://react-icons.github.io/react-icons/), [lucide-react](https://lucide.dev/) |
| Animation | [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/), [Lenis](https://lenis.darkroom.engineering/) (smooth scroll) |
| Authentication | [Better Auth](https://www.better-auth.com/) (email/password, Google OAuth, JWT plugin) |
| Database (Auth) | MongoDB (via Better Auth adapter) |
| Notifications | [Sonner](https://sonner.emilkowal.ski/) (toast) |
| Image Hosting | [ImgBB API](https://api.imgbb.com/) |
| Fonts | Space Grotesk (headings), Inter (body), JetBrains Mono (numbers/code) |

---

## 📦 Key npm Packages

```
next, react, react-dom, typescript
better-auth, mongodb
tailwindcss, tw-animate-css
framer-motion, gsap, @studio-freight/lenis
react-icons, lucide-react
sonner
```

Plus shadcn/ui components: `button`, `input`, `label`, `textarea`, `select`, `checkbox`, `avatar`, `badge`, `skeleton`, `sheet`, `dropdown-menu`, `table`, `alert-dialog`, `accordion`, `pagination`, `slider`

---

## 📁 Project Structure

```
modelnestai-client/
├── src/
│   ├── app/
│   │   ├── (main)/              # Public pages with Navbar + Footer
│   │   │   ├── page.tsx          # Home
│   │   │   ├── explore/          # Marketplace listing page
│   │   │   ├── listing/[id]/     # Listing details page
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   └── layout.tsx
│   │   ├── (auth)/               # Centered auth layout, no navbar/footer
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/          # Sidebar layout for protected pages
│   │   │   ├── add/               # Add new model (protected)
│   │   │   ├── manage/            # Manage own models (protected)
│   │   │   └── layout.tsx
│   │   ├── api/auth/[...all]/    # Better Auth route handler
│   │   ├── profile/
│   │   ├── layout.tsx             # Root layout (fonts, theme, Lenis)
│   │   ├── loading.tsx            # Global loading state
│   │   ├── not-found.tsx          # Global 404 page
│   │   └── globals.css
│   ├── components/
│   │   ├── ui/                   # shadcn/ui primitives
│   │   ├── shared/                # Navbar, Footer, ListingCard, ThemeToggle, etc.
│   │   ├── sections/               # Hero, Categories, Stats, FAQ, CTA, etc.
│   │   └── providers/              # ThemeProvider, LenisProvider
│   ├── lib/
│   │   ├── auth.ts                # Better Auth server instance
│   │   ├── auth-client.ts         # Better Auth React client + JWT helper
│   │   ├── api-client.ts          # Express API base URL
│   │   └── utils.ts
│   ├── data/
│   │   └── listings.ts            # Shared static data/categories
│   └── types/
│       └── listing.ts
├── proxy.ts                        # Route protection (auth guard)
├── public/icons/                   # Brand SVG logos
├── .env.local
└── package.json
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Runs on [http://localhost:3000](http://localhost:3000).

### Environment Variables (`.env.local`)

```
BETTER_AUTH_SECRET=
NEXT_PUBLIC_BETTER_AUTH_URL=
MONGODB_URI=
DB_NAME=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
NEXT_PUBLIC_IMGBB_API_KEY=
NEXT_PUBLIC_API_BASE_URL=
```

---

## 🔗 Related Repository

- Backend API: [modelnestai-server](../modelnestai-server)
