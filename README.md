# Portfolio

My personal site: [kg-1510.github.io/Portfolio-Website](https://kg-1510.github.io/Portfolio-Website/)

Vite, React 18, TypeScript, Tailwind CSS, shadcn/ui. Started from Lovable's terminal-style
portfolio template, then rebuilt around real content.

## Edit content

Everything the site says lives in two files:

- `src/data/profile.ts`: name, bio, experience, skills, links
- `src/data/projects.ts`: the projects on `/work` and their detail pages

Pages under `src/pages/` only render that data.

## Run locally

```sh
npm install
npm run dev
```

Opens on `http://localhost:8080`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes
`dist/` to GitHub Pages. `vite.config.ts` sets `base` to `/Portfolio-Website/`, and the build
copies `index.html` to `404.html` so deep links like `/work/stride-club` load on Pages.
