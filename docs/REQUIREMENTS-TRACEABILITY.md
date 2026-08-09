# A11y Test Kitchen Requirements Traceability

Status: Full collection implementation mapped; manual release evidence remains
Last updated: 2026-08-08
Authority: Mapping only—this document does not create or redefine requirements

## Purpose

This matrix connects product requirements to implementation surfaces and named evidence. It prevents
a passing build or generic accessibility scan from being mistaken for final acceptance.

Requirement wording remains authoritative in `specs/PROJECT.md`. Test procedures remain authoritative
in `docs/ACCESSIBILITY-TEST-PLAN.md`. Each station's exact start, failure, success, reset, safety, and
role-content contract is in `docs/stations/`.

## Status vocabulary

| Status | Meaning |
|---|---|
| `PLANNED` | Requirement and evidence path are defined; no implementation exists |
| `BLOCKED` | A named decision or missing input prevents implementation |
| `IMPLEMENTED` | Code and deterministic evidence exist; required manual evidence is incomplete |
| `VERIFIED` | Required automated and manual evidence is recorded and reviewed |
| `REJECTED` | A candidate mapping was found inapplicable; rationale is retained |

Every product row is currently `IMPLEMENTED`. No row is `VERIFIED` because the complete manual browser,
keyboard, zoom, forced-color, and assistive-technology matrix has not been recorded.

## Product requirements

| Requirement | Authoritative behavior | Implemented surface | Deterministic evidence | Status |
|---|---|---|---|---|
| R1 — Mode switch | Three header buttons; one active `aria-pressed`; persists across pages | `Base.astro`, `ChangedPanels.astro` | ATK-MODE-001 through 006 | `IMPLEMENTED` |
| R2 — View switch | Barrier, Fixed, Compare; one checked native radio; Barrier default | `ViewSwitch.astro`, `StationFrame.astro` | ATK-VIEW-001 through 007 | `IMPLEMENTED` under DEC-006 |
| R3 — Barrier friction | One approved failure, completable and safely bounded | Twelve barrier panels and exception ledger | Shared contract, station cases, exact ledger comparison | `IMPLEMENTED` |
| R4 — Production fix | Robust fixed pattern suitable for adaptation | Twelve fixed panels and Builder guidance | Station cases, fixed-view axe scans, source review | `IMPLEMENTED` |
| R5 — Criteria | Exact number/title/level plus applicability status | `stations.js`, Builder panels, station briefs | `verify:content`, link/count assertions | `IMPLEMENTED` |
| R6 — Rail | All twelve stations listed in order with word, color, and shape status | `stations.js`, `StationTicket.astro`, home route | Rail and build assertions | `IMPLEMENTED` |
| R7 — Reset | Both panels restore documented start and clear transient state | Local station state machines | Shared reset contract plus station cases | `IMPLEMENTED` |

## Shared acceptance criteria

### Audience mode

| ID | Product clause | Evidence | Status |
|---|---|---|---|
| AC-MODE-001 | One selected mode exposes one matching panel | ATK-MODE-002 | `IMPLEMENTED` |
| AC-MODE-002 | A later page restores the selected mode | ATK-MODE-003 | `IMPLEMENTED` |
| AC-MODE-003 | Storage failure falls back safely and switching still works | ATK-MODE-004 | `IMPLEMENTED` |
| AC-MODE-004 | Invalid stored values restore Builder | ATK-MODE-005 | `IMPLEMENTED` |

### Station view

| ID | Product clause | Evidence | Status |
|---|---|---|---|
| AC-VIEW-001 | Barrier shows by default and Fixed is hidden | ATK-VIEW-001 | `IMPLEMENTED` |
| AC-VIEW-002 | Fixed selection reverses panel exposure | ATK-VIEW-002 | `IMPLEMENTED` |
| AC-VIEW-003 | Compare uses two columns at 60rem and wider | ATK-VIEW-003 | `IMPLEMENTED` |
| AC-VIEW-004 | Compare stacks Barrier then Fixed below 60rem | ATK-VIEW-004 | `IMPLEMENTED` |
| AC-VIEW-005 | One display radio is checked | ATK-VIEW-007 | `IMPLEMENTED` |
| AC-VIEW-006 | Panels render once and retain state across view changes | ATK-VIEW-005 | `IMPLEMENTED` |
| AC-VIEW-007 | Focus never remains inside newly hidden content | ATK-VIEW-006 | `IMPLEMENTED` |

### Site floor

