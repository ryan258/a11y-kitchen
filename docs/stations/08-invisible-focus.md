# Station 08 — The invisible focus

Status: AUDITING — safe inspection pattern implemented; visual matrix pending
Owner: Ryan
Last reviewed: 2026-11-12
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

The fixed panel uses native ticket radios in DOM order. Tab to the ticket group, use the arrow keys
to choose Balcony, then Tab to Buy ticket. Observe the focus indicator on the active radio or button.
Reset clears selection and status.

## Criteria review

- **2.4.7 Focus Visible (AA)** requires a mode with visible keyboard focus. The static replay
  illustrates the loss of a visible indicator. Test the live controls by checking whether the
  active keyboard focus indicator stays visible until focus moves.
  [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html)

## Deterministic evidence

Browser assertions exercise replay navigation, ticket selection, and reset focus. The test plan
retains manual checks for visible focus, contrast, zoom, forced colors, and magnification.
