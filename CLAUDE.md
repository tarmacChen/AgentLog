# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:4321/
npm run build    # Build static site to dist/
npm run preview  # Preview the built site locally
npm run new      # Scaffold a new blog post via scripts/new-post.mjs
```

## Architecture

**AgentLog** is an Astro 5 static blog deployed to GitHub Pages at `https://tarmacchen.github.io`. The site documents AI agent experiments and observations.

**Key configuration:**
- Base path is `/` — `import.meta.env.BASE_URL` returns `/` (with trailing slash); always normalize with `.replace(/\/$/, '')` before use: `const base = import.meta.env.BASE_URL.replace(/\/$/, '')` then `${base}/path/`
- Hero images are stored in `public/images/blog/` and referenced in frontmatter as `/images/blog/filename.png` (absolute path, no base prefix needed beyond the normalized base)
- Tailwind CSS v4 is integrated via the Vite plugin (`@tailwindcss/vite`), not the legacy Astro integration
- TypeScript strict mode is enabled
- Dark mode uses class strategy: `@variant dark (&:where(.dark, .dark *))` declared in `src/styles/global.css`. The `.dark` class is set on `<html>` by an inline `<script is:inline>` in `<head>` before paint to avoid flash
- Base font size is 17px; antialiasing enabled globally in `src/styles/global.css`

**Content system:** Two content collections:
- `src/content/blog/` — Primary posts (Chinese or default language)
- `src/content/blog-en/` — Optional English translations; matched to primary posts by identical filename

Schema (defined in `src/content.config.ts`) requires `title`, `description`, `pubDate`; supports optional `heroImage`, `tags`, `updatedDate`, `draft`. Posts with `draft: true` are excluded from all listings.

**Routing:**
- `src/pages/index.astro` — Homepage: featured post hero + 2-column grid for remaining posts
- `src/pages/blog/index.astro` — Full archive listing (same featured + grid layout)
- `src/pages/blog/[slug].astro` — Dynamic post pages; shows zh/en toggle button if a matching file exists in `blog-en/`
- `src/pages/search.astro` — Full-page real-time search; filters posts client-side, highlights matched terms in yellow, shows result count

**Layout:** All pages use `src/layouts/BaseLayout.astro` which provides:
- **Desktop (≥640px):** Inline navbar — logo, Posts, Projects, About, search icon, dark/light toggle
- **Mobile (<640px):** Logo + search icon + theme toggle + hamburger button; tapping hamburger reveals a dropdown with Posts, Projects, About; icon swaps to ✕ when open
- Dark mode toggle: CSS-driven icon swap (`hidden dark:block` / `block dark:hidden`), preference persisted to `localStorage`
- Site logo: `public/images/logo.svg` (light mode) and `public/images/logo-dark.svg` (dark mode)
- Responsive container `max-w-3xl mx-auto px-4`

**Responsive design:** Breakpoint is `sm:` (640px). Mobile-first throughout.

**Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`. Repo is `tarmacChen/tarmacchen.github.io` (user pages repo → serves at root `/`).
