# gauravpatil.dev

Personal portfolio - a single hand-built page. No framework, no build step, no template.

## Design

Editorial "ink & paper" direction: Instrument Serif display type with italic accents,
Instrument Sans body, Geist Mono labels, one vermilion accent, hairline rules,
numbered sections, and a touch of film grain. Dark and light themes.

## Stack

- Plain HTML + CSS + vanilla JS ([index.html](index.html), [assets/styles.css](assets/styles.css), [assets/main.js](assets/main.js))
- GitHub contribution heatmap + streak stats rendered natively from the
  [jogruber contributions API](https://github-contributions-api.jogruber.de)
- Contact form via Web3Forms
- Static-only - GitHub Pages compatible

## Notes

- Theme preference persists in `localStorage`; defaults to `prefers-color-scheme`.
- Asset links carry a `?v=N` query string - bump it when editing CSS/JS so
  returning visitors don't get stale cached assets.
- There's a Konami code easter egg. ↑↑↓↓←→←→BA.
