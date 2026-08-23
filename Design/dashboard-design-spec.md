# Design Specification — Indore Rainfall & Flood Risk Platform

## 0. Why this looks different from your references

| Site | What it actually is | What I'm deliberately NOT copying |
|---|---|---|
| flood.neer.io | A statewide open-data atlas — journalistic, stat-heavy, "here is everything we know" | The infinite-scroll wall of numbers and the muted blue-on-white "research report" look |
| weatherex.ai | Consumer forecast product | The generic SaaS-dashboard card grid (rounded cards, soft shadows, no identity) |
| skymetweather.com | Ad-supported daily forecast portal | The dense newspaper-table layout and stock blue/white weather-app palette everyone uses |
| mumbaiflood.in/nowcast | Ops nowcast console | The dark, map-first "control room" screen |

Your project is none of these. It's a **live research instrument with a visible paper trail** — a model that is actively being built, validated against ground truth, and rolled out in phases. Nobody else's site tells that story, so the design should be built around *that*, not around "flood website" as a genre.

---

## 1. Design tokens

### Color — "Monsoon instrument" palette (bright, no black)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F6F8F6` | Page background — pale overcast-sky white, not stark white |
| `--surface` | `#FFFFFF` | Cards, panels |
| `--ink` | `#16232E` | Body text — deep indigo-slate, never pure black |
| `--ink-muted` | `#5B6B76` | Secondary text, captions |
| `--teal` (primary brand) | `#0E7C86` | Header, primary buttons, links, Phase 1 identity |
| `--teal-deep` | `#0A5D66` | Hover states, active nav |
| `--sky` | `#3FB6D3` | Data highlights, live pulse indicator, charts |
| `--ochre` (secondary) | `#D98E3F` | Phase 2 identity, warnings, "future/in progress" tags |
| `--risk-low` | `#3FA66D` | Low flood risk |
| `--risk-med` | `#E0A73A` | Medium flood risk |
| `--risk-high` | `#D9553B` | High flood risk |
| `--locked` | `#B9C2C6` | Phase 3 (disabled) elements, on light background |

No black anywhere — deepest tone in the system is `--ink` at `#16232E`, a blue-charcoal, used only for text.

### Typography

- **Display / headings:** `Space Grotesk` — geometric, slightly technical, reads like instrumentation rather than a magazine. Used bold, tight tracking, restrained (headlines and section labels only).
- **Body:** `Inter` — neutral, highly legible at small sizes for dense data contexts.
- **Data / readouts:** `IBM Plex Mono` — used specifically for numbers that are *measurements*: rainfall mm, coordinates, percentages, git commit hashes, timestamps. This is the detail that makes the dashboard feel like real instrumentation instead of a marketing site — a number in mono type reads as "measured," a number in Inter reads as "written."

### Signature element — the Isohyet Ring

Meteorologists draw **isohyets** (contour lines connecting points of equal rainfall) and **TPI contour lines** (topographic position). Since both are literally inputs to your model (rainfall, elevation/TPI), the recurring visual motif across the whole site is a **set of thin concentric contour rings**, used as:
- background texture behind the landing hero metric
- the shape of the circular gauge dial used for confidence/accuracy scores (instead of a generic donut chart)
- the connecting line style in the Progress Flow timeline (a contour line linking versions, not a straight rail)

This one motif ties your literal science (contours = TPI, isohyets = rainfall) to the visual identity, so it's not decoration — it's structure that encodes what the model actually does.

---

## 2. Site map (as you defined it)

```
WEBSITE
├── 1. Landing            — current best approach + achievements
├── 2. Progress Flow      — version history / research log
├── 3. About Us           — placeholder
└── 4. Main Dashboard
      ├── Phase 1  Rainfall Prediction     🟢 LIVE     (teal)
      ├── Phase 2  City Flood Risk         🔵 FUTURE   (ochre, "in development")
      └── Phase 3  India Scale             🔴 DISABLED (locked grey)
```

Global nav (persistent, all pages): `Home · Progress · About · Dashboard →` — the dashboard CTA is always the teal filled button; everything else is text links. This makes it unambiguous that the dashboard is the product and the other three pages are context around it.

---

## 3. Page 1 — Landing

**Job:** convince a visitor (funder, collaborator, official) that this is a serious, evolving, evidence-based system — in under 60 seconds of scrolling.

