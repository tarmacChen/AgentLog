#!/usr/bin/env node
import { writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const title = (process.argv[2] ?? '').trim();
if (!title) {
  console.error('Usage: npm run new -- "My Post Title"');
  process.exit(1);
}

const slug = title
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const today = new Date().toISOString().slice(0, 10);
const filePath = join(__dirname, '../src/content/blog', `${slug}.md`);

if (existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`);
  process.exit(1);
}

const content = `---
title: "${title}"
description: ""
pubDate: ${today}
tags: []
draft: true
---

`;

writeFileSync(filePath, content);
console.log(`Created: src/content/blog/${slug}.md`);
