# A11y Test Kitchen Roadmap

Last updated: 2026-08-09
Roadmap status: Deterministic v1 candidate complete; manual release audit and publication pending
Implementation status: Foundation, all station routes, role content, media, dependency hardening, and deterministic coverage complete

> The project specification defines intent and acceptance criteria. Once implementation begins, working code is the source of truth. If the code and specification diverge, stop, reconcile the difference, and update the affected planning documents before continuing.

## Kickstart summary

```text
PROJECT: A11y Test Kitchen
STATUS: Deterministic v1 candidate implemented
GATE CHECK: Reveal PASS | Build PASS | Deliver PASS for the local static candidate
BIBLE: Accepted as the collection baseline
VOICE PROFILES: Implemented in every station
CRAFT RULES: Enforced in source and deterministic content checks
SKILL FILE: Remains a separate owner-approved task outside the public site
RELEASE LIMIT: Manual support-matrix evidence and owner publication approval remain pending
```

### Premise

- **WHAT IT IS:** A public static website where visitors complete the same task in a deliberately broken interface and a production-quality fixed interface, then compare what changed.
- **WHO IT'S FOR:** Advocates, managers, clients, executives, developers, solutions architects, and people presenting live accessibility demonstrations.
- **WHY IT EXISTS:** It makes interface-created barriers concrete without pretending to simulate disability, then translates each fix into the language each audience can act on.

### Reveal / Build / Deliver gate

| Gate | Decision | Reason |
|---|---|---|
| Reveal | Pass | The project locates the problem in the interface rather than in a person's capacity. |
| Build | Pass | It creates reusable accessibility education, implementation examples, and testing practice. |
| Deliver | Pass with staged scope | Twelve complete stations are too large for a single build pass, but the project is deliverable as one reviewed task and one audited station at a time. |

If the premise or gate assessment changes, revise this section before implementation continues.

## Current truth and first decision

At roadmap creation time, `/Users/ryanjohnson/Projects/a11y kitchen` contained no source code and was not a Git repository. A read-only search on 2026-08-08 found no recoverable shell or Station 01. Accepted DEC-004 therefore established the greenfield source now present in `src/`.

Do not create a second implementation while a recoverable implementation exists. Ryan owns repository initialization, staging, commits, and commit history.

## Audience voice profiles

These profiles govern the “What changed” content. They describe communication needs, not fictional characters.

### Advocate

- **Core need:** Understand the human and organizational impact well enough to support a decision.
- **Default voice:** Plain, concrete, empathetic, and free of implementation jargon.
- **Example:** “The form erased the work and gave no useful way to recover.”
- **Must never do:** Include code, reduce people to impairments, invite pity, or frame the exercise as a disability simulation.

### Builder

- **Core need:** Know which requirement applies, what code or interaction must change, and how to verify the result.
- **Default voice:** Exact, practical, testable, and concise.
- **Example:** “Keep the value, name the field in the error, and move focus to a message the user can act on.”
- **Must never do:** Guess a WCAG number, present a toy fix as production-ready, or hide uncertainty behind jargon.

### Presenter

- **Core need:** Run a safe, short demonstration and explain the point without improvising harmful framing.
- **Default voice:** Timed, memorable, audience-aware, and easy to say aloud.
- **Example:** “Watch what the interface does to the person’s work.”
- **Must never do:** Overrun the planned demonstration, call it a simulator, or turn the visitor’s frustration into entertainment.

## Product invariants

These rules apply to every milestone and are release blockers, not later polish.

1. **Judge the interface, never the person.** The site is not a disability simulator. Copy that implies otherwise is a defect.
2. **The host site stays safe.** A barrier may be frustrating, but it must remain keyboard-reachable, keyboard-escapable, resettable, and bounded to its panel. It never blocks Escape or the browser Back action.
3. **The fix is production quality.** Fixed examples should be suitable for adaptation in a real product, not merely less broken than the barrier.
4. **Every station serves all three audiences.** Advocate, Builder, and Presenter content must be complete before a station ships.
5. **The state is never color-only.** Barrier and Fixed always use color, the written label, and their assigned shape.
6. **One DOM instance per panel.** View changes show and hide the barrier and fixed panels; they never duplicate panel markup or IDs.
7. **WCAG references are verified.** Criterion numbers and titles are checked against the published W3C specification before Builder copy is approved.
8. **One task, then review.** Each roadmap task ends with a change summary, untouched scope, uncertainty report, and a review gate. Do not chain tasks.
9. **No unrequested scope.** Accounts, backends, analytics, CMS features, dark mode, scoring, AI features, and marketing capture remain out of scope.

