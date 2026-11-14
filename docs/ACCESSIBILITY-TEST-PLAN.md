# A11y Test Kitchen Accessibility Test Plan

Status: Active for the full collection; deterministic suite implemented and manual matrix pending
Last updated: 2026-11-12
Authority: Test scope, protocols, evidence, intentional-failure policy, and defect severity

## Purpose

This plan defines how the project proves that its host experience is safe, each fixed panel is production quality, each barrier contains only its approved lesson, and every product acceptance criterion has reproducible evidence.

Automation is necessary but insufficient. Passing tools do not prove usability, correct standards interpretation, safe focus behavior, understandable copy, or formal WCAG conformance.

## Standards baseline

- Normative reference: [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- Interaction reference: [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- Project requirements: `specs/PROJECT.md`
- Test procedures: this document

Check criterion numbers, titles, levels, and exceptions against the WCAG 2.2 Recommendation. Record separately how each criterion applies to the example. The W3C Understanding and technique pages explain intent and show implementation options.

## Conformance and claim policy

WCAG conformance applies to full pages, not selected regions. A station page containing a deliberate criterion failure cannot be described as conformant merely because the masthead and fixed panel pass. W3C's non-interference requirements still apply to all page content; No Keyboard Trap and Pause, Stop, Hide cannot be waived for a demonstration.

Under accepted DEC-007, and until a formal evaluation supports a defined scope:

- do not call the whole site “WCAG compliant” or “WCAG 2.2 AA conformant”;
- describe the host safety floor and the exact testing performed;
- describe fixed examples as reviewed against named criteria;
- disclose that barrier panels intentionally demonstrate specific failures;
- publish no badge or automated score.

## Test objectives

1. Prove every route builds and exposes its intended content.
2. Prove global mode and station view controls expose accurate state.
3. Prove both versions of every station task are keyboard-completable.
4. Prove no barrier traps, strands, or blocks a visitor.
5. Prove each reset restores its own documented initial state and cancels transient work.
6. Prove fixed panels implement the intended robust pattern.
7. Prove expected barrier findings are exact, bounded, and documented.
8. Prove the page reflows, focus remains visible, motion respects preference, and meaning survives without color.
9. Prove all three audience panels are complete, accurate, and correctly exposed.
10. Produce evidence another reviewer can reproduce without relying on a passing-test transcript in an AI prompt.

## Scope

### In scope

- Home, About, Teaching guide, and all twelve station routes
- Masthead, skip link, mode control, rail, footer
- Barrier, fixed, compare, and all audience-mode states
- Keyboard, pointer, touch where applicable, browser zoom, reduced motion, forced colors where supported
- Current support-matrix browsers and real assistive technology
- Static production output
- Public copy, snippets, criterion mappings, and framing

### Out of scope for evidence

- A hand-maintained preview tree
- Backend, account, analytics, CMS, or AI behavior because none exists
- Assistive technology or browser combinations not actually tested
- Claims about all disabilities, all visitors, or all possible user agents

## Tool stack

Accepted DEC-015 establishes:

| Layer | Tool | Purpose |
|---|---|---|
| Static | Astro check and build | Compilation, types, routes, built artifact |
| Source invariants | Node scripts | Metadata, content boundaries, route contracts, criteria, and media |
| Browser | Playwright | Rendered interaction, focus, responsive layouts, storage failure |
| Automated a11y | `@axe-core/playwright` | Common semantic, naming, contrast, and structural findings |
| Markup/IDs | Built-source structure checks and rendered browser assertions | Script placement in the body, duplicate IDs, relationships, and document structure |
| Network | Built HTML/CSS scan and browser request observation | Declared resource URLs, requests during tested interactions, and no native demo submission |
| Editorial | Deterministic phrase searches plus human review | Framing, placeholder text, incomplete panels, reading level |

Only one explanation panel and one or two station panels are in the accessibility tree at a time, so
an axe run sees a single state. Every station is therefore scanned in the Fixed view once per audience
mode (Advocate, Builder, Presenter), and once more in Compare view, where the scan checks the
Barrier ledger's exact targets and results. Representative dynamic scans additionally cover a
field error, persistent menu, validation error, open native dialog, and expanded transcript. This is
targeted automated evidence, not a claim that every possible interaction state has been scanned.

The repository exposes `npm run gate` as the complete deterministic command. Individual commands
remain available for diagnosis. Successful output is summarized locally; only failures and the smallest
relevant context are passed back into an agent prompt.

## Support matrix

Accepted DEC-011 owns this matrix. A row counts as evidence only after that environment is actually tested and recorded.

| ID | Environment | Required use |
|---|---|---|
| ENV-CHROME-MAC | Current Chrome on macOS | Automation, keyboard, 200% zoom, reduced motion, storage failure |
| ENV-SAFARI-VO | Current Safari on macOS with VoiceOver | Native semantics, announcements, focus, station smoke tests |
| ENV-FIREFOX-MAC | Current Firefox on macOS | Keyboard, layout, form behavior, cross-engine smoke test |
| ENV-IOS-VO | Current iOS Safari with VoiceOver | Touch targets, reflow, mobile announcement smoke test |
| ENV-WIN-NVDA | Current Chrome or Firefox on Windows with NVDA | Pre-release AT coverage when the environment is available |

Record exact OS, browser, browser version, viewport, zoom, input method, assistive technology, and date. Do not report an unexecuted matrix row as passing.

## Test layers and cadence

| Cadence | Required layers |
|---|---|
| Every code task | Relevant targeted checks. Record rendered or manual paths when executed |
| Every component contract change | All consumers, keyboard interaction, semantics, duplicate IDs |
| Every station task | Station functional cases, expected-findings check, keyboard, zoom, editorial |
| Every station completion | Full station protocol in all views/modes and accepted support-matrix smoke test |
| Every cohort release | All built routes, cross-station regression, clean production build |
| Public release | Full matrix, content/criteria review, built-artifact inspection, known-limitations review |

## Core test catalog

### Site shell

| ID | Procedure | Pass condition | Type |
|---|---|---|---|
| ATK-SHELL-001 | Load each built route and press Tab once | Skip link is first focus target and visibly focused | Browser + manual |
| ATK-SHELL-002 | Activate skip link | Focus/reading position reaches the main-content target | Browser + manual |
| ATK-SHELL-003 | Traverse host controls by keyboard, including at narrow sizes and around open overlays | Logical order, visible focus (2.4.7), and no focused component entirely hidden by authored content (2.4.11) | Manual |
| ATK-SHELL-004 | Measure the authored focus indicator against adjacent colors | Required visual cues reach at least 3:1 (1.4.11) | Automated + manual review |
| ATK-SHELL-005 | Starting at a 1280 CSS px viewport, use 200% browser zoom | Text resizes without loss of content or functionality, with captions and images of text excepted (1.4.4). The project also checks for horizontal page scroll | Manual |
| ATK-SHELL-006 | Test at 320 CSS px width or equivalent 400% zoom from 1280 CSS px | No content or functionality is lost and no two-dimensional scrolling is needed except where essential to usage or meaning (1.4.10) | Manual |
| ATK-SHELL-007 | Emulate `prefers-reduced-motion: reduce` | Authored transitions and animations are absent | Browser |
| ATK-SHELL-008 | Inspect every Barrier/Fixed indicator without color | Word and shape still identify state | Manual |
| ATK-SHELL-009 | Scan rendered HTML in every automated view/mode and representative dynamic state | No duplicate IDs or broken label/control relationships | Browser |
| ATK-SHELL-010 | Press Escape and use browser Back from each barrier | Neither action is blocked; page remains operable | Manual |
| ATK-SHELL-011 | Run axe on shell-only routes | No unresolved findings | Automated a11y |
| ATK-SHELL-012 | Disable JavaScript, load station routes, and inspect demo form markup | Readable task and Advocate explanation; no exposed inert demo controls or native submission | Built-source + browser |
| ATK-SHELL-013 | Measure authored Fixed input boundaries where they identify editable areas | At least 3:1 contrast against adjacent colors (1.4.11) | Manual |
| ATK-SHELL-014 | Check all built HTML/CSS and observe requests during page loads and station interactions | No automatic third-party request in inspected declarations and exercised states | Static + browser |
| ATK-SHELL-015 | Open the facilitator entry and inspect its links and prompts | Direct Station 09 and 12 links, Advocate instruction, choice to observe, and teacher-led timer guidance | Browser + editorial |
| ATK-SHELL-016 | Apply all four text-spacing overrides together | Labels, messages, and controls stay readable and usable (1.4.12) | Manual |

### Audience mode

| ID | Procedure | Pass condition | Type |
|---|---|---|---|
| ATK-MODE-001 | Load a fresh page | Builder is active and only Builder content is exposed | Browser |
| ATK-MODE-002 | Choose each mode | Exactly one button has `aria-pressed="true"`; only matching panels are exposed | Browser + tree inspection |
| ATK-MODE-003 | Choose a mode and navigate to another route | Selection is restored from `atk-mode` | Browser |
| ATK-MODE-004 | Make storage read/write throw | UI defaults to Builder, continues switching in memory, and throws no uncaught error | Browser |
| ATK-MODE-005 | Seed an invalid `atk-mode` value | Builder is used and invalid value never exposes missing content | Browser |
| ATK-MODE-006 | Activate mode buttons by keyboard | Enter/Space behavior and focus remain predictable | Browser + manual |

### Station view

Accepted DEC-006 uses a native radio group. The behavior tests below also verify native checked state and keyboard operation.

| ID | Procedure | Pass condition | Type |
|---|---|---|---|
| ATK-VIEW-001 | Load a station | Barrier view is active; barrier shown; fixed hidden | Browser |
| ATK-VIEW-002 | Choose fixed view | Fixed shown; barrier hidden; state indicator accurate | Browser |
| ATK-VIEW-003 | Choose compare at 60rem or wider | Both existing panels shown in two columns | Browser + screenshot/geometry assertion |
| ATK-VIEW-004 | Choose compare below 60rem | Both panels shown, stacked Barrier then Fixed | Browser + manual |
| ATK-VIEW-005 | Switch views after entering data | Panel instances and entered state are preserved | Browser |
| ATK-VIEW-006 | Switch while focus is in a panel that becomes hidden | Focus lands at the accepted safe target, never in hidden content | Browser + manual |
| ATK-VIEW-007 | Use the accepted control by keyboard | Keyboard behavior matches its native/APG pattern | Browser + AT smoke |

### Station reset

| ID | Procedure | Pass condition | Type |
|---|---|---|---|
| ATK-RESET-001 | Change all panel state and activate its reset | Values, attempts, messages, completion, and step return to documented start | Browser |
| ATK-RESET-002 | Start timers/callbacks and reset | No delayed mutation occurs after reset | Browser |
| ATK-RESET-003 | Reset one panel in compare mode | Other panel, audience mode, and selected view do not change | Browser |
| ATK-RESET-004 | Activate reset by keyboard | Focus returns to the documented stable target | Browser + manual |

### Station 01 barrier

| ID | Procedure | Pass condition | Type |
|---|---|---|---|
| ATK-S01-B-001 | Focus any field for the first time | One 30-second countdown starts | Browser |
| ATK-S01-B-002 | Move among fields after countdown starts | Countdown does not restart or multiply | Browser |
| ATK-S01-B-003 | Allow countdown to reach zero and try again | All fields clear, exact termination message and reset guidance appear, and Reset Barrier is required to restart | Browser |
| ATK-S01-B-004 | Submit first attempt | All fields clear and only “Invalid input.” is shown | Browser |
| ATK-S01-B-005 | Submit incomplete and complete retries | An incomplete retry preserves values and shows the generic error; a complete retry before expiry is accepted | Browser |
| ATK-S01-B-006 | Complete task using keyboard and attempt to leave at every step | Every control is reachable and the visitor can escape/reset | Manual |
| ATK-S01-B-007 | Start the countdown, hide its readout, wait, and show it again | The readout is hidden on request (2.2.2). The time limit continues and still clears fields at expiry (2.2.1) | Browser + manual |

### Station 01 fixed

| ID | Procedure | Pass condition | Type |
|---|---|---|---|
| ATK-S01-F-001 | Advance each step | Focus moves to the new step heading | Browser + AT smoke |
| ATK-S01-F-002 | Enter member number that is not exactly six digits | Named corrective error appears and value remains | Browser |
| ATK-S01-F-003 | Trigger an error twice, with a correction between attempts | Browser checks the existing `role="alert"` region, updated text, and unchanged focus. AT smoke verifies first and repeat announcements | Browser + AT smoke |
| ATK-S01-F-004 | Enter values, advance, then Go back | Previous step and all prior answers are restored | Browser |
| ATK-S01-F-005 | Wait and inspect timers | No time limit or automatic destructive change exists | Browser + code inspection |
| ATK-S01-F-006 | Reach step 3 | Review shows every answer before final action | Browser |

### Station collection coverage

The shared page-contract loop checks each route's station metadata, one Barrier and one Fixed panel,
the hidden intentional-failure note, reset-control presence and view/mode isolation, all three view
states, all three audience modes, three Presenter lines, and one Builder criterion link per metadata
entry. Station-specific cases dirty and reset both panels, then test the lesson behavior rather than
treating shared structure as proof.

| Station | Deterministic behavior covered | Remaining manual emphasis |
|---|---|---|
| 01 | Timed destructive Barrier; pause on hide; six-digit validation; step focus; review and confirm; independent resets | Error announcement with real AT |
| 02 | Vague retry; field-specific error with preserved focus and value; completion | First and repeat error announcements with real AT |
| 03 | Equivalent return result in both versions; reset closes the policy disclosure | Check equivalent policy facts and human comprehension |
| 04 | Permanent safe backup; fixed disclosure persistence; Escape and focus return | Mixed pointer and keyboard handoff |
| 05 | Entering a Barrier value can trigger the focus jump while the visitor remains on a Barrier field. In Fixed, typing keeps focus and Check availability changes only the result message | Verify the result is announced without moving focus (4.1.3) |
| 06 | Code disappears in Barrier; Fixed retains and can enter it; confirmation | Cognitive/redundant-entry and error announcement review |
| 07 | Bounded focus cycle, stable layout when focus moves outside the promo, cleanup on Escape, Reset, and view change, and native Fixed dialog Escape | Full keyboard and AT dialog matrix |
| 08 | Noninteractive missing-focus replay; real Fixed radio task | Visual focus and forced-color matrix |
| 09 | Delete/reset; focus moves to the panel heading when the row is removed; Fixed icon exposes item-specific accessible name | Real AT name announcement |
| 10 | Same failed order identified; Fixed state includes color, word, and shape | Monochrome and forced-colors review |
| 11 | Same local media; Fixed captions track and transcript; task completion | Human caption synchronization and transcript accuracy |
| 12 | Standalone Barrier has 20×20 CSS px targets with 2 px gaps. Neighboring centers are 22 px apart, so the 24 px spacing circles overlap. Standalone Fixed has 44×44 targets with 8 px gaps | Physical touch/device matrix. Compare also exposes equivalent larger controls, which affects a 2.5.8 assessment |

### Content and criteria

| ID | Procedure | Pass condition | Type |
|---|---|---|---|
| ATK-CONTENT-001 | Search public source/build for prohibited simulator phrases | No prohibited phrase appears outside explanatory “what it is not” copy | Deterministic search + review |
| ATK-CONTENT-002 | Inspect every built station | Advocate, Builder, and Presenter panels are complete | Deterministic structure + review |
| ATK-CONTENT-003 | Review Advocate panel | Human impact and decision; zero code | Editorial |
| ATK-CONTENT-004 | Review Builder panel | Exact criterion title/level/link, applicability rationale, code moves, snippet, tests, boundary | Editorial + standards review |
| ATK-CONTENT-005 | Time Presenter script aloud | Safe sequence fits accepted time window and includes three lines | Manual |
| ATK-CONTENT-006 | Run readability heuristic and human edit | Copy meets project plain-language floor without losing accuracy | Tool signal + editorial |
| ATK-CONTENT-007 | Check every state presentation | Color + required word + required shape | Browser + manual |

## Intentional-failure ledger

Store the approved ledger in test configuration or a dedicated fixture once tests exist. Each entry contains:

```text
id
station
view
selector
wcagCriterion
toolRule
manualCheck
expectedImpact
expectedMessagePattern
rationale
safetyBoundary
fixedResolution
owner
reviewedOn
expiresOnOrMilestone
```

### Enforcement rules

1. Expose and scan every Barrier and Compare view.
2. Compare actual rules and affected nodes to the exact Barrier ledger in both views.
3. Fail on any unexpected rule, selector, count, impact, or message pattern.
4. Fail if an expected finding disappears without an approved lesson change; this may indicate the demo no longer teaches what it claims.
5. Never suppress No Keyboard Trap, Pause/Stop/Hide non-interference, global focus escape, or host-shell failures.
6. Scan fixed views and host-only routes with no intentional exceptions.
7. Review every ledger entry when its station or shared component changes.
8. If the selected tool does not detect an intentional failure, record `toolRule: null`, name the exact structural/manual check, assert that structure deterministically where possible, and still fail on every unexpected tool finding. Never invent a tool violation to make the ledger look complete.

## Manual keyboard protocol

For every built route:

1. Reload with pointer parked and unused.
2. Tab to and activate the skip link.
3. Traverse mode controls and select each mode.
4. Reach the station view control and operate it using the accepted pattern.
5. Complete the barrier task, including failure and reset paths.
6. At every barrier step, attempt Escape, reverse navigation with Shift+Tab, and normal forward navigation.
7. Complete the fixed task, including every validation and back/recovery path.
8. Enter compare mode and traverse both panels in DOM order.
9. Reset each panel independently.
10. Confirm the focus indicator remains visible, the focused component is at least partially visible when author-created content overlaps it, and focus stays out of hidden panels.
11. Use browser Back and confirm it remains native.

Record the first unexpected focus target, missing visual focus, trapped path, or control that requires a pointer. Do not summarize a failure as “keyboard issue.”

## Zoom and reflow protocol

**Resize Text (1.4.4)**

1. Set the viewport to 1280 CSS pixels wide.
2. Set browser zoom to 200%.
3. Complete both station tasks and open every mode/view. Check for lost or clipped text and unavailable functions, including long errors, code snippets, and controls.
4. Check page-level horizontal overflow for the project's 200% zoom requirement.

**Reflow (1.4.10)**

1. Test at a 320 CSS px viewport width or at 400% zoom from a starting 1280 CSS px viewport.
2. Check that all content and functionality remain available, including stacked Compare.
3. Record any part that requires two-dimensional layout for its usage or meaning. Forms, navigation, prose, and ordinary station controls should reflow.

**Text Spacing (1.4.12)**

Override line height to at least `1.5`, spacing after paragraphs to `2em`, letter spacing to `0.12em`, and word spacing to `0.16em`, all at once. Check that text remains readable and controls can still be used.

## Reduced-motion protocol

With `prefers-reduced-motion: reduce` enabled:

- no authored transition or animation runs;
- focus movement remains functional and not animated;
- timer behavior does not depend on animation;
- state changes remain perceivable through text and structure;
- no content appears only at an animation endpoint.

## Assistive-technology smoke protocol

For every new interaction pattern and each completed station:

1. Navigate by headings and landmarks.
2. Confirm mode-control group name, button names, and pressed state.
3. Confirm view-control name, option state, and revealed region relationship under the accepted pattern.
4. Complete each panel using forms/control navigation.
5. Trigger first and repeat errors and results in the Fixed flows. Verify the existing live regions in Stations 01, 02, 05, and 06 convey useful context without taking focus. Check for missed or duplicate announcements. A newly opened dialog that takes focus needs its own focus and naming checks.
6. Confirm hidden panels and inactive audience content are not discoverable.
7. Confirm state-chip word and meaning are available without relying on decorative shape.
8. Confirm reset result and focus destination.

Record actual speech or braille output only when needed to explain a defect; do not claim support from DOM inspection alone.

## Editorial and standards review

Every station receives two separate reviews:

1. **Framing/readability:** Interface-centered language, role fit, plain language, no pity or simulation claim.
2. **Standards applicability:** Exact criterion title and level, normative wording, exceptions, definitions, and whether the station actually demonstrates that criterion.

The same reviewer may perform both, but evidence records them separately.

## Defect severity

| Severity | Definition | Examples | Release effect |
|---|---|---|---|
| P0 — Safety blocker | Traps, strands, blocks navigation, or creates serious harmful behavior | No keyboard exit, Escape/Back blocked, uncontrollable flashing | Stop work; station cannot be previewed publicly |
| P1 — Requirement blocker | Violates a non-negotiable product or accessibility requirement | Missing label in fixed panel, duplicate ID, reset loses unrelated state, wrong criterion claim | Station/release blocked |
| P2 — Significant | Materially harms comprehension, consistency, or robustness | Poor focus order, mode not restored, overflow at required zoom | Fix before station completion |
| P3 — Minor | Local polish issue with no task or meaning loss | Small spacing inconsistency, non-blocking wording improvement | Track; may fix before cohort release |

An intentional barrier finding is not assigned defect severity when it exactly matches an approved ledger entry. Any leak beyond that entry is a defect at its real severity.

## Evidence record

Use the [current release evidence index](evidence/README.md) to locate the candidate and see
which checks are pending. Keep completed historical records under
`docs/evidence/YYYY-MM-DD-task-id/`. Each new record contains:

```text
Task ID
Commit and working-tree scope
Built artifact path or checksum and how it was produced
Build/runtime versions
Commands run
Failure summary, if any
Manual environment details
Manual procedures completed
Intentional exception IDs observed
Artifacts: screenshots, traces, reports
Reviewer
Date
Verdict
```

Do not paste successful test logs into prompts. Retain concise pass/fail summaries and provide exact failure output only when diagnosis requires it.

## Release evidence gate

Record current results against one build in the [release evidence index](evidence/README.md).
The gate requires:

- Clean dependency install under the accepted Node version, static check, and production build.
- All built routes, assets, and code, content, and font license notices present in `dist/`.
- Complete browser suite, including both resets per station, readable script-disabled fallback,
  no demo submission, runtime request checks, and the exact Barrier ledger in Barrier and Compare.
- Manual keyboard traversal of all stations, zoom/reflow, reduced motion, forced colors, field
  and focus contrast, and the support matrix with exact environment details.
- Human caption timing, transcript accuracy, and media operation checks.
- Disabled-educator classroom-safety review of both guides and the teacher quick start.
- Final editorial, WCAG title and applicability review, and public wording bounded by evidence.
- Recorded limitations and unresolved P2/P3 issues, with any P0 or P1 issue resolved.

## Primary references

- [WCAG 2.2 normative recommendation](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2 conformance requirements](https://www.w3.org/TR/WCAG22/#conformance-reqs)
- [WCAG 2.2 Reflow](https://www.w3.org/TR/WCAG22/#reflow)
- [WCAG 2.2 Resize Text](https://www.w3.org/TR/WCAG22/#resize-text)
- [WCAG 2.2 Text Spacing](https://www.w3.org/TR/WCAG22/#text-spacing)
- [WCAG 2.2 Focus Not Obscured (Minimum)](https://www.w3.org/TR/WCAG22/#focus-not-obscured-minimum)
- [WCAG 2.2 Status Messages](https://www.w3.org/TR/WCAG22/#status-messages)
- [WCAG 2.2 No Keyboard Trap](https://www.w3.org/TR/WCAG22/#no-keyboard-trap)
- [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/TR/WCAG22/#pause-stop-hide)
- [WAI-ARIA APG Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [WAI-ARIA APG Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
