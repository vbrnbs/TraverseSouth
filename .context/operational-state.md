# Traverse South: Operational State & Active Sprint

This document tracks the immediate development goals, active sprint tasks, business logistics, and system upgrades required for the Traverse South platform. 

## 🔄 Active Next Steps (System & Backend)
*   **Traffic Monitoring**: Integrate a live headless traffic monitor into the Next.js platform.
*   **Sanity Tooling**: Build a dynamic dashboard widget inside Sanity Studio utilizing the Sanity App SDK.

## 🎨 Current Frontend Focus (UI/UX)
*   **Activity Detail Pages**: Begin mapping dynamic GROQ queries to populate the `activity.ts` single-day detail pages.
*   **Dark-First Canvas Development**: Construct the main entry point UI, enforcing the `#0b0b0b` background and strategic use of the `#f36458` Coral-Red for primary conversion points. 
*   **UI Layout Protocol Pivot**: Rejected the interactive timeline. `itinerary.ts` will now utilize a static, high-end "Editorial Narrative" (blog-style) layout to ensure flawless mobile responsiveness and maintain the Quiet Luxury aesthetic.
*   **Component Constraint**: Removed the "Duration" dropdown from filter logic.
*   **Architecture Addition**: Added a mandatory "Manifesto / Our Blueprint" typographical section to the homepage layout.

## 🏢 Business & Legal Operations
*   **Entity Registration**: Complete the formal registration for the NZBN and establish the official business bank account.
*   **Legal Compliance**: Draft and finalize the liability waivers and terms of service for the bespoke expeditions.
*   **Vendor Agreements**: Formalize operational agreements with the curated, hyper-professional local operators.

## 🤖 Agent Workflow Sync
*   Ensure the local repository is actively pulling from the `AGENTS.md` constraints and maintaining alignment with this `.context/` directory structure.