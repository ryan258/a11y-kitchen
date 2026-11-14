# A11y Test Kitchen

A11y Test Kitchen is a public, static teaching site where a visitor tries a deliberately broken
interface, tries the production-quality fix, and reads what changed in the language of an Advocate,
Builder, or Presenter.

The project judges the interface, never the person. It does not try to recreate anyone's disability
or life, and it makes no blanket WCAG conformance claim.

## Current implementation

The repository contains the complete twelve-station collection:

- a static Astro 7 shell with no client framework, backend, accounts, analytics, CMS, or public AI;
- a skip link, semantic landmarks, visible focus, responsive layouts, and reduced-motion support;
- a persistent Advocate / Builder / Presenter explanation mode stored as `atk-mode`;
- a data-driven rail linking all twelve completed station routes, with adjacent-station navigation;
- Barrier, Fixed, and side-by-side views with one DOM instance per panel;
- complete Advocate, Builder, and Presenter content for every station;
- independent panel resets and bounded timers, dialogs, menus, focus movement, and media behavior;
- an Advocate lesson summary for visitors whose scripts are unavailable;
- exact intentional-failure records, route/content/build checks, browser regression coverage, and
  axe scans;
- original, locally generated Station 11 media with synchronized WebVTT captions, a transcript,
  reproducible generation, and a provenance record.

The rail's “Ready to try” state marks a complete station route. Release verification is recorded
separately in the [current evidence index](docs/evidence/README.md).

## Start teaching

