# V1 hardening evidence — 2026-08-09

Task ID: Whole-project review follow-up and deterministic v1 hardening
Repository state: Ryan's four task-copy corrections and their initial regression assertion were
already staged. The remaining v1 corrections are intentionally unstaged; final `git status` is the
handoff authority.
Reviewer: Codex implementation and review pass
Date: 2026-08-09

## Environment

- macOS host, America/Chicago
- Node 22.22.3
- npm 10.9.8
- Astro 7.2.0 from the lockfile
- Playwright 1.62.1, bundled Chromium project
- `sharp` 0.35.3 and `esbuild` 0.28.2 through the Astro dependency tree

## Review findings resolved or contained

- The public task bars no longer disclose the answers for Stations 03, 06, 10, or 11, and one shared
  regression table protects all four strings.
- Stations 02 and 06 now clear stale success state before displaying an error; Station 06 also clears
  stale errors and status when the visitor edits or uses the provided code.
- The inert Fixed controls in Stations 04 and 07 were removed, and rendered assertions require each
  affected menu/dialog to contain only its working action.
- Station-specific browser cases now dirty and reset both Barrier and Fixed panels across all twelve
  stations. The shared route loop also proves either reset leaves compare view and the selected
  audience mode intact.
- Automated accessibility coverage now includes five representative dynamic Fixed states: a field
  error, persistent menu, validation error, open native dialog, and expanded transcript. The test
  plan explicitly does not present these samples as exhaustive state coverage.
- Facilitator guidance no longer asks teachers to turn reading speed, memory, distress, repeated
  failure, or novice screen-reader use into entertainment or participant-performance evidence.
  Overstated focus/native-control and population claims were narrowed to what is actually supported.
- Current architecture, test-plan, command descriptions, framework references, and filesystem maps
  now match the implemented repository.
- The unsupported Astro 5 pin was superseded by DEC-017. Astro 7.2.0, patched `sharp` 0.35.3, and
  `esbuild` 0.28.2 build and test cleanly; npm reports no known dependency vulnerabilities.
- The project is licensed: MIT for code (`LICENSE`) and CC BY 4.0 for the teaching guides, station
  briefs, exhibit copy, and authored media (`LICENSE-CONTENT`), chosen by the owner and stated in
  the README.

## Deterministic evidence

| Command or procedure | Result | Scope |
|---|---|---|
| `npm ci --dry-run --ignore-scripts` | Pass | Lockfile/package manifest consistency without replacing the active dependency tree |
| `npm audit --json` | Pass; 0 known vulnerabilities | Full production, development, optional, and peer dependency tree |
| `npm run gate` | Pass | Astro diagnostics, content invariants, static build, all browser/axe checks, and built-artifact verification |
| Playwright suite within the gate | 132 passed | Fourteen routes, all views/modes, all 24 dirty-state resets, exact Barrier ledgers, and five representative dynamic Fixed states |
| Static generation | 14 pages | Home, About, and all twelve station routes in `dist/` |
| Representative screenshot review | Pass with no observed whitespace, clipping, or layout regression | Home and Station 06 at desktop width; Station 07 at 390×844 after the Astro 7 compiler migration |

Successful command transcripts are not copied here. Exact output belongs in diagnosis only when a
check fails.

## Manual evidence not executed

These are release-verification boundaries, not hidden passes:

- full keyboard-only traversal of every task and state in a real browser session;
- real 200% browser zoom, 320 CSS-pixel reflow, and selected-platform forced-colors inspection;
- macOS Safari with VoiceOver, Firefox desktop, and iOS Safari with VoiceOver/touch checks;
- Windows with NVDA if that environment is available;
- human caption timing and transcript-equivalence review;
- disabled-educator and classroom-safety review of both facilitator guides;
- final plain-language/editorial and owner review;
- staging the v1 corrections, commit, push, host selection, deployment, and publication.

## Verdict

The working tree is a strong deterministic v1 candidate with no known P0 or P1 implementation defect
remaining in the reviewed code paths. It is not yet a fully human-verified public release: the manual
support matrix, facilitator review, caption review, and Ryan's publication
approval remain open. No commit, push, host selection, deployment, or publication was performed.
