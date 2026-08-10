# Project Spec: A11y Test Kitchen

> Re-read this file in full at the start of every implementation task.
> The spec guides the build. **Once implementation exists, reproducible code behavior stays the source of truth.**
> `roadmap.md` owns sequence and status; this file owns product requirements.

---

## Spec Status Card

```text
FEATURE: A11y Test Kitchen (full site)
NEEDS A SPEC: Yes
GOAL LINE: Written
SPEC DRAFT: Done
ROADMAP: Done (/roadmap.md)
PLANNING PACK: Accepted as the reference-slice implementation baseline
CODE: Deterministic v1 candidate implemented; manual release matrix pending
SOURCE SEARCH: No matching shell or Station 01 found under /Users/ryanjohnson/Projects on 2026-08-08
WORKING BASELINE: Greenfield, accepted in DEC-004
SPEC IN REPO: Yes (/specs/PROJECT.md)
```

---

## Goal

A public website where a visitor uses a deliberately broken interface, then uses the fixed version of the same task, then reads exactly what changed — in the language their own role needs.

---

## The One Framing Rule

**This is not a disability simulator. Never call it one.**

Simulators such as blur goggles and shaky cursors are widely disliked by disabled advocates. A five-minute filter does not show anyone's life. It creates pity, not understanding.

This site judges **the interface**, never the person.

- Say: “broken interface,” “barrier,” and “the fix.”
- Never say: “experience what it's like to be blind” or “feel what disability feels like.”

Any copy that breaks this rule is a bug. Reject it in review.

---

## Audience Modes

One switch in the header. Three modes. It changes the explanation panel on every station.

| Mode | Reader | Panel contains |
|---|---|---|
| **Advocate** | Managers, clients, executives, non-technical readers | Human impact, who it hits hardest, zero code |
| **Builder** | Developers, solutions architects | WCAG success criteria, the code moves, a snippet, how to test |
| **Presenter** | Someone running a live demo | A timed run sheet and three lines that land |

The mode is saved in `localStorage` under the key `atk-mode`. It persists across pages. The default is `builder`.

---

## Constraints

### Tech

- Astro 7, static output, as established by DEC-017. No React, Vue, or Svelte.
- Vanilla JavaScript only, inline via `<script is:inline>`. No client framework and no state library.
- No CSS framework. No Tailwind. One hand-written stylesheet: `src/styles/global.css`.
- Outfit and Space Mono are self-hosted WOFF2 assets referenced by `global.css`; fonts make no
  third-party runtime request.
- No build-time data fetching. No CMS. No database.
- Node 22.12 or newer within Node 22, as established by DEC-005 and retained by DEC-017.

### Design

- All color, type, and spacing values come from CSS custom properties defined in `:root`. Never hard-code a hex value in a component.
- Do not introduce new colors without adding them as tokens.

### Accessibility floor — non-negotiable

The host site must remain safe and usable even though it displays deliberately broken examples.

- Every page passes keyboard-only operation.
- Every page works at 200% browser zoom with no horizontal scroll.
- Every interactive element has a visible focus ring.
- `prefers-reduced-motion` is respected.
- Color never carries meaning alone.
- Body copy reads at roughly a sixth-grade level.
- A skip link is first in tab order on every page.

### Broken examples are quarantined

- Every barrier panel carries a visually hidden note: “This version is broken on purpose.”
- Barrier panels are still reachable and escapable by keyboard. Broken is not the same as trapped.
- Never trap focus, disable the browser Back action, or block Escape.
- An intentional failure never authorizes an unrelated failure elsewhere on the page.

---

## Color Rules

The whole site runs on a two-state binary.

| State | Token | Word | Shape |
|---|---|---|---|
| Barrier | `--barrier` `#8A3E5B` (plum) | “Barrier” | diamond |
| Fixed | `--fix` `#22557E` (slate blue) | “Fixed” | circle |

**Do not change these to red and green.** Red/green is the exact pairing that many color-blind visitors cannot reliably separate. On an accessibility site, that pairing undermines the lesson.

Every state indicator must show all three signals: color, word, and shape.

---

## File Structure

```text
a11y-test-kitchen/
├── astro.config.mjs
├── package.json
├── README.md
├── roadmap.md
├── specs/
│   └── PROJECT.md
├── docs/
│   └── ...planning and evidence documents
├── src/
│   ├── styles/
│   │   └── global.css
│   ├── layouts/
│   │   └── Base.astro
│   ├── components/
│   │   ├── StationTicket.astro
│   │   ├── StateChip.astro
│   │   ├── ViewSwitch.astro
│   │   ├── ChangedPanels.astro
│   │   ├── StationFrame.astro
│   │   ├── StationPanel.astro
│   │   └── stations/       ← Station 01–12 interaction components
│   ├── assets/             ← Original Station 11 media and captions
│   ├── data/
│   │   └── stations.js
│   └── pages/
│       ├── index.astro
│       ├── about.astro
│       └── stations/
│           └── [slug].astro
└── preview/                ← optional no-install static output
```

