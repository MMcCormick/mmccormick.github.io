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

# Production build
npm run prod
```

The Gulp pipeline compiles SCSS → `assets/css/main.min.css`, concatenates JS → `assets/js/app.min.js`, and runs Jekyll with incremental builds + BrowserSync.

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
Built and wired in (`_includes/section-playable.html`, `_data/playable.yml`).
Currently toggled **off** (`show_playable_card: false` in `_config.yml`).

**Flip it on when dm-assistant is live.** One entry reads as a hobby; two reads as a pattern.
The goal is a site worth sharing — live, observable projects drive that.

### Already live / shareable
- **Choice Rolls** (choicerolls.com) — AI text adventure with tabletop RPG mechanics.
  In `playable.yml`, will show when section is enabled.
- **remental-inc** — shareable game, needs content before it's worth driving traffic to.
- **collapse** — playable but not well-designed enough to drive traffic to yet.
- **key-agent** / **key-hunter** — small shareable tools; lower priority but ready.

### Coming next (will trigger enabling the section)
- **dm-assistant** — AI-powered D&D reference card tool (voice input, auto-surfaced cards).
  Deploying to Vercel once API key handling is flipped to client-side (localStorage).
  Label: "alpha." Add to `playable.yml` when live, then set `show_playable_card: true`.

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
