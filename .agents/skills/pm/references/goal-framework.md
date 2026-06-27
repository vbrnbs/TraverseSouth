# Goal Framework & Planning Templates

Reference document for the PM's structured planning methodology. Consult this when decomposing goals, running sprint ceremonies, or evaluating task completion.

---

## Quarterly Goal Template

```markdown
# Q[N] Goal: [One-sentence goal]

**Success Criteria:** [How do we know this is achieved?]
**Key Results:**
1. [Measurable outcome #1]
2. [Measurable outcome #2]
3. [Measurable outcome #3]

**Set with:** @growth on [date]
**Review date:** [end of quarter]
```

### Current Active Goal (Q3 2026)

```markdown
# Q3 Goal: Get My First Paying Customer

**Success Criteria:** At least one real customer completes a booking through Traverse South and pays.
**Key Results:**
1. Minimum 3 bookable activities live with working checkout (Rezdy integration)
2. At least 1 real operator agreement signed
3. At least 5 qualified leads generated (human conversations, not bot traffic)

**Set with:** Founder on 2026-06-27
**Review date:** 2026-09-30
```

---

## Sprint Planning Template

```markdown
# Sprint [N] — [Date Range]

**Sprint Goal:** [One sentence connecting to quarterly goal]
**Capacity:** [Estimated energy budget based on upcoming 2 weeks]

## Deliverables
| # | Task | Energy | Status | Connects To |
|---|------|--------|--------|-------------|
| 1 | [Task name] | 🔥/🔥🔥/🔥🔥🔥 | Backlog | KR#[n] |
| 2 | ... | ... | ... | ... |

## Delegation Candidates
- [Task that @engineer can handle]
- [Task that @architect can validate]

## Sales Wolf Tasks (Non-Negotiable)
- [At least 1 outreach/customer/operator task per sprint]
```

---

## Weekly Focus Template

```markdown
# Week of [Date]

**Available Energy:** [Low / Normal / High — based on work schedule]
**This Week's 3-5 Tasks:**

1. 🔥 [Small task]
2. 🔥🔥 [Medium task]  
3. 🔥 [Small task]

**Today's Focus (1-2 items):**
- [ ] [Most important thing]
- [ ] [Second if there's time]

**Am I drifting?** [Yes/No — if yes, what toward?]
```

---

## "Good Enough" Checklists

### UI / Frontend Work
- [ ] On-brand? (Dark canvas `#0b0b0b`, correct fonts, Coral-Red `#f36458` used sparingly)
- [ ] Functional? (Loads correctly, displays real data, all links work)
- [ ] Responsive? (Doesn't break on mobile viewport)
- [ ] Accessible? (Basic — readable contrast, clickable targets)
→ **All checked? Ship it.** Pixel-perfect polish is a post-revenue luxury.

### Schema / Backend Work
- [ ] TypeScript types are strict and correct?
- [ ] GROQ queries return the expected data shape?
- [ ] Content can be created, edited, and published in Sanity Studio?
- [ ] No build errors or type mismatches?
→ **All checked? Ship it.** Query optimization comes after revenue.

### Content / Copy
- [ ] Matches the "Quiet Luxury" brand voice? (Authoritative, not stuffy)
- [ ] Has a clear call-to-action?
- [ ] Factually accurate about the activity/itinerary?
- [ ] No placeholder text remaining?
→ **All checked? Ship it.** A/B test after you have traffic.

### Business / Legal / Operations
- [ ] Filed / Sent / Signed / Submitted?
→ **Done. Move on.** Don't over-research. Take action.

### Operator Outreach
- [ ] Message is personalized (not generic)?
- [ ] Clearly states what Traverse South offers them?
- [ ] Includes a specific ask (meeting, rate sheet, partnership)?
→ **Send it.** Don't draft it 5 times. Send the first good version.

---

## Sprint Ceremony Prompts

### Weekly Standup (Async)
Run this at the start of each week or when the founder asks "what should I work on?"

**Questions to ask:**
1. "What shipped since your last check-in?"
2. "What's blocked right now?"
3. "Be honest: are you working on something that's not in the sprint?"
4. "What's your energy level this week? (Low / Normal / High)"

**Output:** Updated weekly focus with 1-2 daily tasks sized to available energy.

### Fortnightly Sprint Planning
Run every two weeks or when the founder asks for a new sprint.

**Process:**
1. Review the quarterly goal — is it still the right goal?
2. Consult `@growth` for strategic input: "What's the highest-leverage thing we can do in the next 2 weeks to move toward [quarterly goal]?"
3. List candidate tasks
4. Filter through the Sales Wolf doctrine: Revenue Impact → Delegation Potential → Good Enough Test
5. Energy-size each task
6. Cap at 5-8 deliverables
7. Include at least ONE Sales Wolf task (outreach, pitch practice, content publishing)
8. Write sprint backlog to Notion / SSOT

### Sprint Review / Retro
Run at the end of each sprint or when the founder asks for a review.

**Questions:**
1. "What shipped this sprint? List each deliverable."
2. "What didn't ship? Why not?"
3. "How much time was spent on non-sprint items? (Drift report)"
4. "Velocity check: [X] tasks completed out of [Y] planned."
5. "The hard question: Did you spend more time building or selling this sprint?"

**Output:** Sprint summary with velocity metrics, drift analysis, and recommendations for next sprint.

---

## The Priority Stack (Reference)

When multiple tasks compete for attention, stack-rank by this order:

| Priority | Category | Examples |
|----------|----------|----------|
| 🥇 | **Sales Wolf Work** | Customer outreach, operator conversations, pitch refinement, content publishing, responding to leads |
| 🥈 | **Launch Blockers** | Tasks required for a customer to book and pay (checkout flow, live activities, operator agreements) |
| 🥉 | **Delegation Setup** | Configuring AI agents, automating repetitive tasks, documenting processes for future team members |
| 4th | **Polish & Infra** | Code refactoring, design polish, architectural improvements, tooling. **Backlog only.** |

If a lower-priority item is being worked on while a higher-priority item exists — that's drift. Intervene.