## Technical guardrails

- Astro 7 with static output and Node 22.12 or newer within Node 22, as recorded in `package.json` and DEC-017.
- Astro components plus vanilla JavaScript only.
- Client behavior uses inline `<script is:inline>` scripts; no React, Vue, Svelte, state library, or client framework.
- One hand-written stylesheet at `src/styles/global.css`; no CSS framework or Tailwind.
- Color, typography, spacing, sizing, focus, and motion values originate in documented `:root` custom properties. Components do not hard-code hex colors.
- Google Fonts load through `@import` in the global stylesheet and use resilient local fallback stacks.
- No build-time data fetching, CMS, database, authentication, analytics, or public-site AI.
- Accepted DEC-003 makes `src/` canonical, with any future preview generated from the built site rather than maintained as a second source of truth.
- Demo forms are local interactions. They submit no real data and make no network request.
- The global mode preference uses the exact `localStorage` key `atk-mode`, defaults to `builder`, and fails safely when storage is unavailable.
- The state tokens remain `--barrier: #8A3E5B` with a diamond and `--fix: #22557E` with a circle. Do not substitute a red/green pair.

## Station page contract

Every station uses these seven sections in this order:

1. **Eyebrow:** `Station NN · [barrier category]`
2. **Title:** the task in plain language
3. **Task bar:** the goal and any data the visitor needs
4. **View switch:** `Try the barrier`, `Try the fix`, and `Compare side by side`
5. **Barrier panel:** one deliberately broken but completable interaction
6. **Fixed panel:** the production-quality version of the same interaction
7. **What changed:** Advocate, Builder, and Presenter explanations, with one mode exposed at a time

`Try the barrier` is the default view. Compare mode uses two columns at 60rem and wider and stacks below that width. Each panel is rendered exactly once, and both panels provide their own reset. Every barrier includes the visually hidden sentence “This version is broken on purpose.”

## Station sequence and criteria queue

The criterion numbers below came from the supplied project specification. Their exact numbers, titles,
levels, and applicability notes are now recorded in `src/data/stations.js` after verification against WCAG 2.2.

| # | Station | Visitor task | Named barrier | Criteria to verify |
|---|---|---|---|---|
| 01 | The cancellation form | Cancel a membership | Session timer, placeholder labels, destructive errors | 2.2.1, 3.3.1, 3.3.2, 3.3.3, 3.3.4, 3.3.7 |
| 02 | The error message | Fix a rejected payment | Vague error with no recovery path | 3.3.1, 3.3.3 |
| 03 | The reading wall | Follow return instructions | Grade-16 legalese for a grade-6 task | 3.1.5 |
| 04 | The disappearing menu | Reach a settings page | Hover-only menu that vanishes | 1.4.13, 2.1.1 |
| 05 | The interruption | Book an appointment | Auto-refresh and focus-stealing modals | 2.2.2, 2.4.3, 3.2.5 |
| 06 | The memory tax | Transfer money | A confirmation code shown only once | 3.3.7 |
| 07 | The keyboard trap | Close a promo overlay | Focus cannot leave the overlay | 2.1.2 |
| 08 | The invisible focus | Buy a ticket without a mouse | Removed focus outline | 2.4.7 |
| 09 | The unlabelled icon | Delete one item | Icon-only controls with no accessible name | 4.1.2, 1.1.1 |
| 10 | The color-only status | Find the failed order | Status shown by a colored dot alone | 1.4.1 |
| 11 | The caption gap | Get instructions from a video | No captions or transcript | 1.2.2, 1.2.3 |
| 12 | The target too small | Tap the right option on a phone | 20px targets separated by 2px | 2.5.8 |

## Delivery strategy

The project will ship in vertical slices. Milestone 2 proves the complete station pattern with Station 01. Milestone 3 creates a useful cognitive-accessibility MVP with Stations 01-03. Later milestones add stations in the order required by the specification.