`src/` is the only hand-edited product source under accepted DEC-003. If a no-install preview becomes necessary, generate it from a verified static build; do not maintain a second product tree.

---

## Station Template

Every station page has the same seven parts, in this order.

1. **Eyebrow** — `Station NN · [barrier category]`
2. **Title** — the task, in plain words
3. **Task bar** — what the visitor must do, plus any data they need
4. **View switch** — three options: `Try the barrier` / `Try the fix` / `Compare side by side`
5. **Barrier panel** — the broken build, fully interactive
6. **Fixed panel** — the good build, fully interactive
7. **What changed** — three mode panels, only one visible at a time

The barrier and fixed panels are rendered once each. The view switch shows and hides them. **Never render two copies of a panel.** Duplicate IDs would create another accessibility failure.

---

## Requirements

### R1 — Mode switch

Three buttons appear in the header. `aria-pressed` reflects the active mode. The choice persists across pages.

### R2 — View switch

Three native radio buttons appear in a labelled display-mode group on every station. Native checked state reflects the active view. The default is `Try the barrier`. Accepted DEC-006 replaces the supplied tab mapping because the compare option controls two existing panels rather than one tab panel.

### R3 — Barrier panels teach by friction

Each barrier panel reproduces one named real-world failure pattern. It must be annoying but completable.

### R4 — Fixed panels are production quality

Each fixed panel is code someone could adapt for a real product.

### R5 — Every station names its WCAG criteria

Builder mode lists the exact success criterion numbers and titles. Never invent or approximate a criterion number. Verifying a title and verifying that the criterion actually applies are separate review steps.

### R6 — Home page rail

Stations appear as tickets. Unbuilt stations show as dashed tickets marked “Not built yet.”

### R7 — Reset

Both panels on every station have a reset control that returns them to their documented starting state and clears transient timers, messages, and state.

---

## Acceptance Criteria (EARS)

### Mode switch

- WHEN a visitor selects a mode, the system SHALL show only that mode's panel and set `aria-pressed="true"` on that button alone.
- WHEN a visitor loads any page after choosing a mode, the system SHALL restore that mode.
- IF `localStorage` is unavailable, THEN the system SHALL fall back to `builder` without throwing an error.

### View switch

- WHEN a visitor selects `Try the barrier`, the system SHALL show the barrier panel and hide the fixed panel.
- WHEN a visitor selects `Try the fix`, the system SHALL show the fixed panel and hide the barrier panel.
- WHEN a visitor selects `Compare side by side`, the system SHALL show both panels in a two-column grid on screens 60rem and wider, and stacked below that.
- WHEN a view is selected, the system SHALL check that radio button alone and expose its native selected state.

### Barrier panel — Station 01

- WHEN a visitor focuses any barrier field for the first time, the system SHALL start a 30-second countdown.
- WHEN the countdown reaches zero, the system SHALL clear every barrier field and display “Session terminated. Please re-initiate.”
- WHEN a visitor submits the barrier form the first time, the system SHALL clear every field and display only “Invalid input.”
- WHEN a visitor submits the barrier form the second time, the system SHALL accept it.
- WHILE the barrier panel is displayed, the system SHALL keep every control reachable and escapable by keyboard.

### Fixed panel — Station 01

- WHEN a visitor advances a step, the system SHALL move focus to the new step heading.
- IF the member number is not exactly six digits, THEN the system SHALL show an error that names the field, states what is wrong, and preserves the typed value.
- WHEN an error appears, the system SHALL announce it with `role="alert"` and SHALL NOT move focus to it, because an alert that also receives focus is announced twice.
- WHEN a visitor presses `Go back`, the system SHALL return to the previous step with all prior answers intact.
- WHILE the fixed panel is displayed, the system SHALL apply no time limit of any kind.
- WHEN a visitor reaches step 3, the system SHALL show a review of every answer before anything is final.

### Site-wide floor

- WHEN any page loads, the system SHALL place a skip link first in tab order.
- WHEN any interactive element receives keyboard focus, the system SHALL render a visible focus indicator with at least 3:1 contrast against its background.
- IF `prefers-reduced-motion: reduce` is set, THEN the system SHALL disable all transitions and animations.
- WHEN any page is viewed at 200% zoom on a 1280px viewport, the system SHALL produce no horizontal scrolling.
- WHEN a state is communicated by color, the system SHALL also communicate it with a text label and a shape.

---

## Out of Scope

Do not build or suggest these within this project.

- Any disability simulator: blur filters, tremor cursors, or color-blindness overlays applied to the whole page
- A screen-reader emulator; point visitors to NVDA, JAWS, and VoiceOver instead
- User accounts, login, saved progress, or any backend
- Analytics, cookie banners, or third-party tracking
- A CMS or admin panel
- Comments, forums, or user-submitted stations
- Dark mode until the light theme is complete and audited
- Automated scoring or an accessibility-score gimmick
- AI features of any kind on the public site
- Newsletter capture, popups, or interstitials

