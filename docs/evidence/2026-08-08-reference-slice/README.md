# Reference-slice evidence — 2026-08-08

Task ID: Foundation + Station 01 reference slice
Working-tree identifier: Initial `main` worktree with no commits; Ryan owns staging and commits
Reviewer: Codex implementation pass
Date: 2026-08-08
Verdict: Automated reference-slice gate passed; manual release matrix remains open

Codex did not initialize the repository, alter the existing index state, or create a commit.

## Runtime and tools

- macOS, arm64
- Node 22.22.3; project baseline Node 22.12.0
- npm 10.9.8
- Astro 5.18.2
- TypeScript 5.9.3
- Playwright 1.62.1
- axe-core Playwright integration 4.12.1
- Playwright Chromium 151.0.7922.34

## Commands

```text
npm install --no-audit --no-fund
npx playwright install chromium
npm run check --silent
npm run verify:content --silent
npm run build --silent
npm run verify:build --silent
npx playwright test
npm run gate --silent
```

Successful logs are intentionally not copied here. The rendered suite contains 24 focused cases across
shell, mode, view, timer, barrier attempts, fixed validation, focus, back navigation, review, resets,
responsive geometry, reduced motion, exact intentional-failure structure, and axe scans.

## Failure summary

No unresolved application failure remains in the automated pass.

Environment-only setup conditions encountered and resolved:

- the restricted sandbox could not write Astro telemetry preferences, so project scripts disable Astro
  telemetry explicitly;
- the restricted sandbox could not bind the local preview port, so rendered tests were run with the
  approved local-listener permission;
- Playwright’s matching Chromium build was not present and was installed before the rendered run.

Two initial assertion mismatches were corrected as test design issues:

- axe did not report placeholder-only prompts, so the exception ledger now records `toolRule: null` and
  exact structural/manual label checks instead of claiming a nonexistent tool violation;
- Chromium serialized `0.01ms` as scientific notation, so reduced-motion verification compares the
  parsed duration rather than a formatting string.

Final-gate defects found and corrected:

- the local browser harness could reuse an old process on port 4321 and therefore test a stale build;
  server reuse is now disabled so every run exercises the newly generated `dist/` artifact;
- parent opacity on the unbuilt rail tickets blended otherwise valid tokens to a measured 4.49:1 for
  the “Not built yet” text; removing that opacity restored the token colors and cleared the finding;
- state-chip and reset checks now inspect the station route and the currently visible reset control,
  matching the documented single-instance and hidden-step behavior.

## Intentional exception evidence

- `ATK-EX-01-001`: `#atk-01-barrier-member-number` has a placeholder and no associated label.
- `ATK-EX-01-002`: `#atk-01-barrier-reason` has a placeholder and no associated label.
- The full barrier page produces no current axe violation. This does not erase the manual persistent-label
  finding; it records the tool boundary accurately.
- The fixed view and shell-only routes produce no axe finding in the tested Chromium environment.

## Manual evidence completed in this pass

- Full-page visual inspection covered Home and Station 01 at 1440 × 1000 and 390 × 844 CSS pixels.
- Station 01 visual inspection covered Barrier, Fixed, and desktop Compare states; ticket reflow, control
  wrapping, panel containment, state word/shape/color, and instructional-copy readability showed no
  unresolved visual defect in those captures.
- Browser geometry assertions cover a 640 CSS-pixel reflow proxy and comparison layout above/below 60rem.
- Focus assertions cover skip link, hidden-panel safety, fixed-step headings, alerts, completion, and both
  reset destinations.

## Manual evidence still required before public release

- full pointer-free keyboard walkthrough with visible-focus inspection;
- real 200% browser zoom at a 1280px viewport;
- focus-indicator contrast measurement and forced-colors review;
- current Safari on macOS with VoiceOver;
- current Firefox on macOS;
- current iOS Safari with VoiceOver;
- final owner editorial and publication review.

No unexecuted environment is reported as passing. The site therefore makes no blanket WCAG conformance
claim.
