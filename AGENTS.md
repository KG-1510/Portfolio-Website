# AGENTS.md

Instructions for AI coding agents working on this repository. It is Kushagra Gupta's
personal portfolio, live at https://kg-1510.github.io/Portfolio-Website/.

## What this is

A Vite + React 18 + TypeScript single-page app, styled with Tailwind CSS and shadcn/ui.
GitHub Actions builds it on every push to `main` and deploys `dist/` to GitHub Pages.

## Where content lives

All copy is data, not JSX. Change these files, not the pages:

- `src/data/profile.ts`: name, bio, experience, education, honors, skills, links
- `src/data/projects.ts`: every project on `/work` and its detail page
- `src/data/flagship.ts`: the Stride Run Club block on the home page
- `src/data/site.ts`: origin, base path, repo URL. The only file to edit if the site moves.

Pages under `src/pages/` render that data. `src/components/ui/` is shadcn; do not edit it.

## Agent-facing files are generated, never hand-edited

`agent-files.plugin.ts` runs at build time and writes into `dist/`:
`llms.txt`, `llms-full.txt`, `agents.md`, `index.md`, `about.md`, `work.md`, `contact.md`,
`work/<slug>.md`, `sitemap.xml`, `robots.txt`, `.well-known/ard.json`,
`.well-known/agent-skills/index.json`, and the JSON-LD in `index.html`. To change what an
agent sees, change the data files or the plugin, then rebuild.

In-page WebMCP tools live in `src/components/WebMcpTools.tsx`. Keep every tool read-only over
content the site already shows. The contact tool may open a `mailto:` link and nothing more.

## Commands

```sh
npm install
npm run dev        # http://localhost:8080/Portfolio-Website/
npm run lint
npm run build      # also copies dist/index.html to dist/404.html for SPA deep links
npm run preview
```

## Rules

- Do not invent numbers, customers, or capabilities. Every figure traces to the LinkedIn
  profile, the Stride Run Club codebase, or a public GitHub repo.
- Keep `base` in `vite.config.ts` equal to `site.base`; GitHub Pages serves from that path.
- Never commit `.env*` or credentials. There are none in this project and it needs none.
- Plain, first-person copy. No filler adjectives.
