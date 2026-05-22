# Traverse South — Project Memory & Blueprints

> **Go Beyond.** Travel tailored to the South Island.
> Centralized repository memory for developers and AI agents.

---

## 🎯 Project Overview & Brand Voice
* **Vision**: A premium, zero-friction luxury travel portal allowing price-insensitive, time-poor adventurers to dynamically customize and book bespoke South Island expeditions.
* **Aesthetic**: **Quiet Luxury / Editorial**. Strict enforcement of the **Saniti Design Framework** (`DESIGN.md`). Dark-first canvas (`#0b0b0b`), oversized tracking-tight headlines, and signature Coral-Red (`#f36458`) used sparingly for high-priority CTAs.

---

## 🔗 Live Environment Matrix

| Target | Public URL | Embedded Studio Path |
| :--- | :--- | :--- |
| **Main Production** | [traverse-south.vercel.app](https://traverse-south.vercel.app/) | [/studio](https://traverse-south.vercel.app/studio) |
| **Secondary Preview** | [traverse-south-git-main-vbrnbs-projects.vercel.app](https://traverse-south-git-main-vbrnbs-projects.vercel.app/) | [/studio](https://traverse-south-git-main-vbrnbs-projects.vercel.app/studio) |

---

## 🛠️ The Tech Stack
* **Framework**: Next.js App Router (React 19, Next.js 16)
* **Codebase**: TypeScript (Strict type checks)
* **Styling**: Vanilla CSS (`globals.css` & `components.css`)
* **Headless CMS**: Sanity.io (Dynamic fetching via GROQ query maps)

---

## 🚀 Key Architectural Structures

### 1. Unified Embedded Studio
* **Integration**: Embedded at `/studio` within Next.js using `@sanity/client` & `next-sanity`.
* **CORS Settings**: Active Vercel domains must be explicitly whitelisted in `sanity.io/manage` under **API > CORS Origins** with **"Allow credentials"** toggled **ON** to enable live login cookies.

### 2. Hybrid Navigation Component
* **Path**: [`src/components/Button.tsx`](file:///d:/GIT/TraverseSouth/src/components/Button.tsx)
* **Design**: Standardized component utilizing React Union typings. Renders a native `<a>` anchor link when an `href` prop is supplied, and falls back to a semantic HTML `<button>` otherwise. Completely eliminates typescript static check discrepancies.

### 3. Decoupled Content Schema
* **Singleton Root**: [`homepage.ts`](file:///d:/GIT/TraverseSouth/src/sanity/schema/homepage.ts) bundles core layout objects (`hero`, `mission`, `engine`, `footer`) inline.
* **First-Class References**: Regional categories (`fiordland`, `qt-mtcook`, `relax`) are decoupled into independent `category` documents. Mapped on the homepage via reference arrays (`categories[]->`).
* **Dynamic Routes**: Package detail pages load on demand under the dynamic segment `/packages/[slug]` (resolved flawlessly using dynamic GROQ OR queries).

### 4. Headless Shopify Storefront Integration
* **Lightweight client**: [`client.ts`](file:///d:/GIT/TraverseSouth/src/shopify/client.ts) handles dependency-free GraphQL queries over native POST fetch requests. Cached for 60 seconds.
* **Private Actions**: [`actions.ts`](file:///d:/GIT/TraverseSouth/src/shopify/actions.ts) exposes Server Actions to trigger checkout URL creations without leaking private access tokens to browser bundles.
* **Interactive Panel**: [`BookingPanel.tsx`](file:///d:/GIT/TraverseSouth/src/components/BookingPanel.tsx) fetches live Shopify variant prices, manages sold-out states, and renders luxury glassmorphic redirect overlays.
* **Checkout Simulation**: [`simulation/page.tsx`](file:///d:/GIT/TraverseSouth/src/app/packages/[slug]/simulation/page.tsx) renders guest billing inputs, triggers secure handshakes, and issues an immersive, print-ready **Expedition Charter Boarding Pass** as a premium fallback when credentials are unconfigured or empty.

---

## 📦 Database Seeding & Media Pipelines
* **Seeding Command**: `npm run populate` imports `homepage-defaults.ndjson` to the live Sanity dataset.
* **Asset Upload Script**: `upload-assets.ts` (executed via `npx sanity exec upload-assets.ts`) programmatically uploads high-resolution local assets directly to Sanity's global CDN, returning linked unique image asset pointers.

---

## 🔄 Agent & Human CI/CD Git Workflow
When pushing updates to the main production pipeline:

1. **Test Compile Locally**:
   ```bash
   npm run build
   ```
   *Ensure 0 compiler warnings or TypeScript errors before staging.*

2. **Stage & Commit**:
   ```bash
   git add .
   git commit -m "feat/fix: descriptive log of updates"
   ```

3. **Deploy to Production (Requires Consent)**:
   *Always request the user's explicit permission before running the push command.*
   ```bash
   git push origin main
   ```
   *Pushes directly to Vercel and builds production targets instantly!*


---

## 📅 Project Milestone Log
* **Milestone 1**: Initialized Next.js project and set up core Saniti CSS design framework.
* **Milestone 2**: Created dynamic homepage pulling 100% editable copy directly from Sanity Studio.
* **Milestone 3**: Decoupled package data into independent categories and constructed reference schemas.
* **Milestone 4**: Programmatically uploaded all premium New Zealand photographs into Sanity CDNs.
* **Milestone 5**: Built dynamic package detail pages (`/packages/[slug]`) mapping copywriting itinerary decks.
* **Milestone 6**: Linked entire homepage package cards to detail pages and resolved all TypeScript compiler link constraints.
* **Milestone 7**: Successfully deployed live builds to Vercel main and secondary URLs with active whitelisted CORS origins.
* **Milestone 8**: Integrated headless Shopify Storefront API e-commerce engine, securing checkout redirects, dynamic booking panels, and an immersive fallback checkout simulation system generating custom Expedition passes.
* **Milestone 9**: Transitioned package detail pages to be 100% dynamic, fetching detailed day-by-day timelines, supplier networks, and pricing inclusions directly from Sanity CMS with a safe static fallback mechanism.


---

## 🔮 Next Session Roadmap
* **Target Objective**: Integrate a live headless traffic monitor into the platform.
* **Architecture**: Build a dynamic dashboard widget inside Sanity Studio using the **Sanity App SDK**, providing live traffic reporting, flight search insights, and checkout mapping directly to your administration screen!



