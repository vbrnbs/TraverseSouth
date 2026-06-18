# Traverse South: Technical Stack & Architecture

This document defines the strict engineering parameters, frameworks, and structural routing logic that power the Traverse South platform.

## 🛠️ Core Technology Stack
*   **Framework**: Next.js App Router (React 19, Next.js 16)
*   **Codebase**: TypeScript (Strict type checks enforced)
*   **Styling**: Vanilla CSS (`globals.css` & `components.css`)
*   **Headless CMS**: Sanity.io (Dynamic fetching via GROQ query maps)
*   **E-commerce**: Headless Shopify Storefront API (GraphQL client)

## 🚀 Key Architectural Structures
1.  **Unified Embedded Studio**: Embedded at `/studio` within Next.js. Whitelisted Vercel domains in `sanity.io/manage` (CORS Origins).
2.  **Dynamic Routes**: Package detail pages load on demand under `/packages/[slug]` and `/itinerary/[slug]` (resolved via dynamic GROQ queries).
3.  **Shopify Integration**: GraphQL client dedicated to checkout URL creation without leaking access tokens. A simulation fallback renders custom expedition passes before handoff.
4.  **Decoupled Schemas (Sanity.io)**:
    *   `activity.ts`: The transactional core. Single-day epic events (e.g., specific heli-ski drops) containing individual pricing and Rezdy IDs.
    *   `itinerary.ts`: The predictive recommendation framework. Multi-day narratives utilizing arrays of references that point directly back to independent activities.
        *   **Conversion Routing**: `itinerary.ts` narratives utilize Portable Text with custom annotations to create direct, inline links to `activity.ts` single-day epics.
        *   **Frontend Rendering**: Embedded activity links within the narrative are styled distinctly with Coral-Red (`#f36458`) to drive frictionless conversions.