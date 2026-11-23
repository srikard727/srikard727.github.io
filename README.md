# Srikar Devesetti — portfolio refresh

A content-first, lightweight portfolio. The landing page is semantic HTML and CSS with no runtime JavaScript, animation loops, or third-party asset requests.

## Preview locally

From this directory:

```sh
python3 -m http.server 4173
```

Then open **http://localhost:4173/** in your browser. You can also use the existing `npm run dev` workflow (Vite) after checking out this Git branch in the original repository. The original `src` components can remain untouched initially; the new `index.html` doesn't load them.

## Changes and rationale

- Removed initial-load dependency on three React roots (`hero`, `projects`, and custom cursor).
- Removed particle effects, continuously rotating orbits, and scroll-parallax JavaScript.
- Kept projects, interest areas, skills, GitHub links, LinkedIn, and partner link as readable HTML.
- Introduced a text-forward editorial layout with one understated color accent, accessible landmarks, visible content before hydration, and responsive grids.
- Reduced-motion preferences are honored. No external fonts or images load.

## Approval workflow

Design branch: `design/portfolio-performance-refresh`. The redesign is committed to this branch for review, separate from `main`. It is intentionally not merged or deployed to the live website.

The root `index.html` and `styles.css` are replaced only on this branch. Old React components and scripts are retained but not imported by the new page; they can be cleaned up separately after review.

On macOS, you can also run `./preview.command` from Terminal to start the preview and open your browser automatically. Press Control-C to stop the server.