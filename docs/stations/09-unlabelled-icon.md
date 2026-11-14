# Station 09 — The unlabelled icon

Status: AUDITING — implementation and exact axe exception complete; AT smoke test pending
Owner: Ryan
Last reviewed: 2026-11-12
Route: `/stations/unlabelled-icon/`

## Contract

- **Task:** Delete the fictional file `Notes.txt`.
- **Success:** The item disappears and its name is announced in status text.
- **Named barrier:** The icon-only delete button has no accessible name.
- **Starting state:** One visible item and an empty status region.

## Barrier and safety

There is one keyboard-reachable button and one fictional item. The trash glyph is hidden from the
accessibility tree and the button deliberately has no name. Reset restores the item. No real file or
data is affected.

## Fixed behavior

The same visual control exposes `Delete Notes.txt`; the glyph remains decorative. Activation, status,
and reset match the barrier so the accessible name is the meaningful difference.

## Criteria review

- **1.1.1 Non-text Content (A)** requires a name that describes an icon control’s purpose. Inspect
  the Fixed control to see `Delete Notes.txt` as its name.
  [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html)
- **4.1.2 Name, Role, Value (A)** also requires a programmatically determinable role. Both controls
  have a native button role. The named Fixed button
  isolates the difference in the computed accessible name. For controls with settable states or
  values, also check that assistive technology can set them and receive change notifications.
  [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)

## Deterministic evidence

The barrier is the only route expected to produce axe `button-name`, scoped to the one selector with
critical impact. Any other rule or selector fails the suite. Browser coverage verifies delete and reset.