| Milestone | Outcome | Status |
|---|---|---|
| 0. Alignment and source reconciliation | Canonical source, premise, specification, and safety decisions agree | Accepted; the optional operating-skill task remains separate |
| 1. Accessible site foundation | Static Astro shell, design system, mode behavior, rail, and About page | Implemented; manual support-matrix checks pending |
| 2. Station 01 reference slice | One complete station and reusable station components | Implemented; manual support-matrix checks pending |
| 3. Cognitive-accessibility MVP | Stations 01-03 complete and publicly reviewable | Implemented with deterministic coverage |
| 4. Interaction and interruption set | Stations 04-06 complete | Implemented with deterministic coverage |
| 5. Keyboard and semantics set | Stations 07-09 complete after safety decisions | Implemented with narrow, documented exceptions |
| 6. Visual, media, and pointer set | Stations 10-12 complete | Implemented with original, locally generated media |
| 7. Whole-site hardening and release | Cross-page audit, documentation, and static release candidate | Deterministic hardening complete; manual matrix and publication pending |

No calendar estimates are assigned until the full Station 01 review, including manual evidence, establishes a measured production cycle.

## Milestone 0 — Alignment and source reconciliation

### Objective

Create one trustworthy starting point and resolve contradictions before implementation effort begins.

### Tasks

- [x] **M0.1 — Accept the premise and gate check.** Confirm that the premise above expresses the intended product and that staged delivery is the agreed bandwidth boundary.
- [x] **M0.2 — Reconcile the source.** Locate and restore the claimed Astro shell and Station 01, or record an explicit greenfield decision.
- [x] **M0.3 — Establish the canonical specification.** Put the supplied specification at `specs/PROJECT.md`, then update its status and planning ownership so it reflects the current greenfield recommendation.
- [x] **M0.4 — Complete the production bible.** Record the editorial/visual setting, three tone words, format rules, “what it is not,” whether the project connects to a larger body of work or stands alone, and the production window for one station. Do not invent the missing connection or time budget.
- [x] **M0.5 — Record repository ownership.** Ryan decides whether and when to initialize Git and remains responsible for all commits.
- [x] **M0.6 — Resolve intentional-barrier policy.** Define how expected accessibility failures are scoped, documented, audited, and prevented from leaking outside each barrier panel.
- [x] **M0.7 — Resolve the Station 07 and Station 08 conflicts.** DEC-009 uses a bounded focus-cycle demonstration with permanent Escape and reset exits. DEC-010 uses a noninteractive replay for the missing-focus failure, so the host never removes focus from a live control. The specification records both amendments.
- [x] **M0.8 — Define the support matrix.** Record the desktop and mobile browsers, keyboard paths, zoom setup, reduced-motion setup, and real assistive-technology smoke tests used for release.
- [ ] **M0.9 — Create the project operating skill.** After the premise, audience voices, craft rules, production bible, and barrier-safety policy are approved, create `/Users/ryanjohnson/.skills/a11y-test-kitchen/SKILL.md` in a separate owner-approved task. It should turn the approved bible into repeatable station-authoring instructions and must not add AI to the public site.

### Exit gate

- There is exactly one canonical source tree.
- The project specification exists in the repository and its status card is accurate.
- The production bible answers its setting, tone, format, drift boundary, connection, and station production-window questions.
- The intentional-barrier policy distinguishes deliberate teaching failures from accidental host-site defects.
- Safety conflicts have an owner and a recorded decision; Station 07 and Station 08 cannot advance without one.
- The project operating skill reflects the approved bible, audience voices, station format, craft rules, and explicit drift-prevention rules before Station 01 becomes the reference output.
- The next task is either “verify the restored build” or “scaffold the greenfield build,” never both.

## Milestone 1 — Accessible site foundation

### Objective

Produce an accessible static shell that can host every station without adding a framework or duplicating behavior.

### Tasks

