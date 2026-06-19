# Traverse South: Technical Stack & Architecture

This document defines the strict engineering parameters, frameworks, and structural routing logic that power the Traverse South platform.

## 🛠️ Core Technology Stack
* **Framework**: Next.js App Router (React 19, Next.js 16)
* **Codebase**: TypeScript (Strict type checks enforced)
* **Styling**: Vanilla CSS (`globals.css` & `components.css`)
* **Headless CMS**: Sanity.io (Dynamic fetching via GROQ query maps)
* **MVP E-commerce**: Native Rezdy Checkout. Next.js frontend routes users to external Rezdy interfaces via schema IDs.
* **Phase 2 E-commerce**: Headless Shopify Storefront API (GraphQL client) reserved for future scaling to maintain a clean core architecture during MVP launch.

## 🚀 Key Architectural Structures
* **Unified Embedded Studio**: Embedded at `/studio` within Next.js. Whitelisted Vercel domains in `sanity.io/manage` (CORS Origins).
* **Dynamic Routes**: Package detail pages load on demand under `/packages/[slug]` and `/itinerary/[slug]` (resolved via dynamic GROQ queries).
* **Schema 1 - activity.ts**: The transactional core. Single-day epic events containing individual pricing and Rezdy IDs.
* **Schema 2 - itinerary.ts**: The predictive recommendation framework. Multi-day narratives utilizing arrays of references pointing to activities.
* **Conversion Routing**: `itinerary.ts` narratives utilize Portable Text with custom annotations to create direct, inline links to `activity.ts` single-day epics.
* **Frontend Rendering**: Embedded activity links within the narrative are styled distinctly with Coral-Red (`#f36458`) to drive frictionless conversions.

## 📐 Global UI & Mobile Architecture
* **Global Header**: Minimalist approach. Central wordmark with a typographical "MENU" trigger opening a full-screen dark overlay. No traditional horizontal navigation bars.
* **Global Footer**: High-contrast, text-heavy authoritative footer featuring a minimalist newsletter capture and compliance links.
* **Visual Separation Logic**: Differentiates transactional activities from inspirational packages via layout shifts (functional tight grid vs. oversized editorial cards) rather than background color changes.
* **Mobile Constraint**: Strict single-column vertical stacking for all grids on mobile devices.