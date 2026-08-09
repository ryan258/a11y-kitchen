# A11y Test Kitchen Decision Log

Status: Active implementation log
Last updated: 2026-08-08
Authority: Explicit project decisions and proposed amendments

This log prevents consequential choices from being hidden in implementation. Ryan's 2026-08-08 request to develop the project authorized the documented reference-slice baseline. The later request to review that slice and finish the project authorized implementation of the recommended Station 07 safety pattern and the static-inspection option for Station 08. Those choices are accepted only in their narrow forms below; the host-site safety floor remains authoritative.

## Status vocabulary

| Status | Meaning |
|---|---|
| `INHERITED` | Normative in the supplied specification; change only through an explicit superseding decision |
| `ACCEPTED` | Ryan approved the decision |
| `PROPOSED` | Recommended working decision; owner review pending |
| `BLOCKED` | No safe or accurate implementation proceeds until a decision is accepted |
| `DEFERRED` | Decision is intentionally postponed until its named trigger |
| `SUPERSEDED` | A later decision replaces this one; retain history and link the replacement |

## Summary

| ID | Decision | Status | Needed by |
|---|---|---|---|
| DEC-001 | Judge the interface, never simulate disability | `INHERITED` | All public work |
| DEC-002 | Static Astro, vanilla inline JavaScript, one stylesheet | `INHERITED` | Scaffolding |
| DEC-003 | Treat `src/` as canonical and generate any preview | `ACCEPTED` | Scaffolding |
| DEC-004 | Treat this workspace as greenfield | `ACCEPTED` | Scaffolding |
| DEC-005 | Keep Astro 5 and raise the runtime to Node 22 | `ACCEPTED` | Dependency installation |
| DEC-006 | Use a native radio group for the three display modes | `ACCEPTED` | `ViewSwitch.astro` |
| DEC-007 | Make no blanket WCAG conformance claim for station pages | `ACCEPTED` | Public copy and release |
| DEC-008 | Use a narrow intentional-failure ledger, never broad suppressions | `ACCEPTED` | First accessibility test |
| DEC-009 | Use an escapable focus cycle for Station 07 | `ACCEPTED` | Station 07 brief |
| DEC-010 | Use a static product-focus replay for Station 08 | `ACCEPTED` | Station 08 brief |
| DEC-011 | Adopt an initial browser and assistive-technology support matrix | `ACCEPTED` | Foundation audit |
| DEC-012 | Choose a static hosting provider | `DEFERRED` | Audited MVP |
| DEC-013 | Treat the project as standalone within Ryan's wider work | `ACCEPTED` | Bible approval |
| DEC-014 | Measure Station 01 before estimating later station duration | `ACCEPTED` | Station 01 review |
| DEC-015 | Use Playwright plus axe-core as browser/a11y automation | `ACCEPTED` | Test tooling task |
| DEC-016 | Generate Station 11 media locally from recorded source text | `ACCEPTED` | Station 11 media |

## DEC-001 — Interface-centered framing

**Status:** `INHERITED`
**Owner:** Ryan
**Source:** Supplied project specification

### Decision

The site judges the interface, never the person. It uses “broken interface,” “barrier,” and “the fix.” It never calls a station a disability simulator or claims that a short interaction reproduces disability.

### Consequences

- Copy that breaks this rule is a release-blocking defect.
- Presenter scripts must state the boundary before a live demonstration.
- No visual filter or input distortion may be added to the public site.

## DEC-002 — Static, framework-free product architecture

**Status:** `INHERITED`
**Owner:** Ryan
**Source:** Supplied project specification

### Decision

Use Astro with fully static output, Astro components, vanilla JavaScript in `<script is:inline>`, and one hand-written global stylesheet. Do not add a client framework, state library, CMS, database, backend, or build-time data fetching.

### Consequences

- Interactions are small, page-local state machines.
- Inline scripts must account for Astro rendering the script each time an inline-script component instance appears.
- There is no server persistence or real form submission.

## DEC-003 — Canonical source and preview policy

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** Scaffolding

### Context

The historical spec described a hand-maintained `preview/` copy and identified drift as a risk.

### Decision

`src/` is the only product source. Do not keep hand-copied preview markup. If a no-install preview becomes necessary, generate it from a verified `astro build` artifact.

### Consequences

