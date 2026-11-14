# Station 04 — The disappearing menu

Status: AUDITING — implementation and deterministic evidence complete; pointer matrix pending
Owner: Ryan
Last reviewed: 2026-11-12
Route: `/stations/disappearing-menu/`

## Contract

- **Task:** Open the account menu and reach Settings.
- **Success:** “Settings opened.”
- **Named barrier:** A pointer-only menu disappears across a gap.
- **Starting state:** Menus closed and no status message.

## Barrier and safety

The product menu appears only while the pointer is over the trigger or menu. A deliberate gap makes
the pointer path unstable, and the product trigger is not keyboard operable. A permanent host-owned
backup completes the task from the keyboard. Once Settings holds focus, it remains available
when the pointer leaves. Reset and navigation stay available independently.

## Fixed behavior

A button exposes `aria-expanded` and `aria-controls`, opens a persistent menu, moves focus to the first
item, and supports Escape with focus return. Selecting Settings closes the menu and announces success.

## Criteria review

- **1.4.13 Content on Hover or Focus (AA):** The Barrier illustrates the hoverability problem.
  Fixed opens through explicit activation, so it avoids the hover-triggered pattern.
- **2.1.1 Keyboard (A):** The product-style Barrier menu itself depends on hover. The exhibit's
  separate host backup keeps Settings keyboard-operable. Fixed makes the disclosure itself
  keyboard-operable.

## Deterministic evidence

Browser checks complete the backup path, open the fixed menu, verify first-item focus, close with
Escape, and verify focus return. Include mixed pointer and keyboard use in the manual pointer,
magnification, and touch checks.