| ID | Product clause | Implemented surface | Evidence | Status |
|---|---|---|---|---|
| AC-SITE-001 | Skip link is first and reaches main | `Base.astro` | ATK-SHELL-001, 002 | `IMPLEMENTED` |
| AC-SITE-002 | Host focus is visible and meets the authored contrast target | Global focus tokens | ATK-SHELL-003, 004 | `IMPLEMENTED`; manual contrast review pending |
| AC-SITE-003 | Reduced motion removes authored animation | Final reduced-motion CSS query | ATK-SHELL-007 | `IMPLEMENTED` |
| AC-SITE-004 | Required zoom/reflow retains content and function | Fluid shell and station layouts | ATK-SHELL-005, 006 | `IMPLEMENTED`; real browser-zoom review pending |
| AC-SITE-005 | State never relies on color alone | State chips, rail tags, Station 10 fixed state | ATK-SHELL-008, ATK-CONTENT-007 | `IMPLEMENTED` |
| AC-SITE-006 | Exposed DOM has no duplicate IDs | All routes/states | ATK-SHELL-009, `verify:build` | `IMPLEMENTED` |
| AC-SITE-007 | Every barrier discloses that it is intentionally broken | `StationPanel.astro` | Shared structural assertions | `IMPLEMENTED` |
| AC-SITE-008 | No barrier traps or blocks Escape/Back | Local handlers and host boundaries | Station 04/05/07 cases, ATK-SHELL-010 | `IMPLEMENTED`; full manual walk pending |
| AC-SITE-009 | Public copy uses the project plain-language floor | All public copy | ATK-CONTENT-006 | `IMPLEMENTED`; final human edit pending |
| AC-SITE-010 | Copy never frames the site as disability simulation | All public copy | ATK-CONTENT-001 | `IMPLEMENTED` |

## Station implementation and evidence map

| Station | Brief | Named interaction evidence | Intentional-failure evidence | Status / remaining manual emphasis |
|---|---|---|---|---|
| 01 — Cancellation form | `docs/stations/01-cancellation-form.md` | Timer, destructive first submit, second success, validation, retained values, back/review, resets | Placeholder labels, timing, and destructive recovery ledger entries | `IMPLEMENTED`; keyboard, zoom, AT matrix |
| 02 — Error message | `docs/stations/02-error-message.md` | Vague retry, specific focused error, value retention, completion | Vague error structural/manual entry | `IMPLEMENTED`; error announcement smoke |
| 03 — Reading wall | `docs/stations/03-reading-wall.md` | Both versions reach the same return result; reset | Complexity/content manual entry | `IMPLEMENTED`; human reading review |
| 04 — Disappearing menu | `docs/stations/04-disappearing-menu.md` | Safe backup, persistent fixed menu, Escape/focus return | Hover-only content manual entry | `IMPLEMENTED`; pointer and AT matrix |
| 05 — Interruption | `docs/stations/05-interruption.md` | Bounded automatic interrupt, Escape/focus return, fixed on-request update | Interruption/focus movement manual entry | `IMPLEMENTED`; announcement and timing smoke |
| 06 — Memory tax | `docs/stations/06-memory-tax.md` | Barrier code removal, fixed code review/use, confirmation | Recall/re-entry manual entry | `IMPLEMENTED`; cognitive review |
| 07 — Keyboard trap | `docs/stations/07-keyboard-trap.md` | Safe focus cycle, permanent Escape, native fixed dialog and close | Bounded cycle manual entry under DEC-009 | `IMPLEMENTED`; full keyboard and AT matrix |
| 08 — Invisible focus | `docs/stations/08-invisible-focus.md` | Noninteractive failure replay and real fixed radio task | Replay structure manual entry under DEC-010 | `IMPLEMENTED`; visual focus matrix |
| 09 — Unlabelled icon | `docs/stations/09-unlabelled-icon.md` | Delete/reset and named fixed icon button | Exact scoped axe `button-name` finding | `IMPLEMENTED`; AT name smoke |
| 10 — Color-only status | `docs/stations/10-color-only-status.md` | Same order result; fixed word/color/shape status | Color-only manual entry | `IMPLEMENTED`; forced-colors review |
| 11 — Caption gap | `docs/stations/11-caption-gap.md` | Local media, captions track, transcript, task/reset | Missing-alternative structural/manual entry | `IMPLEMENTED`; human caption/media review |
| 12 — Target too small | `docs/stations/12-target-too-small.md` | Exact 20×20/2px barrier and 44×44/8px fixed geometry | Target geometry manual entry | `IMPLEMENTED`; real touch matrix |

## Verified WCAG 2.2 registry