- Review and release inspect built output from the same source.
- A preview never receives direct edits.
- Removing a stale preview is allowed only after exact targets are reviewed; no destructive action is implied by accepting this decision.

## DEC-004 — Greenfield working baseline

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** Scaffolding

### Evidence

On 2026-08-08, the project directory contained only planning material. A read-only filename search under `/Users/ryanjohnson/Projects` found no matching Astro shell, Station 01 route, or named components.

### Decision

Treat this workspace as greenfield. Preserve the supplied specification's behavior and structure, but do not spend implementation effort reproducing a fictional pre-existing extraction history.

### Consequences

- Foundation components can be authored directly with Station 01 as their reference consumer.
- No duplicate implementation is knowingly created.
- If prior source is later supplied before scaffolding, supersede this decision and inspect that source first.

## DEC-005 — Framework and runtime baseline

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** Dependency installation

### Context

The spec pins Astro 5 and says Node 18 or newer. By August 2026, Node 18 and Node 20 are end-of-life. Astro's current documentation treats Astro 5 as an older snapshot, while Node 22 remains compatible with Astro 5.

### Decision

Keep the supplied Astro 5 major as an intentional reference-slice pin. Use Node 22.12 or newer within Node 22 for local and deployment environments. Record the baseline in `.nvmrc`, constrain the engine in `package.json`, and use the lockfile for exact dependency resolution.

### Consequences

- Do not run a scaffold or package install until this decision is accepted.
- Dependency versions and lockfile are created once, under the accepted runtime.
- A framework-major change cannot silently introduce server output, a client framework, or a different script model.

## DEC-006 — View-control semantics

**Status:** `ACCEPTED`
**Owner:** Ryan, with implementation recommendation from accessibility review
**Needed by:** `ViewSwitch.astro`

### Conflict

The spec calls the three options tabs and requires `aria-selected`. Ordinary tabs represent one selected tab and one associated tab panel. `Compare side by side` instead reveals two already-rendered panels, and the project forbids rendering duplicate panels. That behavior does not cleanly match the standard tab pattern.

### Decision

Use three native radio buttons in a labelled `fieldset`. The values are mutually exclusive display modes: barrier, fixed, and compare. Native checked state communicates selection; `aria-controls` names the affected panel or panels. Do not add tab roles or `aria-selected` to this control.

### Evidence and remaining boundary

Rendered Chromium tests cover native keyboard operation, checked state, focus safety, panel visibility, comparison layout, and state preservation. Safari with VoiceOver remains part of the pre-release manual support-matrix check; that pending environment does not reopen the semantic choice.

## DEC-007 — Public conformance language

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** About-page copy and release

### Evidence

WCAG 2.2 conformance applies to full pages; part of a page cannot be excluded. W3C also notes that a nonconforming example page cannot be included in the scope of a conformance claim. Non-interference requirements still apply to all content, including 2.1.2 No Keyboard Trap and 2.2.2 Pause, Stop, Hide.

### Decision

Do not advertise station pages or the whole site as “WCAG 2.2 AA compliant.” State instead that the host experience follows a documented accessibility floor, fixed examples are reviewed against named criteria, intentional failures are disclosed, and testing evidence is published or available.

### Consequences

- A clean axe scan is not described as conformance.
- Any future formal claim requires a defined scope and independent full-page evaluation.
- Station 07 can never contain a literal keyboard trap, even as an intentional example.

## DEC-008 — Intentional-failure exception policy

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** First automated accessibility check

### Decision

Every expected automated finding must have one ledger entry containing station, selector, named criterion, intended failure, safety boundary, expected tool/rule result, fixed-panel resolution, and owner. Suppressions are scoped to the exact element and expected rule. Broad page, route, or rule suppression is prohibited.

### Consequences

- Any new selector or rule result fails the test.
- Manual non-interference checks remain mandatory.
- Hidden views are tested when exposed, not ignored permanently.

## DEC-009 — Station 07 safety pattern

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** Station 07 brief

### Conflict

The lesson is “keyboard trap,” but the site floor and WCAG non-interference rule forbid an actual trap.

### Decision

The barrier cycles Tab and Shift+Tab between two promo controls and omits a visible product close control. A prominently documented standard Escape action always closes the overlay and returns focus to its opener. Reset and view changes also close it. Browser Back is never intercepted. The presenter states that the exhibit is a safe approximation and that a harmful production trap removes the release.

### Consequences

