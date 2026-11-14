# Station 12 — The target too small

Status: AUDITING — implementation and rendered geometry evidence complete; touch matrix pending
Owner: Ryan
Last reviewed: 2026-11-12
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

The same three controls render at 44 by 44 CSS pixels with eight-pixel gaps. This gives touch users
more room than the Level AA minimum and matches the size threshold of
[2.5.5 Target Size (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-enhanced.html)
at Level AAA, which has its own exceptions.

## Criteria review

- **2.5.8 Target Size (Minimum) (AA)** requires 24 by 24 CSS pixels or an applicable exception. In the
  isolated Barrier, a 20-pixel target plus a 2-pixel gap places adjacent centers 22 CSS pixels apart.
  The 24-pixel-diameter circles centered on those targets overlap by 2 CSS pixels, so the spacing
  exception does not apply. For a real page, also check whether the function has an equivalent
  control on the same page that meets the criterion. Compare offers the larger controls alongside
  the teaching example.
  [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

## Deterministic evidence

The station’s Playwright assertions measure the Barrier at 20 by 20 CSS pixels with a 2-pixel gap and
the Fixed controls at 44 by 44. They check the pressed state, success text, and reset. Real touch
testing remains.
