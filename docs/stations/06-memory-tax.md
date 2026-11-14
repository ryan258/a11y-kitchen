# Station 06 — The memory tax

Status: AUDITING — implementation and deterministic evidence complete; cognitive review pending
Owner: Ryan
Last reviewed: 2026-11-12
Route: `/stations/memory-tax/`

## Contract

- **Task:** Confirm a fictional $25 transfer to Jordan Kim.
- **Supplied data:** Confirmation code `734219`.
- **Success:** The transfer is confirmed locally; no money moves.
- **Named barrier:** The provided code disappears before it must be entered.
- **Starting state:** Code screen visible, entry screen hidden, no message.

## Barrier and safety

Continue hides the code and reveals the entry form. A wrong code points to Reset, which immediately
restores the provided value. Reset is always visible outside the changing steps. No code, transfer, or
timer leaves the panel.

## Fixed behavior

The code stays beside the entry field. `Use this code` fills the exact value and moves focus to the
field; manual entry remains possible. Clear validation preserves the value. Reset clears the form and
message without hiding the provided code.

## Criteria review

- **3.3.7 Redundant Entry (A):** The exercise supplies a fictional code earlier in the same
  process. The Fixed control populates the entry. For a real flow, check whether re-entry is
  essential, required for security, or whether the earlier information is no longer valid.

## Deterministic evidence

Browser coverage confirms the barrier code disappears, the fixed code can be filled, the same value
completes both paths, and each panel resets independently. Manual cognitive and security review remains.
