# Station 11 — The caption gap

Status: AUDITING — original media, captions, transcript, and deterministic evidence complete; human accuracy review pending
Owner: Ryan
Last reviewed: 2026-08-08
Route: `/stations/caption-gap/`

## Contract

- **Task:** Identify the final instruction in the same original clip.
- **Supplied media:** An 8.7-second local MP4 with three table-setup instructions.
- **Success:** “The final step is Press Done.”
- **Named barrier:** Prerecorded speech has no captions or transcript.

## Barrier and safety

The barrier uses native media controls and no alternatives. The task remains resettable, and Reset
pauses and rewinds the local clip. No autoplay, external request, or keyboard override exists. The
manual ledger records the missing alternative because axe did not surface `video-caption` for this clip.

## Fixed behavior

The exact same MP4 has a default English WebVTT captions track and a nearby transcript containing all
spoken and meaningful visual information. Reset pauses and rewinds the clip and clears the answer.

## Criteria review

- **1.2.2 Captions (Prerecorded) (A):** Confirmed for the spoken synchronized media.
- **1.2.3 Audio Description or Media Alternative (Prerecorded) (A):** Conditional; narration contains
  all meaningful visual information, and the fixed transcript supplies the full equivalent sequence.

## Deterministic evidence

Build checks require the MP4, captions track, and transcript. Browser checks verify the barrier omits
both alternatives, the fixed panel contains them, the answer completes, and reset handles media state.
See `docs/MEDIA-PROVENANCE.md` for source and generation evidence.
