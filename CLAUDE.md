# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:4321/
npm run build    # Build static site to dist/
npm run preview  # Preview the built site locally
```

## Architecture

**AgentLog** is an Astro 5 static blog deployed to GitHub Pages. The site documents AI agent experiments and observations.

**Key configuration:**
- Base path is `/` — `import.meta.env.BASE_URL` returns `/`; always use `${base}/path/` with an explicit `/` separator
- Tailwind CSS v4 is integrated via the Vite plugin (`@tailwindcss/vite`), not the legacy Astro integration
- TypeScript strict mode is enabled
- Dark mode uses class strategy: `@variant dark (&:where(.dark, .dark *))` declared in `src/styles/global.css`. The `.dark` class is set on `<html>` by an inline `<script is:inline>` in `<head>` before paint to avoid flash

**Content system:** Blog posts are Markdown files in `src/content/blog/` managed via Astro Content Collections. The schema (defined in `src/content.config.ts`) requires `title`, `description`, and `pubDate`; supports optional `tags`, `updatedDate`, and `draft` fields. Posts with `draft: true` are excluded from all listings.

**Routing:**
- `src/pages/index.astro` — Homepage with sorted post feed
- `src/pages/blog/index.astro` — Full archive listing
- `src/pages/blog/[slug].astro` — Dynamic post pages using `getStaticPaths()`
- `src/pages/search.astro` — Full-page real-time search; filters posts client-side as the user types, highlights matched terms in yellow, shows result count

**Layout:** All pages use `src/layouts/BaseLayout.astro` which provides:
- Responsive navbar (logo, Posts link, search icon, dark/light toggle)
- Search icon links to `/search/` page
- Dark mode toggle: icons use `hidden dark:block` / `block dark:hidden` CSS classes so visibility is driven by CSS (no JS icon toggling), preventing flicker on page load
- Dark mode preference persisted to `localStorage`; applied before paint via inline script
- Responsive container (`max-w-3xl`) with mobile-first spacing

**Responsive design:** All breakpoints use Tailwind's `sm:` prefix (640px). Navbar uses a fixed height (`h-8 sm:h-9`) with `items-center` for vertical alignment. Page headings scale from `text-2xl` on mobile to `text-3xl` on `sm+`.

**Deployment:** GitHub Actions (`.github/workflows/deploy.yml`) builds and deploys to GitHub Pages on push to `main`.
