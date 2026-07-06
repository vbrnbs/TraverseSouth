# The Halftime Review: Repeatable Mid-Sprint Methodology

This reference document defines the standard operating procedure for conducting a mid-sprint check-in (at the end of Week 1 of a 2-week sprint). 

## 🎯 Purpose & Philosophy
The solo developer-founder is susceptible to **developer drift**—the gravitational pull toward comfortable technical tasks (refactoring, UI polish, schema optimization) at the expense of uncomfortable revenue-generating activities (sales outreach, calling operators, lead generation).

The Halftime Review is designed to:
1. Audit actual velocity against planned sprint deliverables.
2. Uncover and redirect hidden developer drift.
3. Assess real-world bandwidth for the upcoming week.
4. Ruthlessly stack-rank remaining tasks using the **Sales Wolf Doctrine**.
5. Lock in immediate daily execution so the founder knows exactly what to do when they sit down at the keyboard.

---

## 📋 The 4-Step Interactive Interview

When running `@pm sprint review`, `@pm standup`, or checking in at the end of Week 1, the PM must run this as a **conversational, step-by-step interview**—asking **one question at a time**.

### Step 1: The Halftime Retro (Velocity & Drift Audit)
* **Action:** Query live Notion database ("Current Sprint Board") or read `.context/operational-state.md` and Google Drive SSOT to reconcile completed vs. lingering tasks from Week 1.
* **The Question to Ask:**
  > *"What actually shipped this week vs. what lingered? For any lingering tasks, what is left to cross the 'Good Enough' line—and be honest, did you get pulled into any non-sprint developer drift (like CSS tweaking, UI animations, or refactoring) instead of closing it out?"*
* **PM Coaching Rule:** If the founder did un-tracked developer work, acknowledge it but enforce the **Good Enough Gate**. Remind them: *A paying customer does not care what your schemas or internal code look like. If the site is functional and on-brand, close the book on code cleanup until there is revenue in the Wise account.*

### Step 2: The Energy Audit & Capacity Budget
* **Action:** Evaluate the founder's upcoming job schedule and personal energy levels to prevent burnout and setting unrealistic task lists.
* **The Question to Ask:**
  > *"What does your real-world work schedule and mental bandwidth look like for the next 7 days? Are we operating on Low Energy (hectic job/tired → need 🔥 small autopilot tasks), Normal Energy, or High Energy?"*
* **PM Coaching Rule:** If the founder reports a 50+ hour work week or low energy, immediately cap the Week 2 backlog. Remove or delegate heavy 🔥🔥🔥 tasks. Never schedule more than 3-5 focus items in a busy week.

### Step 3: Ruthless Stack-Ranking (The Sales Wolf Filter)
* **Action:** Take the remaining backlog and categorize tasks by the Priority Stack:
  * 🥇 **Sales Wolf Work:** Reaching out to operators, customer conversations, closing agreements.
  * 🥈 **Launch Blockers:** Critical checkout or lead-capture flows required for a client to book.
  * 🥉 **Delegation Setup / Low Energy Marketing:** Social media posts, delegating documentation or databases to AI agents.
  * 4th **Polish & Infra:** Code refactoring, UI polish (Strictly pushed to post-revenue backlog).
* **The Question to Ask:**
  > *"Here is your stack-ranked plan for Week 2. Are you willing to commit to executing the #1 Sales Wolf task (e.g., contacting operators/Jeremy) this week instead of hiding in 'getting ready' mode? And do we agree to delegate administrative/documentation work to your AI agents?"*
* **PM Coaching Rule:** Confront the **"I need to get ready"** hesitation. Remind the founder that they will never feel ready. Staggering outreach (e.g., contacting 1 key operator this week, and 3 more next week) is a encouraged, sustainable strategy to prevent meeting overload during heavy work weeks.

### Step 4: Daily Execution Lock
* **Action:** Eliminate startup friction by locking in the exact first task to execute.
* **The Question to Ask:**
  > *"When you sit down at your keyboard on your next day off or available work block, what is the exact ONE task you are executing first? (Recommendation: Execute the #1 Sales Wolf communication before touching code or Sanity Studio)."*
* **PM Coaching Rule:** Once the founder commits to the first execution step, celebrate immediate action (e.g., sending the text/email right away).

---

## 🛠️ Post-Review Execution & State Sync

Once the founder answers Question 4 and commits to the Daily Execution Lock, the PM must execute the following state synchronization:
1. **Local Task Board:** Generate/update `task.md` with the stack-ranked Week 2 items.
2. **Local Context:** Update `.context/operational-state.md` with Week 1 completed items and active Week 2 focus.
3. **SSOT Permission Check:** As required by `AGENTS.md`, explicitly ask the founder for permission to update the Google Drive SSOT (`traverse_south_state.md`) and push changes to GitHub.
4. **Notion Sync:** Update task statuses on the Notion Sprint Board when connected.
