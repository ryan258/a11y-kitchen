# Station 01 — The cancellation form

Status: AUDITING — implementation and automated gate complete; manual release matrix pending
Owner: Ryan
Last reviewed: 2026-08-08

## Header

```text
STATION: 01 — The cancellation form
ROUTE: /stations/cancellation-form/
STATUS: AUDITING
OWNER: Ryan
LAST REVIEWED: 2026-08-08
TASK: Cancel a sample membership
BARRIER CATEGORY: Time limits and error recovery
NAMED FAILURE: A timed form destroys entered work and gives no actionable recovery
CRITERIA: 2.2.1, 3.3.1, 3.3.2, 3.3.3, 3.3.4 (conditional), 3.3.7
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
| First failure | First submit | Exact `Invalid input.` | Native submit flow | Re-enter and submit | No, intentionally |
| Timeout | Countdown reaches zero | Exact termination message | Focus is not moved or trapped | Re-enter, reset, change view, or leave | No, intentionally |
| Paused | Panel becomes hidden | Remaining time says it is paused | Selected view radio remains focused | Reveal panel | Yes |
| Success | Second submit | `Membership canceled.` and stopped timer | Remains operable | Reset or leave | Current values remain |

### Safety boundary

- Tab and Shift+Tab leave the form normally; no focus loop exists.
- Escape and browser Back are never intercepted.
- The reset is host-owned, outside the form state machine, and always keyboard reachable.
- Reset cancels the timer, clears attempts/messages/values, and restores 30 seconds.
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
WCAG/AUDIT RULE: 3.3.2; current axe scan produces no finding
EXPECTED RESULT: No associated label element; placeholder is the only visible prompt
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
WCAG/AUDIT RULE: 3.3.2; current axe scan produces no finding
EXPECTED RESULT: No associated label element; placeholder is the only visible prompt
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
- The member-number alert names the field, explains the correction, and has `role="alert"`. Focus is left where it was: focusing a live alert makes assistive technology read it a second time.
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
- **Builder:** Six verified criterion records, four code moves, one visible-label/error snippet, keyboard/browser/AT checks, and a full-page conformance boundary.
- **Presenter:** A 2:20 run sheet, an interface-centered opening, an optional safe reset before time pressure harms a participant, and three speakable conclusions.

## WCAG verification records

Normative source for every record: `https://www.w3.org/TR/WCAG22/`. Titles and levels were rechecked on 2026-08-08.

| Criterion | Exact title | Level | Applicability | Rationale |
|---|---|---:|---|---|
| 2.2.1 | Timing Adjustable | A | Confirmed | Barrier sets a content time limit with no turn-off, adjustment, or extension; fix has no limit. |
| 3.3.1 | Error Identification | A | Confirmed | `Invalid input.` does not identify the item in error; fixed error names the member-number field. |
| 3.3.2 | Labels or Instructions | A | Confirmed | Barrier relies on disappearing placeholders; fix provides persistent labels and instructions. |
| 3.3.3 | Error Suggestion | AA | Confirmed | Barrier gives no known correction; fix says to enter exactly six digits. |
| 3.3.4 | Error Prevention (Legal, Financial, Data) | AA | Conditional | A real cancellation that changes or deletes user-controlled data needs reversible, checked, or review/confirm behavior. This demo changes no stored data. |
| 3.3.7 | Redundant Entry | A | Confirmed | The barrier requires the same member number and reason again after clearing them in the same process; the fix preserves the values. |

## Acceptance criteria

- `ATK-S01-B-01` — WHEN either barrier field first receives focus, the barrier SHALL start one 30-second countdown.
- `ATK-S01-B-02` — WHEN the timer expires, the barrier SHALL clear both values and show the exact termination message.
- `ATK-S01-B-03` — WHEN the first attempt is submitted, the barrier SHALL clear both values and show only `Invalid input.` in its status region.
- `ATK-S01-B-04` — WHEN the second attempt is submitted, the barrier SHALL show `Membership canceled.`.
- `ATK-S01-B-05` — WHEN the barrier becomes hidden, its active timer SHALL pause without clearing values.
- `ATK-S01-F-01` — IF the member number is not six digits, the fix SHALL preserve it, announce a `role="alert"` message without moving focus, name the field, and state the correction.
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
