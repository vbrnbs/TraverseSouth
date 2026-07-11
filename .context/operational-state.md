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
* **Week 1 Foundation**: [COMPLETED] Company registration (NZBN), business bank account, T&Cs/Refund policy, About/Contact/Story/Footer pages, Waitlist popup, DNS routing, and initial Sanity schema/frontend cleanup.
* **Week 2 Sprint Focus (Moderate Energy - Staggered Outreach)**: 
  * 🥇 **Sales Wolf**: Contact Jeremy / Huw (Packrafting) regarding collab & pack-rafting [IN PROGRESS - Huw replied with massive buy-in ("our humans"), confirmed 15-20% commission on day trips, and runs on **Rezdy**. Expectation set: we will reach back out once our Rezdy account is live].
  * 🥇 **Sales Wolf**: Setup Rezdy account for live booking gateway [NEXT STEP: Once active, immediately connect to Huw via Rezdy Agent Marketplace share and send follow-up message].
  * 🥈 **Launch Blocker**: Connect working sign-up form & notification buttons.
  * 🥉 **Marketing**: Publish 2 x IG posts & finalize social media strategy.
  * 🤖 **Agent Delegation**: AI agents review and document internal processes & databases for zero-admin protocol.
* **Repeatable PM Methodology**: Established "The Halftime Review" 4-step interview exercise documented in `.agents/skills/pm/references/halftime-review-method.md`.