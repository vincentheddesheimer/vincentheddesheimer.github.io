# Personal Academic Website — Vincent Heddesheimer

## Overview
Static personal academic website hosted on GitHub Pages at `vheddesheimer.github.io`. Built with plain HTML/CSS (no build step, no framework).

## Structure
- `index.html` — Single-page site with bio, publications, working papers, and datasets
- `stylesheets/` — CSS files (styles.css, kube.css, pygment_trac.css)
- `cv/` — CV PDF
- `img/` — Profile photo
- `_config.yml` — Jekyll config (theme: jekyll-theme-cayman)

## Conventions
- Abstracts use toggle visibility via inline `onclick="toggle_visibility('id')"` pattern
- Publications are in a reversed `<ol>`, working papers in a regular `<ol>`
- Links to papers use `target="_blank"`
- No JavaScript framework — just vanilla JS for toggling abstract visibility

## Editing Guidelines
- Keep the HTML structure simple and consistent with existing entries
- When adding a new publication, follow the existing `<li>` pattern with title link, coauthors, journal, and abstract toggle
- Move working papers to publications section when published
