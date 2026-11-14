# Station 11 — The caption gap

Status: AUDITING — media structure checked; human playback and caption review pending
Owner: Ryan
Last reviewed: 2026-11-12
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

- **1.2.2 Captions (Prerecorded) (A)** requires synchronized captions for prerecorded audio in
  synchronized media, except when the media is clearly labeled as an alternative to equivalent text.
  In Fixed, try completing the task with audio muted and captions on. The nearby transcript is a
  separate way to complete the task.
  [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded.html)
- **1.2.3 Audio Description or Media Alternative (Prerecorded) (A)** allows audio description or a
  complete text alternative covering the meaningful audio and visuals. Narration can already convey
  the important visual information, as this clip is designed to do. Verify that against the final
  video.
  [W3C guidance](https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded.html)

## Deterministic evidence

Build checks match the narration script, caption cues, transcript, and emitted caption track. Browser
assertions check the presence of the Fixed track and transcript, answer completion, and selection and
transcript reset. Verify muted caption playback, cue accuracy, transcript equivalence, and playback
reset manually. [Media provenance](../MEDIA-PROVENANCE.md)
