# Station 05 — The interruption

Status: AUDITING — implementation and deterministic evidence complete; AT smoke test pending
Owner: Ryan
Last reviewed: 2026-11-12
Route: `/stations/interruption/`

## Contract

- **Task:** Book the fictional scenario's appointment for Sam Lee on August 19, 2026 at 10:30 AM.
- **Success:** The fictional appointment is confirmed.
- **Named barrier:** An automatic availability update interrupts the form and moves focus.
- **Starting state:** Empty form, no pending update, no message.

## Barrier and safety

The first field input schedules one bounded update. When it fires, the update opens only if a
Barrier form field still has focus. It moves focus to **Return to form**. Escape from the
interruption or the button returns focus to the field that was active when the update fired.
Hiding the panel, submitting, or resetting cancels the timer and closes the interruption.
Entered values survive the interruption.

## Fixed behavior

`Check availability` runs on request and updates a polite status region without moving focus.
It checks the sample date and time. Booking also checks the sample name. Field-specific errors
preserve values. Editing clears stale results, and reset clears every value and message.

## Criteria review

- **2.4.3 Focus Order (A):** Fixed keeps the sequential flow usable by leaving focus on the
  control the visitor activated.
- **3.2.2 On Input (A):** The Barrier moves focus to another component after a field edit.
  Warn people before use if editing a field will change context. Fixed uses an explicit button.
- **3.2.5 Change on Request (AAA):** The surprise focus jump illustrates a change of context.
  Fixed leaves focus in place and provides an explicit request for the update.
- **4.1.3 Status Messages (AA):** Fixed updates a polite live region with the availability
  result without moving focus. Verify delivery with real assistive technology.

## Deterministic evidence

Browser cases check focus containment across Compare panels, Escape, return focus, field-specific
validation, and the Fixed update's stable focus. Reset and view-change cases cover timer cleanup.
