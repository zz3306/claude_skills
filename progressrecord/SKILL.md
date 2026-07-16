---
name: progressrecord
description: Update the project's PROGRESS.md file to record what has been completed in the current session, what's next, and any locked-in decisions. Use this when the user says "save progress", "记录进度", "/progressrecord", or after completing a meaningful chunk of work that the next Claude session should pick up from. The goal is for the next session to read PROGRESS.md once and continue without re-asking decisions.
---

# progressrecord — Save session progress so next Claude can resume

## When to use

- User explicitly invokes `/progressrecord` or says "save progress" / "记录进度" / "save your progress"
- After finishing a meaningful chunk of work (a feature, a milestone, a multi-step task)
- Before the user says they'll come back later
- When you've made decisions in this session that the next session must respect (architectural choices, scope cuts, vendor selection)

## What to do

1. **Find or create `PROGRESS.md` at the project root.**
   - Check the current working directory first.
   - If it doesn't exist, create it.
   - If it exists, read it first — preserve the structure and update sections.

2. **Update these sections** (create them if missing):

   ### Project status header
   - Last updated date
   - Current phase / milestone
   - User's stated priority order if any

   ### Locked decisions (DO NOT re-litigate)
   - Architectural choices the user has confirmed
   - Vendor / tool selection
   - Scope cuts ("X is deferred to V2")
   - Anything the user said "yes go with that" to

   ### Completed
   - File-by-file list with markdown links to paths, grouped logically (config / DB / UI / etc.)
   - Brief one-line note on what each thing does

   ### In progress / TODO
   - Current task with clear acceptance criteria
   - Remaining tasks in the user's stated priority order
   - Each item: checkbox + brief description

   ### How to resume (for next Claude)
   - One-line "how to run the project locally"
   - Pointer to README and key files
   - Reminder: "decisions are locked — see Locked decisions"
   - Reminder: where to find the next task

   ### Notes for future Claude
   - User personality / preferences observed this session
   - Anti-patterns to avoid (what the user has rejected)
   - Domain quirks (if user is non-technical, language preference, etc.)

3. **Be concrete, not vague.**
   - ❌ "Built some pages"
   - ✅ "Built [app/students/[id]/page.tsx](app/students/[id]/page.tsx) — student detail with enrollment cards + share button"

4. **Don't duplicate the README.** PROGRESS.md is session continuity, README is project documentation. Cross-link rather than copy.

5. **After updating, tell the user**: 1-2 sentence summary of what was saved + what the next step is.

## What NOT to do

- Do NOT push PROGRESS.md to git unless the user asks.
- Do NOT include credentials, tokens, or secrets in PROGRESS.md.
- Do NOT include conversation transcripts — only outcomes.
- Do NOT include experimental ideas the user rejected — only locked decisions.
- Do NOT create PROGRESS.md in a directory other than the project root.

## Example trigger phrases

- "记录进度"
- "save progress"
- "save your progress too"
- "/progressrecord"
- "next time you should know..."
- "remember this for next session"

## Format conventions

- Use markdown links with relative paths: `[file.ts](path/to/file.ts)`
- Use checkboxes for TODOs: `- [ ]` and `- [x]`
- Use tables for "Decision | Reason" pairs
- Date format: `YYYY-MM-DD`
- Keep each section scannable — bullets, not paragraphs

## Reading PROGRESS.md at session start

If you're a fresh Claude session and you see `PROGRESS.md` in the project root, **read it first** before asking the user "what should we do?". The user has already decided. Your job is to execute the next unchecked TODO under their priority order.
