# Station 02 — The error message

Status: AUDITING — implementation and deterministic evidence complete; manual release matrix pending
Owner: Ryan
Last reviewed: 2026-08-08
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

The five-digit ZIP is preserved after an error. The `role="alert"` message announces without taking
focus, names Billing ZIP code,
describes the length problem or fictional-card mismatch, and gives the correction. `60614` completes
the task. Reset restores the empty form.

## Criteria review

- **3.3.1 Error Identification (A):** Confirmed; the fixed error identifies the field and problem.
- **3.3.3 Error Suggestion (AA):** Confirmed; the known format and demo value are supplied.

## Deterministic evidence

The collection browser suite covers the generic first and second submits, preserved invalid value,
announced-but-unfocused alert, valid completion, both resets, all views, and all audience panels. The exception ledger
records the manual error-quality comparison because axe does not judge whether prose is actionable.
