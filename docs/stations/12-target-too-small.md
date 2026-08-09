# Station 12 — The target too small

Status: AUDITING — implementation and rendered geometry evidence complete; touch matrix pending
Owner: Ryan
Last reviewed: 2026-08-08
Route: `/stations/target-too-small/`

## Contract

- **Task:** Choose option B.
- **Supplied data:** Options A, B, and C.
- **Success:** “Selected option B.”
- **Named barrier:** Twenty-pixel circular targets have two-pixel gaps.
- **Starting state:** No pressed option and no status message.

## Barrier and safety

The target geometry is the only intended failure. Every control has a visible letter, accessible name,
native button role, pressed state, and global keyboard focus ring. Reset clears pressed states and status.

## Fixed behavior

The same three controls render at 44 by 44 CSS pixels with eight-pixel gaps. The size is a product
choice above the criterion minimum, not a claim that WCAG always requires 44 pixels.

## Criteria review

- **2.5.8 Target Size (Minimum) (AA):** Confirmed. The 20-pixel, 2-pixel-gap barrier does not meet the
  24-pixel minimum or spacing exception; other listed exceptions still require case-specific review.

## Deterministic evidence

Playwright measures the barrier at 20 by 20 with a 2-pixel gap and the fix at 44 by 44. It also checks
pressed state, success text, reset, keyboard access, and narrow-layout reflow. Real touch testing remains.
