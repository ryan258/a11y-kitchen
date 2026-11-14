# Station 01 — The cancellation form

Status: AUDITING — targeted evidence in the release index; manual release matrix pending
Owner: Ryan
Last reviewed: 2026-11-12

## Header

```text
STATION: 01 — The cancellation form
ROUTE: /stations/cancellation-form/
STATUS: AUDITING
OWNER: Ryan
LAST REVIEWED: 2026-11-12
TASK: Cancel a sample membership
BARRIER CATEGORY: Time limits and error recovery
NAMED FAILURE: A timed form destroys entered work and gives no actionable recovery
CRITERIA: 2.2.1, 2.2.2, 3.3.1, 3.3.2, 3.3.3, 3.3.4 (conditional), 3.3.7
BLOCKING DECISIONS: None for Station 01
```

## Task parity

- **Visitor goal:** Reach a visible “Membership canceled” result.
- **Supplied data:** Member number `482731`.
- **Data requested:** Member number and one short reason for leaving.
- **Success condition:** The local interface confirms cancellation; no network request or persistent change occurs.
- **Starting condition:** Both answers empty; barrier timer not started; fixed flow at step 1.
- **Things the visitor need not know:** No password, account policy, real customer data, or hidden validation rule beyond the visible six-digit instruction in the fixed panel.

| Check | Barrier | Fixed | Match? |
|---|---|---|---|
| Goal | Cancel sample membership | Cancel sample membership | Yes |
| Supplied data | `482731` | `482731` | Yes |
| Requested answers | Member number and reason | Member number and reason | Yes |
| Final action | Cancel membership | Confirm cancellation after review | Yes; review is the named fix |
| Success meaning | Local sample canceled | Local sample canceled | Yes |

## Seven-section outline

1. `Station 01 · Time limits and error recovery`
2. `Cancel a membership`
3. Task bar with goal, member number, reason instruction, success condition, and local-only disclosure
4. Native radio display modes: barrier, fixed, and comparison
5. One timed destructive barrier form
6. One untimed three-step fixed form
7. Complete Advocate, Builder, and Presenter panels

## Barrier specification

The interface makes cancellation harder by putting a short limit on the task, replacing persistent labels with placeholders, and erasing work behind a vague response. These interacting behaviors form the destructive-form pattern required by the supplied Station 01 specification.

| State | Entry trigger | Visible result | Focus result | Exit trigger | Data retained? |
|---|---|---|---|---|---|
| Start | Page load or reset | 30 seconds shown; empty status | Normal document order | First field focus | Empty by design |
| Active | First field focus | Countdown starts once | Remains on field | Submit, hide, reset, or expiry | Yes until failure |
| First failure | First submit before expiry | Exact `Invalid input.` | Remains on the active control | Re-enter and submit | No, intentionally |
| Incomplete retry | Retry without six digits and a nonblank reason | Exact `Invalid input.` | Remains on the active control | Complete the entry and submit | Yes |
| Timeout | Countdown reaches zero | Exact termination message and Reset Barrier guidance | Focus is not moved or trapped | Reset to retry, change view, or leave | No, intentionally |
| Paused | Panel becomes hidden | Remaining time says it is paused | Selected view radio remains focused | Reveal panel | Yes |
| Success | Complete retry before expiry | `Membership canceled.` and stopped timer | Remains operable | Reset or leave | Current values remain |

### Safety boundary

- Tab and Shift+Tab leave the form normally; no focus loop exists.
- Escape and browser Back are never intercepted.
- The reset is host-owned, outside the form state machine, and always keyboard reachable.
- Hide countdown suppresses the changing readout while leaving the deadline, form, and values in
  place. Show countdown reveals the current readout.
- Reset cancels the timer, clears attempts/messages/values, and restores the visible 30-second readout.
- Hiding the panel pauses the timer; revealing it resumes from the remaining time.
- View code moves focus to the selected radio if a programmatic change would hide the focused panel.
- Event listeners are scoped to Station 01 panel roots.
- The timer cannot multiply because one interval handle owns it.

### Intentional-failure records

