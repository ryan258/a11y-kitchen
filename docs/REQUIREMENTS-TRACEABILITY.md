# A11y Test Kitchen Requirements Traceability

Status: Full collection implementation mapped; manual release evidence remains
Last updated: 2026-11-12
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
| `IMPLEMENTED` | Code exists and a verification path is defined. Record each result against the current artifact |
| `VERIFIED` | Required automated and manual evidence is recorded and reviewed |
| `REJECTED` | A candidate mapping was found inapplicable; rationale is retained |

Every product row is currently `IMPLEMENTED`. The [release evidence index](evidence/README.md)
tracks current results for browser, keyboard, zoom, forced colors, assistive technology, and
human review.

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
| AC-SITE-004 | Required zoom/reflow retains content and function | Fluid shell and station layouts | ATK-SHELL-005 for 200% resizing, ATK-SHELL-006 for 320 CSS-pixel reflow | `IMPLEMENTED`; real browser-zoom review pending |
| AC-SITE-005 | State never relies on color alone | State chips, rail tags, Station 10 fixed state | ATK-SHELL-008, ATK-CONTENT-007 | `IMPLEMENTED` |
| AC-SITE-006 | Exposed DOM has no duplicate IDs | All routes/states | `verify:build` checks emitted HTML IDs; ATK-SHELL-009 checks rendered DOM | `IMPLEMENTED` |
| AC-SITE-007 | Every barrier discloses that it is intentionally broken | `StationPanel.astro` | Shared structural assertions | `IMPLEMENTED` |
| AC-SITE-008 | No barrier traps or blocks Escape/Back | Local handlers and host boundaries | Station 04/05/07 cases, ATK-SHELL-010 | `IMPLEMENTED`; full manual walk pending |
| AC-SITE-009 | Public copy uses the project plain-language floor | All public copy | ATK-CONTENT-006 | `IMPLEMENTED`; final human edit pending |
| AC-SITE-010 | Copy never frames the site as disability simulation | All public copy | ATK-CONTENT-001 | `IMPLEMENTED` |
| AC-SITE-011 | Script failure keeps demo data local and leaves a readable lesson | `Base.astro`, `StationFrame.astro`, demo forms | ATK-SHELL-012 | `IMPLEMENTED` |
| AC-SITE-012 | Fixed inputs with authored identifying boundaries reach 3:1 | Shared form-control tokens | ATK-SHELL-013 | `IMPLEMENTED`; rendered contrast review pending |
| AC-SITE-013 | Automatic resources and demo requests stay on the site origin | Self-hosted assets, artifact scanner, station handlers | ATK-SHELL-014 | `IMPLEMENTED`; browser observation recorded separately |
| AC-SITE-014 | Facilitators can find a short lesson and participation choices | `teachers.astro`, facilitator guides | ATK-SHELL-015 | `IMPLEMENTED`; educator review pending |

## Station implementation and evidence map

Each row gives the practical difference to check. The interaction cases and source show the modeled
mechanism. The [release evidence index](evidence/README.md) records which cases ran and what still
needs to be observed with people, browsers, or assistive technology.

