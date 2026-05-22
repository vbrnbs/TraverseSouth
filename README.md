# Traverse South

> **Go Beyond.** Travel tailored to the South Island.

Traverse South is a zero-friction, modular luxury portal designed for time-poor, price-insensitive adventurers. It enables users to instantly curate and customize high-end, week-long regional packages across New Zealand's dramatic landscapes. Built on an editorial "Quiet Luxury" aesthetic, the platform combines strict logistical constraints with beautiful, responsive media.

---

## 🛠️ The Stack

* **Framework:** Next.js (App Router) // React 19 & Next.js 16
* **Language:** TypeScript (Strictly typed schemas)
* **Styling:** Vanilla CSS — strictly implementing the **Saniti Design Framework** (Tokens & Core layouts configured centrally in `globals.css` and `components.css` with zero utility bloat).
* **Headless CMS:** Sanity.io (Dynamic GROQ query structures resolving directly from edge CDNs).

---

## 📦 What is in the Repository

### 1. Dynamic Web App Layouts
* **Primal Homepage (`src/app/page.tsx`):** A fully dynamic landing page driven entirely by Sanity CMS GROQ data.
* **Atmospheric Motion System (`src/components/ScrollObserver.tsx`):** Seamless scroll-driven color polarity flips (light/dark transitions) and premium `1.2s` cubic-bezier "Slow-Shatter" hover zooms on media assets.
* **Dynamic Package detail routing (`src/app/packages/[slug]/page.tsx`):** Immersive, high-converting product pages loading visual day-by-day itineraries, flight schedules, and supplier validation cards on demand.
* **Bespoke Button Interface (`src/components/Button.tsx`):** A type-safe, hybrid component that automatically resolves as a semantic `<button>` or a native `<a>` link depending on configuration.

### 2. Custom Hybrid CMS Architecture
* **Decoupled Studio (`sanity.config.ts`):** Embedded content management dashboard accessible at `/studio`.
* **Integrated Schemas (`src/sanity/schema/`):** Dynamic singleton configuration for layout objects (`hero`, `mission`, `engine`, `footer`) mapped alongside references pointing to first-class, standalone regional `category` documents.
* **Static Migration Pipeline (`upload-assets.ts`):** Programmatic migration and upload system for publishing high-fidelity AI-generated assets directly into Sanity's global CDN store.

---

## 🔐 What is NOT in the Repository

For security and optimization, the following assets are explicitly excluded from version control via `.gitignore`:

* **Environment Configurations (`.env.local`):** Holds private keys, such as `NEXT_PUBLIC_SANITY_PROJECT_ID`, which keeps database queries secure and isolated.
* **Dependency Directories (`/node_modules`):** Excluded to maintain light repository footprints. Install all dependencies fresh using `npm install`.
* **Production Build Output (`/.next/` & `/build`):** Excluded to ensure the application compiles clean assets for each unique target environment during deployment (`npm run build`).

---

## 🚀 Local Development

To run the Traverse South portal locally:

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure Environment:**
   Create a `.env.local` file in the root directory and populate your Sanity Project variables:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2026-05-21
   ```

3. **Spin up Dev Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the portal.