```text
EXCEPTION ID: ATK-EX-01-001
STATION/PANEL: 01 / barrier
SELECTOR: #atk-01-barrier-member-number
NAMED FAILURE: Placeholder-only member-number prompt
WCAG/AUDIT RULE: 3.3.2 teaching example; inspect availability of labels or instructions in context
EXPECTED RESULT: No associated label element; the in-field prompt disappears while editing
WHY REQUIRED: Demonstrates a prompt that vanishes as the visitor types
SAFETY BOUNDARY: Field stays keyboard reachable; host reset and view controls remain available
FIXED RESOLUTION: #atk-01-fixed-member-number has a visible associated label and hint
OWNER: Ryan
EXPIRES: Station 01 content or form-contract change
```

```text
EXCEPTION ID: ATK-EX-01-002
STATION/PANEL: 01 / barrier
SELECTOR: #atk-01-barrier-reason
NAMED FAILURE: Placeholder-only reason prompt
WCAG/AUDIT RULE: 3.3.2 teaching example; inspect availability of labels or instructions in context
EXPECTED RESULT: No associated label element; the in-field prompt disappears while editing
WHY REQUIRED: Demonstrates a prompt that vanishes as the visitor types
SAFETY BOUNDARY: Field stays keyboard reachable; host reset and view controls remain available
FIXED RESOLUTION: #atk-01-fixed-reason has a visible associated label and hint
OWNER: Ryan
EXPIRES: Station 01 content or form-contract change
```

The timer, destructive first error, and vague response are behavioral/manual findings. They are not broad axe suppressions. Every actual axe violation remains unexpected and fails the test.

## Fixed specification

- Native form, labels, inputs, buttons, headings, and description relationships.
- Step 1 validates exactly six digits and preserves the typed value.
- The existing member-number alert names the field and explains the correction with `role="alert"`.
  Focus stays on the current control. First and repeated announcement behavior is checked with AT.
- Step 2 requests the same short reason and gives an actionable empty-state alert.
- Go back preserves both values and moves focus to the prior step heading.
- Step 3 reviews member number and reason before confirmation.
- Confirmation changes only local in-memory state and states that no data was sent or saved.
- There is no fixed-panel timer or destructive automatic callback.
- Reset clears all values, errors, review text, completion, and step state, then focuses the panel heading.
- Comparison stacks below 60rem and uses two columns at or above 60rem.

## Audience content

The complete publication copy lives with the station route so implementation and rendered review use one source.

- **Advocate:** Lost work and trust; higher impact under time pressure, assistive-technology use, fatigue, translation, or interruption; decision is to keep input, explain errors, and review serious actions.
- **Builder:** Criterion notes on timing, input, and review, an error and focus snippet, and keyboard, browser, and AT checks.
- **Presenter:** A 2:20 run sheet, an interface-centered opening, an optional safe reset before time pressure harms a participant, and three speakable conclusions.

## WCAG verification records

