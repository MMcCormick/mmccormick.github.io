# CLAUDE.md — mmccormick.github.io

## Project Overview

Matt McCormick's personal portfolio site and long-term hub for all projects.
Jekyll static site with a Neumorphism dark theme, hosted on GitHub Pages at **mattcmccormick.com**.

Stack: Jekyll 3.9, SCSS, vanilla JS, Gulp build pipeline, Cloudflare Worker (AI chat).

**Site purpose:** Personal brand + "things you can try." One place that accumulates traffic
and contact info over time as multiple projects reach playable state. Studio naming is
deferred until something gets traction.

---

## Branch & Deployment Workflow

```
feature/branch  →  PR into main  →  PR main into production  →  live at mattcmccormick.com
```

- **`production`** — deploys to GitHub Pages (mattcmccormick.com). Never commit directly.
- **`main`** — integration branch. PRs go here first for review.
- Feature branches should be short-lived and named descriptively (e.g. `update-resume`, `fix-timeline-layout`).

### Git Rules

- Never push directly to `production` or `main`.
- Always work on a feature branch, then open a PR into `main`.
- When ready to deploy: PR `main` → `production`.
- Write concise, descriptive commit messages (imperative mood: "Add chat widget" not "Added chat widget").
- Do not force-push to shared branches.

---

## Development

```bash
# Install dependencies (first time or after gem changes)
bundle install
npm install

# Start local dev server at http://localhost:4000
npm run dev
```

The Gulp pipeline compiles SCSS → `assets/css/main.min.css`, concatenates JS → `assets/js/app.min.js`, and runs Jekyll with incremental builds + BrowserSync.

**`npm run prod` is currently broken** — it calls `gulp build`, but `gulpfile.js` only
registers a `default` task, so it exits with "Task never defined: build". `default` is
watch + serve, so there is no one-shot build command. To regenerate the committed
`assets/css/*.min.css` and `assets/js/*.min.js` artifacts today you have to run
`npm run dev` and stop it once compilation finishes. Worth fixing by exporting a real
`build` task; note the `jekyll` task hardcodes `--config=_config.yml,_config_dev.yml`,
so a genuine production build needs a variant without the dev override.

Note: `_config_dev.yml` overrides are applied locally. It disables `show_os_projects` to avoid needing a GitHub API token in development.

---

## Key Files & Structure

```
_config.yml              # Site settings, section toggles, chat_worker_url
_config_dev.yml          # Local dev overrides (not deployed)
_data/
  resume.json            # Full resume: experience, education, projects, interests
  projects.yml           # Portfolio projects shown in Projects section
  timeline.yml           # Career timeline entries
  about_content.yml      # About Me section body text
  skills-languages.yml   # Language skills with weights
  skills-frameworks.yml  # Framework skills with weights
  skills-tools.yml       # Tool skills with weights
_layouts/
  default.html           # Main page layout (all sections + chat widget)
_includes/
  chat-widget.html       # AI chat widget (self-contained: HTML + CSS + JS)
  section-*.html         # Individual page section components
_sass/main.scss          # All custom styles
_js/app.js               # Main JS (particles, typing effect, AOS, skills)
worker/
  index.js               # Cloudflare Worker — AI chat backend
  wrangler.toml          # Worker deployment config
```

---

## AI Chat Widget

The chat widget (`_includes/chat-widget.html`) is a floating panel that calls a Cloudflare Worker, which proxies to the Anthropic API (Claude Haiku) with a system prompt containing Matt's full bio and resume data.

**To enable:** Set `chat_worker_url` in `_config.yml` to the deployed worker URL.
**Widget renders only if `chat_worker_url` is set** — blank disables it silently.

### Cloudflare Worker

```bash
cd worker
npx wrangler deploy                       # deploy
npx wrangler secret put ANTHROPIC_API_KEY # set API key (one-time)
```

The worker URL and ANTHROPIC_API_KEY are the only secrets. The key is stored as a Cloudflare Worker secret and never exposed to the client.

If you update Matt's data (resume, projects, etc.), update the system prompt in `worker/index.js` and redeploy the worker.

---

## Design System