| Station | Brief | Named interaction evidence | Intentional-failure evidence | Status / remaining manual emphasis |
|---|---|---|---|---|
| 01 — Cancellation form | `docs/stations/01-cancellation-form.md` | Hide the changing display during an attempt. The deadline still runs. Fixed allows time to correct and review the same answers. | Placeholder labels, timing, and destructive recovery | `IMPLEMENTED`; rendered countdown control, keyboard, zoom, AT |
| 02 — Error message | `docs/stations/02-error-message.md` | Submit the same invalid ZIP in each version. Fixed identifies the field and the correction while keeping the typed value and focus. | Vague error | `IMPLEMENTED`; error announcement smoke |
| 03 — Reading wall | `docs/stations/03-reading-wall.md` | Find the same return path and deadline in both versions. The Fixed version puts the action first and supplies the original policy on request. | Complexity and comprehension | `IMPLEMENTED`; reader can find the correct action without coaching |
| 04 — Disappearing menu | `docs/stations/04-disappearing-menu.md` | Cross the hover gap and observe the menu vanish. Open Fixed with the keyboard, choose Settings, or press Escape and return to the opener. | Hover-only menu with safe keyboard backup | `IMPLEMENTED`; pointer and AT matrix |
| 05 — Interruption | `docs/stations/05-interruption.md` | Type into Barrier and observe the focus jump. In Fixed, request availability and confirm the result appears while focus stays on the request button. | Input-triggered interruption and focus movement | `IMPLEMENTED`; speech and timing smoke |
| 06 — Memory tax | `docs/stations/06-memory-tax.md` | Continue past the provided code. Fixed offers **Use this code** so the user can confirm the transfer without recalling or typing it again. | Recall and re-entry | `IMPLEMENTED`; cognitive review |
| 07 — Keyboard trap | `docs/stations/07-keyboard-trap.md` | Try the focus cycle, then exit with Escape or the host Reset. The Fixed native dialog adds a named close button and returns focus to the opener. | Bounded cycle under DEC-009 | `IMPLEMENTED`; full keyboard and AT matrix |
| 08 — Invisible focus | `docs/stations/08-invisible-focus.md` | Compare the missing marker in the replay with the visible focus ring on the real ticket controls. Use arrow keys within the Fixed radio group. | Replay under DEC-010 | `IMPLEMENTED`; visual focus matrix |
| 09 — Unlabelled icon | `docs/stations/09-unlabelled-icon.md` | Inspect the delete buttons. Compare has one intentional axe `button-name` finding in Barrier, while Fixed provides the action and file name. | Exact scoped axe finding | `IMPLEMENTED`; AT name smoke |
| 10 — Color-only status | `docs/stations/10-color-only-status.md` | Identify the failed order using its written status or shape in Fixed. The Barrier row uses same-shaped dots whose colors have about 1.09:1 contrast against each other. | Color-only status | `IMPLEMENTED`; forced-colors review |
| 11 — Caption gap | `docs/stations/11-caption-gap.md` | Identify the last instruction with the sound muted using timed captions, then from the transcript alone. The build checks the caption track and text equivalence. | Missing captions | `IMPLEMENTED`; human playback, timing, and task check |
| 12 — Target too small | `docs/stations/12-target-too-small.md` | Compare targets at the default text size in standalone views. Barrier centers are 22 CSS pixels apart and their 24-pixel spacing circles overlap. Fixed has 44×44 CSS-pixel buttons. | Target geometry | `IMPLEMENTED`; real touch matrix |

## Verified WCAG 2.2 registry

