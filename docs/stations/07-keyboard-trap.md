# Station 07 — The keyboard trap

Status: AUDITING — safe pattern implemented; manual keyboard and AT matrix pending
Owner: Ryan
Last reviewed: 2026-08-08
Route: `/stations/keyboard-trap/`
Decision: DEC-009

## Contract

- **Task:** Open and close a fictional promotion with a keyboard.
- **Success:** The overlay closes and focus returns to Open promo.
- **Named barrier:** Focus cycles between promo links with no visible product close control.
- **Safety amendment:** Standard Escape always closes the barrier; this is not a literal trap.

## Barrier and safety

Opening the promo moves focus to its first control. Tab and Shift+Tab cycle between two controls.
The panel prominently names Escape as a host-owned release. Escape closes, returns focus, and leaves
browser Back untouched. Reset and view changes also close the overlay.

## Fixed behavior

The fix uses a native modal `dialog` with a specifically named Close promotion button and native
Escape behavior. Both exit paths return focus to the opener. Reset safely closes an open dialog.

## Criteria review

- **2.1.2 No Keyboard Trap (A):** Conditional for the safe exhibit. The criterion governs the harmful
  pattern, while the implemented barrier deliberately complies by preserving a standard release.

## Deterministic evidence

Browser coverage verifies the focus cycle, Escape release, visible close button, dialog close, and
focus return. Real keyboard, switch-device, Safari/VoiceOver, and browser-Back checks remain manual.
