# Station 04 — The disappearing menu

Status: AUDITING — implementation and deterministic evidence complete; pointer matrix pending
Owner: Ryan
Last reviewed: 2026-08-08
Route: `/stations/disappearing-menu/`

## Contract

- **Task:** Open the account menu and reach Settings.
- **Success:** “Settings opened.”
- **Named barrier:** A pointer-only menu disappears across a gap.
- **Starting state:** Menus closed and no status message.

## Barrier and safety

The product menu appears only while the pointer is over the trigger or menu. A deliberate gap makes
the pointer path unstable, and the product trigger is not keyboard operable. A permanent host-owned
backup completes the task from the keyboard. Reset and navigation never depend on the broken menu.

## Fixed behavior

A button exposes `aria-expanded` and `aria-controls`, opens a persistent menu, moves focus to the first
item, and supports Escape with focus return. Selecting Settings closes the menu and announces success.

## Criteria review

- **1.4.13 Content on Hover or Focus (AA):** Confirmed for persistence and pointer movement.
- **2.1.1 Keyboard (A):** Confirmed for the disclosure and Settings function.

## Deterministic evidence

Browser checks complete the backup path, open the fixed menu, verify first-item focus, close with
Escape, and verify focus return. Manual pointer, magnification, and touch checks remain required.
