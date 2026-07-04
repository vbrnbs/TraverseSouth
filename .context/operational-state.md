# Traverse South: Operational State & Active Sprint

This document tracks the immediate development goals, active sprint tasks, business logistics, and system upgrades required for the Traverse South platform. 

## 🔄 Active Next Steps (System & Backend)
* **Traffic Monitoring**: Integrate a live headless traffic monitor into the Next.js platform.
* **Sanity Tooling**: Build a dynamic dashboard widget inside Sanity Studio utilizing the Sanity App SDK to monitor automated cancellations and agent-driven Seamless Pivots.

## 🤖 AI Multi-Agent Workflow Sync
* **Founder Role**: System Supervisor. Direct manual labor and repetitive tasks are strictly minimized.
* **Agent Integration**: Ensure the local repository is actively pulling from the `.agents/skills/` toolkit and maintaining alignment with `AGENTS.md` constraints.
* **First-Line Agents**: Connect directly to Sanity via GROQ to provide context-accurate responses to user inquiries.
* **Growth Agents**: Dynamically generate marketing copy from Sanity descriptions, enforcing the "Quiet Luxury" brand voice.
* **CFO Agents**: Manage unit economics, pricing models, merchant gateways, GST compliance, and refund reconciliation.
* **Ops Agents**: Execute background logic for the "Zero-Admin" and "Seamless Pivot" protocols.

## 🎨 Current Frontend Focus (UI/UX)
* **[COMPLETED] UI Layout Protocol Pivot**: `itinerary.ts` utilizes a static, high-end "Editorial Narrative" (blog-style) layout using Portable Text with inline activity annotations styled in `#f36458`.
* **[COMPLETED] Component Constraint**: Removed the "Duration" dropdown from filter logic in `TourBuilder.tsx`.
* **[COMPLETED] Architecture Addition**: Added a mandatory "Manifesto / Our Blueprint" typographical section immediately below the hero on the homepage layout.
* **[COMPLETED] Package Editorials**: Introduced Section 4: Inspirational Package Editorials on the homepage with responsive vertical stacking and zero horizontal overflow.
* **Activity Detail Pages**: Begin mapping dynamic GROQ queries to populate the `activity.ts` single-day detail pages (served via fallback logic in `itinerary/[slug]/page.tsx`).
* **Dark-First Canvas Development**: Construct the main entry point UI, enforcing the `#0b0b0b` background and strategic use of `#f36458` for primary conversion points.

## 🏢 Business & Legal Operations (Entity Setup & Operational State)
* **Entity Registration**: NZBN 9429053785237 [COMPLETED]
* **Business Banking**: Main Domestic Operating Account `04-2021-0417074-05` [COMPLETED]
* **Treasury & Accounts**: Wise multi-currency account (main balance) with dedicated Jars for Tax (15% GST/Income), Fixed Expenses (SaaS/Hosting), and Customer Revenue / Operator Vault. [COMPLETED]
* **Primary Contact Email**: `contact@traversesouth.co.nz` (Official main contact endpoint for all client inquiries, business arrangements, and correspondence) [COMPLETED]
* **Legal Portal & T&Cs**: Fully drafted, compliant with NZ CGA 1993, FTA 1986, HSWA 2015, and Privacy Act 2020 [COMPLETED]
* **Week 2 Focus (Low Energy)**: Founder sends 3 emails to operators, time-box social posts. Agent Delegation: Create and document internal processes and databases for zero-admin protocol.