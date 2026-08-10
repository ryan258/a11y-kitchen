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
- a data-driven rail linking all twelve completed station routes;
- Barrier, Fixed, and side-by-side views with one DOM instance per panel;
- complete Advocate, Builder, and Presenter content for every station;
- independent panel resets and bounded timers, dialogs, menus, focus movement, and media behavior;
- exact intentional-failure records, route/content/build checks, browser regression coverage, and
  axe scans;
- original, locally generated Station 11 media with synchronized WebVTT captions, a transcript,
  reproducible generation, and a provenance record.

The rail's “Ready to try” state means a complete route exists and passes the deterministic station
gate. It does not mean the manual support matrix or publication review is complete.

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
focus cycle while retaining permanent Escape, reset, and view-change exits. Station 08 shows the
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
npx playwright install chromium
npm run dev
```

The development server prints its local URL. Demo forms use fictional data, submit nothing, and call
no API.

## Quality commands

```sh
npm run check             # Astro and TypeScript checks
npm run verify:content    # collection invariants and source/content boundaries
npm run build             # static production output in dist/
npm run verify:build      # expected routes, station panels, modes, media, and no external client scripts
npm run test:functional   # rendered behavior, focus, reset, and geometry tests
npm run test:a11y         # axe, exact barrier ledger, and representative dynamic fixed states
npm run gate              # complete deterministic local gate
npm run media:station-11  # reproduce the local MP4 from the recorded script
```

The browser suites run against built `dist/` output. Successful logs do not need to be copied into
review prompts; report the command and include exact output only when a check fails.

## Intentional barrier policy

Every barrier has one approved lesson and a permanent host-controlled exit or reset. The exception
ledger at `tests/fixtures/intentional-failures.js` distinguishes actual axe findings from failures
that need structural and manual inspection. It never invents a tool result: Station 09 produces the
expected scoped `button-name` finding, while the other lessons are asserted structurally or manually.
Any unexpected axe finding fails the suite.

Barrier behavior stays inside its panel. Hidden timers stop, reset clears pending callbacks, Escape
remains available wherever transient content could constrain focus, and browser Back is never
intercepted.

## Architecture and media

`src/` is the only hand-edited product source. All twelve stations use the shared seven-section
`StationFrame.astro`, their own station components, and a single static `[slug].astro` route
generator. Station 01 is the reference lesson; it has no structural exemption. `src/data/stations.js` owns station order, route slugs,
rail state, and verified WCAG metadata.

Station 11's MP4, poster, and WebVTT file live under `src/assets/`. See
[`docs/MEDIA-PROVENANCE.md`](docs/MEDIA-PROVENANCE.md) for the spoken script, tools, licenses,
generation command, caption timings, and human-review boundary.

Generated `dist/`, Playwright artifacts, and any future preview are not source. Ryan controls staging,
commits, pushes, hosting, and publication.

## Evidence and release limits

The deterministic gate covers all fourteen routes, modes, views, storage failure, every station's
primary failure/success/reset path, focus transitions, dialog escape, timer cleanup, duplicate IDs,
narrow reflow, reduced motion, exact target geometry, local media structure, and automated
accessibility scans across every fixed audience mode, every compare view, every barrier ledger, and
representative dynamic fixed states.

Before public release, complete the manual support-matrix checks in
[`docs/ACCESSIBILITY-TEST-PLAN.md`](docs/ACCESSIBILITY-TEST-PLAN.md): keyboard-only traversal of all
twelve tasks, real browser zoom, forced colors, Safari with VoiceOver, Firefox, and iOS Safari with
VoiceOver where available. Human caption accuracy, disabled-educator/classroom-safety review, and
final editorial review also remain required.

## License

Code is MIT ([`LICENSE`](LICENSE)). The teaching guides, station briefs, exhibit copy, and authored
media are CC BY 4.0 ([`LICENSE-CONTENT`](LICENSE-CONTENT)). Third-party media tool terms are recorded
in [`docs/MEDIA-PROVENANCE.md`](docs/MEDIA-PROVENANCE.md).

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

Working, reproducible behavior is the implementation source of truth. A requirement change must still
be recorded in the document that owns it.
