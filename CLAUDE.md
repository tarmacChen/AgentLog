# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:4321/AgentLog/
npm run build    # Build static site to dist/
npm run preview  # Preview the built site locally
```

## Architecture

**AgentLog** is an Astro 5 static blog deployed to GitHub Pages at `tarmacChen.github.io/AgentLog`. The site documents AI agent experiments and observations.

**Key configuration:**
- Base path is `/AgentLog` (required for all internal links via `import.meta.env.BASE_URL`)
- Tailwind CSS v4 is integrated via the Vite plugin (`@tailwindcss/vite`), not the legacy Astro integration
- TypeScript strict mode is enabled
- Dark mode uses class strategy: `@variant dark (&:where(.dark, .dark *))` declared in `src/styles/global.css`. The `.dark` class is toggled on `<html>` by JS in `BaseLayout.astro`

**Content system:** Blog posts are Markdown files in `src/content/blog/` managed via Astro Content Collections. The schema (defined in `src/content.config.ts`) requires `title`, `description`, and `pubDate`; supports optional `tags`, `updatedDate`, and `draft` fields. Posts with `draft: true` are excluded from all listings.

**Routing:**
- `src/pages/index.astro` — Homepage with sorted post feed
- `src/pages/blog/index.astro` — Full archive listing
- `src/pages/blog/[slug].astro` — Dynamic post pages using `getStaticPaths()`
- `src/pages/search.astro` — Client-side search (no backend); reads `?q=` from URL on load to pre-filter results

**Layout:** All pages use `src/layouts/BaseLayout.astro` which provides:
- Responsive navbar (logo, Posts link, search form, dark/light toggle)
- Search form submits via `GET` to `/search/?q=<value>` — no JS required for navigation
- Dark mode toggle persists preference to `localStorage`; an inline `<script is:inline>` in `<head>` applies the saved theme before paint to prevent flash
- Responsive container (`max-w-3xl`) with mobile-first spacing

**Responsive design:** All breakpoints use Tailwind's `sm:` prefix (640px). Navbar items use `shrink-0` so only the search input compresses on small screens. Page headings scale from `text-2xl` on mobile to `text-3xl` on `sm+`.

**Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`.
