# A11y Test Kitchen Production Bible

Status: Accepted as the reference-slice implementation baseline
Last updated: 2026-11-12
Authority: Project identity, audience voice, emotional intent, and craft rules

This is the stable creative and editorial reference for A11y Test Kitchen. `specs/PROJECT.md` owns product requirements. `roadmap.md` owns delivery order. This bible explains what the project must feel like and what must never drift while those requirements are implemented.

## What Is It

A11y Test Kitchen is a public, static, interactive accessibility teaching site. Each station asks a visitor to complete one ordinary task in a deliberately broken interface, complete the same task in a production-quality fixed interface, and then understand what changed through one of three role-specific explanations.

The format is an interactive editorial exhibit delivered as a statically generated website. The primary output unit is one complete station. The first reference unit is Station 01, “The cancellation form.”

### Premise

- **WHAT IT IS:** A public static website that puts one broken and one fixed version of the same interface task next to role-specific explanations.
- **WHO IT'S FOR:** External visitors in three practical roles—Advocates, Builders, and Presenters—with the host site usable by disabled and non-disabled visitors alike.
- **WHY IT EXISTS:** It makes interface-created barriers concrete without pretending to simulate disability, then gives each audience language and actions they can use immediately.

## Setting

The project lives in a bright, editorial “test kitchen”: a place where interface patterns are put on the counter, tried, compared, and explained. The metaphor is practical and human. It is not a medical lab, carnival attraction, game show, compliance dashboard, or empathy theater.

Visually, the experience should feel like a well-organized public exhibit:

- a rail of numbered station tickets;
- clear work surfaces with generous space;
- visible labels and plain task instructions;
- a consistent Barrier/Fixed visual grammar;
- restrained motion and no decorative noise that competes with the task.

The light theme is the complete initial environment. Dark mode is not part of the production setting until the light theme and every station have been audited.

## Tone

**Clear. Candid. Practical.**

The site names the barrier without drama, shows the consequence without pity, and explains the fix without hiding behind compliance language.

The emotional movement of a station is:

1. **Recognition:** “This interface is making an ordinary task harder.”
2. **Relief:** “The fixed task removes needless work and uncertainty.”
3. **Agency:** “I know what to ask for, build, test, or demonstrate next.”

The intended final feeling is **agency**, not sympathy, guilt, fear, amusement, or triumph over the broken version.

## Format Rules

Every station contains these seven parts in this exact order:

1. An eyebrow naming the station number and barrier category
2. A plain-language task title
3. A task bar containing the goal and all needed data
4. A three-option view control for barrier, fix, and comparison
5. One interactive barrier panel
6. One interactive fixed panel
7. A “What changed” area with Advocate, Builder, and Presenter explanations

Every station also follows these production rules:

- Barrier and fixed panels are rendered once each.
- Barrier is the default view; comparison reveals both existing panels.
- Each panel has an independent reset that restores the documented starting state.
- Each barrier teaches one named failure pattern. Other accidental failures are defects.
- Each fixed panel is fit to adapt for a real production interface.
- Each station includes complete content for all three audience modes before it is marked built.
- Each Builder panel uses verified WCAG 2.2 criterion titles and separately reviewed applicability.
- Every state indicator uses the assigned color, word, and shape.
- The host page always preserves keyboard escape, Back, visible focus, reflow, and reduced-motion behavior.

## Audience Voice Profiles

### Advocate

- **Reader:** Managers, clients, executives, project owners, and other non-technical decision-makers
- **Core want:** Understand why the barrier matters and what decision or priority should change
- **Emotional register:** Human, direct, non-accusatory
- **What they should feel:** Responsible
- **Default behavior:** Names the lost time, work, confidence, or access; identifies who is hit hardest; ends with a decision-sized takeaway
- **Voice example:** “The form erased the work and gave no useful way to recover.”
- **What this voice must never do:** Include source code, recite standards as a substitute for impact, reduce people to impairments, or invite pity

#### Advocate panel contract

1. **What happened:** One or two plain sentences about the interface behavior
2. **Why it matters:** The human and organizational consequence
3. **Who is hit hardest:** Specific groups or circumstances, without claiming a universal disability experience
4. **Decision:** One action a manager, buyer, or sponsor can support