- [x] **M1.1 — Establish and verify the Astro toolchain.** Restore or create the static Astro project, declare the supported Node runtime, install dependencies, and prove the development and production builds run. The v1 hardening pass upgraded the accepted baseline to Astro 7 under DEC-017.
- [x] **M1.2 — Add deterministic quality scripts.** Define repository commands for Astro checks, production build, functional tests, accessibility checks, and the complete local gate. Keep the scripts stable so every later task uses the same entry points.
- [x] **M1.3 — Build the global design system.** Define all color, type, spacing, layout, focus, state-shape, and motion tokens in `:root`; ensure focus indicators have at least 3:1 contrast against their backgrounds; add the base responsive rules and the reduced-motion override.
- [x] **M1.4 — Build `Base.astro`.** Add the skip link first in tab order, semantic masthead, page landmark structure, mode control, and footer.
- [x] **M1.5 — Implement the audience mode contract.** Use three buttons with accurate `aria-pressed`, one visible explanation panel, `atk-mode` persistence, a `builder` default, and exception-safe storage access.
- [x] **M1.6 — Create `src/data/stations.js`.** Make station order, slug, title, task, barrier category, status, and verified-criteria placeholders available from one source.
- [x] **M1.7 — Build `StateChip.astro` and `StationTicket.astro`.** Encode the color + word + shape contract and the built/not-built rail states.
- [x] **M1.8 — Build the home page rail.** Render all twelve stations from the data source; unbuilt stations use dashed, non-misleading “Not built yet” tickets.
- [x] **M1.9 — Build the About page.** Explain the project, the non-simulator framing, the three audience modes, and the limits of the demonstrations in public language.
- [ ] **M1.10 — Audit the shell.** Verify keyboard order, skip-link behavior, landmarks, focus visibility, 200% zoom, narrow layouts, reduced motion, storage failure, and state indicators before station code is added.

### Exit gate

- Home and About routes build as static pages.
- The mode switch works and persists across routes, with a tested storage-failure fallback.
- The rail is data-driven and lists all twelve stations in the required order.
- The shell has no accidental automated accessibility findings and passes the manual site-floor checks.
- No station-specific behavior has been hidden inside the global layout.

## Milestone 2 — Station 01 reference slice

### Objective

Prove the full station contract end to end with “The cancellation form,” then freeze the reusable pattern before multiplying it.

If the original Station 01 is restored, extract reusable components from its working markup as the supplied build order requires. If this is greenfield, implement those components directly with Station 01 as their first and reference consumer; do not create throwaway duplicate markup just to extract it later.

### Tasks

- [x] **M2.1 — Write the Station 01 implementation brief.** Finalize the seven page sections, starting state, reset behavior, barrier sequence, fixed sequence, all three audience panels, and verified WCAG criterion titles.
- [x] **M2.2 — Build `ViewSwitch.astro`.** Implement the accepted native-radio display modes, checked state, native keyboard behavior, single-instance panels, and the 60rem side-by-side breakpoint.
- [x] **M2.3 — Build `ChangedPanels.astro`.** Accept Advocate, Builder, and Presenter content without duplicating IDs or exposing inactive content to assistive technology.
- [x] **M2.4 — Implement the Station 01 barrier.** On the first focus of any barrier field, start a 30-second countdown. At zero, clear every field and show “Session terminated. Please re-initiate.” On the first submit, clear every field and show only “Invalid input.” Accept the second submit. Include the reset control, hidden “broken on purpose” note, and a permanent keyboard escape path.
- [x] **M2.5 — Implement the Station 01 fix.** Add the three-step flow and move focus to each new step heading. Require a member number of exactly six digits; an error names the field, states what is wrong, preserves the value, and uses `role="alert"` without taking focus. Back navigation retains prior answers, step 3 reviews every answer, no time limit applies, and reset restores the full starting state.
- [x] **M2.6 — Write the three explanation panels.** Advocate uses human impact and no code; Builder uses verified criteria, code moves, a focused snippet, and tests; Presenter uses a timed run sheet and three memorable lines.
- [x] **M2.7 — Add Station 01 functional coverage.** Cover the timer start and expiry, first and second submits, validation and alerts, back navigation, retained state, review, both resets, all views, and all audience modes.
- [ ] **M2.8 — Run the station audit.** Complete automated checks plus keyboard-only, focus, 200% zoom, reduced-motion, color/shape/word, duplicate-ID, reading-level, and real assistive-technology smoke checks.
- [x] **M2.9 — Freeze the station contract.** Document any component inputs or behaviors every later station must follow. Refactor only issues discovered by the audit; do not broaden the product.

