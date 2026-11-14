# Station 07 — The keyboard trap

Status: AUDITING — safe pattern implemented; manual keyboard and AT matrix pending
Owner: Ryan
Last reviewed: 2026-11-12
Route: `/stations/keyboard-trap/`
Decision: DEC-009

## Contract

- **Task:** Open and close a fictional promotion with a keyboard.
- **Success:** The overlay closes and focus returns to Open promo.
- **Named barrier:** Focus cycles between promo buttons with no close control inside the promotion.
- **Safety amendment:** Escape closes the demo while focus is inside the promo. Reset and changing
  views also close it.

## Barrier and safety

Opening the promo moves focus to its first control. Tab and Shift+Tab cycle between two controls.
The panel names Escape as a keyboard exit from the promo. Escape closes it and returns focus to
the opener. Moving focus outside preserves the new focus target and keeps the layout stable. The
host Reset Barrier button sits beside Open promo and closes the overlay. View changes also close
the overlay, and browser Back remains available.

## Fixed behavior

The fix uses a native modal `dialog` with a specifically named Close promotion button and native
Escape behavior. Both exit paths return focus to the opener. Reset safely closes an open dialog.

## Criteria review

- **2.1.2 No Keyboard Trap (A)** requires a keyboard-only exit from any component that accepts
  keyboard focus. An exit that requires more than standard keys needs instructions. This bounded
  example tests whether a visitor can press Escape to leave the cycle and return to the opener.
  [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html)

## Deterministic evidence

Browser coverage checks the focus cycle, outside focus, pointer reset while the promo is open,
Escape from both versions, the visible Fixed close button, and focus return. Real keyboard,
switch-device, Safari/VoiceOver, and browser-Back checks remain manual.
