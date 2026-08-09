# Accessibility remediation evidence — 2026-08-08

Task ID: Pre-ship review of the staged twelve-station collection, and remediation of every finding
Repository state: Unborn `main`; changes staged, no commit created by this pass
Reviewer: Claude review and remediation pass
Date: 2026-08-08

Supersedes the coverage figures in `../2026-08-08-full-collection/README.md`. That record remains an
accurate account of what the earlier pass observed; it is not edited here.

## Findings resolved

| # | Finding | Resolution |
|---|---|---|
| 1 | `role="alert"` elements were also given focus in Stations 01, 02, and 06, so assistive technology announces the error twice, and focus landed on a non-interactive `<p>` the visitor then had to leave | Alerts stay in the DOM and are announced by writing text into them. Focus is no longer moved. `aria-invalid` plus `aria-describedby` still tie the message to the field |
| 2 | Station 09 focused an `aria-live="polite"` status, causing the same double announcement | `tabindex` removed and the focus call dropped. Because deleting the row also hides the focused button, focus now moves to the panel heading, which is separate text from the announcement |
| 3 | axe never saw the Advocate or Presenter panels: only one audience panel is ever unhidden, and the suite never switched mode | Each station's Fixed view is now scanned once per audience mode |
| 4 | axe never saw Compare view | Each station is now scanned in Compare view and must produce nothing beyond its Barrier ledger |
| 5 | Station 01 was a 547-line standalone route reimplementing `StationFrame`, exempting itself from the frame's invariant checks and forcing carve-outs in three other files | Ported to `components/stations/Station01.astro`. The route, `verify-content.mjs`, and the collection suite no longer special-case it |
| 6 | Station 01 re-read its duration attribute on every timer tick | Per-tick re-read and clamp removed. The attribute is still read when the timer starts and on reset, which is what the tests retune |
| 7 | Station 01 used a `MutationObserver` for panel visibility, plus a dead `style` attribute filter, where every other station listens for `atk:panel-visibility` | Replaced with the shared event |
| 8 | `verify-build.mjs` re-checked duplicate IDs, skip-link order, and the main-content target with regexes over markup, duplicating stronger real-DOM assertions in `shell.spec.js` | Removed. The external-script check, unique to the built artifact, is kept |
| 9 | `verify-content.mjs` scanned only the first `:root` block, so a themed override would fail the build on legitimate tokens | All `:root` blocks now count as token blocks |

Documents that stated the superseded alert behavior as a requirement were corrected: `specs/PROJECT.md`,
`docs/stations/01-cancellation-form.md`, `docs/stations/02-error-message.md`,
`docs/ACCESSIBILITY-TEST-PLAN.md`, and `roadmap.md`.

## Deterministic evidence

| Command or procedure | Result | Scope |
|---|---|---|
| `npm run gate` | Pass | Astro diagnostics, content invariants, static build, all browser and axe checks, built-artifact verification |
| `npm run check` | 0 errors, 0 warnings, 0 hints across 33 files | Astro and TypeScript diagnostics |
| Playwright suite within the gate | 127 passed | Was 90. Station 01 joins the shared collection loop; new per-mode and Compare-view axe scans |
| Static generation | 14 pages | Home, About, and all twelve station routes, now from a single `[slug].astro` |

## Coverage mutation check

An unlabelled `<img>` was injected into the Presenter panel of `StationFrame.astro` and the suite was
re-run. Exactly one test failed — `@a11y Station 02 fixed view has no automated findings in Presenter
mode` — while the Barrier, Compare, and other audience-mode scans passed. Before this change the same
defect produced no failure at all. The injection was reverted and the tree verified clean.

## Boundary

These are automated and structural results. They do not replace the manual screen-reader passes named
in `docs/ACCESSIBILITY-TEST-PLAN.md`; in particular, the single-announcement behavior in findings 1 and
2 is asserted here only as "focus did not move" and still needs confirmation with real assistive
technology before the manual matrix is signed off.
