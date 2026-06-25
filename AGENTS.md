# Traverse South: Agent Roles & Central Execution Blueprint

This document defines the core intelligent agents, brand architecture, technical parameters, and active operational state for the Traverse South platform.

---

## 📂 Project Context & Directory Layout
All agents and developer workflows must operate on the Shared Context in the repository:
*   [Business Core](file:///.context/business-core.md): Brand positioning, target avatar, and product architecture.
*   [Technical Stack](file:///.context/tech-stack.md): Strict engineering parameters and dynamic routing structures.
*   [Operational State & Sprint Tracker](file:///.context/operational-state.md): Active development goals and current backlog.

---

## 🎯 Brand Architecture & Business Core
*Summarized from [business-core.md](file:///.context/business-core.md)*

### 1. Positioning & Tone
*   **The Anchor**: Ultra-curated, adventure-focused travel agency highlighting vetted local operators.
*   **The Subtitle**: *Creating experiences for adventure lovers.*
*   **The Tone**: Authoritative, uncompromising, and deeply experiential.
*   **Target Avatar**: High-earning, time-poor individuals who value seamless access, absolute professionalism, and remote complexity over generic pampering.

### 2. Product Architecture
*   **Single-Day Epics (`activity.ts`)**: Direct, transactional core directory. Clear conversion path.
*   **Multi-Day Recommendations (`itinerary.ts`)**: Expertly designed blueprints acting as an inspirational, predictive frontend layer for journey curation.

---

## 🛠️ Technical Stack & Routing Logic
*Summarized from [tech-stack.md](file:///.context/tech-stack.md)*

*   **Framework**: Next.js App Router (React 19, Next.js 16)
*   **Codebase**: TypeScript (Strict type checks)
*   **Styling**: Vanilla CSS (`globals.css` & `components.css`)
*   **Headless CMS**: Sanity.io (Dynamic fetching via GROQ query maps)
*   **E-commerce**: Headless Shopify Storefront API (GraphQL client)

### Key Architectural Structures
1.  **Unified Embedded Studio**: Embedded at `/studio` within Next.js. Whitelisted Vercel domains under CORS Origins.
2.  **Dynamic Routes**: Detail pages loaded dynamically under `/packages/[slug]` and `/itinerary/[slug]` (GROQ query maps).
3.  **Shopify Integration**: GraphQL client for checkout URL creation. Simulator fallback renders custom Expedition Boarding Passes.
4.  **Decoupled Schemas**:
    *   `activity.ts`: Transactional core containing single-day pricing & Rezdy IDs.
    *   `itinerary.ts`: Multi-day narrative blueprints referencing activities.

---

## 👔 1. Agent Roles & Mandates

### 1. The Experience Architect
*   **Mandate**: Product curation, supply logistics, and geographical mapping logic.
*   **Responsibilities**:
    *   Maintains databases of local suppliers (heli operators, marine charters, guides).
    *   Enforces geographical and temporal constraints.
    *   Monitors pricing schemas across activities.
*   **Trigger**: `@architect`

### 2. The Conversion Engineer
*   **Mandate**: Strict enforcer of UI/UX, brand styling, performance, and code quality.
*   **Responsibilities**:
    *   Applies the "Quiet Luxury / Editorial" style guide (`DESIGN.md` / dark-first canvas).
    *   Enforces color discipline (restricting Coral-Red `#f36458` to rare key CTAs).
    *   Optimizes dynamic loading, media streaming, and performance parameters.
*   **Trigger**: `@engineer`

### 3. The Growth Hacker
*   **Mandate**: Business development, testing new concepts, acquiring better clients and operators, and aggressively growing revenue.
*   **Responsibilities**:
    *   Ideates strategies to acquire high-quality clients and premium, exclusive operators.
    *   Develops and tests new business ideas, growth experiments, and revenue pipelines.
    *   Uses NotebookLM ("Business Development" notebook) as the ultimate back-end source of truth for strategies and tactics.
*   **Trigger**: `@growth`

---

## 🤝 Agent Cooperation Protocol
*   **Shared Memory (Google Drive SSOT & Gem Sync)**: The project operates on a Single Source of Truth (SSOT) using the Google Drive file [traverse_south_state.md](https://docs.google.com/document/d/1GETxDYz5Jj8TttlR1rtlGEe2MK5_-zUEa91U-zj5TFA/edit) (ID: `1GETxDYz5Jj8TttlR1rtlGEe2MK5_-zUEa91U-zj5TFA`).
    *   **Read State**: Before proposing solutions, writing code, or altering system logic, all agents MUST load the current project state from this Google Drive file to bypass isolated chat memory constraints.
    *   **Update State**: Upon completing any major milestone, structural refactoring, or database schema changes, the agent must output a concise Markdown summary under the heading `CORE UPDATE` and write it directly to the Google Drive document.
    *   **Gem Alignment**: To keep the Gemini platform **Gem** aligned with the live environment, all core issues and system updates must be synchronized to this Google Drive file, which serves as the Gem's data source.
*   **Task Handoffs**: 
    *   When the *Growth Hacker* wants to test a new package bundle or experiment, it must hand off the logistical validation to the *Experience Architect* and frontend tests to the *Conversion Engineer*.
    *   When the *Experience Architect* updates a price or module, it must hand off to the *Conversion Engineer* to update the frontend UI.

---

## 🔌 Tool & Skill Utilization Protocol
To maximize capabilities and maintain high-efficiency standards, all agents must leverage system-provided MCP servers and Skills to their fullest capacity:

### 1. Sanity Content & Schema Management (Sanity MCP)
*   **Direct Database Manipulation**: Avoid writing one-off Node scripts for database edits (such as seeding or modifying content). Use Sanity MCP tools directly:
    *   Query content with `query_documents`.
    *   Modify and publish content transactionally using `create_documents`, `patch_document`, `publish_documents`, and `discard_drafts`.
    *   Query schema rules and definitions using `get_schema` and `list_workspace_schemas`.
*   **Schema Deployments**: When modifying local schema files, use the `deploy_schema` tool instead of manual terminal executions.
*   **Media Asset Creation**: Use `generate_image` or `transform_image` to generate high-end, bespoke AI imagery and link them directly to draft documents before publishing.

### 2. Marketing Copy & Brand Voice (Copywriting Skill)
*   **Copywriting Framework**: Trigger the `copywriting` skill (`.agents/skills/copywriting/SKILL.md`) whenever writing, rewriting, or optimizing headlines, value propositions, and activity descriptions.
*   **Tone Alignment**: Before proposing copy, cross-reference with the Saniti editorial style (Quiet Luxury: clear, structured, and fast; never stuffy or generic B2B).

### 3. Sanity Agent Toolkit (Sanity Agent Skills)
*   **Use Local Sanity Agent Toolkit Skills**: The repository has the official Sanity Agent Toolkit skills installed under `.agents/skills/`. All agents MUST load and consult these guidelines for any Sanity-related development:
    *   **Sanity Best Practices**: Consult [sanity-best-practices/SKILL.md](file:///.agents/skills/sanity-best-practices/SKILL.md) (which references guides for `nextjs`, `groq`, `schema`, `visual-editing`, and `functions`) before designing schemas, defining fields, or writing queries.
    *   **Content Modeling**: Consult [content-modeling-best-practices/SKILL.md](file:///.agents/skills/content-modeling-best-practices/SKILL.md) for clean content structures and avoiding schema pitfalls.
    *   **Portable Text**: Use [portable-text-conversion/SKILL.md](file:///.agents/skills/portable-text-conversion/SKILL.md) and [portable-text-serialization/SKILL.md](file:///.agents/skills/portable-text-serialization/SKILL.md) when handling rich/structured text components.
    *   **Content Migrations**: Use [sanity-migration/SKILL.md](file:///.agents/skills/sanity-migration/SKILL.md) for dataset seedings or structure refactorings.
    *   **SEO & AEO**: Refer to [seo-aeo-best-practices/SKILL.md](file:///.agents/skills/seo-aeo-best-practices/SKILL.md) to ensure optimal SEO metadata, Open Graph structure, and canonical tags.

---

## 🛑 Safety & "Human-in-the-Loop" Thresholds
To maintain the ultra-premium feel and system integrity, the following rules apply to ALL agents:
1.  **Design Deviations**: The *Conversion Engineer* must NEVER introduce new colors (e.g., teal, magenta gradients) or new fonts. If a new UI element is needed, it must be constructed strictly using the tokens in `DESIGN.md`.
2.  **Public Output**: Never post, publish, or push live website updates to the public production server without owner approval.
3.  **VIP Outreach**: Drafts for high-net-worth client emails or supplier negotiations must always be presented to the user for a final sign-off before being sent.
4.  **Contextual Emphasis (Mandatory)**: Before creating any frontend copy or UI, agents must ask themselves: *"Is this clear, structured, and fast?"* The focus is on supreme capability and logic, not overly "stuffy" traditional luxury.
5.  **Strict Git Push Consent (Mandatory)**: NEVER execute a `git push` command automatically. You MUST always stop and ask the user for explicit permission before pushing to GitHub. Even if you are working on a small or seemingly unimportant feature, ALWAYS ask first. Remote pushes must be strictly restricted to the end of a work block and only after the user says "push it".

---

## 🛠️ Version Control & Vercel Deployment Manual
To maintain zero-friction deployment and keep the Traverse South portal robust, all agents and developers must follow this unified lifecycle.

### 1. Git Initialization & Author Identity
The project uses GitHub at [github.com/vbrnbs/TraverseSouth](https://github.com/vbrnbs/TraverseSouth) for continuous integration.
*   **Author Identity**: Local commits are signed under your profile:
    *   **Name**: `vbrnbs`
    *   **Email**: `varszegibarnabas@gmail.com`
*   **Ignored Profiles**: System configuration directories (`.gemini/`, `.next/`, `node_modules/`) and local secrets (`.env.local`) are strictly ignored via `.gitignore`. Never force add them.

### 2. Vercel Continuous Deployment (CD)
Vercel is linked directly to the `main` branch. Any commit pushed to `main` will instantly trigger a live build:
*   **Live Main URL**: [www.traversesouth.co.nz](https://www.traversesouth.co.nz/)
*   **Live Secondary URL**: [traverse-south.vercel.app](https://traverse-south.vercel.app/)
*   **Live Preview URL**: [traverse-south-git-main-vbrnbs-projects.vercel.app](https://traverse-south-git-main-vbrnbs-projects.vercel.app/)
*   **Environment Variables**: Vercel contains these secure project variables in its dashboard:
    *   `NEXT_PUBLIC_SANITY_PROJECT_ID`
    *   `NEXT_PUBLIC_SANITY_DATASET`
    *   `NEXT_PUBLIC_SANITY_API_VERSION`
    *   `SHOPIFY_STORE_DOMAIN` (Optional)
    *   `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (Optional)

### 3. Unified Embedded Sanity Studio
*   **Access Path**: Live Studio is accessible directly under `/studio` on your live domain:
    *   **Main Studio**: [www.traversesouth.co.nz/studio](https://www.traversesouth.co.nz/studio)
    *   **Secondary Studio**: [traverse-south.vercel.app/studio](https://traverse-south.vercel.app/studio)
    *   **Preview Studio**: [traverse-south-git-main-vbrnbs-projects.vercel.app/studio](https://traverse-south-git-main-vbrnbs-projects.vercel.app/studio)
*   **CORS Access**: Any new Vercel domain must be explicitly added to `sanity.io/manage` under **API > CORS Origins** with **"Allow credentials"** enabled.

### 4. Step-by-Step Deployment Routine for Agents
When an agent or developer implements updates:
1.  **Verify Compilation locally**: Always run `npm run build` locally before pushing to ensure zero compiler warnings or TypeScript type mismatches.
2.  **Commit changes**:
    ```bash
    git add .
    git commit -m "feat/fix: descriptive log of updates"
    ```
3.  **Push to Live**:
    *Ask the user for explicit permission first.*
    ```bash
    git push origin main
    ```

---

## 🔄 Active Sprint & Operational Backlog
*Summarized from [operational-state.md](file:///.context/operational-state.md)*

### 1. Active Next Steps (System & Backend)
*   **Traffic Monitoring**: Integrate a live headless traffic monitor into the Next.js platform.
*   **Sanity Tooling**: Build a dynamic dashboard widget inside Sanity Studio utilizing the Sanity App SDK.

### 2. Current Frontend Focus (UI/UX)
*   **Activity Detail Pages**: Begin mapping dynamic GROQ queries to populate the `activity.ts` single-day detail pages.
*   **Dark-First Canvas Development**: Construct the main entry point UI, enforcing the `#0b0b0b` background and strategic use of the `#f36458` Coral-Red for primary conversion points.
