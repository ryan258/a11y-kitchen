# A11y Test Kitchen Station Authoring Guide

Status: Active for the implemented twelve-station contract
Last updated: 2026-11-12
Authority: Repeatable station planning, content, interaction, and handoff format

Use this guide to turn one backlog item into an implementation-ready station brief. It operationalizes `specs/PROJECT.md` and `docs/PRODUCTION-BIBLE.md`; it does not redefine either document.

## One station at a time

A station advances through these states:

```text
BACKLOG → BRIEF DRAFT → SAFETY APPROVED → CONTENT READY → IMPLEMENTING → AUDITING → BUILT → RELEASE VERIFIED
```

Only one station may be in `IMPLEMENTING` at a time. A public rail ticket changes from `not-built` to
`built` after its route, content, safety boundary, and deterministic station gate are complete. The
separate `RELEASE VERIFIED` state requires the manual support matrix and owner review.

## Definition of ready

Do not implement a station until all items are true:

- [ ] Task and required visitor data are written in plain language
- [ ] Barrier and fixed versions use the same task, facts, and success condition
- [ ] Exactly one intended barrier pattern is named
- [ ] Barrier start, failure, success, timeout if any, and reset states are specified
- [ ] Fixed start, validation, success, back/recovery, and reset states are specified
- [ ] Guaranteed keyboard escape and host-safety boundary are approved
- [ ] Any expected automated accessibility finding has a draft ledger entry
- [ ] Advocate, Builder, and Presenter panels are complete drafts
- [ ] WCAG number/title/level are verified against WCAG 2.2
- [ ] Criterion applicability is reviewed separately from title verification
- [ ] Required media or assets exist, have documented rights, and have alternatives
- [ ] Acceptance criteria are testable and use stable IDs
- [ ] No required decision is `BLOCKED` in `docs/DECISIONS.md`

## Station brief header

Every brief begins with:

```text
STATION: [NN — Name]
ROUTE: [/stations/slug]
STATUS: [BACKLOG | BRIEF DRAFT | SAFETY APPROVED | CONTENT READY | IMPLEMENTING | AUDITING | BUILT | RELEASE VERIFIED]
OWNER: [name]
LAST REVIEWED: [YYYY-MM-DD]
TASK: [one plain-language action]
BARRIER CATEGORY: [one category]
NAMED FAILURE: [one specific pattern]
CRITERIA: [candidate numbers; verification records below]
BLOCKING DECISIONS: [DEC IDs or None]
```

## Part 1 — Task parity

The comparison is valid only when barrier and fixed versions ask for the same outcome using the same facts.

Record:

- **Visitor goal:** What is complete at the end?
- **Supplied data:** Exact fictional values shown in the task bar
- **Data requested:** Every input, choice, or action in both versions
- **Success condition:** The same observable outcome in both versions
- **Starting condition:** Empty/default/selected state for each panel
- **Things the visitor need not know:** Prevent hidden knowledge from making one version artificially harder

### Parity test

| Check | Barrier | Fixed | Match? |
|---|---|---|---|
| Goal | | | |
| Supplied data | | | |
| Requested answers | | | |
| Final action | | | |
| Success message meaning | | | |

If any row differs for a reason other than the named interface pattern, revise the brief.

## Part 2 — Seven-section page outline

### 1. Eyebrow

```text
Station NN · [barrier category]
```

Use a stable category that describes the interface problem, not a diagnosis or group of people.

### 2. Title

Name the ordinary task in plain words. Prefer a verb phrase a visitor recognizes.

### 3. Task bar

Use this shape:

```text
Your task: [one action].
Use: [only the exact fictional data needed].
You're done when: [one observable success condition].
```

Do not hide data in an explanation panel or require the visitor to remember information from another route.

### 4. View control

Use the three exact visible labels:

- `Try the barrier`
- `Try the fix`
- `Compare side by side`

Accepted DEC-006 uses native radio buttons in a labelled `fieldset`. Native checked state communicates the selected display mode. The behavior is barrier only, fixed only, or both existing panels.

### 5. Barrier panel

Include:

- Barrier state chip: plum + “Barrier” + diamond
- Visually hidden text: “This version is broken on purpose.”
- The interactive task
- One visible reset control
- A safe, stable escape route
- Status/error/success region as the brief requires

### 6. Fixed panel

Include:

- Fixed state chip: slate blue + “Fixed” + circle
- The same interactive task and data
- Production-quality labels, instructions, validation, focus behavior, and recovery
- One visible reset control
- Review/confirmation when the task has meaningful consequences