Usually 75–150 words, with zero code. Keep the four parts useful and short enough to scan.

### Builder

- **Reader:** Developers, designers who work in code, solutions architects, and technical reviewers
- **Core want:** Know the applicable requirement, the implementation move, and the verification method
- **Emotional register:** Exact, calm, testable
- **What they should feel:** Equipped
- **Default behavior:** Names the criterion and interaction defect, explains the smallest robust code move, includes a focused snippet, and states how to test it
- **Voice example:** “Keep the value, name the field in the error, and move focus to a message the user can act on.”
- **What this voice must never do:** Guess a WCAG number, overclaim conformance, use a toy patch as production advice, or hide uncertainty behind jargon

#### Builder panel contract

1. **Criteria:** Verified number, exact title, and level, with conditional applicability identified
2. **Code moves:** Two to four precise implementation changes
3. **Snippet:** The smallest self-contained example that demonstrates the correct pattern
4. **How to test:** Keyboard, browser, automated, and assistive-technology checks relevant to the station
5. **Boundary:** What the snippet does not prove

Use the shortest explanation that covers the criterion, code moves, tests, and boundary. A focused
example commonly takes 110–220 words plus one code block.

### Presenter

- **Reader:** A person running a live team, client, classroom, or conference demonstration
- **Core want:** Deliver the lesson safely and memorably without improvising harmful framing
- **Emotional register:** Brisk, grounded, audience-aware
- **What they should feel:** Prepared
- **Default behavior:** Gives a time-boxed sequence, tells the presenter what to do and observe, and ends with three lines worth repeating
- **Voice example:** “Watch what the interface does to the person’s work.”
- **What this voice must never do:** Call the station a simulation, rush a participant, turn frustration into entertainment, or imply that one task represents a disabled person’s life

#### Presenter panel contract

1. **Set-up:** 10-20 seconds; state the ordinary task and the non-simulator boundary
2. **Barrier run:** 30-60 seconds; demonstrate only the named pattern
3. **Fixed run:** 30-60 seconds; repeat the same task and call out the changed behavior
4. **Debrief:** 20-40 seconds; connect the interface decision to human impact and the fix
5. **Three lines that land:** Three short, speakable conclusions

Plan roughly two minutes. Give each step its own estimate and leave room for participants to pause,
observe, or use their usual input supports. Five minutes is the upper limit unless the event needs more.

## Craft Rules

### Rule 1 — The interface is always the subject

Every station names what the interface does. It never claims to reproduce a person's disability, body, mind, or life.

Review question: Could the sentence still make sense if no disability label appeared? If not, rewrite it around the barrier.

### Rule 2 — Broken is bounded; fixed is real

The barrier contains exactly the intended failure and remains completable, resettable, and escapable. The fixed version is not a softened demo; it is a robust pattern worth adapting.

Review question: Did the barrier add an accidental failure, or did the fix merely remove the most obvious annoyance?

### Rule 3 — Same task, same facts, one meaningful difference

Barrier and fixed views use the same task, data, success condition, and panel content. The visitor compares interface behavior, not two different scenarios.

Review question: If one view is easier because it asks for less or supplies different information, the comparison is invalid.

### Rule 4 — Every explanation ends in agency

Advocate can support a decision. Builder can make and test a change. Presenter can deliver the lesson safely. No panel ends with pity or a vague request to “care more.”

Review question: What can this reader do next that they could not do before?

### Rule 5 — The state grammar never drifts

Barrier is plum + “Barrier” + diamond. Fixed is slate blue + “Fixed” + circle. No red/green shorthand and no state conveyed through decoration alone.

Review question: Does the distinction survive without color?

### Rule 6 — Three voices or the station does not ship

Builder content is not the default content with two summaries added later. Each mode is written for its reader and fulfills its full panel contract before implementation begins.

Review question: Would each reader recognize that this panel was written for their job?

### Rule 7 — The lesson never compromises escape