Titles, levels, and applicability were rechecked against [WCAG 2.2](https://www.w3.org/TR/WCAG22/) on 2026-11-12.

| Criterion | Exact title | Level | Applicability | Rationale |
|---|---|---:|---|---|
| 2.2.1 | Timing Adjustable | A | Confirmed | Barrier's content-set deadline still applies when the readout is hidden. Fixed removes the deadline. |
| 2.2.2 | Pause, Stop, Hide | A | Confirmed safeguard | Hide countdown stops presenting the automatically changing readout alongside the form. |
| 3.3.1 | Error Identification | A | Confirmed | `Invalid input.` does not identify the item in error; fixed error names the member-number field. |
| 3.3.2 | Labels or Instructions | A | Teaching example | The prompt disappears while editing. The shared task bar gives sample inputs and Fixed keeps field-specific labels and format guidance visible. |
| 3.3.3 | Error Suggestion | AA | Confirmed | Fixed says to enter exactly six digits. In a real flow, the requirement applies when correction suggestions are known and safe to provide. |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | AA | Conditional | Real legal commitments, financial transactions, changes or deletions of user-controllable stored data, and test-response submissions require one of reversal, error checking with a chance to correct, or review, correction, and confirmation before finalizing. The fictional confirmation illustrates the last option. |
| 3.3.7 | Redundant Entry | A | Same-process example | Enter different fictional values to observe the first rejection clear them while the task continues. Fixed preserves entries through validation and back navigation. Essential re-entry, security requirements, and invalidated information are exceptions. |

## Acceptance criteria

- `ATK-S01-B-01` — WHEN either barrier field first receives focus, the barrier SHALL start one 30-second countdown.
- `ATK-S01-B-02` — WHEN the timer expires, the barrier SHALL clear both values, show the exact
  termination message, and require Reset Barrier for a new attempt.
- `ATK-S01-B-03` — WHEN the first attempt is submitted, the barrier SHALL clear both values and show only `Invalid input.` in its status region.
- `ATK-S01-B-04` — WHEN a complete retry is submitted before expiry, the barrier SHALL show
  `Membership canceled.`. An incomplete retry keeps its values and shows the generic error.
- `ATK-S01-B-05` — WHEN the barrier becomes hidden, its active timer SHALL pause without clearing values.
- WHEN the visitor hides the countdown readout within Barrier, the deadline SHALL continue and
  the visitor SHALL retain their values until the normal rejection or expiry. Reset SHALL show the readout again.
- `ATK-S01-F-01` — IF the member number is not six digits, the fix SHALL preserve it and update
  the existing `role="alert"` region with the field name and correction while preserving focus.
- `ATK-S01-F-02` — WHEN a step advances or goes back, the fix SHALL focus the new step heading and preserve prior answers.
- `ATK-S01-F-03` — WHEN step 3 appears, the fix SHALL review the member number and reason before confirmation.
- `ATK-S01-R-01` — WHEN either reset is activated, that panel SHALL restore its documented start without changing the other panel, display mode, or audience mode.
- `ATK-S01-S-01` — WHILE either panel is displayed, native Escape, Back, forward Tab, and reverse Tab behavior SHALL remain available.

## ID and state plan

| ID family | Purpose | Relationship |
|---|---|---|
| `atk-01-view-*` | Native display-mode radios | `aria-controls` barrier, fixed, or both panel IDs |
| `atk-01-barrier-*` | Barrier panel, fields, disclosure, and heading | Panel labelled by heading and described by disclosure |
| `atk-01-fixed-member-*` | Member label, hint, field, and alert | Explicit `for`, `aria-describedby`, and `role="alert"` |
| `atk-01-fixed-reason-*` | Reason label, hint, field, and alert | Explicit `for`, `aria-describedby`, and `role="alert"` |
| `atk-01-fixed-step-*` | Three fixed steps | Each section labelled by its focusable heading |
| `atk-01-changed-*` | Audience explanation panels | One exposed by the global mode controller |

| State | Owner | Initial | Reset value | Survives view change? |
|---|---|---|---|---|
| Audience mode | `Base.astro` | Builder or saved value | Not changed by station reset | Yes; persists across routes |
| Display mode | `ViewSwitch.astro` | Barrier | Not changed by panel reset | Yes |
| Barrier attempts | Barrier script | 0 | 0 | Yes |
| Timer and remaining time | Barrier script | Not started / 30 | Not started / 30 | Yes; pauses while hidden |
| Barrier values/status | Barrier script | Empty | Empty | Yes |
| Fixed step | Fixed script | 1 | 1 | Yes |
| Fixed values/errors/review | Fixed script | Empty | Empty | Yes |

## Test inventory

- Source/build: `npm run verify:content`, `npm run build`, `npm run verify:build`.
- Browser: all ATK-MODE, ATK-VIEW, ATK-RESET, ATK-S01-B, and ATK-S01-F behaviors represented in `tests/browser/`.
- Automated accessibility: shell and fixed view clean; barrier has no unexpected axe result; exact manual-label ledger structure asserted.
- Responsive: 640 CSS-pixel reflow assertion and geometry checks above/below 60rem.
- Motion: reduced-motion computed durations asserted.
- Manual before release: full keyboard protocol, 200% browser zoom, forced colors, Safari + VoiceOver, Firefox, and iOS + VoiceOver.

## Decisions and unknowns

- DEC-003 through DEC-008, DEC-011, and DEC-015 are accepted for this station.
- DEC-009 and DEC-010 do not apply to Station 01; they are accepted and implemented for Stations 07 and 08.
- No P0 or P1 defect is known from automated evidence.
- Real assistive-technology speech output and the full support matrix are not yet recorded; do not call this station release-verified until they are.
