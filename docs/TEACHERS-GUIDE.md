# A11y Test Kitchen — Teacher's Guide

Status: Companion document; no authority over requirements
Owner: Ryan
Last updated: 2026-11-12
Audience: Anyone running this site with a class, workshop, team session, or client demo
Review boundary: Final disabled-educator and classroom-safety review remains required before facilitated use

This guide tells you how to teach with A11y Test Kitchen: what to say, what to run, where to pause,
what students reliably get wrong, and what extra knowledge turns each station from a demo into a
lesson people keep.

It does not own any requirement. `specs/PROJECT.md` owns product requirements,
`docs/PRODUCTION-BIBLE.md` owns voice and tone, and `docs/ACCESSIBILITY-TEST-PLAN.md` owns test
procedure. If this guide and one of those disagree, they win.

---

## Contents

1. [Read this before you teach anything](#1-read-this-before-you-teach-anything)
2. [Getting the site running](#2-getting-the-site-running)
3. [The mental model students need in the first five minutes](#3-the-mental-model-students-need-in-the-first-five-minutes)
4. [Session plans](#4-session-plans)
5. [Station-by-station teaching notes](#5-station-by-station-teaching-notes)
6. [Facilitation craft](#6-facilitation-craft)
7. [Exercises, assignments, and assessment](#7-exercises-assignments-and-assessment)
8. [For technical classes: teaching the codebase](#8-for-technical-classes-teaching-the-codebase)
9. [Extra knowledge worth handing your class](#9-extra-knowledge-worth-handing-your-class)
10. [Things that go wrong live, and what to do](#10-things-that-go-wrong-live-and-what-to-do)
11. [Glossary](#11-glossary)
12. [Quick reference card](#12-quick-reference-card)

---

## 1. Read this before you teach anything

### The one framing rule

**This is not a disability simulator. Never call it one.**

The site judges the interface. It never claims to reproduce a person's body, mind, or life. This is
not a stylistic preference — it is the project's founding decision (DEC-001), and every piece of
copy on the site was reviewed against it.

Why it matters enough to lead a teacher's guide with it: simulation exercises (blur goggles,
weighted gloves, mouse-disabling, "try browsing with your eyes closed") are widely criticised by
disabled advocates. They can produce pity and a personal-tragedy framing rather than the structural
understanding this curriculum is meant to build.
Someone experiencing five minutes of artificial difficulty learns what *novelty* feels like, not
what *expertise with an assistive technology plus a hostile interface* feels like. The two are
opposite experiences.

This site sidesteps the problem entirely. Everyone in the room, disabled or not, does the same
ordinary task twice and compares two *interfaces*. Nobody is asked to pretend to be anybody.

### Language: say this, not that

Rehearse these swaps before you present. Under pressure, the wrong phrasing is the one that comes
out.

| Say | Never say |
|---|---|
| "This interface is broken on purpose." | "This shows what it's like to be disabled." |
| "The barrier here is a 30-second time limit." | "Imagine you're an anxious person and…" |
| "Who does this interface exclude?" | "Feel how frustrating this is for *them*." |
| "The fix keeps the person's work." | "The fix helps disabled users." (It helps everyone.) |
| "Watch what the interface does to the work." | "Try it with your eyes closed." |

### If a student pushes back

**"Isn't a simulation still better than nothing?"** — Good question, and the honest answer is that
it depends what you measure. A simulation may raise sympathy without building practical competence.
This format targets competence: at the end, a student can name the failure, name the criterion, and
write the fix. Sympathy is not a deliverable.

**"But I understood it better after wearing the goggles."** — Accept it without arguing. Then ask:
"What did you build differently the next week?" That question moves the discussion from feeling to
practice, which is where the lesson lives.

**"Disabled people manage fine with these sites."** — People route around barriers at real cost:
time, effort, money, help from others, or abandoning the task. Station 01 and Station 06 make that
cost visible in a way that argument does not.

### If disabled students are in your room

Assume they are, because they usually are, and disclosure is nobody's obligation.

- Never single anyone out to demo, verify, or validate a lesson. Expertise is not a duty.
- Never say "for our blind users" as if they are elsewhere and hypothetical.
- Do not narrate a screen reader as an oddity or a joke. If you demo one, demo it competently or not
  at all — at real speed if you can, and say plainly that expert users run it far faster.
- Offer the opt-outs described in §6 before Stations 01, 05, and 07 rather than after.
- Credit the source: this format exists because disabled advocates said loudly that simulators do
  harm.

---

## 2. Getting the site running

### Requirements

- Node `22.12.0` or newer, within Node 22 (`.nvmrc` records the baseline).
- npm.
- Playwright's Chromium build, but only if you intend to run the test suites in class.

### Setup

```sh
npm ci
npm run dev            # prints a local URL; open it
```

If you want to show the tests (§8), add:

```sh
npx playwright install chromium
```

### Ten minutes before class

1. `npm run dev`, open the printed URL, and load the home rail.
2. Open the stations you plan to show and switch the audience mode and panel views on each.
3. Zoom the browser to 200% and confirm your projector still shows the panels legibly. Most rooms
   need 150–200% regardless of accessibility; back-row students cannot read 16px.
4. Decide your mode. If you plan to speak from the run sheets, set **Presenter** now — the setting
   persists across pages in `localStorage` under `atk-mode`, so you set it once.
5. Have `docs/TEACHERS-GUIDE.md` §12 (the answer key) open on a second screen or printed. Fumbling
   for the member number while forty people watch a 30-second countdown is avoidable.

### Teaching without a laptop per student

The site is static. On an existing deployment, use **Teaching guide** on the home page. Three workable
arrangements:

- **Projector only.** You drive, the class calls out what they notice. Best for 10–20 minutes.
- **Pairs.** Offer driver and observer roles. Let people choose their roles, change them by
  agreement, and describe what changed in speech, notes, or sketches.
- **Built output.** `npm run build` produces `dist/`. Serve its contents at the root of an HTTP(S)
  site on the classroom network. The pages use root-relative paths. Installing dependencies
  requires registry access or a populated cache. The built fonts and media travel with the site,
  so station activities can run on a local network with no public internet connection. Optional
  reference links visit external sites when a visitor follows them.

### Privacy note you can state honestly

The exhibit has no accounts, analytics, cookies, tracking, telemetry, or AI calls. Use the fictional
values shown in the demos. The form exercises stay in the page and the only preference stored is
the selected audience mode. Check what the classroom host logs about requests to the site.

---

## 3. The mental model students need in the first five minutes

Give them this and the rest of the session runs itself.

### The shape of every station

Every one of the twelve stations has the same seven parts in the same order:

1. **Eyebrow** — `Station NN · barrier category`
2. **Title** — the task in plain words
3. **Task bar** — what to do and the data you need to do it
4. **View switch** — `Try the barrier` / `Try the fix` / `Compare side by side`
5. **Barrier panel** — the broken build, fully interactive
6. **Fixed panel** — the good build, fully interactive
7. **What changed** — Advocate, Builder, and Presenter explanations

Say the structure out loud once at Station 01. From Station 02 onward students navigate without
help, and their attention goes to the lesson instead of the furniture. That is the whole point of a
repeated frame.

### The three audience modes

One switch in the header changes the explanation panel on every station.

| Mode | Written for | Contains |
|---|---|---|
| **Advocate** | Managers, clients, executives, non-technical readers | Human and organisational impact, who is hit hardest, a decision — zero code |
| **Builder** | Developers, designers in code, architects | Verified WCAG criteria, two to four code moves, a snippet, how to test, and what the snippet does *not* prove |
| **Presenter** | Anyone running a live demo | A timed run sheet and three speakable conclusions |

**Teaching insight most classes miss:** the modes are not three difficulty levels. They are three
*jobs*. Advocate is not "Builder for beginners" — it answers a question Builder never answers ("what
should we decide?"), and Builder answers one Advocate never answers ("what do I type?"). Have
students read the same station in two modes back to back and name the question each one answers.
That single exercise teaches more about communicating accessibility inside an organisation than an
hour of lecture, because it shows that the *same fact* needs different framing to move a developer
and a budget holder.

The default mode is Builder. It persists across pages. If storage is unavailable it silently falls
back to Builder and keeps working — which is itself a small lesson in graceful degradation.

### The state grammar: colour + word + shape

| State | Colour | Word | Shape |
|---|---|---|---|
| Barrier | Plum `#8A3E5B` | "Barrier" | diamond |
| Fixed | Slate blue `#22557E` | "Fixed" | circle |

**Ask the class why this isn't red and green.** Let them sit with it for a moment. Colour-vision
differences are common, vary by type and population, and make red/green a particularly poor pairing
for critical state. An accessibility site that encoded its most important distinction in exactly
that pairing would undermine its own lesson on its own home page.

Then push further: the colours are not the point. **Every state indicator shows all three signals —
colour, word, and shape — so the distinction survives greyscale, forced colours, a bad projector,
and a photocopied handout.** Colour is decoration on top of a signal that already works without it.
That is the actual rule from WCAG 1.4.1, and Station 10 teaches it directly.

### Two safety facts to state up front

1. **The barrier panels are broken on purpose.** Each panel has an approved teaching pattern and
   exposes that disclosure to assistive technology.
2. **You can stop or observe.** Each panel has a Reset that returns it to its starting state and
   stops pending timers. The demos leave browser Back available. Name the exit for the station:
   for example, Escape from inside the Station 07 promo, or **Reset Barrier** to close and reset it.

Say #2 explicitly before Station 01. It converts the timer from a stressor into an observable.

---

## 4. Session plans

Pick the one that matches your slot. Every plan assumes the site is already loaded.

### A. Ten-minute lightning demo (a team meeting, a conference lightning talk)

One station: **09, the unlabelled icon.**

- 1 min — the framing rule, in one sentence.
- 3 min — barrier: try to delete `Notes.txt`; the button has no name.
- 3 min — fix: the same visual button, now named `Delete Notes.txt`.
- 3 min — Builder panel, then the punchline in §9: this is the only barrier of the thirteen recorded
  in this repo that an automated scanner catches.

Why 09: the failure is one attribute, the fix is one attribute, and the automated-testing punchline
lands in a single sentence.

### B. Fifty-minute class

Three stations, one per theme.

| Time | Activity |
|---|---|
| 0–5 | Framing rule, language swaps, the seven-part shape, the "you can always leave" promise |
| 5–17 | **Station 01 — the cancellation form.** The reference station. Run barrier live; let the timer expire on purpose. |
| 17–27 | **Station 09 — the unlabelled icon.** Name, role, value. Introduce the accessibility tree. |
| 27–37 | **Station 12 — the target too small.** Everyone has fumbled a tiny tap target; nobody has called it an accessibility failure. |
| 37–45 | Compare mode on any one station; audience-mode switching exercise |
| 45–50 | Close on §9's three ideas: permanent/temporary/situational, the curb-cut effect, and the limits of automated testing |

### C. Ninety-minute workshop (best single-session format)

| Time | Activity |
|---|---|
| 0–10 | Framing, structure, safety, mode switch |
| 10–25 | **Station 01** demonstrated by you, in full, including timeout and reset |
| 25–55 | **Lab.** Pairs work Stations 02, 06, 10, and 12 in any order. One person drives, the other narrates. Each pair writes one sentence per station: "the interface did X, so the person lost Y." |
| 55–70 | **Keyboard-only round.** Pairs re-run *one* completed station using no pointer at all. Hands off the mouse — say it, then enforce it. |
| 70–85 | Report-back. Each pair reads one sentence. You collect them into themes on the board. |
| 85–90 | Close and assignment (§7) |

Stations 02, 06, 10, and 12 are chosen because each is a single clean failure that a pair can
complete in five minutes with no facilitation.

### D. Three-session unit (a course module)

**Session 1 — Cognitive load and communication.** Stations 01, 02, 03, 06.
Theme: interfaces that demand time, memory, and reading ability the task never actually required.
This deliberately comes first. Cognitive accessibility is the most common and least taught area,
and starting here prevents the whole subject from collapsing into "accessibility means screen
readers."

**Session 2 — Keyboard, focus, and control.** Stations 04, 05, 07, 08.
Theme: who is in control of where you are and what happens next. Run the entire session keyboard-only,
including your own demos. Announce it in advance so students arrive expecting it.

**Session 3 — Perception, media, and pointers.** Stations 09, 10, 11, 12.
Theme: the information a person can actually perceive, and the body they operate the device with.
End the unit on Station 12 — it is the one everyone recognises from their own phone, which sends
the class out with a personal example rather than an abstraction.

### E. Client or stakeholder demo (twenty minutes, non-technical room)

Switch to **Advocate** mode before you start and leave it there.

- Station 01 (barrier, then fix) — 8 min
- Station 10 (barrier, then fix) — 5 min
- Advocate panels read aloud, verbatim — 4 min
- Close with the decision sentence, not the criterion number — 3 min

Do not show a single WCAG number in this session unless someone asks. The Advocate panels are
written to survive that room, in that voice, deliberately. Use them as written; they have been
edited for it.

---

## 5. Station-by-station teaching notes

Each station below gives you: the task and the data students need, what to demonstrate, the exact
moment to stop talking, the criteria in play, the insight most classes miss, and a discussion
prompt.

Every task is fictional and local. Nothing is submitted, saved, or sent.

---

### Station 01 — The cancellation form
`/stations/cancellation-form/` · Time limits and error recovery

**Task:** Cancel the membership. **Data:** member number `482731`, reason "Moving away".
**Success:** "Membership canceled."

**Run it like this:** Focus a field and start typing. Select **Hide countdown** to remove the changing
readout while the time limit continues. Show the countdown again and let it hit zero. The form clears
the sample entries and shows *Session terminated. Please re-initiate.*

Then reset, complete the form, and submit. The first submit clears both fields and says exactly
`Invalid input.` The second submit succeeds.

**Stop talking here:** right after the timeout wipes the fields. Pause, then name what the interface
erased. Do not solicit, score, or interpret a participant's distress as lesson evidence.

**Criteria:** 2.2.1 Timing Adjustable (A), 2.2.2 Pause, Stop, Hide (A), 3.3.1 Error Identification (A),
3.3.2 Labels or Instructions (A), 3.3.3 Error Suggestion (AA), 3.3.4 Error Prevention (Legal, Financial,
Data) (AA, conditional), 3.3.7 Redundant Entry (A).

**The insight most classes miss:** there are three separate failures here, and students will name
only the timer. The timer is the loud one. The quiet ones do more damage:

- The prompts are **placeholder text**, not labels — so the instruction disappears exactly when the
  person starts typing, which is exactly when they need it. Placeholders also fail for anyone using
  translation, magnification, or high-contrast modes, and screen reader support for them is
  inconsistent. This is one of the most common real-world form defects on the web.
- The error **destroys the work**. When a process needs information it already asked for or supplied,
  3.3.7 requires it to be filled in or available to select, with exceptions for essential re-entry,
  re-entry required for security, or information that is no longer valid. Retaining a valid entry
  avoids extra work for people who use a switch, voice input, or an on-screen keyboard.

The Fixed panel lets visitors review, correct, and confirm before the fictional cancellation. That
models one way to meet 3.3.4 in a real flow involving a legal commitment, financial transaction,
change to user-controllable stored data, or submission of test responses.

**A detail worth pointing out to technical students:** the Fixed panel updates an existing
`role="alert"` region while focus stays where the visitor put it. Moving focus to an alert can
duplicate announcements in some setups. Check first and repeated errors with the browser and
assistive technology you are demonstrating.

**Discussion prompt:** "Who wrote this timer, and what were they trying to achieve?" Nobody sets a
30-second limit to hurt people. Someone was told to reduce cancellations, or inherited a session
timeout from a security requirement and applied it to the wrong screen. Barriers usually come from
a reasonable-sounding requirement applied without asking who it excludes.

**Safety note:** offer the opt-out before you start (§6). Timed destruction of work is genuinely
unpleasant for some people, particularly anyone with anxiety or a recent bad experience with a
government or medical form.

---

### Station 02 — The error message
`/stations/error-message/` · Form and input recovery

**Task:** Update a rejected payment. **Data:** billing ZIP `60614`. **Success:** "Payment details
updated."

**Run it like this:** submit once — you get `Invalid input.` and nothing else. Submit again and it
works, revealing attempt-dependent behavior without any recovery guidance.

**Criteria:** 3.3.1 Error Identification (A), 3.3.3 Error Suggestion (AA).

**The insight most classes miss:** a good error message answers three questions, and the barrier
answers zero of them.

1. **Which field?** (identification — 3.3.1)
2. **What's wrong with it?** (description)
3. **What do I do now?** (suggestion — 3.3.3)

Have students grade the fixed message against all three. Then have them grade an error message from
a real product they used this week. Almost none score 3/3.

Also flag: the fixed panel **preserves the invalid value**. Clearing a field the person typed
"because it was wrong" is the single most common way forms punish the people least able to absorb
the punishment.

**Discussion prompt:** "`Invalid input.` is technically an error identification. Why isn't it
enough?" This is where students learn that meeting a criterion's letter and serving a person are
not the same activity — a theme that recurs all the way through.

---

### Station 03 — The reading wall
`/stations/reading-wall/` · Readability and comprehension

**Task:** Start a return for order `ATK-302`, delivered 12 days ago, unopened and unused in its
original packaging. The visitor must start the online return within 30 days of recorded delivery.
**Success:** the online return starts.

**Run it like this:** show the barrier and ask the class to locate the return action, with observation
always available instead of participation. Ask what made the action difficult to find. Then show the
fix, which puts the action first and keeps the policy details available in a `<details>` disclosure.
Ask what made the action easier to find.

**Criteria:** 3.1.5 Reading Level (AAA).

**Compare meaning as well as length.** Check the deadline, item conditions, and exceptions in both
versions. Plain language puts the action first and keeps the rules available in words people can use.

**Extra knowledge:** 3.1.5 is a **AAA** criterion. It addresses alternatives or supplemental
content for text above lower-secondary reading level. The exhibit's sixth-grade prose target is
an editorial choice. Ask which version a person could use more readily in a hurry, on a phone,
or in a language they're still learning.

**Discussion prompt:** "Who benefits from the version nobody can read?" Sometimes the answer is
nobody and it is just inherited. Sometimes the answer is the company. Both are worth saying out loud.

---

### Station 04 — The disappearing menu
`/stations/disappearing-menu/` · Pointer and focus interaction

**Task:** Open the account menu and reach Settings. **Success:** "Settings opened."

**Run it like this:** hover to open the menu, then move the pointer toward Settings and *cross the
gap*. When the menu vanishes, name exactly what the interface did. Demonstrate it once, then try to
reach it with Tab: the product trigger is not keyboard operable at all. Do not repeat the failure for
laughs; move promptly to the persistent disclosure control.

**Criteria:** 1.4.13 Content on Hover or Focus (AA), 2.1.1 Keyboard (A, illustrative).

Try moving the pointer from the trigger onto Settings. The gap prevents the new content from being
**hoverable**. Under 1.4.13, authored hover or focus content also stays present until the trigger is
removed, the visitor dismisses it, or the information is no longer valid. It must be dismissible
without moving pointer or focus unless it reports an input error or covers or replaces no other
content. The exhibit's safe backup lets keyboard users reach Settings, so the trigger illustrates
the keyboard problem while the function stays available. [W3C guidance on hover or focus content](https://www.w3.org/WAI/WCAG22/Understanding/content-on-hover-or-focus.html)

The real fix converts hover into a *state you control*: a `button` with `aria-expanded` and
`aria-controls`, focus moved to the first item, Escape to close with focus returned to the trigger.

**A detail worth pointing out:** at 400% zoom, a hover menu can open entirely off screen. Ask the
class to picture it. This is why 1.4.13 exists and why "it works on my machine" is not evidence.

**Discussion prompt:** "Which is more common on the sites you use — hover menus or click menus, and
has that changed in the last few years?" Touch devices already forced this fix on much of the web.
Accessibility requirements and mobile requirements converge constantly.

---

### Station 05 — The interruption
`/stations/interruption/` · Focus and context control

**Task:** Use the fictional scenario printed on the page to book an appointment for Sam Lee.

**Run it like this:** start typing the sample name. The availability update appears and moves
focus to **Return to form**. Show where the focus indicator lands and that typing no longer adds
letters to the field. Activate the button, or press Escape with focus in the interruption, to
return to the form.

**Pause when focus jumps.** Ask what happened to the field the teacher was editing.

**Criteria:** 2.4.3 Focus Order (A), 3.2.2 On Input (A), 3.2.5 Change on Request (AAA),
4.1.3 Status Messages (AA).

The field retains the entry, so the group can isolate the focus jump. In a real product, a context
change that follows typing needs advance notice under 3.2.2. In Fixed, entering the same values
leaves focus in the form. The visitor chooses **Check availability** when ready.

Watch the result appear with focus still on the button. The Fixed result uses a polite live region
so assistive technology can announce it without moving focus. Ask a screen reader user to verify the
result with the tool they use. The announcement timing depends on the browser and assistive technology.

**Discussion prompt:** "Name an interruption in a product you use that you would keep, and one you
would convert to on-request." Chat widgets, cookie banners, and 'new content available' toasts
usually surface fast.

**Safety note:** offer the opt-out. Unexpected focus movement is disorienting for some people
rather than merely annoying.

---

### Station 06 — The memory tax
`/stations/memory-tax/` · Cognitive load

**Task:** Confirm a fictional $25 transfer to Jordan Kim. **Data:** confirmation code `734219`.

**Run it like this:** show the code. Press Continue — the code is gone and the entry field is asking
for it. Ask the class what information the interface removed while still expecting it to be used.
Do not turn the demonstration into a memory test, prevent note-taking, or count who remembered. The
interface's decision is the evidence; participant performance is not.

**Criteria:** 3.3.7 Redundant Entry (A).

**The insight most classes miss:** working memory is limited, measured in context-dependent chunks
rather than one universal item count, and performance varies with context, stress, fatigue, and
interruption. The interface designer had the code the entire time and chose to make a human hold it
instead. **The system asked a person to be its memory.** That is the whole lesson, and it is worth
saying in exactly those words.

Then the systemic point: this is not one of twelve equal barriers. Cognitive accessibility is
enormously common, badly served by tooling, invisible to automated scanners, and rarely taught. This
site puts cognitive stations first on purpose (01, 02, 03, 06), and you should tell your class that.

**Extra knowledge:** WCAG 2.2 added 3.3.7. It applies when the same process asks again for information
it already collected or supplied. Fixed keeps the sample code available and lets the visitor choose
**Use this code**. Essential re-entry, security, and information that is no longer valid are
exceptions. [W3C guidance on Redundant Entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html)

**Discussion prompt:** "If a real security process needs a code, how can we make entry easier?"
Consider paste support, platform autofill, and keeping the code available where the process permits it.

---

### Station 07 — The keyboard trap
`/stations/keyboard-trap/` · Keyboard navigation

**Task:** Open and close a fictional promo overlay using the keyboard. **Success:** the overlay
closes and focus returns to `Open promo`.

**Run it like this:** open the promo with the keyboard, then press Tab repeatedly. Focus cycles
between two promo controls. The promo has no visible close control. Press Escape while focus is
inside it to close it and return focus to **Open promo**.

**Criteria:** 2.1.2 No Keyboard Trap (A) — recorded as *conditional* in this repo, for the reason
below.

**Read this before you teach it — the honest disclosure:** this barrier is a deliberately **safe
approximation**, accepted as DEC-009. Escape works from inside the promo, browser Back is
available, and **Reset Barrier** or switching views closes it. Tell your class which exits they can
use, then explain the safety choice:

> A real keyboard trap has no exit. Shipping one on a public teaching site would mean that a keyboard
> user visiting to *learn about* accessibility would be unable to leave the page. The project's rule
> is **non-interference is stronger than fidelity** — a teaching artefact may not become the thing it
> is teaching against.

Station 08 makes the identical trade-off (DEC-010) by keeping its broken product replay
non-interactive, so no real control on the live page ever has invisible focus.

This is a genuine, transferable professional judgement: **when a demo can only be fully accurate by
harming its audience, you build the approximation and document the gap.** Most students have never
seen that trade made explicitly, in writing, with a decision ID attached.

**The insight most classes miss:** the fixed panel uses the native HTML `<dialog>` element, which
gives you modal focus containment, Escape-to-close, and the top layer for free — behaviour that
used to require hundreds of lines of hand-written focus-trap JavaScript. Note the distinction
carefully, because students conflate them: a **modal dialog contains focus and offers a documented
exit**; a **keyboard trap contains focus and offers none**. The difference is the exit, not the
containment.

**Discussion prompt:** "How would you *find* a keyboard trap in a product you didn't build?" Answer:
put the mouse down and Tab through the whole page. It takes minutes and can reveal serious keyboard
defects that a static or automated scan cannot prove absent.

---

### Station 08 — The invisible focus
`/stations/invisible-focus/` · Keyboard navigation

**Task:** Buy the Balcony ticket without a mouse. The replay starts on Standard; Balcony is next.

**Run it like this:** press `Next product focus` and ask the class where the focus is now. They
cannot tell — nothing moves visually. A text readout beside it names the state, which is your safety
net and also a teaching prop.

**Criteria:** 2.4.7 Focus Visible (AA), conditional for the replay.

**The insight most classes miss:** almost every developer in the room has written `outline: none` or
`*:focus { outline: 0 }`, or shipped a CSS reset that did it for them. Ask for a show of hands and
be honest about your own. The motive is always cosmetic — the default ring looked wrong — and the
cost is that keyboard users lose their cursor entirely. **You do not remove focus indicators. You
replace them with better ones.** Modern CSS makes that easy: `:focus-visible` styles focus only when
the browser judges it useful, so keyboard focus stays visible while a clicked button doesn't get a
persistent ring.

This site authors a three-pixel focus ring and deterministically checks that the indicator is present
and visible in required states. Manual contrast review remains open. Do not describe that as complete
WCAG 2.2 Focus Appearance verification: [2.4.13 Focus Appearance](https://www.w3.org/TR/WCAG22/#focus-appearance)
is Level AAA and evaluates both indicator area and contrast between the same pixels in focused and
unfocused states.

**Extra knowledge:** WCAG 2.2 added **2.4.11 Focus Not Obscured (Minimum)** (AA). When a control
receives keyboard focus, author-created content such as a sticky header must leave at least part of
the control visible. Check indicator visibility separately under **2.4.7 Focus Visible** and
authored indicator contrast against adjacent colors under **1.4.11 Non-text Contrast**.
[W3C guidance on Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)

**Discussion prompt:** "Where does your product's focus ring disappear?" Sticky headers, custom
dropdowns, dark-on-dark buttons, and anything with `overflow: hidden` are the usual suspects.

---

### Station 09 — The unlabelled icon
`/stations/unlabelled-icon/` · Name, role, and value

**Task:** Delete the fictional file `Notes.txt`.

**Run it like this:** the barrier's delete button is a trash glyph and nothing else — no accessible
name at all. The fixed version looks **identical** and exposes `Delete Notes.txt`.

**Say this out loud:** "These two buttons look the same. The Fixed button exposes the name
Delete Notes.txt. The Barrier button exposes an empty name." If you demonstrate with a screen
reader, report what your setup actually announces.

**Criteria:** 1.1.1 Non-text Content (A), 4.1.2 Name, Role, Value (A).

**The insight most classes miss:** teach the trio *name, role, value* here, because it is the
foundation everything else sits on.

- **Role** — what kind of thing it is. A `<button>` is a button; a `<div onclick>` is a div with an
  ambush attached.
- **Name** — what it's called. Visible text, `aria-label`, `aria-labelledby`, or `<label>`.
- **Value/state** — what it currently is. Checked, expanded, pressed, selected.

Then show them the browser DevTools accessibility pane on this very station. Seeing "button, no
accessible name" next to a perfectly visible trash icon converts more sceptics than any slide.

**The punchline — use it:** open `tests/fixtures/intentional-failures.js`. It records **thirteen
deliberate barrier entries across twelve stations. Exactly one** carries a `toolRule`, this station's
`button-name`. The other entries name a structural assertion or a manual check. This is evidence
about the project's configured axe scans and the states they cover. Ask what additional evidence
would show that a whole task is usable.

**Discussion prompt:** "Why is `aria-label` on a `<div>` the wrong fix?" Because you also need role
and keyboard operability, and by the time you've added `role="button"`, `tabindex="0"`, Enter *and*
Space handlers, and a disabled state, you have hand-rebuilt `<button>` badly. First rule of ARIA: no
ARIA is better than bad ARIA.

---

### Station 10 — The color-only status
`/stations/color-only-status/` · Visual distinction

**Task:** Select the one failed order. **Data:** orders `ATK-510`, `ATK-511`, `ATK-512`.
**Answer:** `ATK-511`.

**Run it like this:** show the barrier — a legend maps the colours, and each row carries only a
coloured dot. If you can, take a screenshot and drop it into greyscale, or use a browser extension.
The rows become indistinguishable.

**Criteria:** 1.4.1 Use of Color (A).

**The insight most classes miss:** the barrier **has a legend**, and the legend does not save it.
Students will propose "add a key" as the fix; it is the wrong fix. A legend forces the person to
hold a mapping in working memory (see Station 06) and re-apply it to every row, and it still fails
in greyscale, forced colours, and printouts. **The status has to be inside the row, in text.**

Then the deeper point: 1.4.1 does not ban colour. It says colour cannot be the *only* visual means.
The fix keeps the colour and adds a word and a shape — three redundant signals. Redundancy is not
clutter; it is what makes an interface survive contexts you did not anticipate.

**Extra knowledge:** name the real users of forced-colors / high-contrast mode — a Windows feature
used heavily by people with low vision and light sensitivity. Colour-only status disappears in it
completely. Colour-vision differences are common and vary by type and population, so expect them to
be present without asking anyone to disclose one.

**Discussion prompt:** "Where does your product use a coloured dot, badge, or chart line as the only
signal?" Status dashboards, CI pipelines, and charts are the standard offenders — and chart legends
are the exact same mistake as this station's legend.

---

### Station 11 — The caption gap
`/stations/caption-gap/` · Audio and video media

**Task:** Identify the final instruction in the clip. **Answer:** "The final step is Press Done."

**Run it like this:** play the barrier video with the room's sound **off**, or muted deliberately.
Ask which information the interface failed to provide in another form. Then play the fixed version —
same 8.7-second clip, with a default English captions track and a full transcript beside it.

**Criteria:** 1.2.2 Captions (Prerecorded) (A), 1.2.3 Audio Description or Media Alternative
(Prerecorded) (A, conditional).

**The insight most classes miss:** captions and transcripts are not the same deliverable and do not
serve the same need.

- **Captions** are synchronised. They serve someone watching the video who needs the audio in text,
  and they must include meaningful non-speech sound.
- **A transcript** can convey the meaningful audio, visuals, and sequence in text. This clip's
  narration already describes the important visual information. In another clip, a transcript of
  speech alone could miss an important action or on-screen label. The synchronized media criterion
  1.2.3 allows a complete media alternative or audio description. [W3C guidance on media alternatives](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html)

Ask someone to answer the final-instruction question from the captions with audio muted, then try
again from the transcript alone. Record whether both provide the same answer.

**Extra knowledge, and be blunt about it:** auto-generated captions are a starting point, never a
deliverable. They mangle names, technical terms, and homophones; they usually omit punctuation and
speaker identification; and accuracy collapses with accents, background noise, and jargon — exactly
the conditions of most real workplace video. Deaf and hard-of-hearing viewers have a long-standing
name for unedited machine captions: *craptions*. This repo takes its own advice —
`docs/MEDIA-PROVENANCE.md` records the spoken script, generation command, licences, and caption
timings, and the station brief still lists **human caption accuracy review as an outstanding
release requirement**. Show the class a project honestly marking its own homework as not yet done.

**Discussion prompt:** "Your company has 400 untranscribed videos. Where do you start?" Good
answers: highest traffic first, anything required to complete a task, anything legally significant,
and stop producing new untranscribed video today.

---

### Station 12 — The target too small
`/stations/target-too-small/` · Pointer target sizing

**Task:** Choose option B. **Success:** "Selected option B."

**Run it like this:** use the Barrier view on its own to inspect 20×20 CSS px targets with 2 px gaps.
Then switch to Fixed to inspect 44×44 CSS px targets with 8 px gaps. Offer a phone or touchscreen to
anyone who wants to try the same task both ways.

**Criteria:** 2.5.8 Target Size (Minimum) (AA).

Both size and spacing matter. The Barrier targets' centers are 22 CSS px apart because each target
is 20 px wide and the gap is 2 px. The 24 px spacing circles overlap, so the spacing exception does
not apply to that row. WCAG 2.5.8 uses a 24×24 CSS px minimum subject to exceptions. The Fixed design
chooses 44×44 CSS px. Compare shows an equivalent larger control for each option, which is relevant
to the criterion's Equivalent exception. [W3C guidance on Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)

**Extra knowledge — permanent, temporary, situational.** This is the best station to introduce it.
A small target is hard for someone with a tremor or limited fine motor control (**permanent**), for
someone with a broken wrist or a fresh manicure (**temporary**), and for someone on a bus, holding a
baby, in the cold, or walking (**situational**). Every person in your room has been in category
three this week. Accessibility is not a minority accommodation; it is designing for the actual range
of the human body over time.

**Discussion prompt:** "Measure a target in a product you use." DevTools reports the box in seconds.
Students who measure a real product's controls remember this criterion permanently.

---

## 6. Facilitation craft

### The two-run rule

Never show the barrier without immediately showing the fix. A room left sitting in "everything is
broken" produces cynicism, which is useless. The site's intended emotional arc is
**recognition → relief → agency**, and agency only arrives in the second run. If you are short on
time, cut a station, not the fix.

### Narrate before you switch

Say what you are about to do before you do it: "I'm switching to the fixed version now." This is
good practice for a screen reader user in your room, good practice for anyone watching a recording
later, and it doubles as a live demonstration of announcing a change of context — which is Station
05's whole lesson.

### Silence is a technique

The best moments in this material are the ones where you shut up: after the Station 01 timeout,
after the Station 05 focus jump, after the Station 09 identical-buttons line. Count to five in your
head. It will feel far too long to you and about right to them.

### Consent and opt-outs

Before Stations 01, 05, and 07 — the ones with time pressure, unexpected focus movement, or a
constrained overlay — say some version of:

> "This demo can interrupt your task. You can watch, direct me, or try it. Here's how to stop it."

Name the actual behavior and exit before starting. In Station 01, **Reset Barrier** clears the
attempt and stops the timer. In Station 05, **Return to form** or Escape from the interruption
returns to the form. In Station 07, Escape works from inside the promo, and **Reset Barrier**
closes and resets the example.

### Never make frustration the entertainment

There is a real temptation to play the barriers for laughs — the room laughs and it feels like a
win. The project's rules prohibit it, for a reason worth internalising: the barrier is not a
comedy prop, it is somebody's Tuesday afternoon at the bank. Name what the interface did, wait, move
to the fix.

### Handling the "we don't have time for this" objection

You will get it, usually from the most senior person present. Useful responses grounded in this
site:

- Station 09's fix is **one attribute**. Station 10's fix is **a word and a shape**. Station 02's
  fix is **a better sentence**. The expensive part is discovering these after launch, not writing
  them.
- The fixed panels use *fewer* custom mechanisms than the barriers, not more. Native `<dialog>`,
  native radios, native labels. Accessibility work frequently means deleting a clever thing.
- Every fix on this site improves the product for everyone. Nobody preferred the 30-second timer.

### Keep the modes moving

If a session drags, switch audience mode instead of switching station. Reading the Advocate panel
after the Builder panel on the *same* barrier is a genuinely different lesson, costs one click, and
resets the room's attention.

---

## 7. Exercises, assignments, and assessment

### In-class exercises

**1. The keyboard-only round (10 min).** Pick any completed station. Hands off the mouse entirely.
Complete both panels. Rules: report the *first* thing that went wrong, precisely — not "keyboard
issue." This mirrors the repo's own manual keyboard protocol in
`docs/ACCESSIBILITY-TEST-PLAN.md`, which is worth showing them: professional accessibility testing
is a written, repeatable procedure, not vibes.

**2. Mode translation (10 min).** Give pairs a Builder panel. Have them rewrite it as Advocate copy
— under 150 words, zero code, ending in one decision a manager could approve. Then compare with the
site's actual Advocate panel. This is the single highest-value exercise in this guide for anyone who
will ever have to ask for accessibility budget.

**3. Spot the criterion (15 min).** Students open a real site of their choosing, find one barrier,
and identify the criterion by number and exact title from `https://www.w3.org/TR/WCAG22/`. Mark
strictly: an approximated number or invented title is wrong, because that is how a professional
loses credibility in a client meeting.

**4. The greyscale test (5 min).** Screenshot any interface, desaturate it, and see what meaning
disappeared. Fast, visual, and it works on the class's own work.

**5. Write the error message (10 min).** Give students a bad real-world error. Have them rewrite it
to answer all three questions from Station 02. Then have them shorten it by half without losing any
of the three.

### Homework and assignments

**A. Barrier field notes (short).** Find three barriers in software you use this week. For each, in
under 100 words: what the interface does, which criterion applies (number and exact title), and the
smallest fix. Ban the words "user-friendly."

**B. The audit walk (medium).** Run the manual keyboard protocol from
`docs/ACCESSIBILITY-TEST-PLAN.md` against one real page. Produce a defect list with a severity for
each. Then run an automated scanner over the same page and write one paragraph on what the scanner
missed. This assignment teaches the §9 lesson by making students discover it themselves, which beats
being told.

**C. Build the thirteenth station (long, technical).** Using `docs/STATION-AUTHORING.md`, write a
complete station brief for a barrier not covered here — Station 13. Deliverables: the task and its
parity table, one named failure, the safety boundary, verified criteria with applicability reasoning,
and all three audience panels. Implementation optional; the brief is the assessed artefact. Strong
candidates include auto-playing media, an inaccessible data table, a CAPTCHA, a drag-only
interaction (see WCAG 2.2's 2.5.7 Dragging Movements), a form that blocks paste, or an infinite
scroll with no keyboard route to the footer.

### Rubric for written work

| Criterion | Weak | Strong |
|---|---|---|
| Framing | Describes a person's impairment | Describes what the interface does |
| Precision | "Fails WCAG" / approximated number | Exact number, exact title, applicability reasoned |
| Fix quality | Removes the feature | Preserves the function, changes the mechanism |
| Audience fit | One voice for everyone | Right content for the named reader |
| Honesty | Claims full conformance | States what was tested and what was not |

That last row is worth real marks. The single most common professional failure in this field is
overclaiming.

---

## 8. For technical classes: teaching the codebase

Skip this section if your class is non-technical. If it is technical, the repository is a second
curriculum sitting underneath the first one.

### What the stack teaches by omission

Astro 7, static output, **no client framework**, vanilla inline JavaScript, one hand-written
stylesheet, no CMS, no backend, no state library. Twelve interactive stations with timers, dialogs,
menus, live regions, media, and multi-step forms — and no React.

Ask the class why. Then give them the real answer: **every dependency is a thing that can break
accessibility on your behalf.** Native `<button>`, `<label>`, `<dialog>`, `<details>`, and radio
groups start with browser-provided keyboard behaviour and accessibility semantics, which is a much
stronger baseline than recreating them from generic elements. They still require testing in the
project's actual browser and assistive-technology support matrix; native HTML is a foundation, not
universal compatibility evidence.

The architectural principle in `docs/ARCHITECTURE.md` says it in one line: **native HTML first; add
ARIA only when it communicates real state the browser cannot infer.**

### Six code-level insights worth a whole lecture

**1. One DOM instance per panel.** Compare mode shows both panels by toggling `hidden` — it never
duplicates markup. Duplicated markup would mean duplicated `id` attributes, and duplicate IDs break
every `for`, `aria-labelledby`, and `aria-describedby` relationship that points at them. A feature
built naively ("just render both") would have created a new accessibility failure inside an
accessibility teaching tool. Good demonstration that accessibility is an architectural property, not
a CSS layer.

**2. `hidden` versus visually hidden.** Inactive audience panels use the native `hidden` attribute,
so they are absent from layout, focus order, **and the accessibility tree**. The "broken on purpose"
notes use a visually-hidden utility, so they are invisible on screen but *present* for screen
readers. Two different mechanisms for two opposite intentions. Students conflate these constantly,
and `display: none` versus `visibility: hidden` versus off-screen positioning versus `aria-hidden`
is a five-minute tangent that pays off for years.

**3. The inline-script duplication hazard.** Astro renders an `is:inline` script once per render of
its component. Put a global initialiser in a component that renders repeatedly and you get duplicate
event handlers and double-firing controls. The project's answer: the global mode script lives only
in `Base.astro`, `ChangedPanels.astro` carries no script at all, initialisers are idempotent, and
tests fail if a mode button double-handles. Framework-specific, transferable lesson: **know where
your code runs and how many times.**

**4. Radios, not tabs (DEC-006).** The view switch looks like a tab bar and is deliberately not one.
The ARIA tabs pattern maps one tab to one tabpanel; here, "Compare" controls *two existing panels*
at once. Rather than bend the pattern, the project used a labelled `fieldset` of native radio
buttons with `aria-controls`. Lesson: **when a well-known ARIA pattern doesn't fit your semantics,
using it anyway is worse than choosing a simpler native control that describes what is actually
happening.** Read DEC-006 in `docs/DECISIONS.md` with the class; watching a team reject a
fashionable pattern with a written rationale is unusually instructive.

**5. Timers that clean up.** Station 01's countdown **pauses when its panel is hidden** and resumes
when revealed; every reset cancels timers and pending callbacks; one interval handle owns the
countdown so it cannot multiply. That is ordinary good engineering, and it is also a safety
requirement here — a leaked timer from a *barrier* panel would be a genuine barrier. Point out that
"clean up your side effects" and "don't harm your user" are the same sentence in this codebase.

**6. Reset is not `location.reload()`.** The architecture forbids it explicitly. A reload would also
wipe the comparison context and audience mode — and, more subtly, would **hide cleanup bugs** by
nuking everything. Writing a real reset forces the state machine to be correct. Excellent lesson
about tests and shortcuts that conceal defects.

### The test suite as curriculum

```sh
npm run check             # Astro and TypeScript checks
npm run verify:content    # collection invariants and source/content boundaries
npm run build             # static output in dist/
npm run verify:build      # route, panel, media, notice, and declared subresource checks
npm run test:functional   # rendered behavior, focus, reset, geometry
npm run test:a11y         # axe, exact barrier ledger, representative dynamic fixed states
npm run gate              # the complete deterministic local gate
```

Three things here are worth teaching directly:

**The intentional-failure ledger.** `tests/fixtures/intentional-failures.js` is the most interesting
file in the repository. The site must ship deliberate accessibility failures while still failing its
build on *accidental* ones. The naive solution is to disable rules on those pages. This project
instead records each intended failure individually — ID, station, exact selector, criterion, expected
tool rule (or `null`), why it is required, its safety boundary, how the fixed panel resolves it, an
owner, a review date, and an expiry condition. **Any axe finding not in that list fails the suite.**

Have the class contrast that with a blanket suppression. The ledger is narrow, attributed, and
expiring; a suppression is broad, anonymous, and permanent. This is a pattern they can carry to
linting, security scanning, and test skipping for the rest of their careers.

**Playwright measures geometry.** Station 12's test asserts the barrier renders at 20×20 with a
2-pixel gap and the fix at 44×44. Not "the class is applied" — the actual rendered box. Testing the
outcome rather than the implementation is a lesson that transfers everywhere.

**Tests run against `dist/`, not the dev server.** The browser suites build first and test the
production artefact. Dev servers lie: different asset handling, different sourcemaps, different
behaviour. Verify what ships.

### Reading order for a code walkthrough

1. `src/data/stations.js` — the whole collection as data, including verified criterion records with
   `titleVerifiedOn` and `applicability` as *separate fields*. Ask why those are separate; the answer
   is §9.
2. `src/layouts/Base.astro` — skip link, landmarks, mode controller, the single global script.
3. `src/components/StationFrame.astro` — the seven-section frame all twelve stations share.
4. `src/components/stations/Station01.astro` — the reference lesson: barrier state machine, fixed
   state machine, `role="alert"` without focus movement, per-panel reset.
5. `tests/fixtures/intentional-failures.js` — the ledger.
6. `docs/DECISIONS.md` — DEC-006, DEC-009, and DEC-010 for how hard trade-offs got written down.

### A note about Station 01's comments

The barrier markup carries comments like `<!-- Intentionally NO associated label per ATK-EX-01-001 -->`.
Every deliberate defect is traceable from the code to the ledger to the station brief. Ask your class
how the next maintainer would otherwise know that a missing label was a decision rather than a bug.
This is what "self-documenting code" actually means, as opposed to what it usually means.

---

## 9. Extra knowledge worth handing your class

These are the pieces that make students sound like they know the field. Deploy them where they fit;
several are already anchored to a station above.

### What A, AA, and AAA actually mean

The levels describe cumulative conformance. Level A covers the applicable Level A criteria. Level AA
adds AA, and Level AAA adds AAA. WCAG advises against making AAA the general policy for entire sites
because some content cannot satisfy every AAA criterion. A defect's impact depends on what it prevents
people from doing. A law, policy, or contract may name its own version, level, and scope.
[WCAG 2.2 conformance requirements](https://www.w3.org/TR/WCAG22/#conformance-reqs)

Station 03 shows how a readable alternative makes a return policy usable. Station 05 shows how
waiting for a request preserves someone's place in a task. Both are useful patterns from Level AAA.

### "Confirmed" versus "conditional" applicability

Look at `src/data/stations.js`: every criterion record carries `applicability: 'confirmed'` or
`'conditional'`. The notes identify the relevant exception, applicability limit, or safe approximation.

This encodes a professional habit worth transplanting: **verifying that a criterion's title is
correct and verifying that the criterion actually applies to this situation are two separate acts of
review.** Quoting a real criterion that does not apply to the case in front of you is one of the
fastest ways to lose a technical argument, and it is extremely common. The repo records
`titleVerifiedOn` for the title check. The [release evidence](evidence/README.md) records observed
behavior separately.

### The limits of automated testing — with evidence

Use the Station 09 example (§5): **thirteen ledger entries, one with an expected configured axe
finding.** Automated tools reliably catch a narrow class of machine-checkable
defects — missing alt attributes, missing accessible names, colour contrast on plain text, some ARIA
misuse, duplicate IDs, form fields with no label. They cannot judge:

- whether alt text is *correct* (they cannot see the image's purpose);
- whether an error message is *actionable*;
- whether reading level suits the audience;
- whether focus order is *logical*;
- whether captions are *accurate*;
- whether a colour distinction is *meaningful*;
- whether the whole task is completable by a real person.

Every one of those is a barrier on this site. Correct professional framing: automated testing is a
fast, cheap first pass that catches regressions and frees humans for the judgement work. It is a
smoke alarm, not a fire inspection.

### POUR

WCAG's four principles, worth memorising because they organise everything else:

- **Perceivable** — can they sense it? (Stations 09, 10, 11)
- **Operable** — can they use it? (Stations 04, 05, 07, 08, 12)
- **Understandable** — can they comprehend it? (Stations 01, 02, 03, 06)
- **Robust** — does it work with their technology? (Station 09; every native-HTML choice in the code)

Map the twelve stations onto POUR as a five-minute closing exercise. It shows the collection is a
curriculum rather than a list.

### Permanent, temporary, situational

Introduced at Station 12, applies everywhere. A person may be permanently, temporarily, or
situationally limited, and the interface cannot tell the difference — which is precisely why
designing for the range is not charity. It also defuses the "how many users does this really affect"
question without needing a statistic.

### The curb-cut effect

Kerb cuts were fought for by disabled activists and are now used overwhelmingly by people with
strollers, luggage, bicycles, delivery trolleys, and tired legs. The same pattern recurs in software:
captions are used heavily by hearing people in loud or silent environments, voice control went
mainstream, and dark mode began as a low-vision accommodation.

**The essential nuance, which most tellings omit:** the curb-cut effect is an argument for *why
everyone benefits*, not a reason accessibility needed a business case in the first place. Disabled
people's access is sufficient justification on its own. Teach both halves; a student who only learns
the business case will drop accessibility the moment the business case gets inconvenient.

### Assistive technology is not just screen readers

Screen readers dominate the conversation and represent a minority of assistive technology use.
Also in scope: screen magnification, browser zoom (by far the most widespread), voice control,
switch devices, eye tracking, alternative keyboards and pointing devices, high-contrast and forced-
colors modes, reading and focus tools, captions, and the accessibility settings built into every
operating system your students already own.

Practical action item: have them open the accessibility settings on their own phone right now. Most
have never looked.

### Nothing about us without us

If your class takes one professional principle from the session, make it this: **testing with
disabled people is not optional, and no amount of tooling, guideline knowledge, or good intention
replaces it.** This site is a teaching artefact, not a substitute for user research. Its own
documentation says as much — the manual support matrix and assistive-technology checks remain
outstanding, and every station brief still reads `AUDITING` rather than "done."

### Honest claims, and how this project models them

The site makes **no blanket WCAG conformance claim** (DEC-007), because it deliberately contains
broken examples and WCAG evaluates whole pages. The README is explicit that the rail's "Ready to
try" state means a route exists and passes automated checks — **not** that manual review or
publication readiness is complete.

Show your class that paragraph. Then ask them how many product pages they have seen claiming "fully
WCAG 2.1 AA compliant" on the basis of one scanner run. The professional habit being modelled is:
**state what you tested, state what you did not, and never let a green check mark do your talking.**

---

## 10. Things that go wrong live, and what to do

| Problem | What to do |
|---|---|
| The Station 01 timer expires before you finish explaining | Point to the termination message and explain what cleared. Use **Reset Barrier** to start over. |
| A student's panel is in a weird state | Reset that panel. It restores the documented start without touching the other panel, the view, or the mode. |
| The Station 07 overlay is still open | Press Escape while focus is inside it, use **Reset Barrier**, or switch to **Try the fix**. |
| The audience preference resets on navigation | If browser storage is blocked, choose the mode again on the current page. If the page shows a message about JavaScript, use the written lesson or check that scripts can run. |
| The Station 11 video won't play | Check the projector's audio route and that the host serves the complete build. Use the Fixed transcript to continue. |
| A student calls it a simulator | Correct it immediately and briefly, every time. Letting it slide once means it is in their notes. |
| Someone asks a WCAG question you can't answer | "I'll check the actual text rather than guess." Then open `https://www.w3.org/TR/WCAG22/` and read it with them. Modelling that beats knowing the answer. |
| The room derails into "compliance vs. real accessibility" | Let it run three minutes; it's a good argument. Land it with: compliance is the floor, people are the point, and this site demonstrates barriers that pass automated compliance checks. |
| Fonts look wrong | Confirm the host received the built `_astro` assets. The font files ship with the site; if an asset is missing, the system fallback stack takes over. |

---

## 11. Glossary

Terms your class will hear from you and then encounter in the wild.

- **Accessibility tree** — the structure browsers expose to assistive technology, derived from the
  DOM. What a screen reader "sees." Station 09 is entirely about it.
- **Accessible name** — the label computed for a control (visible text, `aria-label`,
  `aria-labelledby`, `<label>`). Missing names are the most common machine-detectable defect.
- **ARIA** — attributes that add semantics HTML can't express. First rule: don't use it if native
  HTML can do the job.
- **Assistive technology (AT)** — anything a person uses to interact with a device: screen readers,
  magnifiers, voice control, switches, alternative input.
- **Barrier** — something the *interface* does that prevents or impedes a task. This project's
  preferred word, always.
- **Focus** — where keyboard input goes. **Focus visible** means you can see it; **focus order**
  means it follows a logical sequence; **focus trap** means you can't get out.
- **Forced colors** — an OS-level mode (notably Windows High Contrast) that overrides page colours.
  Colour-only meaning vanishes in it.
- **Live region** — a region whose changes can be announced by assistive technology. `polite` asks
  for an announcement at a suitable opportunity. Reserve `assertive` and `role="alert"` for urgent
  updates, and verify what the tools in use actually announce.
- **Reflow** — content adapting to narrow viewports or high zoom without two-dimensional scrolling.
- **Skip link** — the first thing in tab order, letting keyboard users jump past repeated
  navigation. Every page here has one.
- **Success criterion** — a single numbered, testable WCAG requirement (e.g. 2.5.8 Target Size
  (Minimum)). Always cite number *and* exact title.
- **Target size** — the clickable/tappable area of a control. Bigger than the icon inside it, if
  you've done it right.
- **WCAG** — Web Content Accessibility Guidelines. This project uses version 2.2 and cites
  `https://www.w3.org/TR/WCAG22/` throughout.

---

## 12. Quick reference card

Print this page or keep it on a second screen.

### Answer key — every station's task, data, and success

| # | Route | Task | Data you need | Success |
|---|---|---|---|---|
| 01 | `cancellation-form` | Cancel the membership | Member `482731`, reason "Moving away" | "Membership canceled." |
| 02 | `error-message` | Update the rejected payment | Billing ZIP `60614` | "Payment details updated." |
| 03 | `reading-wall` | Start a return | Order `ATK-302`, delivered 12 days ago, unopened and unused in original packaging | Online return starts within 30 days of delivery |
| 04 | `disappearing-menu` | Reach Settings | — | "Settings opened." |
| 05 | `interruption` | Book a fictional appointment | Sample scenario shown on the page | Appointment confirmed |
| 06 | `memory-tax` | Confirm a $25 transfer | Code `734219`, to Jordan Kim | Transfer confirmed |
| 07 | `keyboard-trap` | Open and close the promo | — | Overlay closes, focus returns |
| 08 | `invisible-focus` | Buy the Balcony ticket | Replay starts on Standard; Balcony is next | Balcony ticket confirmed |
| 09 | `unlabelled-icon` | Delete `Notes.txt` | — | Item removed; Fixed button exposes `Delete Notes.txt` |
| 10 | `color-only-status` | Find the failed order | `ATK-510`, `ATK-511`, `ATK-512` | **`ATK-511`** |
| 11 | `caption-gap` | Find the final instruction | — | "The final step is Press Done." |
| 12 | `target-too-small` | Choose option B | Options A, B, C | "Selected option B." |

### Criteria at a glance

| # | Criteria |
|---|---|
| 01 | 2.2.1 A · 2.2.2 A · 3.3.1 A · 3.3.2 A · 3.3.3 AA · 3.3.4 AA* · 3.3.7 A |
| 02 | 3.3.1 A · 3.3.3 AA |
| 03 | 3.1.5 AAA |
| 04 | 1.4.13 AA · 2.1.1 A* |
| 05 | 2.4.3 A · 3.2.2 A · 3.2.5 AAA · 4.1.3 AA |
| 06 | 3.3.7 A |
| 07 | 2.1.2 A* |
| 08 | 2.4.7 AA* |
| 09 | 1.1.1 A · 4.1.2 A |
| 10 | 1.4.1 A |
| 11 | 1.2.2 A · 1.2.3 A* |
| 12 | 2.5.8 AA |

`*` = applicability recorded as **conditional** in `src/data/stations.js`; see §9.

### Five sentences to have ready

1. "This judges the interface, never the person — it is not a simulator."
2. "You can watch or try it. I'll point out how to exit this station before we start."
3. "Same task, same data, one difference. That's the whole design."
4. "The project's axe ledger expects one finding. The other lessons have structural or manual checks."
5. "The fix isn't more code. It's usually less."

### Pre-flight checklist

- [ ] `npm run dev` running, home rail loaded
- [ ] Audience mode set for the room (Presenter for you, Advocate for stakeholders)
- [ ] Browser zoom set for the back row
- [ ] Answer key open on a second screen
- [ ] Opt-out sentence rehearsed for Stations 01, 05, 07
- [ ] Sound routed and tested if Station 11 is in the plan
- [ ] The framing rule is the first thing out of your mouth

---

## Where to go next

| Document | What it gives a teacher |
|---|---|
| [`docs/PRODUCTION-BIBLE.md`](PRODUCTION-BIBLE.md) | The voice profiles and craft rules — read the Presenter contract before presenting |
| [`docs/stations/`](stations/) | Per-station briefs: exact states, safety boundaries, criterion rationale |
| [`docs/ACCESSIBILITY-TEST-PLAN.md`](ACCESSIBILITY-TEST-PLAN.md) | Manual keyboard, zoom, reduced-motion, and AT protocols — usable as lab worksheets |
| [`docs/DECISIONS.md`](DECISIONS.md) | Why the hard trade-offs went the way they did (DEC-006, 009, 010 especially) |
| [`docs/ARCHITECTURE.md`](ARCHITECTURE.md) | The technical lecture in §8, in full |
| [`docs/STATION-AUTHORING.md`](STATION-AUTHORING.md) | The brief format for the "build Station 13" assignment |
| [`specs/PROJECT.md`](../specs/PROJECT.md) | Requirements, acceptance criteria, and the review checklist |
| `https://www.w3.org/TR/WCAG22/` | The normative source. Read it with students rather than guessing. |
