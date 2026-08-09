# Station 10 — The color-only status

Status: AUDITING — implementation and deterministic evidence complete; forced-colors review pending
Owner: Ryan
Last reviewed: 2026-08-08
Route: `/stations/color-only-status/`

## Contract

- **Task:** Select the one failed order.
- **Supplied data:** Orders `ATK-510`, `ATK-511`, and `ATK-512`; one failed.
- **Success:** The page confirms `ATK-511`.
- **Named barrier:** Row status is a colored dot with no row-level word or shape distinction.

## Barrier and safety

A text legend maps slate blue and plum, but each order row contains only a circular colored dot. The
native radios, labels, submit, and reset remain accessible so color-only status is the single intended
failure.

## Fixed behavior

Each row adds `Complete` with a circle or `Failed` with a diamond while retaining color. The status is
part of the row’s accessible text and remains meaningful in monochrome and forced colors.

## Criteria review

- **1.4.1 Use of Color (A):** Confirmed; color is the only row-level visual distinction in the barrier.

## Deterministic evidence

Browser coverage chooses `ATK-511` in both panels, tests resets, and checks shared state shapes. The
ledger records the color-only comparison as manual because axe does not evaluate the meaning of dots.