---

## Station Backlog

Build in this order. Cognitive load comes first because it is an underserved area.

| # | Station | Task | Barrier pattern | Criteria to verify |
|---|---|---|---|---|
| 01 | The cancellation form | Cancel a membership | Session timer, placeholder labels, destructive errors | 2.2.1, 3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.7 |
| 02 | The error message | Fix a rejected payment | “Invalid input.” with no recovery path | 3.3.1, 3.3.3 |
| 03 | The reading wall | Follow return instructions | Grade-16 legalese for a grade-6 task | 3.1.5 |
| 04 | The disappearing menu | Reach a settings page | Hover-only menu that vanishes on the way to it | 1.4.13, 2.1.1 |
| 05 | The interruption | Book an appointment | Auto-refresh and modals that steal focus mid-task | 2.2.2, 2.4.3, 3.2.5 |
| 06 | The memory tax | Transfer money | Confirmation code shown once, on a screen the visitor must leave | 3.3.7 |
| 07 | The keyboard trap | Close a promo overlay | Focus cycles inside the overlay; host Escape remains available | 2.1.2 |
| 08 | The invisible focus | Buy a ticket without a mouse | Static product replay omits a focus marker; real host controls remain visible | 2.4.7 |
| 09 | The unlabelled icon | Delete one item | Icon-only buttons with no accessible name | 4.1.2, 1.1.1 |
| 10 | The color-only status | Find the failed order | Status shown by a colored dot alone | 1.4.1 |
| 11 | The caption gap | Get instructions from a video | No captions and no transcript | 1.2.2, 1.2.3 |
| 12 | The target too small | Tap the right option on a phone | 20px tap targets, 2px apart | 2.5.8 |

Each station needs all three mode panels before it ships. A station with only Builder content is not done.

DEC-009 and DEC-010 accept safe variants for Stations 07 and 08. Station 07 must always preserve a
standard Escape release and focus return. Station 08 must keep the product defect non-interactive and
retain visible focus on every real host control. Reintroducing a literal trap or invisible interactive
path is a release-blocking regression.

---

## Build Order

Do one task. Stop. Wait for review. Then take the next task from `roadmap.md`.

The historical supplied order assumed an existing shell and Station 01. Because that source was not found in this workspace, accepted DEC-004 uses the following greenfield sequence while preserving the intended dependency order:

1. Approve the planning baseline and open decisions.
2. Establish and verify the Astro build.
3. Build the accessible global shell and design tokens.
4. Build Station 01 as the reference vertical slice.
5. Freeze or extract shared station components from proven Station 01 behavior.
6. Build the data-driven rail and About page.
7. Build one later station and audit it before starting the next.

**Task gate:** after every task, report what changed, what was not touched, and anything uncertain. Do not chain tasks together.

---

## Review Checklist

Run this before calling any station done.

```text
[ ] Task is completable in both panels using only a keyboard
[ ] Focus is visible at every safe step and meets the project contrast floor
[ ] No duplicate id attributes exist anywhere on the page
[ ] Barrier panel has the visually hidden “broken on purpose” note
[ ] Barrier panel does not trap focus or block Escape or Back
[ ] Both panels have working resets that clear transient state
[ ] All three mode panels are written, not stubbed
[ ] WCAG titles and applicability were verified against the published standard
[ ] Copy reads at roughly a sixth-grade level
[ ] No sentence describes the site as a disability simulation
[ ] Every state shows color + word + shape
[ ] Page has no horizontal scroll at 200% zoom
[ ] Reduced-motion mode disables transitions and animations
[ ] New colors, if any, were added as :root tokens
[ ] Intentional audit findings exactly match the approved station exception record
```

---

## Known Risks

1. **The claimed historical source was not found.** Do not create a competing implementation until the owner accepts the greenfield baseline.
2. **Framework and runtime pins can age.** Keep the accepted Astro and Node baselines current through an explicit decision, a lockfile update, a clean dependency audit, and the complete deterministic gate.
3. **Inline scripts can duplicate when their component is rendered repeatedly.** Global behavior must be initialized once and station behavior must be idempotent or single-instance.
4. **Barrier panels can be genuinely harmful if overdone.** A timer that cannot be reset or a focus trap with no escape turns the teaching tool into a real barrier.
5. **Intentional failures complicate conformance language.** WCAG evaluates full pages; do not make a blanket conformance claim without a documented scope and evaluation.
6. **WCAG numbers are easy to get wrong or misapply.** Verify both the title and its relevance before publishing Builder copy.
7. **The compare option controls two existing panels.** Keep the accepted native-radio display-mode semantics and retest them when the component contract changes.
8. **Station content can become the bottleneck.** All three audience panels must be content-ready before implementation begins.