Dark Neumorphism theme:
- Background: `rgba(43, 45, 47, 1)` (#2b2d2f)
- Primary accent: `#07c0ff` (cyan)
- Text: `#fff`
- Font: Raleway (body), Josefin Sans (numbers)
- Cards use `box-shadow` for neumorphic depth, `border-radius: 2rem`
- Skill colors: languages `#4a7bd9`, frameworks `#07c0ff`, tools `#7ad9c2`

---

## Content Updates

All content is data-driven — edit the files in `_data/` rather than HTML:
- Resume/experience → `_data/resume.json`
- Projects section → `_data/projects.yml`
- Timeline → `_data/timeline.yml`
- About text → `_data/about_content.yml`
- Skills → `_data/skills-languages.yml`, `skills-frameworks.yml`, `skills-tools.yml`
- Site title, social links, section toggles → `_config.yml`

After updating `_data/resume.json` or other data files, also update the system prompt in `worker/index.js` so the AI assistant stays in sync.

---

## Playable Projects

A key goal for this site is a "things you can try" section — honest alpha/beta labels,
one-line description, direct link. Don't add a project until someone other than Matt
can actually use it. Don't over-design it — a simple grid is fine.

### "Things You Can Try" section
Built, wired in, and **live** (`show_playable_card: true` in `_config.yml`).

- `_data/playable.yml` holds the entries. **The project-tracker README is the source
  of truth**, not this file. Live urls belong in the tracker's `Live` field; this file
  is an export of it.
- `_includes/section-playable.html` renders it. The CTA ("Try It") only renders when
  `url` is set, so an entry with no url shows as a card with no link.

**Export rule.** A tracker entry appears here only when it has **both** `Publish: yes`
**and** a non-empty `Live:` url. `Publish: yes` alone is intent, not availability, and
publishing a card nobody can click breaks the "don't add it until someone else can use
it" rule above. Field mapping:

| `playable.yml` | project-tracker |
|---|---|
| `name` | `Title` if set, else the `###` heading (e.g. `airpg` → "Choice Rolls") |
| `phase` | `Phase` (derived from Core + Share; provenance only, not rendered) |
| `tagline` | `Tagline` |
| `url` | `Live` |
| `last_updated` | `Last Updated` (provenance only, not rendered) |
| `label` | **no tracker source** |

`label` is the one editorial field: the alpha/beta/live badge is a judgment call about
how much polish to promise, so it is hand-set here and an export must preserve existing
values rather than overwrite them. Note it does not track `phase`, and shouldn't:
Choice Rolls is `phase: building` but labeled "beta".
- Styles live under `/* Playable Section */` in `_sass/main.scss`: `.playable-grid`,
  `.playable-item`, `.playable-header`, `.playable-label`, `.playable-desc`,
  `.playable-cta`. The grid mirrors `.projects-wrapper` responsive behavior (stacked
  on mobile, 44/45/46% two-up at each breakpoint).

`assets/css/main.min.css` is a committed build artifact, so any SCSS change has to be
compiled and committed alongside it (see the broken `npm run prod` note above).

### Already live / shareable
- **Choice Rolls** (choicerolls.com) — AI text adventure with tabletop RPG mechanics.
  In `playable.yml`, label "beta."
- **dm-assistant** (dm-assistant-psi.vercel.app) — AI-powered D&D reference card tool
  (voice input, auto-surfaced cards). In `playable.yml`, label "alpha."
- **remental-inc** — next one up, but **not deployed anywhere yet**. Tracker has
  `Publish: yes` with an empty `Live:`, so the export rule correctly excludes it.
  It is deploy-ready (SvelteKit on `adapter-auto`, no blockers), so `vercel --prod`
  from the repo should be all it takes. Put the resulting url in the tracker's
  `Live` field, not directly in `playable.yml`, then re-export.
- **collapse** — playable but not well-designed enough to drive traffic to yet.
- **key-agent** / **key-hunter** — small shareable tools; lower priority but ready.

### Playable but not yet public
- **job-ops** — email/job tracking tool, Core: yes. Deciding between product and OSS.
  Strong non-game candidate once direction is clearer.
- **blades** — game, Core: yes. Polish pass needed.
- **chat-hacker** — game, Core: yes, currently broken. Fix the blocker first.

### On the roadmap (not linkable yet)
- **terminal-dancer** — cyberpunk dark net game. CLI-only; needs web port.
- **simperium** — Roman life sim. Terminal-only for now, longer road to web.

### What not to do
- Don't create a separate studio site until something has return visitors.
- Don't add a project link until someone other than Matt can actually use it.
- Don't rename or rebrand Choice Rolls on this site — it's established enough to keep as-is.
