# Font sources

These are the original font files previously served from `public/fonts/`.
The website uses WOFF2 versions in `public/fonts/`, with the same glyph order
and Unicode mappings. Only the primary body font is preloaded.

Original files stay outside `public/` so they are available for regeneration
without increasing the static deployment payload. WOFF2 files are checked in;
normal builds do not require font conversion tools.