### Exit gate

- Station 01 contains all seven required sections in order.
- Barrier and fixed tasks are completable using only a keyboard.
- Both panels reset independently to a documented starting state.
- All Station 01 EARS acceptance criteria have deterministic coverage or a named manual check.
- All three audience panels are complete, and Builder criteria have been verified against W3C.
- The station template can be reused without copying global scripts or DOM IDs.

## Milestone 3 — Cognitive-accessibility MVP

### Objective

Ship a coherent first collection focused on time pressure, error recovery, and readable content.

### Tasks

- [x] **M3.1 — Build and deterministically audit Station 02: The error message.** The barrier gives an unhelpful error with no recovery guidance; the fix identifies the field, explains the problem, preserves input, and provides a clear next action.
- [x] **M3.2 — Build and deterministically audit Station 03: The reading wall.** The barrier presents needlessly complex return instructions; the fix preserves meaning while making the task understandable at roughly a sixth-grade reading level.
- [x] **M3.3 — Run the three-station regression.** Recheck shared mode and view behavior, reset isolation, IDs, navigation, rail state, and site-floor requirements across Stations 01-03.
- [x] **M3.4 — Prepare an MVP review build.** Produce a static build for review without adding analytics, sign-up prompts, or a second content source.

### Exit gate

- Stations 01-03 are marked built on the rail and no later station is presented as complete.
- Each station has complete Advocate, Builder, and Presenter content.
- The three fixed examples are production quality and the three barriers remain bounded and escapable.
- A clean production build and the full quality gate can be reproduced from a fresh dependency install.

## Milestone 4 — Interaction and interruption set

### Objective

Add Stations 04-06 while proving that hover, focus movement, interruption, and memory barriers can be taught without compromising the host page.

### Tasks

- [x] **M4.1 — Build and deterministically audit Station 04: The disappearing menu.** Demonstrate hover-only disclosure friction while keeping the station task completable and the page keyboard-safe; the fix supports keyboard and pointer persistence.
- [x] **M4.2 — Build and deterministically audit Station 05: The interruption.** Demonstrate disruptive refresh/focus movement in a bounded way; the fix preserves task context, user control, and predictable focus.
- [x] **M4.3 — Build and deterministically audit Station 06: The memory tax.** Demonstrate a confirmation code that cannot be consulted during the task; the fix removes recall as a requirement and supports safe review or transfer of the value.
- [x] **M4.4 — Run the six-station regression.** Include focus restoration, Escape behavior, timer cleanup, reset cleanup, and no residual state after navigating between views.

### Exit gate

- Stations 04-06 satisfy the standard station definition of done.
- Pointer-triggered content is dismissible, hoverable, and persistent in the fixed example.
- No refresh, modal, timer, or focus behavior can strand a visitor or affect content outside its panel.

## Milestone 5 — Keyboard and semantics set

### Objective

Add Stations 07-09 only after the intentional-barrier policy resolves the tension between faithful examples and the non-negotiable site floor.

### Tasks

- [x] **M5.1 — Approve the safe Station 07 pattern.** DEC-009 documents a bounded cycle that always retains Escape, reset, and view-change exits.
- [x] **M5.2 — Build and deterministically audit Station 07: The keyboard trap.** Keep constrained focus behavior inside the barrier panel and provide tested escape paths; the fixed overlay follows a native-dialog pattern.
- [x] **M5.3 — Approve the safe Station 08 pattern.** DEC-010 documents a noninteractive missing-focus replay that does not place a keyboard user in an invisible-focus task.
- [x] **M5.4 — Build and deterministically audit Station 08: The invisible focus.** Limit the deliberate failure to the approved replay; the fixed task has a consistent, high-contrast indicator throughout.
- [x] **M5.5 — Build and deterministically audit Station 09: The unlabelled icon.** Bound the missing-name example to its intended control, preserve task safety, and make the fixed icon button expose a correct accessible name and equivalent visual meaning.
- [ ] **M5.6 — Run the nine-station regression.** Add deliberate keyboard escape attempts, accessible-name inspection, focus-order checks, and real assistive-technology smoke tests.

