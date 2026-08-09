# Station 05 — The interruption

Status: AUDITING — implementation and deterministic evidence complete; AT smoke test pending
Owner: Ryan
Last reviewed: 2026-08-08
Route: `/stations/interruption/`

## Contract

- **Task:** Book an appointment for Sam Lee on August 19, 2026 at 10:30 AM.
- **Success:** The fictional appointment is confirmed.
- **Named barrier:** An automatic availability update interrupts the form and moves focus.
- **Starting state:** Empty form, no pending update, no message.

## Barrier and safety

The first field input schedules one bounded update. The interruption moves focus to its visible return
button. Escape or the button returns focus to the field. Hiding the panel, submitting, or resetting
cancels the timer and closes the interruption. Values are not erased, so focus movement is the single
lesson.

## Fixed behavior

`Check availability` runs only on request and updates a polite status region without moving focus.
The same name, date, and time complete the form. Reset clears every value and message.

## Criteria review

- **2.2.2 Pause, Stop, Hide (A):** Confirmed for the modeled automatic update.
- **2.4.3 Focus Order (A):** Confirmed for unexpected focus movement.
- **3.2.5 Change on Request (AAA):** Confirmed; the fix makes the context update explicit.

## Deterministic evidence

The browser suite shortens the test timer, verifies focused interruption, Escape, focus restoration,
and the fixed button’s stable focus. Timer cleanup is covered on reset and view changes.