```
┌──────────────────────────────────────────────────────┐
│  NAV: Logo   Home Progress About   [Enter Dashboard]  │
├──────────────────────────────────────────────────────┤
│   HERO (isohyet rings behind text, teal→sky gradient  │
│   confined to a thin band, not full-bleed)            │
│                                                        │
│   "Rainfall and flood risk for Indore,                │
│    modeled and measured."                             │
│                                                        │
│   Current best model · v0.6 · validated against       │
│   IMD gauge data                                      │
│                                                        │
│   [ 52.4mm ]   [ XX% confidence ]   [ v0.6 ]           │
│   (three mono-type stat chips, not icons+numbers)      │
│                                                        │
│   [Enter Dashboard →]   [See how we got here]         │
├──────────────────────────────────────────────────────┤
│   THE PROBLEM → OUR APPROACH (horizontal rail,         │
│   connected by a thin contour line, 5–6 stops):        │
│                                                        │
│   Problem → Existing approaches → Our initial          │
│   approach → Experiments → Best methodology → Why      │
│   it's better                                          │
│                                                        │
│   Each stop = short label + 1-line description,        │
│   expands on click (accordion), not a wall of text     │
├──────────────────────────────────────────────────────┤
│   CURRENT METRICS PANEL                                │
│   Model vs observed (small line chart) · accuracy      │
│   gauge (isohyet-ring dial) · last validated date       │
├──────────────────────────────────────────────────────┤
│   WHY THIS APPROACH IS BETTER (3 short cards)          │
│   — grounded in your actual pipeline, e.g.:            │
│   "Rain-on-grid hydrology + hydraulics solved           │
│    together" / "Validated against real IMD gauges,     │
│    not just model output" / "Built for Indore's own    │
│    terrain, not adapted from elsewhere"                │
├──────────────────────────────────────────────────────┤
│   FOOTER: sources (ERA5, IMD, CMIP6), contact, link     │
│   to Progress Flow and API (future)                    │
└──────────────────────────────────────────────────────┘
```

Key rule: this page is **regenerated content, not static copy** — every field above (v-number, mm value, confidence %, "why it's better" cards) should pull from a small config/JSON your team updates each time the model improves, so the landing page is never stale relative to the dashboard.

---

## 4. Page 2 — Progress Flow

**Job:** show the model has a rigorous, inspectable history — not "trust us," but "here's every step."

```
┌──────────────────────────────────────────────────────┐
│  "How we got here" — a research log tied to commits    │
│                                                        │
│   ●──── v0.1  Baseline ERA5 model                     │
│   │           What changed · Why · Metric Δ · date     │
│   │           [commit abc123f]                         │
│   │                                                    │
│   ●──── v0.2  Better preprocessing                     │
│   │           ...                                      │
│   ┊  (contour-line connector, not a plain vertical bar) │
│   │                                                    │
│   ●──── v0.6  Spatial component        ★ CURRENT BEST  │
│           highlighted card, teal border, live badge     │
└──────────────────────────────────────────────────────┘
```

Each entry is a card with a fixed schema so it never becomes a wall of prose:
`Version · What changed · Why · Method · Metric before → after · What we learned · Commit / date`

The "metric before → after" is rendered as a small inline mono-type delta (e.g. `RMSE 4.2 → 3.1 mm`, colored `--risk-low` green if it improved), which lets a reader scan the whole page for "is this getting better" without reading every card.

Filter bar at top: All · Model architecture · Data · Validation — since commits will eventually be numerous, group by type.

---

## 5. Page 3 — About Us

Reserved, minimal: logo mark, one-line mission statement, empty team-grid placeholder (avatars as blank isohyet-ring circles ready to be filled in later), contact email. No further design investment until you have content — but the empty state should still look intentional, not broken, so use the same ring motif as a placeholder avatar rather than grey boxes.

---

## 6. Page 4 — Main Dashboard

Persistent phase-switcher at the top, styled as a **gauge selector** (three arcs of a dial, not tabs) — Phase 1 lit teal, Phase 2 dimmed ochre outline, Phase 3 dimmed grey outline with a lock glyph. This single control communicates "one system, three stages of readiness" better than a tab bar would.

```
┌──────────────────────────────────────────────────────┐
│   ⬤ PHASE 1        ○ PHASE 2         ○ PHASE 3         │
│   Rainfall · LIVE   Flood Risk        India · Locked    │
└──────────────────────────────────────────────────────┘
```

### 6.1 Phase 1 — Rainfall Prediction (LIVE)

```
┌───────────────────────────┬──────────────────────────┐
│ Location: [ Indore ▾ ]     │  Last updated: 12 min ago │
├───────────────────────────┴──────────────────────────┤
│  PRIMARY READOUT (mono type, large)                     │
│    52.4 mm               Confidence: 82%                │
│    forecast, next 24h    (isohyet-ring dial, not a       │
│                            plain progress bar)            │
├────────────────────────────────────────────────────────┤
│  FORECAST GRAPH — model line (teal, solid) vs             │
│  observed gauge (sky, dotted) plotted together —          │
│  this pairing IS the validation story, always visible,    │
│  never a separate hidden tab                              │
├────────────────────────────────────────────────────────┤
│  MAP — rainfall distribution across Indore, isohyet        │
│  contour shading (not a generic heatmap gradient)          │
├──────────────┬──────────────┬───────────────────────────┤
│ Nearest gauge│ Model vs obs.│ Prediction metrics          │
│ IMD Station 3│ MAE 3.1 mm   │ RMSE, bias, last validated  │
└──────────────┴──────────────┴───────────────────────────┘
```

