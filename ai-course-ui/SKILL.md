---
name: ai-course-ui
description: Build course/lesson web pages in the "AI 通识课" (AI Literacy) house style — a Notion/Linear-minimal, bilingual (中/EN), progressive-depth reading UI. Use when creating or editing chapter pages, quizzes, labs, or index/landing pages under courses/*/ (or any static course content) for the Student Platform / StudyFlow, when the user asks for "the AI course style", "课程 UI 风格", "same style as the AI course", or when adding a new chapter/quiz/lab and it must match the existing design and interaction choreography.
---

# AI Course UI — design system & choreography

The reference implementation lives at
`C:\Users\Lucas\Desktop\Student Platform\courses\ai\`. Read the actual files
when in doubt — this skill is the distilled contract, not a replacement.

A **self-contained snapshot** of the canonical files is also bundled next to this
skill under `reference/` (css, js, glossary, plus `index.html`, a chapter, a
quiz, and a lab) so the design system can be consulted from anywhere, even when
the Student Platform repo isn't checked out. Treat the live project as source of
truth; refresh `reference/` if the originals change.

- Design tokens + components: `courses/ai/assets/css/style.css`
- Interaction behavior: `courses/ai/assets/js/app.js` (shared shape with
  `courses/investment/assets/js/app.js` — only `LANG_KEY`/`PROGRESS_KEY` differ)
- Canonical page: `courses/ai/chapters/ch1-what-is-ai.html`
- Glossary data: `courses/ai/assets/data/glossary.json`

**Golden rule:** never hand-write new CSS colors, radii, fonts, or shadows.
Everything routes through the CSS variables in `:root`. New components extend
`style.css`; pages only use existing classes + those variables in inline style.

---

## 1. Design language

**Aesthetic:** Notion/Linear minimal. Generous whitespace, hairline borders,
one warm accent, no gradients except the flagship card. Reading column is
narrow (`--max-w: 760px`); full-bleed sections use `--max-w-wide: 1080px`.

**Palette (light):** paper white `--bg #fff`, warm-gray text `--text #1f1d1a`,
Anthropic-ish warm orange accent `--accent #c2410c`. Semantic pairs each have a
solid + `-soft` tint: `--info/-soft`, `--success/-soft`, `--warning/-soft`,
`--danger/-soft`, `--accent-soft`. Dark mode is opt-in via
`:root[data-theme="auto"]` under `prefers-color-scheme: dark` — do not add a
manual dark toggle unless asked.

**Type:** Inter (sans) + JetBrains Mono (mono), loaded from Google Fonts with the
CJK fallback stack baked into `--font-sans`. Body 16px / line-height 1.7.
Headings 600 weight, tight `letter-spacing: -0.02em`. `h2` carries a top hairline
border as a section divider (first `h2` suppresses it). `h4` is an uppercase
label, not a heading.

**Motion:** subtle only — 0.15s transitions on hover/borders, `▸`→rotate on
`<details>`, `translateY(-2px)` card lift. No entrance animations.

---

## 2. Page skeleton

Every chapter page follows this exact shell (copy from `ch1`):

```html
<!DOCTYPE html>
<html lang="zh-CN" data-lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Ch N · 中文标题 · AI 通识课</title>
  <link rel="stylesheet" href="../assets/css/style.css">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
</head>
<body data-chapter-id="chN">        <!-- drives progress tracking -->
  <header class="topbar">…brand + nav + .lang-toggle…</header>

  <div class="with-toc">           <!-- 2-col grid: main + sticky TOC -->
    <main>
      <div class="chapter-header">…crumbs, h1, .subtitle, .chapter-meta…</div>
      <section id="slug">…</section>
      …
      <nav class="chapter-nav">…prev / next…</nav>
    </main>
    <aside class="toc">…on-this-page links…</aside>
  </div>

  <script src="../assets/js/app.js"></script>
  <script src="../assets/js/feedback-widget.js" defer></script>
</body>
</html>
```

Rules:
- `data-chapter-id="chN"` on `<body>` is what marks the chapter "read" (see §4).
- Scripts go at the very end of `<body>`; `app.js` first, `feedback-widget.js`
  `defer`. Relative paths are `../assets/...` from `chapters/`, `assets/...`
  from the course root (`index.html`). `app.js` fetches glossary from both.
- Index/landing pages use `.hero` + `.container-wide` instead of `.with-toc`,
  and no `data-chapter-id`.

---

## 3. Bilingual (中/EN) is mandatory — the core editorial rule

Every human-readable string ships in both languages, wrapped inline:

```html
<span class="zh-only">中文文案</span><span class="en-only">English copy</span>
```

- `[data-lang="en"] .zh-only` / `[data-lang="zh"] .en-only` are hidden by CSS.
- Default language is **zh** (`app.js` `initLang()` falls back to `'zh'`; the
  saved choice lives in `localStorage['course-lang']`, shared across courses).
- The `.lang-toggle` (中 / EN pill) toggles `data-lang` on `<html>` and persists.
- Never emit a visible string in only one language. This applies to titles,
  buttons, `<summary>`, table cells, quiz options, alt text — everything.
- Keep zh and en semantically equal; en may be terser but must not drop content.

---

## 4. Interaction choreography (from `app.js`, runs on `DOMContentLoaded`)

All behavior is delegated by class/data-attribute — you author markup, `app.js`
wires it. The boot order is: `initLang → initCopyButtons → paintProgressOnCards
→ initGlossary → initQuiz → initToc → (chapter read-marker)`.

1. **Language toggle** — see §3.

2. **Copy buttons** — two paths:
   - Any `[data-copy="#id"]` copies that element's text; `[data-copy="literal"]`
     copies the literal string. Button flips to `✓ Copied` for 1.4s.
   - Every `<pre>` auto-gets a `.code-header` bar with a Copy button unless it
     has `data-nocopy="true"` or already has a `.code-header` sibling. Set
     `data-lang="python"` on the `<pre>` to label the header.

3. **Progress tracking** — `localStorage['ai-course-progress']` (per course key).
   A chapter is marked read once you scroll past 80%. On the index, cards with
   `.card[data-chapter-id]` matching a read chapter get `.done` (green ✓), and
   `#progress-count` shows `done / total`. No backend — local only.

4. **Glossary popovers** — `<span class="term" data-term="key">显示文本</span>`.
   `app.js` looks up `key` in `glossary.json` (`{en, zhDef, enDef}`), builds a
   dark popover (English term in orange mono + definition in current language),
   click-to-toggle, click-outside closes. Add new terms to `glossary.json`; the
   markup carries only the key. Terms get a dashed blue underline.

5. **Quiz scoring** — `.quiz-q` blocks each hold `.quiz-opt` choices with
   `data-correct="true"` on the right one and optional `data-explain="…"`.
   Clicking paints correct/wrong and reveals `.quiz-feedback` (which can carry
   `data-right` / `data-wrong` fallbacks). Client-side, no submit.

6. **TOC active link** — `.toc a[href^="#"]` auto-highlights the section nearest
   the top on scroll (`.active`). TOC is `position: sticky`, hidden < 1000px.

---

## 5. Component vocabulary (use these; don't reinvent)

- **Callouts:** `.callout` + `.info|warn|danger|success|tip`; optional
  `.callout-title` (uppercase label). Left-border tinted box for asides.
- **Progressive-depth layers (the signature interaction):** `<details class="layer">`
  with a `<summary>` and a `.layer-body`. This is how the course does
  "beginner-friendly surface, university-depth underneath." Tag the depth with
  `<span class="layer-tag deep|source|lab">`. Layers nest (nested ones sit on
  `--bg-soft`). Default the intro content open in the flow; keep deep dives closed.
- **Chapter cards:** `.card-grid` of `<a class="card" data-chapter-id="chN">`
  with `.ch-num`, `h3`, `p`, `.ch-meta`. `.card.flagship` = accent gradient for
  the "next chapter" / star chapter. `.done` adds the ✓.
- **Prompt compare:** `.prompt-compare` → two `.prompt-box.bad` / `.good` with a
  `.label`, `.prompt-text` (mono), `.why`, and a `.prompt-copy` button. Use for
  bad-vs-good prompt teaching.
- **Code:** plain `<pre><code>` — the header/copy chrome is injected. Inline
  `<code>` is pink-on-tint. Use `.code-header` manually only for custom labels.
- **Lab steps:** `.lab-step[data-step="1"]` — numbered circle + left rail.
- **Roadmap:** `.roadmap-row` of `.roadmap-pill` (+ `.milestone`) joined by
  `.roadmap-arrow`. Three-stage "understand → use → build" path on the index.
- **Buttons:** `.btn`, `.btn-primary` (dark), `.btn-accent` (orange). 
- **Tables, blockquote, kbd, hr** are themed globally — just use the raw tags.

---

## 6. Responsive & a11y guardrails (already solved — don't regress)

- Phone breakpoint is `<=768px`; TOC drops at `<1000px`. `prompt-compare` goes
  single-column at `720px`.
- `html, body { overflow-x: clip }` on phones prevents glossary popovers and wide
  `<pre>` from causing horizontal scroll; `.with-toc > main { min-width: 0 }` lets
  the grid column shrink. Don't remove these — they fix real overflow bugs.
- Tables become horizontally scrollable on phones. Keep content in real `<table>`.
- There is a `@media print` block (hides nav/buttons, opens all layers). If you
  add chrome that shouldn't print, extend that block.

---

## 7. Adding a new chapter — checklist

1. Copy an existing `chapters/chN-*.html` as the skeleton; set `<title>`,
   `data-chapter-id`, crumbs, `h1`, `.subtitle`, `.chapter-meta`.
2. Write sections as `<section id="slug"><h2>NN · 中文<zh/en></h2>…</section>`,
   numbering headings `01 · / 02 · …`; mirror them in the `.toc` aside.
3. Put depth in `<details class="layer">`, not inline walls of text.
4. Wrap **every** string in `.zh-only` / `.en-only`.
5. Add any new jargon to `assets/data/glossary.json` and reference with `.term`.
6. Wire `.chapter-nav` prev/next and add/point the index `.card` + roadmap pill;
   update the `x / N` total if the chapter count changed.
7. If it has a quiz, add `quizzes/chN-quiz.html` using `.quiz-q` markup.
8. Verify with the preview tools (or `py app.py` / the courses service) at phone
   + desktop widths and toggle 中/EN before calling it done.

Keep `courses/ai` and `courses/investment` visually in lock-step; if you change a
shared component in one `style.css`/`app.js`, note the divergence.