### Exit gate

- The Station 07 and 08 safety decisions are explicit in both spec and tests.
- Every page-level and fixed-panel control has a visible focus indicator and an accessible name.
- No station can trap keyboard or assistive-technology users.
- Intentional exceptions are narrow, documented, and never used to suppress unrelated audit findings.

## Milestone 6 — Visual, media, and pointer set

### Objective

Complete the twelve-station curriculum with non-color status, captions/transcripts, and target sizing.

### Tasks

- [x] **M6.1 — Build and deterministically audit Station 10: The color-only status.** The fix communicates status with color, a written label, and a shape; forced-color confirmation remains in the manual release matrix.
- [x] **M6.2 — Prepare Station 11 media.** Create a short, locally generated instructional clip, accurate synchronized captions, an equivalent transcript, and a reproducible provenance record.
- [x] **M6.3 — Build and deterministically audit Station 11: The caption gap.** The barrier remains controllable and bounded; the fix exposes captions and a transcript with an understandable relationship to the media.
- [x] **M6.4 — Build and deterministically audit Station 12: The target too small.** Test exact rendered geometry at a phone-sized viewport and verify the fixed target size and spacing against the named criterion.
- [x] **M6.5 — Run the twelve-station regression.** Recheck rail status, routes, modes, views, resets, responsive layout, media behavior, and shared semantics across the complete collection.

### Exit gate

- All twelve rail tickets lead to complete stations.
- Media rights, captions, and transcript accuracy are documented.
- State meaning survives monochrome, zoom, and the selected high-contrast conditions.
- Pointer targets meet the verified criterion without creating overlap or horizontal scrolling.

## Milestone 7 — Whole-site hardening and release

### Objective

Turn the completed station set into a reproducible static release candidate.

### Tasks

- [x] **M7.1 — Run a content and framing review.** Search all public copy for simulator language, person-blaming language, invented WCAG claims, incomplete audience panels, placeholders, and reading-level drift. A final human plain-language review remains in the manual release matrix.
- [x] **M7.2 — Run a structural review.** Verify routes, titles, headings, landmarks, internal links, duplicate IDs, hidden-state semantics, local media, and absence of unintended client scripts or data submission.
- [ ] **M7.3 — Run the full accessibility matrix.** Complete automated audits and the documented browser, keyboard, 200% zoom, reduced-motion, high-contrast, and assistive-technology checks.
- [x] **M7.4 — Run the functional regression.** Exercise every task, failure path, success path, reset, mode, view, breakpoint, navigation path, and storage-failure path covered by the deterministic suite.
- [x] **M7.5 — Verify a clean static build.** Install from the lockfile into a fresh dependency tree, run the complete quality gate, build static output, and inspect representative built pages rather than only the development server.
- [x] **M7.6 — Finish project documentation.** Document local setup, quality commands, architecture, station authoring, intentional-barrier policy, known limitations, media provenance, evidence, and release steps in `README.md` and `docs/`.
- [x] **M7.7 — Prepare the release handoff.** Record what changed, what remains out of scope, unresolved risks, manual-test boundaries, and the exact release artifact. Ryan handles staging, commits, hosting, and publication approval.

### Exit gate

- The full deterministic gate passes from a clean checkout and dependency install.
- Required manual checks have recorded browser, viewport, input, and assistive-technology details.
- No release-blocking accessibility, framing, content, or functional issue remains open.
- The built output contains no analytics, accounts, AI, CMS, backend, or other out-of-scope feature.
- Ryan has reviewed the release candidate and decides whether to commit and publish it.

## Standard station delivery loop

Every station after Station 01 follows this sequence. Each numbered item is a separate task and review boundary.

1. **Brief:** Write the task, supplied data, starting state, barrier behavior, fixed behavior, reset behavior, safety boundary, and success state.
2. **Content:** Draft Advocate, Builder, and Presenter panels. Verify the WCAG criterion numbers and titles against the published W3C source.
3. **Barrier:** Implement only the named failure pattern. Include the hidden “This version is broken on purpose.” note, a reset, and a guaranteed escape path.
4. **Fix:** Implement the production-quality alternative with predictable focus, understandable errors, preserved input, and appropriate semantics.
5. **Functional checks:** Test barrier completion, fixed completion, failure paths, success paths, both resets, all three views, and all three audience modes.
6. **Accessibility audit:** Run automated checks and manually verify keyboard use, focus, zoom, motion, color independence, IDs, copy, and any station-specific criterion.
7. **Review gate:** Report changed files and behavior, explicitly untouched scope, uncertainties, expected intentional failures, and evidence. Wait for review before starting the next station.

