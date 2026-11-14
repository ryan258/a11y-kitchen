# Release evidence

## Current candidate

The 2026-11-12 harmony pass starts from Git commit `2b82dd1` and includes the
unstaged scanner, exhibit, and documentation changes reviewed in that working tree.
Release acceptance is pending. The `npm run build` artifact checked in this pass has
digest `92633b461e9fd8171d99996582af3c2115d9a11a9b19fbb5c4bc4613266bff8a`, the SHA-256
of the sorted file checksums and relative paths in `dist/`.

```sh
(cd dist && find . -type f -exec shasum -a 256 {} + | LC_ALL=C sort | shasum -a 256)
```

| Evidence | Current result |
|---|---|
| Targeted source, scanner, and build checks | Passed with Node 22.22.3, npm 10.9.8, and Astro 7.2.0. `npm run check` reported zero diagnostics. `npm run verify:content`, `npm run build`, `npm run verify:build`, and `git diff --check` passed. The build produced 15 HTML pages and four license notices. Eight scanner tests passed via `npm run test:unit`. |
| Targeted station and contrast probes | Initial Node script probes passed for Stations 01, 05, and 07. The input boundary token measures 4.76:1 on white, 4.44:1 on Barrier, and 4.37:1 on Fixed. |
| Current WCAG reference and applicability review | All 22 criterion IDs, titles, and levels matched the current WCAG 2.2 Recommendation. All 12 built Builder pages matched the reviewed registry. The [traceability matrix](../REQUIREMENTS-TRACEABILITY.md#verified-wcag-22-registry) records the applicability and observable station tasks. |
| Current Station 01 countdown safeguard | Passed in one targeted Chromium case on the current artifact. Keyboard Hide/Show kept focus and preserved entries while the readout advanced. The hidden deadline expired, and Reset restored the visible countdown. |
| 13 targeted Chromium cases on the previous build | Passed after the pointer correction below. Playwright 1.62.1 ran on macOS arm64 using cached Chrome for Testing 153.0.8010.12 headless shell through a temporary config because the project-pinned shell was unavailable. |
| Complete `npm run gate` and full browser suite | Passed on macOS arm64 with Playwright 1.62.1 (Chrome for Testing 151.0.7922.34 headless shell). All 151 Playwright tests passed across shell, local network isolation, station collection, resets, view modes, and axe accessibility scans on artifact `92633b461e9fd8171d99996582af3c2115d9a11a9b19fbb5c4bc4613266bff8a`. |
| Keyboard traversal across all twelve stations | Pending |
| Real 200% browser zoom, narrow reflow, reduced motion, and forced colors | Pending |
| Fixed field boundaries and focus contrast on rendered backgrounds | Pending |
| macOS Safari with VoiceOver, including first and repeated errors | Pending |
| Firefox desktop smoke test | Pending |
| iOS Safari with VoiceOver and touch | Pending when an environment is available |
| Windows with NVDA | Pending when an environment is available |
| Station 11 caption timing, transcript equivalence, and media operation | Pending human review |
| Disabled-educator review of both guides and the teacher quick start | Pending |
| Final human editorial and classroom acceptance | Pending |
| Owner review of the artifact, known limits, and publication decision | Pending |

The [accessibility test plan](../ACCESSIBILITY-TEST-PLAN.md) defines the procedures and
environment details to record. Results from source inspection, emulation, and automation
each apply to the behavior they directly measure.

### Targeted Chromium follow-up

This run applies to artifact `9f97263ddaced196ce7cf76a7662a82f93e62f23b6d74871b3450817f32e6f63`.
The selection covered the teacher guide's axe and narrow-layout checks, Station 09's exact Compare
ledger, Station 05's network and narrow-layout checks, the no-JavaScript form fallback, and
interaction cases for Stations 01, 03, 04, 05, and 07. Twelve cases passed on the first browser run.
Station 07's Barrier overlay collapsed when pointer-down moved focus to Reset, shifting the button
before click and preventing reset focus from reaching the heading.

Stations 05 and 07 now keep their inline overlays stable as focus moves outside. Their named exit,
reset, and view-change paths still close them. The four affected cases passed on the corrected build,
including a pointer reset from stacked Compare while Station 05's interruption is open. A file-by-file
checksum comparison confirmed the rebuild changed only the two station pages.

### Standards review follow-up

The current build passed Astro diagnostics, source verification, static generation, and artifact
verification. Comparing inline scripts with the previous build showed Station 01 as the only station
with changed behavior code. The earlier 13 Chromium results stay with the prior artifact.

On 2026-11-12, the single Station 01 case `barrier: the countdown starts once and expiry requires reset`
passed against the current artifact. Playwright 1.62.1 used cached Chrome for Testing 153.0.8010.12
headless shell on macOS arm64. A temporary HTTP server served `dist/` on `127.0.0.1:4322` alongside the
existing preview. The test used a controlled clock to verify keyboard Hide/Show during an active
countdown, disclosure state, retained focus and values, expiry while hidden, and restoration on reset.

The review checked the [WCAG 2.2 Recommendation](https://www.w3.org/TR/2024/REC-WCAG22-20241212/),
its [errata](https://www.w3.org/WAI/WCAG22/errata/), and the relevant W3C Understanding guidance.
Station 10's dot colors measure about 1.09:1 against each other. Station 12's 20-pixel buttons and
2-pixel gaps yield 22-pixel center spacing, so the 24-pixel spacing circles overlap. The build
checks that the Station 11 captions and transcript match the narration source. An audio inspection
measured an 8.711-second clip and found the two internal caption boundaries within 4 ms of the
detected ends of the pauses. Human caption accuracy, visual equivalence, and muted playback are
still open.

## Historical records

These records apply to the worktrees and environments named in each entry.

- [2026-08-09 v1 hardening](2026-08-09-v1-hardening/README.md) records a 132-case Chromium run
  before later font, scanner, and station changes.
- [2026-08-08 full collection](2026-08-08-full-collection/README.md)
- [2026-08-08 accessibility remediation](2026-08-08-accessibility-remediation/README.md)
- [2026-08-08 reference slice](2026-08-08-reference-slice/README.md)