### 7. What changed

Include three complete role panels. Only the selected mode is exposed.

## Part 3 — Barrier specification

### Named failure

Complete one sentence:

> The interface makes `[ordinary task]` harder by `[one behavior]`.

If the sentence needs “and,” the station probably contains more than one barrier. Station 01 is the deliberate exception defined by the supplied spec; document each interacting failure and why they form one destructive form pattern.

### State table

| State | Entry trigger | Visible result | Focus result | Exit trigger | Data retained? |
|---|---|---|---|---|---|
| Start | Panel load/reset | | | | |
| Active | First interaction | | | | |
| Failure | Named failure occurs | | | | |
| Recovery | Visitor tries again | | | | |
| Success | Task accepted | | | | |

### Safety boundary

Answer every question:

- How does a keyboard visitor leave the interaction?
- What does Escape do?
- Does browser Back remain untouched?
- Where is reset, and can barrier code disable it?
- What happens to running timers when the panel hides or resets?
- Can focus move into content that is about to become hidden?
- Could any event listener affect the other panel or the page shell?
- Which accessibility findings are intentional, and which would be accidental?
- What prevents the barrier from escalating after repeated attempts?

Any unanswered question blocks safety approval.

### Intentional-failure record

```text
EXCEPTION ID: ATK-EX-[station]-[sequence]
STATION/PANEL: [NN / barrier]
SELECTOR: [smallest stable selector]
NAMED FAILURE: [one pattern]
WCAG/AUDIT RULE: [criterion and tool rule]
EXPECTED RESULT: [exact finding]
WHY REQUIRED: [lesson]
SAFETY BOUNDARY: [escape/reset/non-interference]
FIXED RESOLUTION: [how the fixed panel resolves it]
OWNER: [name]
EXPIRES: [when this exception must be reviewed]
```

Never write “expected accessibility issues” without the exact selector and result.

## Part 4 — Fixed specification

The fix is independently good, not merely better than the barrier.

Specify:

- semantic elements and accessible names;
- visible labels and instructions;
- keyboard sequence and focus movement;
- validation timing and error wording;
- value preservation;
- recovery and back behavior;
- status announcement behavior;
- review/confirmation where relevant;
- completion message;
- reset behavior;
- narrow-screen and zoom behavior;
- reduced-motion behavior.

### Fixed quality questions

- Could a developer adapt this without preserving demo-only tricks?
- Does the fix still work without color?
- Does it preserve data when correction is possible?
- Does it announce change without creating surprise focus movement?
- Does it use native controls before custom widgets?
- Does it support the same task by keyboard, pointer, and touch where applicable?
- Does it avoid claiming that one pattern alone establishes conformance?

## Part 5 — Audience content

Follow the authoritative voice profiles in `docs/PRODUCTION-BIBLE.md`.

### Advocate template

```markdown
#### What happened
[One or two plain sentences about the interface.]

#### Why it matters
[Lost work, time, access, confidence, or organizational consequence.]

#### Who is hit hardest
[Specific circumstances and groups; no universal simulation claim.]

#### The decision
[One manager/client/executive action.]
```

Zero code. Aim for about 75–150 words when that fits the lesson.

### Builder template

```markdown
#### Criteria
- [Number — exact title (level), applicability statement, W3C link]

#### Code moves
1. [Precise change]
2. [Precise change]

#### Focused example
[One minimal snippet]

#### How to test
- Keyboard: [...]
- Browser/automation: [...]
- Assistive technology: [...]

#### Boundary
[What this example does not prove.]
```

Use one focused snippet and enough prose to cover the criteria, moves, verification, and boundary.
Most examples take about 110–220 words.

### Presenter template

```markdown
#### 0:00-0:20 — Set-up
[Task and non-simulator boundary.]

#### 0:20-1:10 — Try the barrier
[Steps and observation.]

#### 1:10-2:00 — Try the fix
[Repeat same task and name changed behavior.]

#### 2:00-2:30 — Debrief
[Impact and action.]

#### Three lines that land
1. [...]
2. [...]
3. [...]
```

Plan roughly two minutes. Keep each step's time as an estimate and allow participants to pause,
observe, or use their usual input supports.

## Part 6 — WCAG verification record

Create one record per candidate criterion:

