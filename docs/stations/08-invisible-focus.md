# Station 08 — The invisible focus

Status: AUDITING — safe inspection pattern implemented; visual matrix pending
Owner: Ryan
Last reviewed: 2026-08-08
Route: `/stations/invisible-focus/`
Decision: DEC-010

## Contract

- **Task:** Buy the fictional Balcony ticket without a mouse.
- **Supplied order:** The replay starts on Standard; Balcony is next.
- **Success:** The panel confirms a Balcony ticket.
- **Named barrier:** A product replay changes location without drawing a visible focus marker.
- **Safety amendment:** The broken product is static; every real host control keeps visible focus.

## Barrier and safety

`Next product focus` advances a static product replay. The mock choices show no focus marker, while a
visible text safety readout and polite live region name the current replay state. `Buy current option`
completes the task. All real buttons retain the global three-pixel focus ring.

## Fixed behavior

The fixed panel uses native ticket radios in DOM order. Focus is visible on every label and action,
and Balcony can be selected and purchased with the keyboard. Reset clears selection and status.

## Criteria review

- **2.4.7 Focus Visible (AA):** Conditional for the static barrier replay and confirmed for the fixed
  interaction. The host page never creates an actually invisible focus path.

## Deterministic evidence

Browser checks advance the replay, complete Balcony in both panels, and scan the fixed view clean.
Manual contrast, zoom, forced-colors, magnification, and platform focus checks remain.
