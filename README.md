# AgentLog

Modern personal blog built on Astro 5 + TailwindCSS v4.

Deployed to: https://tarmacChen.github.io/AgentLog

## Stack

- [Astro 5](https://astro.build) — static site framework
- [TailwindCSS v4](https://tailwindcss.com) — utility-first CSS via Vite plugin
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) — prose styles for markdown
- TypeScript (strict mode)
- GitHub Actions + GitHub Pages deployment

## Development

```sh
npm install
npm run dev        # http://localhost:4321/AgentLog/
npm run build      # build to dist/
npm run preview    # preview built site
```

## Adding Posts

Create a new `.md` file in `src/content/blog/` with frontmatter:

```markdown
---
title: "Post Title"
description: "Short description."
pubDate: 2026-01-01
tags: ["tag1", "tag2"]
draft: false
---

Post content here.
```
