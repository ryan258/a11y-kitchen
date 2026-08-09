# Full-collection evidence — 2026-08-08

Task ID: Twelve-station implementation and deterministic release-candidate review
Repository state: Unborn `main` branch; no commit exists and no staging or commit command was run by
this review pass. The index changed during the session, so final `git status` is the handoff authority.
Reviewer: Codex implementation and review pass
Date: 2026-08-08

## Environment

- macOS host, America/Chicago
- Node 22.22.3
- npm 10.9.8
- Astro 5.18.2 from the lockfile
- Playwright 1.62.1, bundled Chromium project
- FFmpeg 8.1.2 for original Station 11 authoring only

## Review findings resolved

- The staged rail status used a color and word but omitted the required distinct shape. The status
  tag now includes a separate circle/diamond shape, including a forced-color-safe rendering rule.
- The staged content/build checks and browser route list stopped at Station 01. They now derive the
  complete route and criterion inventory from `stations.js`.
- Markdown in the original staged snapshot contained trailing whitespace. The completed source and
  the final staged snapshot both pass Git's whitespace check.
- Follow-on interaction review found focus could remain in hidden content after a menu selection,
  deletion, or view change from the bounded focus-cycle lesson. Focus now returns to a visible stable
  target and each adjacent path has a regression assertion.
- The automatic interruption did not rearm after its panel reset. Persistent listeners plus an
  explicit reset/hidden-state rearm restore the documented starting behavior.
- Station 11 initially presented a dark empty video surface before playback. A generated local poster
  now shows the authored card-and-spoon scene, and its presence is verified in source and build output.

## Deterministic evidence

| Command or procedure | Result | Scope |
|---|---|---|
| `npm ci --ignore-scripts` | Pass | Fresh dependency tree from `package-lock.json` |
| `npm run gate` | Pass | Astro diagnostics, content invariants, static build, all browser and axe checks, built-artifact verification |
| Playwright suite within the gate | 90 passed | Fourteen routes; Station 01 reference behavior; Stations 02–12 shared and unique behavior; exact intentional-failure checks |
| Static generation | 14 pages | Home, About, and all twelve station routes in `dist/` |
| Representative screenshot review | Pass with no observed clipping or overlap | Home at 1440×1000 and 390×844; Stations 07 and 11 at 1440×1000; Station 12 at 390×844 |
| Working-tree Markdown whitespace scan | Pass | All tracked and untracked Markdown source |

Successful command transcripts are not copied here. Exact output should be retained only when a
failure needs diagnosis.

## Intentional-failure result

The ledger contains one or more exact entries for every Barrier panel. Station 09 produces the one
expected automated finding: axe rule `button-name`, critical impact, scoped to the unnamed fictional
delete button. The other lessons are behavioral or content failures that axe does not detect; their
entries use `toolRule: null` and name a structural/manual check. Every Fixed view and both shell routes
produced no automated axe finding during this run. Any extra rule or node fails the suite.

## Media evidence

Station 11 uses one local MP4, one local poster, one WebVTT caption file, and an equivalent transcript.
The spoken script, pinned authoring package, upstream licenses, FFmpeg process, current duration, and
caption timings are recorded in `docs/MEDIA-PROVENANCE.md`. Source and built-artifact checks require
the media, poster, captions, and transcript structure.

## Manual evidence not executed

These are release-verification boundaries, not hidden passes:

- full keyboard-only traversal of every state in a real browser session;
- real 200% browser zoom at a 1280px viewport and the 320 CSS-pixel stretch check;
- macOS Safari with VoiceOver and Firefox desktop smoke tests;
- iOS Safari with VoiceOver, real touch repetition, and mobile media controls;
- Windows with NVDA if that environment is available;
- selected-platform forced-colors/high-contrast inspection;
- human caption timing, transcript equivalence, and final plain-language review;
- owner review, hosting selection, publication, staging, and commit.

## Verdict

The working tree is a complete deterministic static release candidate. No known P0 or P1 defect
remains in the implemented source or automated evidence. Public release remains pending the manual
support matrix and Ryan's owner review. No commit, push, host selection, or publication was performed.
