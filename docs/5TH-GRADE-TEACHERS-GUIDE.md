# A11y Test Kitchen — 5th Grade Teacher's Guide

Status: Companion document; no authority over requirements
Owner: Ryan
Last updated: 2026-11-12
Audience: Elementary teachers (grade 5, ages 10–11) — classroom, library, tech lab, or enrichment
Companion: [`docs/TEACHERS-GUIDE.md`](TEACHERS-GUIDE.md) is the adult/professional version
Review boundary: Final disabled-educator and classroom-safety review remains required before classroom use

This guide adapts A11y Test Kitchen for a fifth-grade classroom. It gives you what to say, which
stations to use, what to skip, how long each piece takes, how to handle the hard moments, and the
background knowledge you need so that a ten-year-old's follow-up question doesn't catch you flat.

You do not need to know how to code. You do not need to know accessibility. Everything you need is
in this document.

---

## Contents

1. [Start here: the one rule, and why it matters more with kids](#1-start-here-the-one-rule-and-why-it-matters-more-with-kids)
2. [The five big ideas a fifth grader can actually keep](#2-the-five-big-ideas-a-fifth-grader-can-actually-keep)
3. [Setup and classroom logistics](#3-setup-and-classroom-logistics)
4. [Which stations to use, and which to skip](#4-which-stations-to-use-and-which-to-skip)
5. [Lesson plans](#5-lesson-plans)
6. [Station-by-station notes for fifth grade](#6-station-by-station-notes-for-fifth-grade)
7. [Unplugged activities (no devices needed)](#7-unplugged-activities-no-devices-needed)
8. [Words, scripts, and how to handle what kids say](#8-words-scripts-and-how-to-handle-what-kids-say)
9. [Students with disabilities in your room](#9-students-with-disabilities-in-your-room)
10. [Differentiation](#10-differentiation)
11. [Assessment](#11-assessment)
12. [Standards alignment](#12-standards-alignment)
13. [Questions fifth graders ask, and honest answers](#13-questions-fifth-graders-ask-and-honest-answers)
14. [Troubleshooting during class](#14-troubleshooting-during-class)
15. [Family letter you can send home](#15-family-letter-you-can-send-home)
16. [Quick reference card](#16-quick-reference-card)

---

## 1. Start here: the one rule, and why it matters more with kids

### The rule

**This is not a disability simulator. Never call it one. Never run one alongside it.**

That means:

- ❌ No blindfolds.
- ❌ No earplugs or noise-cancelling "deaf for a day."
- ❌ No taping fingers together, no oven mitts, no wheelchair relay races.
- ❌ No "close your eyes and imagine you're blind."

✅ Instead: everybody does the **same ordinary task twice** — once on a website that's broken on
purpose, once on a website that's built well — and compares **the two websites**.

### Why this matters more in elementary school than anywhere else

Disability simulations are common in schools and can feel meaningful, but they can cause harm when
they teach sudden incompetence or pity instead of access. Here's the reason, and it's worth
understanding rather than just following:

When a ten-year-old wears a blindfold for ten minutes, they experience being **suddenly bad at
something they're normally good at**. That's terrifying and clumsy. So the takeaway they carry out
of the room is *"being blind must be awful and scary."* That's pity, and pity is the raw material
for a lot of unkind behavior later.

What a blind ten-year-old in that same classroom actually experiences is **being expert at something
their classmates are pretending at** — and then watching those classmates conclude their life is a
tragedy. Disabled adults have been asking schools to stop doing this for decades.

This site sidesteps the whole problem. Nobody pretends to be anybody. The thing being judged is the
**website**, and every kid in the room — disabled or not — is on the same side of the table,
judging it together.

### The sentence to say on day one

Write it on the board. Say it more than once. Come back to it every single session:

> **"If something is really hard to use, that's usually the design's fault — not your fault."**

For a fifth grader this is a genuinely powerful idea, and it's the whole thesis of the project. It
also does quiet good for the kids in your room who spend a lot of their day feeling like *they're*
the problem — students with dyslexia, ADHD, anxiety, a hearing aid, a processing difference, or
just a bad week. You are handing them a frame in which difficulty is information about the world
rather than a verdict on them.

### What to say instead of what you might reach for

| Say this | Not this |
|---|---|
| "This website is broken on purpose." | "This shows what being disabled is like." |
| "Who does this website leave out?" | "Feel bad for people who can't use this." |
| "The design forgot about some people." | "This is what it's like to be blind/deaf." |
| "Let's find out what the designer missed." | "Imagine if you couldn't see." |
| "That's the design's fault." | "You're doing it wrong, try again." |

---

## 2. The five big ideas a fifth grader can actually keep

Don't try to teach accessibility. Teach these five, and accessibility is what they'll have learned.

**Big Idea 1 — Somebody made this.**
Every button, every color, every screen was *chosen by a person*. Websites and apps don't grow. They
get built, on purpose, by people who made decisions. Ten-year-olds mostly experience technology as
weather — it just *is*. Realizing there's a designer behind it is the door everything else walks
through.

**Big Idea 2 — Designers forget people.**
Not because they're mean. Because they design for someone like themselves and don't check. Most
barriers in this project came from a designer solving a real problem without asking "who does this
leave out?"

**Big Idea 3 — If it's hard to use, that's the design's fault.**
The board sentence. Repeat it constantly.

**Big Idea 4 — Fixing it for one person usually helps everybody.**
The curb cut idea (§7, Activity 1). Ramps got built for wheelchair users and are now used by
strollers, scooters, delivery carts, and anyone dragging a suitcase. Captions were built for deaf
viewers and now most kids watch with them on by choice.

**Big Idea 5 — You can check.**
By the end of the unit they should be able to look at *any* app and ask four questions:
Can I see it? Can I use it? Can I understand it? Does it work with my stuff?
(That's POUR, in fifth-grade language. Don't teach them the acronym. Teach them the four questions.)

---

## 3. Setup and classroom logistics

### Getting the site running

If your school already serves the exhibit, open **Teaching guide** from the home page. For a teacher's
own computer, ask your tech coordinator to install the Node version in `.nvmrc` and run:

```sh
npm ci
npm run dev
```

Open the local address printed in the terminal. Installing the dependencies needs access to the npm
registry or a populated package cache.

**For a whole class on Chromebooks or shared devices**, ask your tech person to run `npm run build`
and serve the contents of `dist/` at the root of a school HTTP(S) site. Give students that site's
address. The pages use root-relative paths, so open them through the server rather than from a
subfolder or by double-clicking a file. Fonts and video ship with the site. Students need access
to the server, and the station activities can run without a connection to the public internet.

### What you can promise your principal, your tech director, and parents

- **The exhibit has no accounts and asks for sample information only.** Use the fictional values
  shown on the page. Ask your tech coordinator what the school server logs about page visits.
- **No analytics, no tracking, no cookies, no advertising.**
- **No AI features.**
- **Every form is a local exercise.** The names, order numbers, and dollar amounts are invented.
  The exhibit handles demo answers in the page and stores only the audience preference.
- **Nothing is purchased.** Station 06 says "$25 transfer" and Station 08 says "buy a ticket" — no
  money exists, no money moves.
- **Assets come from the school server.** The fonts, captions, and video are bundled. Optional
  standards links open external sites when a visitor follows them.

### Room setup

- **Whole-class demo (projector):** you drive, kids call out what they notice. Best for the first
  session and for the harder stations.
- **Pairs at one device:** offer driver and observer roles. Let students choose a role, swap by
  agreement, or watch the teacher. Keep their usual input methods and assistive technology available.
- **1:1 devices:** works, but you'll lose the talk. If you go 1:1, require a partner to compare
  notes with after each station.

### Projector check before class

Try **150–200%** zoom and check the actual view from the back row. Preview the lesson at that zoom
and scroll to each control you'll need. Point out how zoom helps people read the same page.

### One setting to change before kids touch it

At the top of the site there are three buttons: **Advocate**, **Builder**, **Presenter**.

**Set it to Advocate and leave it there.**

Advocate mode explains each lesson in plain language with **zero code**. Builder mode is written for
professional programmers and will lose your class instantly. Presenter mode is a script for adults
running a demo — useful for *you* to read beforehand, not for kids.

The setting sticks across pages, so you set it once. If a device somehow shows code, the mode got
switched — click **Advocate** again.

### Timing reality check

| Format | What fits |
|---|---|
| 20 minutes | One station, projector, whole class |
| 45 minutes (one period) | Intro + two stations + exit ticket |
| 45 minutes with pairs on devices | Intro + three stations, if you're brisk |
| Five 45-minute periods | The full unit in §5, with a project |

Budget **8–12 minutes per station** with fifth graders. That's roughly: try the broken one (3 min),
react and discuss (3 min), try the fixed one (2 min), name what changed (3 min).

---

## 4. Which stations to use, and which to skip

The site has twelve stations. They were written for adults. Some translate to fifth grade beautifully,
some need a framing sentence from you, and three are honestly not worth your class time.

### Tier 1 — Start here. Works with any fifth-grade class, no setup.

| # | Station | Why it lands with ten-year-olds |
|---|---|---|
| **09** | The unlabelled icon | Two buttons look *identical*; one is unusable. Instant "whoa." |
| **12** | The target too small | Many kids have struggled to tap a tiny button. Immediate recognition. |
| **10** | The color-only status | Connects to color blindness, which fascinates them. |
| **06** | The memory tax | Makes the interface's unnecessary memory demand easy to see. |
| **11** | The caption gap | They already use captions. They have opinions. |

### Tier 2 — Great, with one sentence of setup from you.

| # | Station | The setup sentence you provide |
|---|---|---|
| **04** | The disappearing menu | "Watch the menu run away from me." |
| **03** | The reading wall | "Same rules, written two ways. Which one can you actually use?" |
| **02** | The error message | "It's like getting a paper back that just says WRONG." |
| **01** | The cancellation form | Teacher-led only. "This example uses a timer that clears my sample answers. You can watch or take a break." Read §6 first. |
| **07** | The keyboard trap | Needs keyboard skills first. Teach Tab and Esc before you start. |

### Tier 3 — Teacher demo only, or skip.

| # | Station | Why |
|---|---|---|
| **05** | The interruption | The idea (focus getting stolen) is abstract for this age. Demo it in 90 seconds if you want it; don't assign it. |
| **08** | The invisible focus | Requires understanding what "focus" is. Save for middle school. |

Station 02 uses a billing ZIP code and Station 01 uses a membership cancellation — adult contexts.
The §6 notes give you a kid-sized reframe for each.

### Renaming stations for your board

The site's titles are fine but a little dry. If you want them to stick, put these on the board
instead. Use the site's real names when navigating so kids can find them.

| Site name | Board name |
|---|---|
| The unlabelled icon | The Mystery Button |
| The target too small | The Impossible Tap |
| The color-only status | The Color Trap |
| The memory tax | The Vanishing Code |
| The caption gap | The Silent Video |
| The disappearing menu | The Runaway Menu |
| The reading wall | The Wall of Words |
| The error message | The Unhelpful "WRONG" |
| The cancellation form | The Work Eater |
| The keyboard trap | The Room With No Door |

---

## 5. Lesson plans

### Option A — Single 45-minute period (if this is all you get)

| Time | What happens |
|---|---|
| 0–7 | The one rule. The board sentence. "Somebody made this." |
| 7–17 | **Station 09 — The Mystery Button**, on the projector. Show both buttons. Let them react. |
| 17–30 | **Station 12 — The Impossible Tap**, in pairs or projected. Kids try it. |
| 30–40 | Discussion: "Where have YOU seen a button too small or a mystery button?" Collect on the board. |
| 40–45 | Exit ticket (§11): one sentence — "A design that forgot somebody is ______." |

### Option B — Five-day unit (recommended)

**Day 1 — Somebody made this** *(no devices needed for the first half)*

| Time | What happens |
|---|---|
| 0–10 | Unplugged: The Door Problem (§7, Activity 2) |
| 10–15 | The one rule. Why no blindfolds. Board sentence. |
| 15–20 | Introduce: "broken on purpose," "barrier," "the fix." |
| 20–35 | **Station 09** on the projector, whole class |
| 35–45 | Notebook: draw the two buttons. Label what's different. (Nothing visible is. That's the point.) |

**Day 2 — Can I see it? Can I tap it?**

| Time | What happens |
|---|---|
| 0–5 | Recall Day 1. Board sentence again. |
| 5–20 | **Station 12 — The Impossible Tap**, pairs |
| 20–35 | **Station 10 — The Color Trap**, pairs |
| 35–45 | Class chart: "Ways a design can leave someone out." Start it; you'll add to it all week. |

**Day 3 — Can I understand it?**

| Time | What happens |
|---|---|
| 0–5 | Add to the chart |
| 5–20 | **Station 06 — The Vanishing Code**, pairs. Play it as a challenge. |
| 20–35 | **Station 03 — The Wall of Words**, pairs. Strong ELA tie-in. |
| 35–45 | Writing: rewrite one confusing rule from your school in plain language (§7, Activity 5) |

**Day 4 — Does it work with my stuff?**

| Time | What happens |
|---|---|
| 0–5 | Add to the chart |
| 5–15 | Teach Tab, Shift+Tab, Enter, Space, Esc. Practice on any website. |
| 15–30 | **Optional keyboard inspection** (§7, Activity 3) on a Tier 1 station they already know |
| 30–40 | **Station 11 — The Silent Video**, whole class |
| 40–45 | Discussion: who uses captions? (Almost everyone, it turns out.) |

**Day 5 — Now you're the designer**

| Time | What happens |
|---|---|
| 0–10 | The curb cut story (§7, Activity 1) |
| 10–35 | **Design Challenge** (§11): fix something in your school or a favorite app |
| 35–45 | Share out. Post the results in the hall. |

### Option C — 20-minute assembly, library slot, or family night

Station **09**, then Station **12**, then the board sentence. That's it. Two stations, five minutes
of talk. Don't try to fit a third; the two-button reveal needs room to breathe.

---

## 6. Station-by-station notes for fifth grade

Each entry gives you: the kid-sized setup, exactly what to do, the answer key, the moment to stop
talking, and the discussion question that works.

**Everything on this site is fake.** Say that up front once and you won't have to field it later.

---

### ⭐ Station 09 — "The Mystery Button"
Real name: *The unlabelled icon* · `/stations/unlabelled-icon/`

**The task:** Delete a fake file called `Notes.txt`.

**Your setup sentence:**
> "I'm going to show you two buttons that look the same. One gives a screen reader the words
> for what the button does. Let's find out what the other button is missing."

**What to do:** Show the broken version — a trash can icon, nothing else. Click it; the file
deletes. Then show the fixed version. It looks **identical**. Ask: "What's different?"

Let them guess. They can't get it, because nothing visible changed.

**Then reveal it:** both buttons show a trash can. The Fixed button has the accessible name
**Delete Notes.txt**. The Barrier button has an empty name. Show those two values in the
browser's accessibility inspector, or read them aloud. If you use a screen reader to demonstrate
the difference, describe what your setup actually says.

**Pause here.** Ask what words would tell someone what the button does and which file it acts on.

**Kid-sized explanation of a screen reader:** software that can speak what's on a screen or send
it to a braille display. A button's accessible name gives it words to share, even when the
button shows a picture.

**The powerful comparison:** it's like a classroom where every door is labeled — Library, Gym,
Nurse — except one, which is just a blank door. If you already know the building you're fine. If you
don't, you need another way to tell which room it is.

**Discussion question:** "Where in this school is there a door, button, or sign with no words on it?"
They will find real ones. Take a walk if you have time.

---

### ⭐ Station 12 — "The Impossible Tap"
Real name: *The target too small* · `/stations/target-too-small/`

**The task:** Choose option **B**. **Answer:** "Selected option B."

**Your setup sentence:**
> "Everybody who has ever tapped the wrong thing on a phone, raise your hand."

Every hand goes up. That's your hook.

**What to do:** Show the Barrier on its own, then switch to Fixed and try the same task. The Barrier
buttons are 20 CSS pixels wide with 2 pixels between them. The Fixed buttons are 44 CSS pixels wide
with 8 pixels between them. Offer a touchscreen to students who want to try.

**Math you can draw on the board:** From the middle of one Barrier button to the middle of the next
is 22 pixels. Draw a 24-pixel circle centered on each button, using the same scale for both. The
circles overlap. A slightly misplaced tap has little room before it reaches another button. Ask
what might happen if the neighboring button were **Delete** or **Send**.

**Permanent, temporary, situational — teach it here.** This is the best station for the single most
useful idea in the whole unit:

> Tiny buttons can be hard for someone with a tremor. (**Permanent**)
> Tiny buttons can be hard for someone with a broken wrist or a cast for six weeks. (**Temporary**)
> Tiny buttons can be hard on a bumpy bus, in gloves, while holding a dog's leash, or while walking.
> (**Situational**)

Then: "Raise your hand if you've been in that third group this week." Every hand. **Designing for
disabled people is designing for everybody, eventually, including you.**

**Discussion question:** "What's the smallest button on an app you use? What's next to it?"

---

### ⭐ Station 10 — "The Color Trap"
Real name: *The color-only status* · `/stations/color-only-status/`

**The task:** Find the one order that failed. **The orders are `ATK-510`, `ATK-511`, `ATK-512`.
The answer is `ATK-511`.**

**Your setup sentence:**
> "One of these three deliveries went wrong. The website is going to tell you which one — but only
> with a color."

**What to do:** Show the broken version. Each row has a colored dot and nothing else. Then — and
this is the demo that lands — **take a screenshot and turn it black and white.** (Any photo app can.
Or use a browser extension. Or, low-tech and just as effective: print it on a black-and-white
printer.) The rows become identical. The information is *gone*.

Then show the fix: same colors, **plus** the word `Complete` or `Failed`, **plus** a shape — a
circle or a diamond. Three signals instead of one.

**The trap most classes fall into:** kids will say "just add a key that says purple = failed." Ask
them to try using it. They have to hold the color code in their head and re-check every row against
it. And it *still* disappears in black and white. **The answer has to be in the row, in words.**

**Color blindness, taught correctly:** color-vision differences are common, vary by type and
population, and often make red and green difficult to distinguish as a pair. Assume somebody in the
room may be affected without turning a population estimate into a classroom diagnosis.

⚠️ **Do not ask who in the room is color blind, and do not run a "test."** A kid finding out in
front of 29 classmates is a bad day you caused. State the general point and move on.

**Point out the site itself:** look at the top of any station page. This site uses **plum** and
**slate blue**, not red and green — and always adds a *word* and a *shape*. A website about
accessibility that used red and green for its most important signal would be failing its own lesson
on its own homepage. Kids love catching adults being consistent.

**Discussion question:** "Where does color alone mean something at our school?" Behavior charts,
color-coded folders, red pen, the traffic light on the reading app — they'll find plenty.

---

### ⭐ Station 06 — "The Vanishing Code"
Real name: *The memory tax* · `/stations/memory-tax/`

**The task:** Confirm a fake $25 transfer. **The code is `734219`.**

**Your setup sentence:**
> "This website removes information it still expects us to use. Watch what the interface does."

**What to do:** Show the code on screen. Click Continue — **the code vanishes** and the next screen
asks you to type it in.

Now the important part: ask what information disappeared and whether the website still had access to
it. Do not prevent note-taking, test who remembered, or count successful entries. Students may try
the field or simply observe. The interface's unnecessary demand is the data.

**The lesson, in fifth-grade words:** the website **had the code the whole time**. It chose to make
a person remember it instead. That's not a mistake — it's the website asking a human to do its job.

**The science, in careful fifth-grade language:** working memory can hold only a small amount at once,
and the amount depends on how information is grouped and what else is happening. It becomes less
reliable when you're tired, stressed, rushed, interrupted, or nervous — exactly when interfaces often
ask people to remember a code.

Then the connection they won't expect: **this is why a good teacher writes the instructions on the
board instead of only saying them.** Same principle. Same reason.

**The fix:** the code stays visible next to the box, and there's a button that fills it in for you.
Ask: "Did the fixed one make it easier to cheat?" No — the code was *given to you*. It was never a
secret. It was a memory tax.

**Discussion question:** "When does school ask you to remember something it could just show you?"
Prepare for excellent, uncomfortable answers. This is a good thing.

---

### ⭐ Station 11 — "The Silent Video"
Real name: *The caption gap* · `/stations/caption-gap/`

**The task:** Find the last instruction in the video. **The answer is "The final step is Press Done."**

**Your setup sentence:**
> "I'm going to play a video with the sound off. Notice which information the interface leaves out."

**What to do:** Play the broken version **muted**. There are no captions, so the spoken instructions
are unavailable in this viewing context. Ask what the interface failed to provide in another form,
then play the fixed version — same 9-second video, now with captions on screen and a full written
transcript next to it.

**Poll the room first:** "Who watches videos with the captions turned on, even when you can hear
fine?" In most fifth-grade classes, most hands go up. Kids are often surprised that this is
*accessibility* — they think it's just a preference. It's both, and that's the curb cut effect
happening live in their own lives.

**Two different things, and kids can absolutely hold this distinction:**

- **Captions** = the words appear *on the video, at the right moment*. For watching.
- **A transcript** = the whole thing written out as text, next to the video. For reading, skimming,
  searching, or if you can't play video at all.

Use both here. Find the final instruction first with captions and the sound off, then try reading
the transcript without playing the video. Ask whether both give you the same answer.

**The honest bit about auto-captions — worth teaching:** YouTube's automatic captions are a starting
point, not a finish line. They mangle names, they miss punctuation, they don't say who's speaking,
and they fall apart with accents, background noise, or unusual words. Deaf viewers have a name for
bad automatic captions: **"craptions."** (Yes, you can say that to fifth graders. They'll remember
it forever, and it's the actual term.)

**Show them the project holding itself to it:** this site made its own video and wrote its own
captions by hand, and its notes still say a human accuracy review is *not finished yet*. Grown-up
projects that admit what they haven't finished are rarer than they should be. Point at it.

**Discussion question:** "When do you use captions? When would you *need* them?" Loud bus, quiet
classroom, sleeping sibling, unfamiliar accent, complicated word, learning to read, learning
English — the list they build is the point.

---

### Station 04 — "The Runaway Menu"
Real name: *The disappearing menu* · `/stations/disappearing-menu/`

**The task:** Open the account menu and get to Settings.

**Your setup sentence:**
> "Watch the menu run away from me."

**What to do:** Hover to open the menu, then move toward "Settings" and cross the little gap. When the
menu vanishes, name what the interface did. Demonstrate it once, then move to the fixed menu; do not
turn repeated failure into the entertainment.

Then try to reach it with the Tab key — you can't. The broken menu only responds to a mouse.

**The lesson:** kids will say "just move it closer." Wrong fix — that helps people with steady hands
and fixes nothing for anyone else. The real fix is that the menu should **open when you click and
stay open until you close it.** You're in charge of it, not your mouse's exact path.

**Who this actually locks out:** anyone using only a keyboard, anyone whose hands shake, anyone
using a device instead of a mouse — and anyone using a magnifier, where the menu and the thing you're
reaching for might not even be on the screen at the same time.

**Discussion question:** "Have you ever lost a menu like that?" Everyone has. They've just never
been told it was the website's fault.

---

### Station 03 — "The Wall of Words"
Real name: *The reading wall* · `/stations/reading-wall/`

**The task:** Start an online return for order `ATK-302` within 30 days of recorded delivery.
The sample order arrived 12 days ago and is unopened, unused, and in its original packaging.

**Your setup sentence:**
> "Same rules, written two different ways. Which interface makes the action easier to find?"

**What to do:** Show the broken version — long sentences, legal words, the actual instruction buried
in the middle. Ask students to identify what makes the action difficult to locate, with observation
always available instead of participation. Then show the fixed version: three short steps, action
first. Compare the interfaces without timing or ranking anyone's reading.

**Check the meaning together.** Open the Fixed policy details and compare the deadline, item
conditions, and exceptions with the Barrier. Put the action first and keep the rules available
in plain language.

Fifth graders assume "make it simpler" means "take stuff out" or "for people who aren't smart." It
means **put what the person came for first**, and put the rest where it's still available. That's a
distinction most adults never learn, and it's genuinely transferable to their own writing.

**Strong ELA connection.** This is your main idea / supporting details / audience-awareness lesson,
with an authentic purpose attached.

**Ask about context.** A return policy can be harder to use when someone is tired or in a hurry.
Which sentence would they need first?

**Discussion question:** "What's a rule at this school that's written in a confusing way?" Then do
§7 Activity 5 and actually rewrite it.

---

### Station 02 — "The Unhelpful WRONG"
Real name: *The error message* · `/stations/error-message/`

**The task:** Fix a rejected payment. **The ZIP code is `60614`.**

**Your setup sentence — this analogy does all the work:**
> "Imagine I hand back your paper and the only thing written on it is **WRONG**. No circle, no note,
> nothing. What do you do now?"

Let them answer. They'll be genuinely annoyed. *Now* show the station.

**What to do:** Submit once — the site says only `Invalid input.` Submit again and it works, which
is somehow even more infuriating. Then show the fixed version, which tells you which box was wrong,
what was wrong with it, and what to type instead — **and keeps what you already typed.**

**The three questions a good error message answers — put this on the board:**

1. **What went wrong?**
2. **Where?**
3. **What do I do now?**

Have them grade both versions. Broken: 0 out of 3. Fixed: 3 out of 3.

**Then turn it around on the adults, which they'll enjoy:** this is exactly what good feedback looks
like on their own work. "WRONG" teaches nothing. "Your topic sentence doesn't match your paragraph —
try naming your main idea first" teaches something. Same three questions.

**Discussion question:** "What's the most unhelpful error message you've ever gotten from a game or
an app?" Reliably the most enthusiastic conversation of the whole unit.

---

### Station 01 — "The Work Eater"
Real name: *The cancellation form* · `/stations/cancellation-form/`
⚠️ **Read the safety note before using this one.**

**The task:** Cancel a fake membership. **Member number `482731`, reason "Moving away."**

**Safety note first.** This station starts a 30-second timer and then **deletes everything the person
typed.** For some fifth graders — especially anyone who has lost schoolwork to a computer, and
especially anxious kids — that lands harder than you'd expect.

**So: demonstrate this one yourself on the projector. Do not assign it to individual kids.**
Before you start, say:

> "I'm about to show you something that deletes my work on purpose. You're watching me do it, not
> doing it yourselves. Nothing real is lost."

**What to do:** Click into a box. Point at the countdown and type a sample answer. Choose
**Hide countdown** so the class can see that the changing numbers go away. Show it again and let
it hit zero. The answers vanish and the site says *Session terminated. Please re-initiate.*

**Stop talking here.** Pause briefly, then name what the interface erased. Do not treat a student's
distress or surprise as lesson evidence.

**Then unpack the three separate problems, because kids will only name the timer:**

1. **The timer.** You can hide the changing numbers. The time limit keeps running, and there is no
   way to ask for more time.
2. **The disappearing labels.** The words telling you what to type are *inside* the boxes — so they
   vanish the second you start typing. Exactly when you need them. Ask what information the interface
   removed, and show it again if needed; do not turn the point into a recall test. (Connect straight
   back to Station 06 — this is the memory tax again, in a different costume.)
3. **It ate the work.** The error message deleted everything and said only `Invalid input.`
   (Connect to Station 02.)

**Kid translation:** "It's like a test where the questions disappear when you pick up your pencil,
there's a timer you didn't know about, and if you get one thing wrong the teacher erases your whole
paper and says 'wrong' with no other information."

That analogy makes fifth graders *furious*, and it is completely accurate.

**Discussion question — the best one in the unit:** "Why would anyone build this on purpose?"

Guide them to the real answer: nobody set out to be cruel. Somebody was probably told to make it
*harder* to quit — or copied a security timer from a different screen without asking whether it made
sense here. **Most barriers come from a reasonable-sounding decision made without asking who it
leaves out.** That's Big Idea 2, earned rather than announced.

---

### Station 07 — "The Room With No Door"
Real name: *The keyboard trap* · `/stations/keyboard-trap/`
*Requires keyboard skills — do Day 4's Tab lesson first.*

**The task:** Open a pop-up ad and close it using only the keyboard.

**What to do:** Open the promo and press Tab twice. Focus returns to the first of two promo
controls. Press **Escape while focus is in the promo** to close it. The Barrier's **Reset Barrier**
button also closes the example and returns it to its start.

**Be honest with your class, because the honesty is the better lesson:** this one is a *safe
imitation*. A real keyboard trap has **no** way out. The people who built this site decided that
shipping a real trap would mean a kid who uses a keyboard to browse could get genuinely stuck on a
website that's supposed to be *teaching* them about accessibility.

Their rule, which is worth writing on the board: **a lesson is never allowed to become the thing
it's warning you about.**

Ask your class whether they think that was the right call. It's a real ethics question with no
trick answer, and ten-year-olds are surprisingly good at it.

**Discussion question:** "How would you check whether a keyboard user can leave a pop-up?"
Look for a labeled close control. Follow the focus indicator and try the documented keyboard exit.

---

### Station 05 — "The Interruption" *(teacher demo, optional)*
Real name: *The interruption* · `/stations/interruption/`

**If you use it, keep it to 90 seconds.** Start typing the sample name. When the update appears,
point to the focus ring on **Return to form**. Ordinary letters stop appearing in the name field
while that button has focus. Choose **Return to form** and point out where focus returns. In Fixed,
choose **Check availability** and show how the update leaves focus where you put it.

**Kid analogy:** "You're halfway through a sentence when someone takes your pencil and gives it
back only after you stop to answer them."

**Why it's Tier 3:** the underlying concept (keyboard "focus") is abstract at this age. If you
haven't taught focus, the demo reads as just a pop-up, which they've all seen and stopped noticing.

---

### Station 08 — "The Invisible Focus" *(skip for fifth grade)*
Real name: *The invisible focus* · `/stations/invisible-focus/`

Save this one for middle school. It requires a solid mental model of what keyboard focus is and
where it lives. Without that, kids see a screen where "nothing happens," and nothing is exactly what
they'll take away.

---

## 7. Unplugged activities (no devices needed)

These work as warm-ups, sub plans, rainy-day fillers, or a whole first day.

### Activity 1 — The Curb Cut Story (10 min)

Tell it as a story, because it is one.

> In the 1970s in Berkeley, California, a group of disabled college students got tired of the fact
> that there was no way to get a wheelchair from the street onto the sidewalk. So one night they
> went out with bags of concrete and built ramps themselves. Illegally.
>
> They fought for years. Eventually the city started building them on purpose. Now they're
> everywhere, and they have a name: **curb cuts.**

Then ask: **"Who uses a curb cut today?"**

Let them build the list: strollers, scooters, skateboards, bikes, rolling suitcases, delivery carts,
somebody with a sore ankle, a kid pulling a wagon, anybody carrying too much.

**The landing:** it was built for a few people, fought for by those people, and now almost everybody
uses it. That's the **curb cut effect**, and it happens over and over in design.

⚠️ **Say the second half too, and don't skip it:** the reason to build the ramp was *never* "because
someday it'll be handy for suitcases." It was because disabled people had a right to leave their own
neighborhood. Everybody-benefits is a nice bonus, not the reason. Kids who only learn the bonus
version learn that fairness needs to justify itself, which is the wrong lesson.

### Activity 2 — The Door Problem (10 min, best opener for Day 1)

Take the class to a real door in your building — ideally a heavy one.

Ask: "Who can open this door easily?" Then: "Who couldn't?" Guide toward: someone carrying a big
box, someone on crutches, a kindergartner, someone in a wheelchair, someone with weak hands, someone
holding a class pet's cage.

Then: **"Is that the person's fault, or the door's fault?"**

That's the whole unit in one question, and you haven't touched a computer yet. Come back to this
door all week: "remember the door."

### Activity 3 — Optional keyboard inspection (15 min)

Show these five keys on a familiar station. Students can try them, direct the teacher, or observe.
Keep their usual pointer, touch, voice, keyboard, or assistive-technology setup available.

| Key | What it does |
|---|---|
| **Tab** | Jump to the next thing |
| **Shift + Tab** | Jump back |
| **Enter** | Press the thing |
| **Space** | Check a box, or scroll |
| **Esc** | Close an open example that offers Escape |

Report the **first specific thing the interface did**. Examples include "the focus ring disappeared,"
"Tab skipped the menu," and "Enter left the button unchanged." Then try the same step in Fixed.
Students can speak, draw, point to the control, or write what they observed.

Debrief question: "What did the page do with that key, and what should the design do instead?"

### Activity 4 — Design a Button (15 min, paper and markers)

Each student designs a button for a made-up app. Requirements:

- Big enough for a real finger
- Has **words**, not just a picture
- Works without color — check it by looking at it in grayscale, or draw it in pencil only
- A partner has to guess what it does **without being told**

The partner test is the assessment. If the partner can't guess, the button failed — and that's a
successful lesson, not a failure. Say so explicitly before you start, or half the room will feel bad.

### Activity 5 — Rewrite the Rule (20 min, ELA)

Take a real, genuinely confusing piece of school writing — the tardy policy, the library rules, the
lunch procedure, a permission slip. In pairs, rewrite it so a second grader could follow it.

**Two rules, both non-negotiable:**
1. You may not remove any actual rule.
2. Put the action **first**, details after.

This is Station 03 in their own building, and the results are often good enough to actually send to
the office. Do that if you can — authentic audience transforms the effort.

### Activity 6 — Barrier Hunt (homework or a walk)

Find three things that are hard for somebody to use. Can be at school, at home, in an app, or on the
street. For each: **What is it? Who does it leave out? What's one small fix?**

**Ban the word "handicapped."** Ban blaming the person. The sentence frame is:
*"The ____ leaves out ____ because ____. A fix would be ____."*

---

## 8. Words, scripts, and how to handle what kids say

### Vocabulary (kid definitions)

Post these. Use them constantly; they'll pick them up fast.

| Word | Fifth-grade definition |
|---|---|
| **Barrier** | Something in the *design* that blocks a person from doing a thing |
| **Accessible** | Built so more people can actually use it |
| **Design** | The choices somebody made about how a thing works |
| **Screen reader** | Software that reads a screen out loud |
| **Captions** | The words on a video, appearing as they're said |
| **Transcript** | The whole video written out as text |
| **Focus** | Where your typing goes right now — the keyboard's "you are here" |
| **Curb cut** | The little ramp at a sidewalk corner. Built for wheelchairs, used by everybody. |
| **Assistive technology** | Any tool that helps somebody use something: screen reader, magnifier, hearing aid, voice control, a bigger mouse |
| **Disability** | Something about a person's body or brain that works differently. It's not a bad word, and it's not an insult. |

### The word "disability" itself

Some kids will whisper it like a swear word, because somewhere they learned it was rude. Fix that
directly and early:

> "**Disability** is a regular word. It's not mean and it's not a secret. Lots of people say it
> about themselves. What *is* rude is treating somebody like they're less because of it."

Avoid "differently abled," "special needs," and "handicapped." Disabled people overwhelmingly don't
use those, and the euphemisms teach kids that the plain word is shameful — which is exactly the
belief you're trying to prevent.

### Sentence frames for discussion

Post these. They raise the quality of talk immediately, and they help your quieter kids in.

- "This design leaves out people who ______."
- "The fix works because ______."
- "This reminds me of ______."
- "I noticed that ______, which means ______."
- "That's the design's fault because ______."

### When a kid says something unkind — scripts

These *will* happen. Have the words ready so you're not improvising in front of thirty people.

**"That's so retarded / lame / blind."**
> "That word uses a disability as an insult. We don't do that here. Say what you actually mean."
Short, calm, no lecture, move on. Follow up privately if it repeats.

**"That's sad, I feel so bad for them."**
> "I hear you. But nobody needs us to feel sorry for them. They need the design fixed. Which one can
> we actually do something about?"
This is the single most important redirect in the unit — it's the pity reflex, and this is your one
shot at redirecting it before it hardens.

**"Why don't they just get someone to help them?"**
> "Would you want to have to ask permission every time you wanted to do something normal?"
Let that sit. It usually lands on its own.

**"That's not fair to make the designer do extra work."**
> "How much extra work was the fix on the Mystery Button?" (About four seconds.) "How much extra
> work is it for the person locked out?" (Everything, every time.)

**"Is [classmate] disabled?"**
> "That's not mine to talk about, and it's not ours to guess. What we're judging today is websites."
Do not confirm, deny, or hint — including with your face.

---

## 9. Students with disabilities in your room

Assume there are some, because there almost certainly are — diagnosed, undiagnosed, disclosed, or
not. Some kids don't know yet. Some know and don't want anyone else to.

**Do:**

- Teach this as being about **design**, always. That's what makes it safe for everybody in the room
  to participate as equals.
- Let it be a relief. A kid who struggles with reading, focus, or fine motor control is hearing, for
  possibly the first time, that difficulty can be **the design's fault**. That's a gift. Let them
  take it quietly.
- Keep every kid's assistive technology completely ordinary. Glasses, hearing aids, a reading pen,
  text-to-speech, a wobble stool, a pencil grip — mention them in the same breath as a bike helmet.
- Notice out loud when a *fix* on the site is something your classroom already does. "We put the
  steps on the board — same idea as Station 06." It normalizes support as good design rather than
  special treatment.

**Don't:**

- **Never** ask a student to demonstrate, verify, or speak for a disability. Not even if they'd
  probably be fine with it. Not even if they've volunteered before. Being the class exhibit is a job
  no ten-year-old should have.
- **Never** say "for our blind users" as if they're somewhere else. Say "for people who are blind."
- **Never** run a simulation as a "supplement." Not one blindfold. Not for two minutes. Not because
  the reading specialist suggested it.
- Don't make eye contact with a particular kid while explaining a disability. They notice. Everyone
  notices.
- Don't let a kid become the room's designated expert on their own condition unless *they* start it,
  and even then, keep it short and move on.

**If a student discloses in front of the class** — "I use a screen reader at home," "I'm colorblind"
— take it completely in stride, thank them briefly, and continue. Big reactions teach the room that
it was a big deal.

---

## 10. Differentiation

**For students who need more support:**
- Offer driver, observer, or teacher-led options. Ask what would help each student take the role
  they want. Typing is optional for both roles.
- Give the sentence frames (§8) on a card at the desk.
- Pre-teach three vocabulary words rather than ten.
- Stations 12 and 09 need almost no reading. Start there.
- Let them draw the answer instead of writing it.

**For students ready to go further:**
- The **Builder** mode on the site (switch it just for them) shows the real professional explanation
  and actual code. Some fifth graders will be thrilled. Most won't. Offer, don't assign.
- Have them find the shared idea across Stations 01 and 06 (both are about memory) or 02 and 03
  (both are about words that don't help).
- Ask them to design a **thirteenth station**: a new barrier, who it leaves out, and the fix. This is
  a real assignment from the adult version of this guide and it's genuinely open-ended.
- Have them audit a real app and write a letter to the company. Send it. Some companies write back.

**For multilingual learners:**
- Model Station 12 with pointing, a short spoken description, or a sketch of the two target sizes.
- For Station 03, offer vocabulary or translation support and compare where the same rule appears
  in each version.
- In Station 11, offer both the captions and transcript so learners can review the words at their
  own pace.

---

## 11. Assessment

### Exit tickets (pick one, 3 minutes)

- "Name one thing a design can do that leaves somebody out."
- "What changed between the broken version and the fixed one?"
- "Whose fault is it when something is really hard to use?" *(Looking for: the design's.)*
- Draw the two Mystery Buttons. Label what's different about them.
- "One thing I noticed today: ______"

### "I can" statements — the rubric in kid language

Give them this sheet. Have them self-assess, then you assess. The gap between the two is often the
most useful conversation of the unit.

Count a spoken, drawn, written, or pointed-out observation. Assess what students identify about the
design, whether they drove the example, directed the teacher, or watched.

| I can… | Not yet | Getting there | Got it |
|---|---|---|---|
| …explain that somebody *made* every app and website | | | |
| …name a barrier I found | | | |
| …say who a design leaves out — without making fun of them | | | |
| …explain a fix in my own words | | | |
| …say why we don't wear blindfolds to learn about this | | | |
| …use "disability" like a normal word | | | |
| …describe what happens when someone tries one step with a keyboard | | | |

That fifth row matters more than it looks. A kid who can explain *why no blindfolds* has understood
the deepest idea in the unit.

### Design Challenge (Day 5 project, 25 min + share)

> **Find something in our school or in an app you use that leaves somebody out. Fix it.**
>
> Turn in:
> 1. What it is (draw it or describe it)
> 2. Who it leaves out, and why
> 3. Your fix (draw it)
> 4. One sentence: why your fix helps *other* people too

That fourth item is the curb cut effect, and it's the hardest and best part. Expect to prompt for it.

**Scoring:** don't grade drawing quality. Grade whether they named a *design* problem instead of a
*person* problem. That's the whole standard.

**Make it real if you can.** Send the best ones to your principal, your PTA, or the actual company.
Fifth graders take this seriously when an adult outside the room might read it, and some of these
fixes are genuinely worth doing.

### Longer writing options (ELA)

- **Opinion:** "Should companies be required to make apps that everyone can use?" Take a side, back
  it with evidence from at least two stations.
- **Informative:** Explain one barrier and its fix to a third grader. Audience-awareness assessment
  hiding inside a technology lesson.
- **Narrative:** Tell the story of a fictional visitor trying to return an order. Describe which
  instruction the page gives, where the task stalls, and what change would help the visitor finish.

---

## 12. Standards alignment

Verify against your state's exact wording — states adopt and renumber. These are the natural fits.

**Common Core ELA (Grade 5)**

- **RI.5.7** — Draw on information from multiple print/digital sources to answer a question. (Station
  03, the barrier hunt.)
- **W.5.1** — Opinion writing with reasons and evidence. (The "should companies be required" prompt.)
- **W.5.2** — Informative/explanatory writing. (Explain a barrier and its fix.)
- **SL.5.1** — Collaborative discussions, building on others' ideas. (Every station discussion.)
- **SL.5.4** — Report on a topic with appropriate facts and descriptive details. (Design Challenge
  share-out.)
- **L.5.6** — Acquire and use grade-appropriate academic vocabulary. (The §8 word list.)

**NGSS — Engineering Design (3–5-ETS1)**

- **3-5-ETS1-1** — Define a design problem including criteria and constraints. (Naming a barrier is
  literally defining a design problem.)
- **3-5-ETS1-2** — Generate and compare multiple solutions. (Broken vs. fixed is a built-in
  comparison; the "just add a legend" debate at Station 10 is solution comparison in the wild.)
- **3-5-ETS1-3** — Plan and carry out fair tests, identifying failure points to improve a model. (The
  optional keyboard inspection compares the same input on both versions of one interface.)

**ISTE Standards for Students**

- **1.3 Knowledge Constructor** — evaluating digital resources critically.
- **1.4 Innovative Designer** — using a design process to solve problems for real users.
- **1.7 Global Collaborator** — considering perspectives beyond your own.

**Digital citizenship / SEL**

Maps cleanly onto perspective-taking, empathy without pity, inclusive community, and social
awareness in most SEL frameworks (including CASEL's social awareness and responsible
decision-making competencies).

**A note for your admin if you need one:** this unit teaches disability as a *design* topic, not a
*charity* topic. It does not use simulation exercises, does not single out students, and does not
require any student to disclose anything about themselves. That framing is deliberate and follows
guidance from disabled advocates.

---

## 13. Questions fifth graders ask, and honest answers

Have these ready. Fifth graders ask hard, direct, excellent questions.

**"Why don't they just fix it?"**
Usually: nobody told them it was broken, nobody tested with the right people, or somebody decided
other things were more urgent. Occasionally it costs money. Rarely is it because anybody wanted it
broken.

**"How much does it cost to fix?"**
Most fixes in this project are tiny — a word, a label, a bit more space. The expensive part is
finding out *after* you've built the whole thing. Fixing at the start is nearly free; fixing at the
end means rebuilding.

**"Is it illegal to make a website like the broken one?"**
Sometimes, depending on the country and the kind of organization. Schools and government sites in
the U.S. have real requirements. But "is it against the rules" is a smaller question than "does it
leave people out."

**"How do blind people use computers?"**
Software reads the screen out loud, or sends it to a braille display — a device with little pins
that pop up to form braille letters. Experienced users run the speech **much** faster than you'd
expect; it sounds like nonsense to a beginner. If you demo one, say that, so kids don't conclude
it's slow or hard. It's neither, once you know it.

**"Can I try a screen reader?"**
Yes — with the right framing, this is fine and even great. But **not as a simulation.** Frame it as
"let's look at a tool," the same way you'd look at a microscope. Use a competent demonstration or a
reputable expert-user recording when possible. If you are a novice, say so without performing the
tool badly for effect, and explain that experienced users often operate it much faster. Never frame
it as "now you know what it's like." You've briefly explored a tool; that's all.

**"What if someone can't use a computer at all?"**
Then there had better be another way to do the thing — a phone number, a person, a paper form. "Do
it online or not at all" is itself a barrier, and it's one that's getting worse.

**"Do disabled people hate technology?"**
Often the opposite. Technology has opened up enormous amounts — reading, talking, working,
connecting, playing games. That's exactly why bad design is so frustrating: it takes away something
that was working.

**"Why do we have to learn this?"**
Because most of you will make things — websites, games, videos, presentations, posters, signs — and
you get to decide who can use them. That's a real power. Also: you'll be in the "situational" group
constantly, and eventually in the "temporary" one, and probably someday in the "permanent" one. This
is not about other people.

---

## 14. Troubleshooting during class

| Problem | What to do |
|---|---|
| Kids are laughing *at* the broken version too much | Redirect from mocking to investigating: "Okay — who exactly does this lock out? Be specific." |
| A kid is upset by the Station 01 timer | Stop the demo or choose **Reset Barrier** to clear the attempt and stop the timer. Remind them the example used fictional data, offer a break or observation, and check in privately after. |
| The Station 07 pop-up is still open | Press **Escape** with focus in the promo, use **Reset Barrier**, or switch to **Try the fix**. Fixed has a visible **Close promotion** button. |
| The site is showing code instead of plain English | The mode got switched. Click **Advocate** at the top. |
| A panel is in a weird state | Every panel has a **Reset** button. It only resets that panel. |
| Station 11's video won't play | Check the projector sound and that the site server serves the complete build. Use the Fixed transcript to continue the lesson. |
| Kids say "just make it bigger" for everything | Good instinct, incomplete. Push: "Bigger helps who? Who does it still leave out?" |
| A kid calls it a simulator | Correct it right away, briefly, every time. If you let it slide once, it goes home in their notes that way. |
| A kid asks a question you can't answer | "I don't know — that's a real question. Let's find out." Model it. That's a better lesson than knowing. |
| Discussion goes off the rails into a personal story | Let it run 60 seconds if it's kind and relevant; redirect gently if it's about a specific person. "Let's keep it about the design." |
| You accidentally said something clumsy | Correct yourself out loud, briefly, and move on. "That came out wrong — what I meant was…" You're modeling exactly the skill you're teaching. Don't make it a whole thing. |

---

## 15. Family letter you can send home

Copy, adjust, send.

> **Dear families,**
>
> This week our class is studying **design and accessibility** — how the things we use every day get
> built, and how good design can either include people or leave them out.
>
> We're using a website called A11y Test Kitchen. Students try a website that's **broken on purpose**,
> then try a well-built version of the same thing, and figure out what changed and who it matters
> for. The class will use fictional sample values. The exercises don't send answers or make
> purchases, and students don't need an account.
>
> **One thing I want to be clear about:** we are **not** doing disability simulations. No blindfolds,
> no earplugs, no pretending. Disabled advocates have asked schools to stop doing those, because they
> tend to teach pity instead of understanding. Instead, our class is judging **the design** — which
> is the thing that can actually be fixed.
>
> The big idea we keep coming back to is:
> **"If something is really hard to use, that's usually the design's fault — not your fault."**
>
> **Ask your child at home:**
> - What's something in our house that's hard for somebody to use?
> - What's the smallest button on your tablet or phone? What's right next to it?
> - Do you watch videos with captions on? Why?
>
> If your family uses any assistive technology and would ever be willing to talk with our class about
> it, I'd be glad to hear from you — though there is absolutely no expectation, and we won't ask any
> student to share anything about themselves.
>
> Thank you,
> [Your name]

---

## 16. Quick reference card

Print this section or read it aloud. If you're using the local development server on port 4321,
the links below open the stations directly. On a school server, open **Teaching guide** from the home
page for that site's station links.

### Run a 20-minute lesson

1. **Set up (2 minutes).** Open [Station 09 on the local site](http://localhost:4321/stations/unlabelled-icon/)
   and choose **Advocate**. Read aloud: “We're going to try two versions of the same task. Look for
   one thing the design changes. You can try it, tell me what to click, or watch.”
2. **Compare names (7 minutes).** In Station 09, delete the sample file in Barrier and Fixed. Both
   show the same icon. Read the Fixed button's accessible name **Delete Notes.txt**, then ask which
   words tell someone what the button does.
3. **Compare sizes (7 minutes).** Open [Station 12 on the local site](http://localhost:4321/stations/target-too-small/).
   Choose B in both panels. Ask how the larger, spaced targets change the task. One comparison is enough.
4. **Exit ticket (4 minutes).** “The design changed ____. That makes it easier to ____.” Accept a
   spoken, drawn, or written answer. Skip the timer lesson unless you want to demonstrate it yourself.

Use [Station 01 on the local site](http://localhost:4321/stations/cancellation-form/) only as an optional
teacher-led demonstration. Read the [timer safety note](#station-01--the-work-eater) first.

### Answer key — everything you need to run each station

| # | Board name | Site name | What to do | Data you need | Answer |
|---|---|---|---|---|---|
| 09 ⭐ | The Mystery Button | unlabelled-icon | Delete a file | — | File deletes; fixed one is *named* |
| 12 ⭐ | The Impossible Tap | target-too-small | Pick option B | A, B, C | "Selected option B." |
| 10 ⭐ | The Color Trap | color-only-status | Find the failed order | ATK-510, 511, 512 | **ATK-511** |
| 06 ⭐ | The Vanishing Code | memory-tax | Confirm the transfer | Code **734219** | Transfer confirmed |
| 11 ⭐ | The Silent Video | caption-gap | Find the last instruction | — | "The final step is Press Done." |
| 04 | The Runaway Menu | disappearing-menu | Get to Settings | — | "Settings opened." |
| 03 | The Wall of Words | reading-wall | Start a return | Order ATK-302, delivered 12 days ago, unopened and unused in original packaging | Start the online return within 30 days of delivery |
| 02 | The Unhelpful WRONG | error-message | Fix the payment | ZIP **60614** | "Payment details updated." |
| 01 ⚠️ | The Work Eater | cancellation-form | Cancel a membership | Member **482731**, "Moving away" | "Membership canceled." |
| 07 | The Room With No Door | keyboard-trap | Close the pop-up | — | Escape from the promo, or Reset Barrier |
| 05 | The Interruption | interruption | Book a fictional appointment | Sample scenario shown on the page | Confirmed |
| 08 | *(skip)* | invisible-focus | — | — | — |

⭐ = best for fifth grade · ⚠️ = teacher demo only, read the safety note

### Five things to say

1. "Somebody **made** this. It didn't just happen."
2. "If it's really hard to use, that's the **design's** fault."
3. "Who does this leave out?"
4. "Fixing it for one person usually helps everybody."
5. "We're judging the **website**, not any person."

### Before class

- [ ] Site is open and working
- [ ] Mode is set to **Advocate**
- [ ] Browser zoomed to 150–200% for the back row
- [ ] This answer key is next to you
- [ ] Board sentence is on the board
- [ ] Station 01 planned as **your** demo, not theirs
- [ ] Sound tested if Station 11 is in the plan

### The five keys for optional keyboard inspection

**Tab** = next · **Shift+Tab** = back · **Enter** = activate · **Space** = check or activate ·
**Esc** = close an open example that offers Escape

---

## Where to go next

| Document | What it's for |
|---|---|
| [`docs/TEACHERS-GUIDE.md`](TEACHERS-GUIDE.md) | The adult/professional version — much more depth on each station, plus the standards and testing background |
| [`docs/stations/`](stations/) | Exact details of every station, if a kid asks something very specific |
| [`README.md`](../README.md) | What the whole project is and how to run it |
| The site's **About** page | The non-simulator philosophy, written for the public |

**One last thing.** The most valuable outcome of this unit isn't a vocabulary list. It's a
ten-year-old who, three years from now, is building something and stops to ask *"wait — who does
this leave out?"*

That question is the entire subject. Everything else is practice.