- The public barrier pattern says “focus cycles” rather than promising a literal trap.
- The fixed view uses a native dialog, a visible Close promotion button, Escape, and focus return.
- Any change that removes Escape, reset, view-switch cleanup, or browser Back fails safety review.

## DEC-010 — Station 08 safety pattern

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** Station 08 brief

### Conflict

The lesson is “invisible focus,” but the site floor requires visible focus on every interactive element.

### Decision

Use a static, non-interactive product replay inside the barrier panel. Host-owned Next product focus and Buy current option buttons drive the replay and retain the full global focus indicator. A visible text safety readout names the changing product state. The mock ticket choices intentionally draw no focus marker because they are not interactive controls.

### Consequences

- Station 08 is an explicit inspection exercise on the barrier side and an interactive task on the fixed side.
- The task, ticket facts, choice order, and success condition stay the same in both panels.
- No CSS selector may remove or weaken focus from a real interactive element.

## DEC-011 — Initial support matrix

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** Foundation audit

### Proposed matrix

| Environment | Purpose |
|---|---|
| Current Safari on macOS + VoiceOver | Primary real assistive-technology and native-control check |
| Current Chrome on macOS | Primary development, automation, keyboard, zoom, and reduced-motion check |
| Current Firefox on macOS | Independent rendering and keyboard behavior check |
| One current iOS Safari viewport + VoiceOver smoke test | Touch target, reflow, and mobile assistive-technology check |

Add Windows + NVDA before public release if a Windows environment is available. Do not claim JAWS coverage unless it was actually tested.

### Consequences

- Every manual evidence record names the exact browser, OS, viewport, zoom, input, and assistive technology.
- “Works with screen readers” is never inferred from one tool or one browser.

## DEC-012 — Static hosting provider

**Status:** `DEFERRED`
**Owner:** Ryan
**Trigger:** Stations 01-03 pass the MVP gate

### Decision boundary

Choose a host that serves the static build without adding required client scripts, analytics, cookies, authentication, or server features. Hosting must adapt to the architecture; the architecture does not expand to fit a host.

## DEC-013 — Connection to other work

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** Production-bible approval

### Decision

A11y Test Kitchen stands alone publicly while strengthening Ryan's broader accessibility practice. It does not import another project's narrative, brand, or product scope.

## DEC-014 — Production-window estimation

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** Station 01 review

### Decision

Do not invent calendar estimates before a greenfield reference station exists. Measure Station 01 by content, implementation, automated verification, manual verification, and review time. Use that measured cycle to estimate later stations.

## DEC-015 — Browser and accessibility automation

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** Test tooling task

### Decision

Use Playwright for rendered functional checks and `@axe-core/playwright` for automated accessibility checks. Keep pure state/validation tests in Node's built-in test runner where DOM rendering is unnecessary. Add no general-purpose test framework until a demonstrated need exceeds these tools.

### Consequences

- Functional tests exercise built behavior in a browser.
- Accessibility automation can expose each view and compare exact intentional findings.
- Passing automation never replaces keyboard, zoom, content, or assistive-technology review.

## DEC-016 — Original Station 11 media

**Status:** `ACCEPTED`
**Owner:** Ryan
**Needed by:** Station 11 media

### Decision

Ship one short local MP4 whose script, captions, transcript, and simple card-and-spoon visual were authored for this project. Generate speech at authoring time with pinned `text2wav@0.0.14`, which declares the MIT License and uses eSpeak NG. Generate the visual and final encoding with FFmpeg. Do not ship an Apple system voice, third-party footage, music, remote media, or synthesizer runtime.

### Consequences

- `docs/MEDIA-PROVENANCE.md` records the exact inputs, licenses, output, timing, and release review.
- The authoring synthesizer and FFmpeg are not public runtime dependencies or part of the quality gate.
- Any regenerated audio requires a fresh human caption-timing and transcript-equivalence review.

## Decision review checklist

- [ ] Every `PROPOSED` decision is accepted, revised, deferred, or rejected before its “Needed by” boundary
- [ ] Every accepted change that alters product behavior updates `specs/PROJECT.md`
- [ ] Every architecture consequence updates `docs/ARCHITECTURE.md`
- [ ] Every evidence consequence updates `docs/ACCESSIBILITY-TEST-PLAN.md`
- [ ] Superseded decisions remain in this log with replacement links
- [ ] No implementation task is started while its required decision is `BLOCKED`