No timer, modal, overlay, refresh, menu, or script may trap focus, block Escape, defeat Back, or leak behavior into the host page. Non-interference is stronger than fidelity to a broken pattern.

Review question: Can a visitor abandon or reset the barrier immediately using only a keyboard?

## What It Is Not

A11y Test Kitchen will never be:

1. **A disability simulator.** No vision filters, tremor effects, fake screen readers, or claims that the visitor now understands a disability.
2. **A compliance scorecard.** No automated score, pass badge, leaderboard, or blanket conformance claim based on a partial audit.
3. **A frustration game.** No points for enduring the barrier, no jokes at the visitor's expense, and no failure that exists only for spectacle.
4. **A component library.** Fixed examples may be adapted, but the public product is an educational exhibit rather than a supported design-system package.
5. **A growth funnel.** No accounts, tracking, newsletter capture, popups, or conversion layer.

## Connection to the Universe

Under accepted DEC-013, A11y Test Kitchen stands alone as a public project while strengthening Ryan's broader accessibility practice and providing reusable demonstration language. It does not depend on another creative property, product, or narrative universe. A future connection may reference related accessibility work, but it must not import another project's brand, lore, tone, or scope into the station format.

## Production Window

One production unit is one audited station. A unit follows seven separately reviewed tasks:

1. Station brief and safety boundary
2. Three audience panels and criterion verification
3. Barrier implementation
4. Fixed implementation
5. Functional coverage
6. Accessibility and editorial audit
7. Review report and rail-status update

The bandwidth limit is one task at a time and one station in active production at a time. The complete
collection now exists, but no elapsed-hour promise is inferred retroactively. Future station revisions
should record time separately for content, implementation, automated checks, manual checks, and review.

The implemented release cohorts are:

- Reference slice: Station 01
- Cognitive-accessibility MVP: Stations 01-03
- Interaction and interruption: Stations 04-06
- Keyboard and semantics: Stations 07-09
- Visual, media, and pointer: Stations 10-12

## Visual Grammar

| State | Token | Required word | Required shape | Meaning |
|---|---|---|---|---|
| Barrier | `--barrier: #8A3E5B` | Barrier | diamond | The interface contains the named failure |
| Fixed | `--fix: #22557E` | Fixed | circle | The interface uses the production-quality pattern |

All other colors, typography, and spacing are supporting tokens. They may not compete with or contradict this binary grammar.

## Drift Tests

Before approving public copy or interaction design, ask:

- Does this judge the interface rather than the person?
- Is the task ordinary and identical in both views?
- Is there exactly one intended barrier?
- Is the visitor always able to reset, escape, or leave?
- Is the fix genuinely adaptable to production?
- Does each mode fulfill its reader's complete contract?
- Are criterion title and applicability both verified?
- Does the copy end in agency?
- Does state survive without color?
- Would removing the test-kitchen branding leave a coherent accessibility lesson rather than a gimmick?

Any “no” blocks the station.

## Reference output

Station 01 established the reusable content and interaction contract because:

1. This bible, the audience profiles, and the craft rules are implemented in its public content.
2. Its route proves the seven sections, views, modes, independent resets, and bounded barrier pattern.
3. Deterministic interaction and accessibility checks exercise the reference behavior.
4. Shared components extracted from that evidence now serve all twelve stations, Station 01 included.

Station 01 and the other stations remain `AUDITING` for manual support-matrix purposes. Creating the
optional project operating skill is a separate owner-approved task and is not a prerequisite for the
public site's source implementation.

## Approval Checklist

- [ ] Premise accurately separates what the project is from why it exists
- [ ] Setting and metaphor feel appropriate
- [ ] Three tone words are accepted
- [ ] Intended emotional outcome is agency
- [ ] Advocate voice and panel contract are accepted
- [ ] Builder voice and panel contract are accepted
- [ ] Presenter voice, timing, and panel contract are accepted
- [ ] Seven craft rules protect the project without adding unrelated scope
- [ ] The standalone-universe assumption is accepted or revised
- [ ] The task/station production window is accepted
- [ ] The bible is ready to become the source for `/Users/ryanjohnson/.skills/a11y-test-kitchen/SKILL.md`
