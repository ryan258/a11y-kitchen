# Station 11 Media Provenance

Status: Source and generation path recorded; final human caption review pending
Last updated: 2026-08-08

## Shipped artifacts

- `src/assets/station-11-instructions.mp4`
- `src/assets/station-11-captions.vtt`
- `src/assets/station-11-poster.png`
- Equivalent transcript in `src/components/stations/Station11.astro`

## Authorship and rights boundary

The script, transcript, caption text, timing decisions, and simple card-and-spoon visual were authored
for A11y Test Kitchen. The repository ships no third-party recording, footage, photograph, music,
Apple system voice, model, or synthesizer code.

Speech was generated at authoring time with pinned `text2wav@0.0.14`, whose repository declares the
MIT License and compiles eSpeak NG. The synthesizer is downloaded only when the explicit media script
runs; it is not a runtime or production dependency and no engine code is bundled into the MP4.
FFmpeg combines the generated waveform with shapes drawn from the project's existing color tokens and
creates a matching local poster so the video does not present as an empty black frame before playback.

Relevant upstream license records:

- [text2wav MIT license](https://github.com/abbr/text2wav.node.js/blob/master/LICENSE)
- [eSpeak NG license](https://github.com/espeak-ng/espeak-ng/blob/master/COPYING)

## Reproduction

Run:

```sh
npm run media:station-11
```

Requirements are Node/npm, network access for the pinned authoring package, and FFmpeg with `libx264`
and AAC support. The public site does not need those tools. After regeneration, a human must retime or
reconfirm `station-11-captions.vtt`; the audio duration and sentence gaps can change across engines or
versions even when the script is unchanged.

## Current timing record

- Audio duration: approximately 8.71 seconds.
- Caption 1: `00:00.000`–`00:03.500`.
- Caption 2: `00:03.500`–`00:06.930`.
- Caption 3: `00:06.930`–`00:08.350`.
- The narration names every meaningful visual element; there is no separate unspoken action.

## Release review

Before publication, watch the final encoded MP4 with audio muted and captions on, then listen with the
screen hidden and compare the transcript. Record reviewer, browser, date, caption accuracy, timing,
speaker labels, and transcript equivalence in the release evidence file.
