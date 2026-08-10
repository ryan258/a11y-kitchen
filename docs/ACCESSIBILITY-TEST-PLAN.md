# A11y Test Kitchen Accessibility Test Plan

Status: Active for the full collection; deterministic suite implemented and manual matrix pending
Last updated: 2026-08-09
Authority: Test scope, protocols, evidence, intentional-failure policy, and defect severity

## Purpose

This plan defines how the project proves that its host experience is safe, each fixed panel is production quality, each barrier contains only its approved lesson, and every product acceptance criterion has reproducible evidence.

Automation is necessary but insufficient. Passing tools do not prove usability, correct standards interpretation, safe focus behavior, understandable copy, or formal WCAG conformance.

## Standards baseline

- Normative reference: [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- Interaction reference: [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/)
- Project requirements: `specs/PROJECT.md`
- Test procedures: this document

Criterion numbers, titles, levels, exceptions, and applicability are verified against the normative WCAG 2.2 recommendation. W3C Understanding and technique pages may inform implementation, but techniques are examples rather than the only valid solutions.

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

- Home page, About page, and all twelve station routes
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
| Markup/IDs | Browser assertions plus HTML validation if adopted | Duplicate IDs, relationships, document structure |
| Editorial | Deterministic phrase searches plus human review | Framing, placeholder text, incomplete panels, reading level |

Only one explanation panel and one or two station panels are in the accessibility tree at a time, so
an axe run sees a single state. Every station is therefore scanned in the Fixed view once per audience
mode (Advocate, Builder, Presenter), and once more in Compare view, where the run must produce nothing
beyond that station's Barrier exception ledger. Representative dynamic scans additionally cover a
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
| Every code task | Relevant source/browser checks, static check, targeted manual path |
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
| ATK-SHELL-003 | Traverse every host control by keyboard | Logical order, visible focus, no unreachable or extra stop | Manual |
| ATK-SHELL-004 | Measure authored focus indicator against adjacent colors | Required visual parts reach at least 3:1 | Automated + manual review |
| ATK-SHELL-005 | Set 1280px viewport and 200% browser zoom | No horizontal page scroll and no lost content/function | Manual |
| ATK-SHELL-006 | Test at 320 CSS px width or equivalent 400% zoom | Stretch gate: content reflows unless a documented two-dimensional exception applies | Manual |
| ATK-SHELL-007 | Emulate `prefers-reduced-motion: reduce` | Authored transitions and animations are absent | Browser |
| ATK-SHELL-008 | Inspect every Barrier/Fixed indicator without color | Word and shape still identify state | Manual |
| ATK-SHELL-009 | Scan rendered HTML in every automated view/mode and representative dynamic state | No duplicate IDs or broken label/control relationships | Browser |
| ATK-SHELL-010 | Press Escape and use browser Back from each barrier | Neither action is blocked; page remains operable | Manual |
| ATK-SHELL-011 | Run axe on shell-only routes | No unresolved findings | Automated a11y |

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
| ATK-S01-B-003 | Allow countdown to reach zero | All fields clear and exact termination message appears | Browser |
| ATK-S01-B-004 | Submit first complete attempt | All fields clear and only “Invalid input.” is shown | Browser |
| ATK-S01-B-005 | Submit second complete attempt | Submission is accepted | Browser |
| ATK-S01-B-006 | Complete task using keyboard and attempt to leave at every step | Every control is reachable and the visitor can escape/reset | Manual |

### Station 01 fixed

| ID | Procedure | Pass condition | Type |
|---|---|---|---|
| ATK-S01-F-001 | Advance each step | Focus moves to the new step heading | Browser + AT smoke |
| ATK-S01-F-002 | Enter member number that is not exactly six digits | Named corrective error appears and value remains | Browser |
| ATK-S01-F-003 | Trigger an error | Error uses `role="alert"`, does not take focus, and is announced exactly once | Browser + AT smoke |
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
| 02 | Vague retry; field-specific error announced without stealing focus; value retention; completion | Error announcement with real AT |
| 03 | Equivalent return result in both versions; independent reset | Human reading-level and comprehension edit |
| 04 | Permanent safe backup; fixed disclosure persistence; Escape and focus return | Pointer hover/focus matrix |
| 05 | Bounded automatic interrupt; Escape; focus return; user-requested fixed update | Announcement timing and interruption review |
| 06 | Code disappears in Barrier; Fixed retains and can enter it; confirmation | Cognitive/redundant-entry review |
| 07 | Bounded focus cycle; permanent Escape; focus return; fixed native dialog close | Full keyboard and AT dialog matrix |
| 08 | Noninteractive missing-focus replay; real Fixed radio task | Visual focus and forced-color matrix |
| 09 | Delete/reset; focus moves to the panel heading when the row is removed; Fixed icon exposes item-specific accessible name | Real AT name announcement |
| 10 | Same failed order identified; Fixed state includes color, word, and shape | Monochrome and forced-colors review |
| 11 | Same local media; Fixed captions track and transcript; task completion | Human caption synchronization and transcript accuracy |
| 12 | Rendered 20×20/2px Barrier and 44×44/8px Fixed geometry; selection | Physical touch/device matrix |

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

1. Expose and scan every barrier view; do not permanently hide it from automation.
2. Compare actual findings to exact ledger entries.
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
10. Confirm focus remains visible, never enters hidden content, and never becomes stranded.
11. Use browser Back and confirm it remains native.

Record the first unexpected focus target, missing visual focus, trapped path, or control that requires a pointer. Do not summarize a failure as “keyboard issue.”

## Zoom and reflow protocol

Required floor:

1. Set the viewport to 1280 CSS pixels wide.
2. Set browser zoom to 200%.
3. Check page-level horizontal overflow.
4. Complete both station tasks and open every mode/view.
5. Check long errors, code snippets, controls, and compare stacking.

Stretch gate aligned with WCAG 2.2 Reflow:

1. Test at a 320 CSS pixel content width or 400% zoom from 1280px.
2. Allow two-dimensional scrolling only for a part whose meaning genuinely requires it.
3. Keep forms, navigation, prose, and station controls one-dimensional.

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
5. Trigger each error and status message; confirm it is announced once with useful context.
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

Store future evidence under `docs/evidence/YYYY-MM-DD-task-id/` only when implementation begins. Each record contains:

```text
Task ID
Commit or working-tree identifier supplied by Ryan, if available
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

- [x] Clean dependency install under accepted Node version
- [x] Static check and production build
- [x] All built routes present in `dist/`
- [x] Complete browser suite, including dirty-state reset coverage for both panels in every station; no separate pure-state unit module is currently required
- [x] Fixed and host automated accessibility scans with no unresolved findings
- [x] Barrier scans exactly match approved ledger
- [ ] Manual keyboard protocol on all built stations
- [ ] Required zoom/reflow and reduced-motion protocols
- [ ] Accepted support-matrix checks with exact environment details
- [ ] Disabled-educator and classroom-safety review of both facilitator guides
- [ ] Final human content/framing review
- [x] Code and teaching-content licenses in place (MIT `LICENSE`, CC BY 4.0 `LICENSE-CONTENT`)
- [x] WCAG title and implementation-applicability review
- [x] No blanket conformance claim beyond evidence
- [x] Known limitations and unresolved P2/P3 issues recorded
- [x] No known P0 or P1 issue open in deterministic review

## Primary references

- [WCAG 2.2 normative recommendation](https://www.w3.org/TR/WCAG22/)
- [WCAG 2.2 conformance requirements](https://www.w3.org/TR/WCAG22/#conformance-reqs)
- [WCAG 2.2 Reflow](https://www.w3.org/TR/WCAG22/#reflow)
- [WCAG 2.2 No Keyboard Trap](https://www.w3.org/TR/WCAG22/#no-keyboard-trap)
- [WCAG 2.2 Pause, Stop, Hide](https://www.w3.org/TR/WCAG22/#pause-stop-hide)
- [WAI-ARIA APG Tabs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/)
- [WAI-ARIA APG Button Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/)