Validation is not a footnote here — the model-vs-observed comparison sits directly under the headline number, because your architecture doc explicitly says this phase must be "validated against real observations, rather than simply displaying model output." The design should make that impossible to miss.

### 6.2 Phase 2 — City Flood Risk (future, shown as a preview state)

```
┌────────────────────────────────────────────────────────┐
│   INDORE — ward-level flood risk                          │
│                                                            │
│   [ Map: wards colored by risk-low/med/high ]              │
│                                                            │
│   Click a ward → side panel opens:                         │
│   ┌─────────────────────────────┐                          │
│   │ Ward 4                        │                        │
│   │ Risk: HIGH  ●●●               │                        │
│   │                                │                        │
│   │ Hazard    = R × W × S          │                        │
│   │ Vulnerab. = D×NDVI×NDWI×E×TPI  │                        │
│   │ Exposure  = Population         │                        │
│   │ Risk      = H × V × E (AHP)    │                        │
│   │   weights 0.80 / 0.15 / 0.05   │                        │
│   │                                │                        │
│   │ Contributing factors:          │                        │
│   │  Rainfall ▓▓▓▓▓▓░░ high         │                        │
│   │  Elevation ▓▓░░░░░░ low         │                        │
│   │  Distance to water ▓▓▓░░░ med   │                        │
│   └─────────────────────────────┘                          │
└────────────────────────────────────────────────────────┘
```

This is the single most important design decision in the whole spec: **show the equation, not just the output.** Most flood tools (including your references) show a colored map and hide the model behind it. Because your architecture doc gives you an actual formula (`Risk = H × V × E`, AHP-weighted), the ward side-panel should show that formula populated with real per-ward values — it turns a black-box color into an auditable, explainable score. That's a genuine differentiator, not a cosmetic one.

Bar-style mini indicators (rainfall, elevation, distance-to-water, NDVI/NDWI) let a non-technical viewer see *why* a ward is high-risk without reading the equation.

### 6.3 Phase 3 — India Scale (disabled)

```
┌────────────────────────────────────────────────────────┐
│         ⬡ INDIA-WIDE — coming after Phase 1 & 2           │
│                                                            │
│   A faded outline map of India, greyed (--locked),         │
│   with Indore lit as a single teal dot — literally          │
│   showing "this is where we are now, this is the scale     │
│   we're building toward."                                  │
│                                                            │
│   Indore → multiple cities → multiple states → India        │
└────────────────────────────────────────────────────────┘
```

Don't hide Phase 3 entirely — showing it locked, with the single lit dot on the map, tells the roadmap story in one image instead of a bullet list.

---

## 7. Component notes that carry through every page

- **Buttons:** solid teal `--teal` for primary actions, single pill radius (8px), no gradients — gradients read as generic SaaS.
- **Risk/status colors are the only saturated colors on the page.** Everything else (chrome, backgrounds, nav) stays in the muted teal/ink/grey range, so when a ward shows red it actually reads as alarming, not just "another colored box."
- **Numbers that are measurements are always mono type.** Numbers that are labels/counts (like "3 wards") stay in Inter. This distinction is small but consistent and reinforces "this is a scientific instrument."
- **The contour-ring motif** shows up at low opacity (5–8%) as background texture on hero/empty states only — never as foreground decoration competing with data.
- **Motion:** keep it to two moments — (1) the confidence/accuracy dial fills in on load, (2) the forecast graph's observed-vs-model lines draw in sequence (model line first, then observed line overlays, visually enacting "here's our prediction, here's how it checked out"). No other animation — a research dashboard that fidgets undermines its own credibility.

---

## 8. What to hand to a builder/prompt

If you're pasting this into a page-builder or another AI tool, the one-paragraph brief is:

> Build a bright (no dark theme), professional research dashboard for a rainfall/flood-risk model in Indore. Palette: pale sky-white background (#F6F8F6), deep indigo-slate text (#16232E), teal primary (#0E7C86), sky-cyan data accent (#3FB6D3), ochre secondary for "in development" states (#D98E3F), and green/amber/red only for risk levels. Headings in Space Grotesk, body in Inter, all measured numbers in IBM Plex Mono. Recurring visual motif: thin concentric contour rings (isohyet/TPI lines), used as gauge dials and background texture — never as decoration. Four pages: Landing (current best model + achievements), Progress Flow (version history styled as a research log with metric deltas), About (placeholder), and a Main Dashboard with a phase-selector styled as a dial: Phase 1 Rainfall Prediction (live, model-vs-observed always visible next to the headline number), Phase 2 City Flood Risk (ward map where clicking a ward shows the actual Hazard × Vulnerability × Exposure equation populated with real values, AHP-weighted), Phase 3 India Scale (locked, shown as a greyed map with Indore lit as a single dot).