- **Fifth grade:** [20-minute printable lesson](docs/5TH-GRADE-TEACHERS-GUIDE.md#16-quick-reference-card)
  and [full fifth-grade guide](docs/5TH-GRADE-TEACHERS-GUIDE.md). Start with Stations 09 and 12 in
  Advocate. Keep the Station 01 timer demonstration teacher-led.
- **Adult, professional, or technical groups:** [Teacher's guide](docs/TEACHERS-GUIDE.md).

When the exhibit is running, **Teaching guide** in the header opens the classroom quick start and its
station links. Use the read-aloud prompt or let visitors choose to drive, direct the teacher, or watch.

## Station collection

| # | Station | Lesson |
|---|---|---|
| 01 | The cancellation form | Time limits, labels, and destructive error recovery |
| 02 | The error message | Specific errors and useful recovery guidance |
| 03 | The reading wall | Plain language without losing meaning |
| 04 | The disappearing menu | Persistent hover/focus content and keyboard access |
| 05 | The interruption | User-controlled updates and predictable focus |
| 06 | The memory tax | Avoiding unnecessary recall and re-entry |
| 07 | The keyboard trap | Safe escape and production-quality dialog behavior |
| 08 | The invisible focus | A safe replay of missing focus and a visible-focus fix |
| 09 | The unlabelled icon | Accessible names for icon-only controls |
| 10 | The color-only status | Color, word, and shape working together |
| 11 | The caption gap | Prerecorded captions and an equivalent transcript |
| 12 | The target too small | Minimum target geometry and spacing |

Stations 07 and 08 intentionally use amended teaching patterns. Station 07 demonstrates a bounded
focus cycle with Escape inside the promo, Reset Barrier, and view-change exits. Station 08 shows the
missing-focus failure through a noninteractive replay, so the live host page never asks a keyboard
visitor to operate an invisibly focused control.

## Requirements

- Node `22.12.0` or newer within Node 22; `.nvmrc` records the baseline.
- npm.
- Playwright's Chromium build for rendered tests.
- FFmpeg plus `npx` network/package access only if regenerating Station 11 media.

## Local setup

```sh
npm ci
npm run dev
```

Open the address printed by the development server. Dependency installation needs access to the npm
registry or a populated cache. Install the rendered test browser separately with
`npx playwright install chromium` if you're running browser checks.

For a classroom or local static preview, run `npm run build` and serve the contents of `dist/`
at the root of an HTTP(S) site. `npm run preview` serves that build locally. The root-relative
paths depend on an HTTP origin root. The built lessons, fonts, and video work without public internet
access while the site server is reachable. Optional standards links open external sites.

Use the fictional values in each exercise. Demo forms keep answers in the page, including when
scripts are unavailable, and the only browser preference stored is the audience mode. The server
operator controls its own request logging.

## Quality commands

```sh
npm run check             # Astro and TypeScript checks
npm run verify:content    # collection invariants and source/content boundaries
npm run build             # static production output in dist/
npm run verify:build      # built routes, panels, media, notices, and declared subresources
npm run test:unit         # scanner regression fixtures
npm run test:functional   # rendered behavior, focus, reset, and geometry tests
npm run test:a11y         # axe, exact barrier ledger, and representative dynamic fixed states
npm run gate              # complete deterministic local gate
npm run media:station-11  # reproduce the local MP4 from the recorded script
```

The browser suites run against built `dist/` output. Keep an evidence summary with the source,
artifact, environment, and command used. Record exact output for failures that need diagnosis.

## Intentional barrier policy

Every barrier has one approved lesson and a permanent host-controlled exit or reset. The exception
ledger at `tests/fixtures/intentional-failures.js` distinguishes actual axe findings from failures
that need structural and manual inspection. It never invents a tool result: Station 09 produces the
expected scoped `button-name` finding, while the other lessons are asserted structurally or manually.
Any unexpected axe finding fails the suite.

Barrier behavior stays inside its panel. Hidden timers stop, reset clears pending callbacks, and
each transient control with constrained focus has a documented keyboard exit. Browser Back
remains available.

## Architecture and local assets

`src/` is the only hand-edited product source. All twelve stations use the shared seven-section
`StationFrame.astro`, their own station components, and a single static `[slug].astro` route
generator. Station 01 uses the same frame as the rest of the collection.
`src/data/stations.js` owns station order, route slugs, rail state, and WCAG metadata. The renderer
shows whether a criterion applies directly or is illustrated by a bounded example.

Station 11's MP4, poster, and WebVTT file live under `src/assets/`. See
[`docs/MEDIA-PROVENANCE.md`](docs/MEDIA-PROVENANCE.md) for the spoken script, tools, licenses,
generation command, caption timings, and human-review boundary.

Outfit and Space Mono are self-hosted WOFF2 assets, so page loads make no third-party font request.
See [`docs/FONT-PROVENANCE.md`](docs/FONT-PROVENANCE.md) for source URLs, checksums, and licenses.

Generated `dist/`, Playwright artifacts, and any future preview are not source. Ryan controls staging,
commits, pushes, hosting, and publication.

## Evidence and release limits

The deterministic gate covers all fifteen HTML routes, modes, views, storage failure, every station's
primary failure/success/reset path, focus transitions, dialog escape, timer cleanup, duplicate IDs,
narrow reflow, reduced motion, exact target geometry, local media structure, and automated
accessibility scans across every fixed audience mode, every compare view, every barrier ledger, and
representative dynamic fixed states. The artifact scan checks declared HTML and CSS resources.
Browser request observation covers actual page loads and scripted interactions in its exercised states.

Before public release, complete the manual support-matrix checks in
[`docs/ACCESSIBILITY-TEST-PLAN.md`](docs/ACCESSIBILITY-TEST-PLAN.md): keyboard-only traversal of all
twelve tasks, real browser zoom, forced colors, Safari with VoiceOver, Firefox, and iOS Safari with
VoiceOver where available. Human caption accuracy, disabled-educator/classroom-safety review, and
final editorial review also remain required. Record outcomes for the reviewed artifact in the
[current release evidence index](docs/evidence/README.md).

## License

Code is MIT ([`LICENSE`](LICENSE)). The teaching guides, station briefs, exhibit copy, and authored
media are CC BY 4.0 ([`LICENSE-CONTENT`](LICENSE-CONTENT)). Third-party media tool terms are recorded
in [`docs/MEDIA-PROVENANCE.md`](docs/MEDIA-PROVENANCE.md). Outfit and Space Mono remain under the
SIL Open Font License 1.1. The build serves the code, content, and both font notices under
`/licenses/`. Font sources and checksums are recorded in
[`docs/FONT-PROVENANCE.md`](docs/FONT-PROVENANCE.md).

## Document authority

| Document | Owns |
|---|---|
| [`specs/PROJECT.md`](specs/PROJECT.md) | Product requirements and acceptance criteria |
| [`docs/PRODUCTION-BIBLE.md`](docs/PRODUCTION-BIBLE.md) | Identity, voices, tone, and craft rules |
| [`roadmap.md`](roadmap.md) | Delivery sequence and progress |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Technical and state boundaries |
| [`docs/STATION-AUTHORING.md`](docs/STATION-AUTHORING.md) | Repeatable station brief format |
| [`docs/ACCESSIBILITY-TEST-PLAN.md`](docs/ACCESSIBILITY-TEST-PLAN.md) | Test procedures and evidence policy |
| [`docs/REQUIREMENTS-TRACEABILITY.md`](docs/REQUIREMENTS-TRACEABILITY.md) | Requirement-to-evidence mapping |
| [`docs/DECISIONS.md`](docs/DECISIONS.md) | Accepted, deferred, and blocked decisions |
| [`docs/evidence/`](docs/evidence/README.md) | Current release evidence and historical review records |

Working, reproducible behavior is the implementation source of truth. A requirement change must still
be recorded in the document that owns it.
