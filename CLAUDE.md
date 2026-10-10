# CLAUDE.md

Personal website of Andres Arau (data scientist).

## Stack

- Plain HTML, CSS and JavaScript. No framework, bundler, package manager or build step.
- Hosted on GitHub Pages, served straight from the repository (branch `main`). `.nojekyll` disables Jekyll processing.
- Font: Inter from Google Fonts.
- D3.js (v7, from the jsDelivr CDN) for future visualisations. The script tag is commented out at the bottom of `index.html`.

## Folder structure

```
index.html        single page: nav, sections (about, skills, projects, gallery, contact), footer
css/styles.css    theme tokens (:root custom properties), layout, components
js/main.js        mobile nav toggle, Madrid clock + online status, footer year
js/tagline.js     rotating tagline; PHRASES array at the top
js/charts/        D3 chart scripts (one file per chart)
data/             CSV/JSON data for charts
img/              images; the profile photo is img/profile.jpg
```

## Conventions

- Keep it dependency-free. Don't add npm, frameworks or build tooling unless asked. Load any library from a CDN with a pinned version.
- Theme: dark only for now. All colours, fonts, spacing and the fade duration are CSS custom properties in `:root` at the top of `css/styles.css`. Use the tokens rather than hard-coded values.
- Single accent colour (`--color-accent`), also used for the online dot.
- Fluid type with `clamp()`. Layouts must reflow from mobile to desktop without horizontal scroll. Nav collapses to a hamburger below 768px.
- CSS class names follow BEM-style `block__element`, with `is-*` for state classes (`is-open`, `is-visible`, `is-online`).
- `<html>` starts as `no-js` and becomes `js`. Styles that depend on JS (like the collapsed mobile menu) are scoped under `.js`.
- Accessibility: semantic landmarks, alt text, keyboard-operable controls with `aria-expanded`, visible focus styles, contrast that passes WCAG AA, and respect for `prefers-reduced-motion`.
- Each section has an `id` for anchor navigation. Sections other than About are placeholders. Don't invent content (bio, skills, projects, etc.). The owner writes it.
- The clock uses `Intl.DateTimeFormat` with `timeZone: 'Europe/Madrid'`. Online means Mon to Fri, 09:00 to 16:30 Madrid time (constants at the top of the clock code in `js/main.js`).
- Tagline phrases live in `PHRASES` in `js/tagline.js`. Keep the screen-reader text in `index.html` in sync. `FADE_MS` must match `--fade-duration`.
- Use relative paths for links and assets so the site works locally and on GitHub Pages.
- Save files as UTF-8.

## Running locally

```sh
python -m http.server 8000
```

Then visit http://localhost:8000. Serving the folder (rather than opening the file) matters once charts fetch from `data/`.

## Deploying

Push to `main`. GitHub Pages publishes it automatically.