## Definition of ready for a station

A station may enter implementation only when:

- Its task and required test data are written in plain language.
- The single barrier pattern is named and its safety boundary is approved.
- The fixed interaction is specified at production quality.
- Starting, error, success, and reset states are defined.
- All three audience panels are drafted or content-ready, not deferred as placeholders.
- Builder criterion numbers and titles have a verification owner.
- Any media or special asset exists and has the required rights and alternatives.
- The station has no unresolved conflict with the site-wide accessibility floor.

## Definition of done for a release-verified station

The rail's `built`/“Ready to try” state means an implemented route is available and its deterministic
station gate passes. It does not claim that the manual support matrix or publication review is complete.
The stronger release-verification definition below remains separate.

A station is done only when:

- It contains the seven required sections in the specified order.
- The task is completable in both panels using only a keyboard.
- Focus is visible at every safe host-page step, has at least 3:1 contrast against its background, and follows the approved station policy.
- The barrier carries the hidden “broken on purpose” note and never traps the user.
- Barrier and fixed panels each have a working reset that also clears timers, messages, and transient state.
- There are no duplicate IDs, including after view and mode changes.
- Barrier and fixed panels are each rendered once.
- The native view radios expose correct checked state and show the correct panel arrangement at every breakpoint.
- Advocate, Builder, and Presenter explanations are complete and only the active explanation is exposed.
- WCAG criterion numbers and titles are verified, not recalled from memory.
- Copy is understandable at roughly a sixth-grade reading level without losing accuracy.
- Barrier and Fixed use color + word + shape everywhere the state appears.
- The page has no horizontal scroll at 200% zoom on a 1280px viewport.
- Motion is removed or reduced under `prefers-reduced-motion: reduce`.
- Functional, automated accessibility, and required manual checks pass, except for narrowly documented intentional barrier behavior.
- Release evidence records every item above without treating the rail availability label as proof.

## Verification strategy

The exact script names are established in Milestone 1 and then remain stable. The complete gate should be one deterministic repository command composed from these layers.

| Layer | Purpose | Minimum evidence |
|---|---|---|
| Static/build | Catch Astro, import, type, and production-output failures | Clean dependency install, Astro check, static build |
| Unit | Exercise pure interaction state where practical | Mode fallback, timer/form state, reset behavior, validation state |
| Browser functional | Verify rendered behavior rather than implementation details | Modes, views, responsive compare layout, forms, focus movement, resets, navigation |
| Automated accessibility | Find semantic, naming, contrast, landmark, and ID defects | Shell and fixed views scan clean; barrier exceptions are exact and documented |
| Manual keyboard | Confirm real traversal and escape behavior | Full task in both panels, visible focus, logical order, no trap |
| Manual visual | Confirm reflow and state redundancy | 200% zoom at 1280px, narrow viewport, reduced motion, color + word + shape |
| Assistive technology | Catch announcement and relationship defects automation misses | Support-matrix smoke test for shell and each new interaction pattern |
| Editorial | Protect framing and comprehension | Simulator-language search, role-panel review, reading-level review, W3C citation check |

### Intentional-failure testing policy

- Never disable an accessibility rule for the whole site because one barrier demonstrates that rule.
- Scope each expected finding to the smallest known station element and the exact named barrier.
- Record why the finding is pedagogically required, how the visitor exits or resets it, and how the fixed panel resolves it.
- Treat any additional finding, changed selector, leaked behavior, or host-shell failure as a regression.
- Keep automated exceptions in test configuration or fixtures, not as undocumented comments scattered through production code.
- Manual safety checks still apply even when an automated violation is expected.

## Architecture target

