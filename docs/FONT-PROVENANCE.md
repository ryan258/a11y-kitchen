# Font provenance

A11y Test Kitchen vendors its display fonts so a page visit does not contact a third-party font
service. Astro fingerprints and emits these local WOFF2 files with the rest of the static build.
System font fallbacks remain in `src/styles/global.css` if a local asset cannot load.

## Outfit

- File: `src/assets/fonts/outfit-latin.woff2`
- Use: normal style, variable weights 400 through 700
- Retrieved: 2026-08-10
- Source: `https://fonts.gstatic.com/s/outfit/v15/QGYvz_MVcBeNP4NJtEtq.woff2`
- SHA-256: `6c18d579fd87c3776be068b762cbc83fde3acb543d49eabd3ade842eb987e887`
- Copyright: 2021 The Outfit Project Authors
- License: SIL Open Font License 1.1, copied at `src/assets/fonts/outfit-OFL.txt`
- Canonical Google Fonts source: `https://github.com/google/fonts/tree/main/ofl/outfit`

## Space Mono

- Files: `src/assets/fonts/space-mono-regular-latin.woff2` and
  `src/assets/fonts/space-mono-bold-latin.woff2`
- Use: normal style, weights 400 and 700
- Retrieved: 2026-08-10
- Regular source: `https://fonts.gstatic.com/s/spacemono/v17/i7dPIFZifjKcF5UAWdDRYEF8RQ.woff2`
- Regular SHA-256: `fb4a81a2d0a893e5c38c394a7e716a1cef0b24610a0af49c96f6d529bd66bf2b`
- Bold source: `https://fonts.gstatic.com/s/spacemono/v17/i7dMIFZifjKcF5UAWdDRaPpZUFWaHg.woff2`
- Bold SHA-256: `2d46bd159b53f55c41167a4f1540a074649464194fd1e416f5b4694a6c0f282c`
- Copyright: 2016 The Space Mono Project Authors
- License: SIL Open Font License 1.1, copied at `src/assets/fonts/space-mono-OFL.txt`
- Canonical Google Fonts source: `https://github.com/google/fonts/tree/main/ofl/spacemono`

The WOFF2 files are unmodified Latin subsets served by Google Fonts. Their exact upstream license
notices remain beside the binaries. The runtime build contains no Google Fonts stylesheet or remote
font URL.