Titles and levels below were checked against the [WCAG 2.2 normative
recommendation](https://www.w3.org/TR/WCAG22/) on 2026-08-08. `Confirmed` means the Builder panel
accurately connects the demonstrated interface behavior to the named criterion. `Conditional` keeps
the normative condition visible and avoids claiming that the fictional local task itself triggers the
criterion in every product context.

| Criterion | Exact title | Level | Stations | Applicability |
|---|---|---|---|---|
| [1.1.1](https://www.w3.org/TR/WCAG22/#non-text-content) | Non-text Content | A | 09 | Confirmed alongside control naming |
| [1.2.2](https://www.w3.org/TR/WCAG22/#captions-prerecorded) | Captions (Prerecorded) | A | 11 | Confirmed |
| [1.2.3](https://www.w3.org/TR/WCAG22/#audio-description-or-media-alternative-prerecorded) | Audio Description or Media Alternative (Prerecorded) | A | 11 | Conditional; the audio already contains the instructional information |
| [1.4.1](https://www.w3.org/TR/WCAG22/#use-of-color) | Use of Color | A | 10 | Confirmed |
| [1.4.13](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) | Content on Hover or Focus | AA | 04 | Confirmed |
| [2.1.1](https://www.w3.org/TR/WCAG22/#keyboard) | Keyboard | A | 04 | Confirmed |
| [2.1.2](https://www.w3.org/TR/WCAG22/#no-keyboard-trap) | No Keyboard Trap | A | 07 | Conditional teaching application under DEC-009; host remains escapable |
| [2.2.1](https://www.w3.org/TR/WCAG22/#timing-adjustable) | Timing Adjustable | A | 01 | Confirmed |
| [2.2.2](https://www.w3.org/TR/WCAG22/#pause-stop-hide) | Pause, Stop, Hide | A | 05 | Confirmed for the modeled automatic update |
| [2.4.3](https://www.w3.org/TR/WCAG22/#focus-order) | Focus Order | A | 05 | Confirmed |
| [2.4.7](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus Visible | AA | 08 | Conditional teaching application under DEC-010; live host focus stays visible |
| [2.5.8](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Target Size (Minimum) | AA | 12 | Confirmed for the demonstrated geometry; real products must also evaluate exceptions |
| [3.1.5](https://www.w3.org/TR/WCAG22/#reading-level) | Reading Level | AAA | 03 | Confirmed; the project's sixth-grade target is a separate editorial choice |
| [3.2.5](https://www.w3.org/TR/WCAG22/#change-on-request) | Change on Request | AAA | 05 | Confirmed for the modeled context change |
| [3.3.1](https://www.w3.org/TR/WCAG22/#error-identification) | Error Identification | A | 01, 02 | Confirmed |
| [3.3.2](https://www.w3.org/TR/WCAG22/#labels-or-instructions) | Labels or Instructions | A | 01 | Confirmed |
| [3.3.3](https://www.w3.org/TR/WCAG22/#error-suggestion) | Error Suggestion | AA | 01, 02 | Confirmed |
| [3.3.4](https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data) | Error Prevention (Legal, Financial, Data) | AA | 01 | Conditional; applies when a real flow changes or deletes qualifying user data |
| [3.3.7](https://www.w3.org/TR/WCAG22/#redundant-entry) | Redundant Entry | A | 01, 06 | Confirmed for modeled same-process re-entry |
| [4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value) | Name, Role, Value | A | 09 | Confirmed |

## Supporting host criteria

The host floor also considers Reflow (1.4.10), Non-text Contrast (1.4.11), Text Spacing (1.4.12),
Bypass Blocks (2.4.1), Page Titled (2.4.2), Headings and Labels (2.4.6), and Status Messages (4.1.3).
This list is not a formal or complete WCAG evaluation.

## Update protocol

1. Update the owning requirement, brief, implementation, evidence, and this mapping together.
2. Do not mark `IMPLEMENTED` until code and deterministic evidence exist.
3. Do not mark `VERIFIED` until every required manual environment is recorded.
4. Link concise evidence records; do not copy successful test transcripts into prompts.
5. Retain conditional or rejected criterion rationale instead of silently deleting it.
6. Record a decision before implementation intentionally diverges from the supplied wording.

## Completeness gate

- [x] Every product requirement has a stable ID
- [x] Every station has an implementation brief and deterministic evidence path
- [x] Every criterion has a verified title, level, and applicability note
- [x] DEC-009 and DEC-010 are reflected in requirements, briefs, implementation, and tests
- [x] No implementation decision remains `BLOCKED`
- [ ] Every manual support-matrix row is recorded
- [ ] Every `IMPLEMENTED` row has earned `VERIFIED` status