```text
.
├── astro.config.mjs
├── package.json
├── package-lock.json
├── README.md
├── roadmap.md
├── specs/
│   └── PROJECT.md
└── src/
    ├── components/
    │   ├── ChangedPanels.astro
    │   ├── StateChip.astro
    │   ├── StationFrame.astro
    │   ├── StationPanel.astro
    │   ├── StationTicket.astro
    │   ├── ViewSwitch.astro
    │   └── stations/
    │       └── Station02.astro through Station12.astro
    ├── assets/
    │   ├── station-11-captions.vtt
    │   ├── station-11-instructions.mp4
    │   └── station-11-poster.png
    ├── data/
    │   └── stations.js
    ├── layouts/
    │   └── Base.astro
    ├── pages/
    │   ├── about.astro
    │   ├── index.astro
    │   └── stations/
    │       └── [slug].astro
    └── styles/
        └── global.css
```

Station-specific markup and behavior stay on the station route unless at least two working stations prove the abstraction is shared. Shared components own stable presentation contracts; they do not become a generic form framework.

## Key risks and mitigations

| Risk | Consequence | Mitigation / gate |
|---|---|---|
| The claimed baseline is missing | Duplicate or wasted implementation | Reconcile source before scaffolding; record greenfield choice explicitly |
| Broken examples harm rather than teach | Visitors are trapped, distressed, or misled | Bound every barrier, provide reset and escape, review the safety policy before implementation |
| Station 07/08 contradict the site floor | The project cannot satisfy its own acceptance criteria | DEC-009 and DEC-010 replace literal failures with safe, bounded teaching patterns and exact tests |
| Intentional failures hide accidental ones | Real defects ship under broad audit suppressions | Use exact per-element exceptions and fail on any unexpected result |
| `preview/` drifts from Astro source | Reviewers see stale or contradictory behavior | Accept DEC-003 before preview work; keep `src/` canonical and generate previews from builds if later needed |
| WCAG criteria are misquoted | Builder guidance loses credibility | Verify criterion number and title against W3C during each station brief and final audit |
| Reusable components are abstracted too early | Complexity rises and station needs are obscured | Let Station 01 establish the contract; generalize further only after a second real consumer |
| Timers, modals, and scripts leak state | Other views or routes behave unpredictably | Clean up timers/listeners, isolate state per panel, and test reset plus navigation paths |
| The twelve-station content load stalls delivery | Many partial stations exist but none are shippable | Ship audited cohorts; never mark a station built until all three audience panels are complete |
| Copy becomes technical or person-blaming | The public framing fails | Run role-specific editorial review and simulator-language search at station and release gates |
| Responsive comparison overflows | The site fails at zoom and smaller screens | Stack below 60rem, test long content and controls at required zoom on every station |
| External fonts fail or delay | Content becomes unreadable or layout shifts badly | Use robust fallbacks and keep the content usable before web fonts load |

## Explicitly out of scope

Do not add or propose the following within this roadmap:

- Disability-simulation filters, tremor cursors, or whole-page vision overlays
- A screen-reader emulator
- Accounts, login, saved progress, or a backend
- Analytics, third-party tracking, or cookie banners
- A CMS or admin panel
- Comments, forums, or user-submitted stations
- Dark mode before the light theme is complete and audited
- Automated accessibility scores or gamified scoring
- Public-site AI features
- Newsletter capture, popups, or interstitials

## Decisions still required

Only decisions that materially affect upcoming work are listed here. Source ownership, the greenfield
baseline, intentional-failure policy, the initial support matrix, the Station 07/08 safety patterns, and
Station 11 media provenance are accepted in DEC-003, DEC-004, DEC-008 through DEC-011, and DEC-016.

1. **Release target:** select a static host only after the manual release matrix is complete; hosting choice must not reshape the product architecture.

## Immediate next task

Complete the whole-site manual release evidence in the accepted support matrix:

1. Full keyboard walkthrough of all twelve tasks, 200% browser zoom, forced-colors check, and exact focus-contrast review.
2. Safari with VoiceOver and Firefox desktop smoke tests for the shell and each distinct interaction pattern.
3. iOS Safari with VoiceOver smoke tests for the shell, media, dialog, and target-size station when that environment is available.
4. Owner review of the static release candidate, its intentional-failure ledger, and its public `built` rail status.

After that review, Ryan chooses the static host and publication timing. The project operating skill remains a separate owner-approved task outside the public site.
