# Station 02 — The error message

Status: AUDITING — implementation and deterministic evidence complete; manual release matrix pending
Owner: Ryan
Last reviewed: 2026-11-12
Route: `/stations/error-message/`

## Contract

- **Task:** Update a rejected payment.
- **Supplied data:** Billing ZIP code `60614`.
- **Success:** “Payment details updated.” No payment or data leaves the page.
- **Named barrier:** The first submit returns only “Invalid input.”
- **Starting state:** Empty ZIP field, no message, zero attempts.

## Barrier and safety

The input has a persistent label so the vague error is the only intended failure. The first submit
shows the dead-end message and the second completes the local task. Reset clears the value, message,
and attempt count. Keyboard, Escape, Back, and the view control remain native.

## Fixed behavior

The entered ZIP is preserved after an error. The existing `role="alert"` region identifies
Billing ZIP code, distinguishes the length or format problem from a fictional-card mismatch, and
offers a correction while focus stays on the active control. `60614` completes the task.
Reset restores the empty form.

## Criteria review

- **3.3.1 Error Identification (A):** Confirmed; the fixed error identifies the field and problem.
- **3.3.3 Error Suggestion (AA):** Fixed offers the known format and sample value for the detected
  error. In a production flow, account for the exception when a suggestion would jeopardize
  security or the purpose of the content.

## Deterministic evidence

The collection browser suite checks the generic first and second submits, the retained invalid value,
alert text and focus, valid completion, both resets, views, and audience panels. The release review
checks first and repeated alerts with assistive technology and compares the error prose for
actionability.
