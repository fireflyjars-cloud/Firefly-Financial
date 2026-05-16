# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

No build system or package manager. Open `index.html` directly in a browser (double-click or use a local server like VS Code's Live Server extension). There are no dependencies to install.

## Architecture

Phase 1 is a **pure static web app** — no framework, no bundler, no npm. Three files compose the entire frontend:

- `index.html` — single-page layout: canvas animation, mason jar, header, five-jar grid, lamp card, footer
- `css/styles.css` — all styling (dark mythical night forest aesthetic, CSS animations, responsive layout)
- `js/app.js` — firefly canvas animation (particle system with gold/amber glowing dots); the `css/js/app.js` file is an orphaned artifact and not used

The `#fireflyCanvas` element is a full-viewport fixed canvas rendered behind all content (`z-index: 0`). All page content sits at `z-index: 1`.

## Brand & Design System

CSS custom properties defined in `:root` in `styles.css`:

| Variable | Value | Usage |
|---|---|---|
| `--teal` | `#00B4A6` | Tagline, The Lamp card, footer, percentages |
| `--pink` | `#FF6B9D` | Main section headings |
| `--gold` | `#FFD700` | H1 title, jar cards, jar borders |
| `--amber` | `#FFA500` | Firefly particle colors, jar glow |
| `--dark-green` | `#0D1F0F` | Body background (radial gradient center) |
| `--dark-card` | `#111827` | Card backgrounds |

Font: `Georgia, serif` throughout.

## Domain Knowledge — The Jarring Framework

The entire product is built around this financial system:

- **The Lamp** — the user's main living account. Goal: keep fixed living expenses at **≤50% of net income**. Crossing this threshold is "The Transformation Milestone."
- **The Five Jars** — each receives 10% of net income:
  - Genesis Jar™ — Investing & Multiplication (locked until goal reached)
  - Exodus Jar™ — Playing & Joy (spent completely each month)
  - Leviticus Jar™ — Learning & Self-Development
  - Numbers Jar™ — Savings & Discipline
  - Deuteronomy Jar™ — Giving & Generosity
- **12-Level Journey**: First Flicker → Flicker → Ember → Slow Burn → Flame → Torch → Lantern → Beacon → Wildfire → Swarm → Luminance → Firefly
- **Light Coins** — reward currency (named after *Orah*, Hebrew for light)
- Framework name derives from Hebrew *Yarah* (root of Torah) — to shoot an arrow straight and hit the mark

## Roadmap Context

- **Phase 1 (current)** — static web app, manual income entry, no bank connections
- **Phase 2** — read-only bank connection via Plaid, AI lead-nurturing agents
- **Phase 3** — real money movement, Firefly Houses, Firefly University, native iOS/Android

Features planned for Phase 1 but not yet built: ASMR pour animation (liquid flowing from Lamp into jars on income entry), streak tracking, Light Coins system, weekly quests, milestone rewards, community feed, content hub, AI assistant trained on the Jarring Framework.
