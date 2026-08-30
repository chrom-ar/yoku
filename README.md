# Yoku — landing page

Single-screen landing page for Yoku (manual penetration testing), in English (`/`) and Spanish (`/es/`).

Built with [Astro](https://astro.build), Tailwind CSS v4 and DaisyUI 5. Deployed to GitHub Pages at https://yoku.chrom.ar via the workflow in `.github/workflows/deploy.yml`.

## Structure

- `src/pages/index.astro`, `src/pages/es/index.astro` — the two locale entry points, both render `Landing.astro`.
- `src/components/` — `Nav`, `Hero`, `GlyphSphere` (the Canvas 2D glyph sphere: hover to spin faster, click to knock glyphs loose), `Prompt` (terminal-style footer).
- `src/i18n/ui.ts` — all copy for both languages plus the contact email.
- `src/styles/global.css` — Tailwind + the custom `yoku` DaisyUI theme (palette, fonts).
- `public/favicon.svg`, `public/CNAME`.
- `scripts/og.mjs` — renders the OpenGraph cards (`public/og-en.png`, `public/og-es.png`) and `public/apple-touch-icon.png` with satori + resvg. Runs automatically before `npm run build`; the outputs are gitignored.

## Commands

| Command           | Action                                  |
| :---------------- | :-------------------------------------- |
| `npm install`     | Install dependencies                    |
| `npm run dev`     | Start dev server at `localhost:4321`    |
| `npm run build`   | Build the production site to `./dist/`  |
| `npm run og`      | Regenerate the OG images and touch icon |
| `npm run preview` | Preview the build locally               |