```text
CRITERION: [number]
EXACT TITLE: [title]
LEVEL: [A | AA | AAA]
NORMATIVE SOURCE: [direct W3C WCAG 2.2 link]
TITLE VERIFIED ON: [YYYY-MM-DD]
APPLICABILITY: [confirmed | rejected | needs review]
RATIONALE: [how the station behavior meets or fails the normative wording]
UNDERSTANDING SOURCE: [optional W3C explanation]
TECHNIQUES: [optional examples, never treated as the only conforming method]
REVIEWER: [name]
```

Rules:

- Verify the title from the normative WCAG 2.2 document.
- Read the full success criterion, exceptions, definitions, and level.
- Use Understanding and technique pages to clarify, not to replace the criterion.
- Do not keep a criterion only because it appeared in the original backlog.
- If the title is correct but applicability is weak, mark it for review and revise Builder copy.
- State AAA level openly; do not imply that every AAA criterion is part of an AA conformance target.

## Part 7 — Acceptance criteria

Use stable IDs and EARS-style clauses.

```text
ATK-SNN-B-01 — WHEN [...], the barrier SHALL [...].
ATK-SNN-B-02 — IF [...], the barrier SHALL [...].
ATK-SNN-F-01 — WHEN [...], the fixed panel SHALL [...].
ATK-SNN-R-01 — WHEN reset is activated, the [panel] SHALL [...].
ATK-SNN-S-01 — WHILE the panel is displayed, the host page SHALL [...].
```

Every clause maps to one deterministic browser assertion or one named manual protocol. Avoid “works,” “accessible,” “intuitive,” and “user-friendly” without an observable definition.

## Part 8 — ID and state plan

Use the architecture prefix:

```text
atk-[station-number]-[panel]-[purpose]
```

Before implementation, list every planned ID and relationship:

| ID | Element | Referenced by | Exists in view(s) |
|---|---|---|---|
| | | | |

Then list transient state:

| State | Owner | Initial | Reset value | Survives view change? |
|---|---|---|---|---|
| | | | | |

No state survives route navigation. The only site-wide persisted value is `atk-mode`.

## Part 9 — Test inventory

Each station brief identifies:

- unit cases for pure state/validation logic;
- browser cases for barrier, fixed, reset, view, and mode interactions;
- expected axe findings and exact selectors;
- keyboard walkthrough for each panel;
- 200% zoom at 1280px and narrow-screen comparison;
- reduced-motion result;
- state redundancy check;
- real assistive-technology smoke test;
- editorial/framing review;
- criterion-specific manual check.

Use test IDs from `docs/ACCESSIBILITY-TEST-PLAN.md` and map them in `docs/REQUIREMENTS-TRACEABILITY.md`.

## Writing rules

- Put the actor and action early in each sentence.
- Prefer familiar words: “use,” “fix,” “error,” “keep,” “choose,” “try again.”
- Explain an acronym on first use unless the panel's audience reliably knows it.
- Keep one main idea per sentence and one action per numbered step.
- Use active voice unless the actor is genuinely unknown.
- Do not use disability labels as shorthand for behavior or preference.
- Do not write “everyone,” “always,” or “easy” unless the claim is literally supported.
- Automated reading-level scores are a signal, not proof. A human review decides whether meaning remains clear.
- Code snippets include only the lines needed for the lesson and never contain an inaccessible shortcut left unexplained.

## Review report template

After each station task, report:

```markdown
## Changed
- [Files and observable behavior]

## Not touched
- [Explicit adjacent scope]

## Evidence
- [Commands/manual protocols; include failure details only when something broke]

## Intentional findings
- [Exception IDs and exact expected results, or None]

## Uncertainty
- [Open question, decision ID, or None]

## Verdict
[Ready for review | Blocked]
```

Ryan handles staging and commits after review.

## Blank station brief

Copy this structure into `docs/stations/NN-slug.md` only when that station becomes the next roadmap unit:

```markdown
# Station NN — [Name]

Status: BRIEF DRAFT

## Header
[Station header fields]

## Task parity
[Goal, data, answers, success, parity table]

## Seven-section outline
[Exact public outline]

## Barrier specification
[Named failure, state table, safety boundary, exception record]

## Fixed specification
[Interaction, semantics, errors, focus, recovery, reset]

## Advocate panel
[Complete draft]

## Builder panel
[Complete draft and criterion records]

## Presenter panel
[Complete run sheet]

## Acceptance criteria
[Stable EARS clauses]

## ID and state plan
[Tables]

## Test inventory
[Automated and manual IDs]

## Decisions and unknowns
[DEC IDs and explicit blockers]

## Approval
[Definition-of-ready checklist]
```