The criterion titles and levels below were checked on 2026-11-12 against the [WCAG 2.2
Recommendation](https://www.w3.org/TR/2024/REC-WCAG22-20241212/) and its [current
errata](https://www.w3.org/WAI/WCAG22/errata/). [WCAG 3.0](https://www.w3.org/TR/wcag-3.0/) is a
Working Draft. `Confirmed` records the teaching connection. `Conditional` identifies a bounded
example or applicability condition. Full-page conformance and human outcomes require separate
evidence.

| Criterion | Exact title | Level | Stations | Applicability |
|---|---|---|---|---|
| [1.1.1](https://www.w3.org/TR/WCAG22/#non-text-content) | Non-text Content | A | 09 | Confirmed alongside control naming |
| [1.2.2](https://www.w3.org/TR/WCAG22/#captions-prerecorded) | Captions (Prerecorded) | A | 11 | Confirmed |
| [1.2.3](https://www.w3.org/TR/WCAG22/#audio-description-or-media-alternative-prerecorded) | Audio Description or Media Alternative (Prerecorded) | A | 11 | Conditional teaching scope. The narration already conveys meaningful visuals, and the transcript provides an equivalent sequence. |
| [1.4.1](https://www.w3.org/TR/WCAG22/#use-of-color) | Use of Color | A | 10 | Confirmed |
| [1.4.13](https://www.w3.org/TR/WCAG22/#content-on-hover-or-focus) | Content on Hover or Focus | AA | 04 | Confirmed |
| [2.1.1](https://www.w3.org/TR/WCAG22/#keyboard) | Keyboard | A | 04 | Conditional teaching application. The product menu is pointer-only and the exhibit provides a keyboard backup for the same task. |
| [2.1.2](https://www.w3.org/TR/WCAG22/#no-keyboard-trap) | No Keyboard Trap | A | 07 | Conditional teaching application under DEC-009; host remains escapable |
| [2.2.1](https://www.w3.org/TR/WCAG22/#timing-adjustable) | Timing Adjustable | A | 01 | Confirmed |
| [2.2.2](https://www.w3.org/TR/WCAG22/#pause-stop-hide) | Pause, Stop, Hide | A | 01 | The countdown display can be hidden while work and the modeled deadline continue. |
| [2.4.3](https://www.w3.org/TR/WCAG22/#focus-order) | Focus Order | A | 05 | Confirmed |
| [2.4.7](https://www.w3.org/TR/WCAG22/#focus-visible) | Focus Visible | AA | 08 | Conditional teaching application under DEC-010; live host focus stays visible |
| [2.5.8](https://www.w3.org/TR/WCAG22/#target-size-minimum) | Target Size (Minimum) | AA | 12 | Confirmed size and spacing example in standalone views. In Compare, consider the equivalent-control exception. |
| [3.1.5](https://www.w3.org/TR/WCAG22/#reading-level) | Reading Level | AAA | 03 | Confirmed; the project's sixth-grade target is a separate editorial choice |
| [3.2.2](https://www.w3.org/TR/WCAG22/#on-input) | On Input | A | 05 | Entering data schedules a context change in the modeled Barrier. The Fixed result follows explicit activation. |
| [3.2.5](https://www.w3.org/TR/WCAG22/#change-on-request) | Change on Request | AAA | 05 | Confirmed for the modeled context change |
| [3.3.1](https://www.w3.org/TR/WCAG22/#error-identification) | Error Identification | A | 01, 02 | Confirmed |
| [3.3.2](https://www.w3.org/TR/WCAG22/#labels-or-instructions) | Labels or Instructions | A | 01 | Confirmed |
| [3.3.3](https://www.w3.org/TR/WCAG22/#error-suggestion) | Error Suggestion | AA | 01, 02 | Confirmed |
| [3.3.4](https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data) | Error Prevention (Legal, Financial, Data) | AA | 01 | Conditional; applies when a real flow changes or deletes qualifying user data |
| [3.3.7](https://www.w3.org/TR/WCAG22/#redundant-entry) | Redundant Entry | A | 01, 06 | Confirmed for valid information in the same process. Consider exceptions for essential re-entry, security, and invalidated information. |
| [4.1.2](https://www.w3.org/TR/WCAG22/#name-role-value) | Name, Role, Value | A | 09 | Confirmed |
| [4.1.3](https://www.w3.org/TR/WCAG22/#status-messages) | Status Messages | AA | 05 | Fixed availability feedback uses a live region and preserves focus. Actual announcement is a manual AT check. |

The earlier Station 05 mapping to 2.2.2 was superseded. Its one scheduled, dismissible interruption
teaches what happens when input changes context. Station 01 demonstrates a control for an ongoing
automatic display.

## Supporting host criteria

The shared site floor also considers Resize Text (1.4.4), Reflow (1.4.10), Non-text Contrast
(1.4.11), Text Spacing (1.4.12), Bypass Blocks (2.4.1), Page Titled (2.4.2), Headings and Labels
(2.4.6), Focus Visible (2.4.7), Focus Not Obscured (Minimum) (2.4.11), and Status Messages (4.1.3).
The manual checks distinguish finding the focus indicator from checking whether other page content
entirely covers the focused control. The duplicate-ID gate protects reliable label and control
relationships. WCAG 2.2 removed the former Parsing criterion (4.1.1).

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
