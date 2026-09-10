/**
 * Vite plugin that writes the agent-facing layer of the site from the same data the
 * pages render. Generated, never hand-edited: the only way to advertise something to
 * an agent is to have it in `src/data`.
 *
 * Build:  writes llms.txt, llms-full.txt, agents.md, index.md, about.md, work.md,
 *         contact.md, work/<slug>.md, sitemap.xml, robots.txt, .well-known/ard.json,
 *         .well-known/agent-skills/index.json into the output dir, and injects JSON-LD
 *         plus a no-JavaScript summary into index.html.
 * Dev:    serves the same files from memory under the site base, so they can be
 *         checked locally.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { Plugin, ResolvedConfig } from "vite";
import { profile } from "./src/data/profile";
import { projects } from "./src/data/projects";
import { flagship } from "./src/data/flagship";
import { site } from "./src/data/site";

const TODAY = new Date().toISOString().slice(0, 10);
const abs = (path = "") => `${site.url}${path.replace(/^\//, "")}`;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const frontmatter = (title: string, description: string, path: string) =>
  [
    "---",
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(description)}`,
    `canonical: ${abs(path)}`,
    `markdown: ${abs(path.replace(/\/$/, "") + (path === "" ? "index" : "") + ".md")}`,
    `last-updated: ${TODAY}`,
    "---",
    "",
  ].join("\n");

const bullets = (items: string[]) => items.map((i) => `- ${i}`).join("\n");

// ---------------------------------------------------------------------------
// Markdown twins
// ---------------------------------------------------------------------------

function indexMd(): string {
  return `${frontmatter(`${profile.name} · Software Engineer`, profile.headline, "")}# ${profile.name}

**${profile.title}** · ${profile.location}

${profile.intro}

## Flagship project: ${flagship.name}

${flagship.intro}

${flagship.stats.map((s) => `- **${s.value}** ${s.label}`).join("\n")}

### What I built

${flagship.capabilities.map((c) => `- **${c.title}.** ${c.body}`).join("\n")}

Stack: ${flagship.stack.join(", ")}.

Live at [${flagship.urlLabel}](${flagship.url}). Full write-up: [work/${flagship.slug}.md](${abs(`work/${flagship.slug}.md`)}).

## More work

${projects
  .filter((p) => p.slug !== flagship.slug)
  .map((p) => `- [${p.name}](${abs(`work/${p.slug}.md`)}): ${p.description}`)
  .join("\n")}

## Elsewhere on this site

- [About](${abs("about.md")}): bio, how I work, full experience, education, honors
- [Work](${abs("work.md")}): every project
- [Contact](${abs("contact.md")}): email, links, availability
- [For agents](${abs("agents.md")}): when to use this site and how to read it
`;
}

function aboutMd(): string {
  const exp = profile.experience
    .map(
      (e) => `### ${e.role}

${e.company} · ${e.location} · ${e.period}

${bullets(e.bullets)}`,
    )
    .join("\n\n");

  return `${frontmatter(`About ${profile.name}`, profile.bio[0], "about")}# About

I'm ${profile.name}, ${profile.title.replace("@", "at")}, based in ${profile.location}.

${profile.bio.join("\n\n")}

${profile.offWork}

## How I work

${bullets(profile.philosophy)}

## Experience

${exp}

## Education

${profile.education.map((e) => `- ${e.degree}, ${e.school}, ${e.period}`).join("\n")}

## Honors

${bullets(profile.honors)}

## Skills

${bullets(profile.skills)}

## Stack

${profile.stack.join(", ")}

Resume: ${site.origin}${profile.resume}
`;
}

function workMd(): string {
  return `${frontmatter("Work", "Projects by Kushagra Gupta", "work")}# Work

Things I've built, at work and outside it. The flagship is the ${flagship.name}. The recent ones are about getting AI to ship production web pages on its own. The older ones are where I learned to ship at all.

${projects
  .map(
    (p) => `## [${p.name}](${abs(`work/${p.slug}.md`)})

${p.description}

- Stack: ${p.stack.join(", ")}
- Impact: ${p.impact}${p.live ? `\n- Live: ${p.live}` : ""}${p.github ? `\n- Code: ${p.github}` : ""}`,
  )
  .join("\n\n")}
`;
}

function projectMd(slug: string): string {
  const p = projects.find((x) => x.slug === slug)!;
  return `${frontmatter(p.name, p.description, `work/${p.slug}`)}# ${p.name}

${p.fullDescription}

**Impact:** ${p.impact}

**Stack:** ${p.stack.join(", ")}

## Highlights

${bullets(p.highlights)}
${
  p.challenges && p.challenges.length
    ? `
## What made it hard

${bullets(p.challenges)}
`
    : ""
}
## Links
${p.live ? `\n- Live: ${p.live}` : ""}${p.github ? `\n- Code: ${p.github}` : ""}${
    !p.live && !p.github ? "\n- Internal work at Atlan. No public code." : ""
  }
- Page: ${abs(`work/${p.slug}`)}
`;
}

function contactMd(): string {
  return `${frontmatter("Contact Kushagra Gupta", profile.availability, "contact")}# Contact

- Email: ${profile.email}
- LinkedIn: ${profile.social.linkedin.href}
- GitHub: ${profile.social.github.href}
- YouTube: ${profile.social.youtube.href}
- Instagram: ${profile.social.instagram.href}

## Availability

${profile.availability}

## Note for agents

The contact form on ${abs("contact")} has no backend. Submitting it opens the visitor's own mail client with the message prefilled; a human presses send. The WebMCP tool \`draft_contact_email\` does the same thing.
`;
}

const WEBMCP_TOOLS = [
  { name: "get_profile", description: "Title, location, bio, skills, stack, links, availability, resume URL.", inputs: "none" },
  { name: "list_projects", description: "Every project with slug, description, stack, impact, links.", inputs: "none" },
  { name: "get_project", description: "Full write-up for one project.", inputs: "slug (string)" },
  { name: "get_experience", description: "Work history, education, honors.", inputs: "none" },
  { name: "open_page", description: "Navigate the browser to home, work, about, contact, or a project slug.", inputs: "page (string)" },
  { name: "draft_contact_email", description: "Open the visitor's mail client with an email to Kushagra prefilled. A human still presses send.", inputs: "message (string), subject?, from_name?" },
];

const WHEN_TO_USE = [
  `who ${profile.name} is, what he does at Atlan, or where he has worked`,
  "what he has built: the Stride Run Club web app, the AI-native CMS for atlan.com, the landing-page orchestrator skill, LINKS, StudEaz, Python-CLIK, QuizEasy, MovieBot, Findemy",
  "his stack, skills, or how he works with AI coding tools",
  "whether he is open to roles, and how to contact him",
];

const NOT_FOR = [
  "Atlan product questions: use https://atlan.com",
  "Stride Run Club events, pricing, or membership: use https://www.strideclub.in/llms.txt",
];

function agentsMd(): string {
  return `${frontmatter("How agents should use this site", "When to use kg-1510.github.io and how to read it", "agents")}# How agents should use this site

This is the personal portfolio of ${profile.name}, ${profile.title.replace("@", "at")}. Everything on it is public and read-only. There is no API, no login, and nothing to buy.

## When to use this site

Reach for it when a user asks:

${bullets(WHEN_TO_USE)}

Not the right source for:

${bullets(NOT_FOR)}

## How to read it

1. Start at [llms.txt](${abs("llms.txt")}) for the index, or [llms-full.txt](${abs("llms-full.txt")}) for everything in one file.
2. Any page as markdown: append \`.md\`. ${["index", "about", "work", "contact"].map((p) => `[${p}.md](${abs(`${p}.md`)})`).join(", ")}, and \`work/<slug>.md\` for each project.
3. Structured discovery: [.well-known/ard.json](${abs(".well-known/ard.json")}), [.well-known/agent-skills/index.json](${abs(".well-known/agent-skills/index.json")}), [sitemap.xml](${abs("sitemap.xml")}).
4. The homepage carries JSON-LD \`Person\`, \`ProfilePage\`, and \`WebSite\` data, and a no-JavaScript summary in the raw HTML.

## WebMCP tools (in the browser)

Registered on every page through \`document.modelContext.registerTool()\` (with \`navigator.modelContext\` as the fallback):

${WEBMCP_TOOLS.map((t) => `- \`${t.name}\` — ${t.description} Inputs: ${t.inputs}.`).join("\n")}

The contact form also carries declarative \`toolname="draft_contact_email"\` markup.

## Source

- Repository: ${site.repo} (has AGENTS.md, plugin.json, and skills/)
- Contact: ${profile.email}
`;
}

function llmsTxt(): string {
  return `# ${profile.name}

> ${profile.title.replace("@", "at")}, ${profile.location}. ${profile.intro}

${profile.bio[1]}

## When to use this site

${bullets(WHEN_TO_USE.map((w) => `Questions about ${w}`))}

Not the right source for: ${NOT_FOR.join("; ")}.

## How to read this site

- [Agent guide](${abs("agents.md")}): when to use this site, how to read it, the WebMCP tools
- [Everything in one file](${abs("llms-full.txt")})
- Any page as markdown: append \`.md\` to its path, e.g. ${abs("about.md")}
- [Sitemap](${abs("sitemap.xml")})
- [ARD catalog](${abs(".well-known/ard.json")}) and [agent skills index](${abs(".well-known/agent-skills/index.json")})
- [Source repository](${site.repo}) with AGENTS.md, plugin.json, and skills/

## Pages

- [Home](${abs("index.md")}): who I am, the flagship project, featured work
- [About](${abs("about.md")}): bio, how I work, full experience, education, honors, skills, stack
- [Work](${abs("work.md")}): every project
- [Contact](${abs("contact.md")}): email, links, availability

## Projects

${projects.map((p) => `- [${p.name}](${abs(`work/${p.slug}.md`)}): ${p.description}`).join("\n")}

## Contact

- Email: ${profile.email}
- LinkedIn: ${profile.social.linkedin.href}
- GitHub: ${profile.social.github.href}
`;
}

const stripFrontmatter = (md: string) => md.replace(/^---[\s\S]*?---\n\n/, "");

function llmsFull(): string {
  return [
    indexMd(),
    aboutMd(),
    workMd(),
    ...projects.map((p) => projectMd(p.slug)),
    contactMd(),
    agentsMd(),
  ]
    .map(stripFrontmatter)
    .join("\n\n---\n\n");
}

// ---------------------------------------------------------------------------
// Machine files
// ---------------------------------------------------------------------------

function sitemapXml(): string {
  const pages = ["", "work", "about", "contact", ...projects.map((p) => `work/${p.slug}`)];
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${pages
  .map(
    (p) => `  <url>
    <loc>${abs(p)}</loc>
    <lastmod>${TODAY}</lastmod>
    <xhtml:link rel="alternate" type="text/markdown" href="${abs(p === "" ? "index.md" : `${p}.md`)}" />
  </url>`,
  )
  .join("\n")}
</urlset>
`;
}

function robotsTxt(): string {
  const allow = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "Claude-User", "PerplexityBot", "Google-Extended", "Applebot-Extended", "DeepSeekBot", "ora-agent"];
  return `# ${profile.name} · ${site.url}
# Answer engines and assistants are welcome. Training-only crawlers are not.

User-agent: *
Allow: /

${allow.map((ua) => `User-agent: ${ua}\nAllow: /`).join("\n\n")}

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

Content-Signal: search=yes, ai-input=yes, ai-train=no

Sitemap: ${abs("sitemap.xml")}
# Agent index: ${abs("llms.txt")}
`;
}

function ardJson() {
  const host = new URL(site.origin).host;
  return {
    specVersion: "1.0",
    provider: { name: profile.name, url: site.url, email: profile.email },
    entries: [
      {
        identifier: `urn:air:${host}:doc:llms-txt`,
        displayName: `${profile.name} site index`,
        description: "Index of every page on the portfolio as markdown, when to use the site, and how to read it.",
        type: "text/plain",
        url: abs("llms.txt"),
        tags: ["llms-txt", "documentation", "portfolio"],
        representativeQueries: [`who is ${profile.name}`, "what has Kushagra Gupta built"],
      },
      {
        identifier: `urn:air:${host}:doc:agents-md`,
        displayName: "Agent guide",
        description: "When to use this site, how to fetch it as markdown, and the WebMCP tools registered in the page.",
        type: "text/markdown",
        url: abs("agents.md"),
        tags: ["agent-instructions", "webmcp"],
        representativeQueries: ["how should an agent read kg-1510.github.io"],
      },
      {
        identifier: `urn:air:${host}:skills:index`,
        displayName: "Agent skills index",
        description: "Machine-readable list of the WebMCP tools and markdown endpoints this site exposes.",
        type: "application/json",
        url: abs(".well-known/agent-skills/index.json"),
        tags: ["agent-skills", "webmcp"],
        representativeQueries: ["what tools does this site expose"],
      },
      {
        identifier: `urn:air:${host}:repo:portfolio`,
        displayName: "Source repository",
        description: "GitHub repository for this site, with AGENTS.md for coding agents, plugin.json, and a SKILL.md.",
        type: "text/html",
        url: site.repo,
        tags: ["source", "agents-md", "plugin"],
        representativeQueries: ["where is the source for this portfolio"],
      },
    ],
  };
}

function agentSkillsJson() {
  return {
    version: "1.0",
    provider: { name: profile.name, url: site.url, email: profile.email },
    skills: [
      ...WEBMCP_TOOLS.map((t) => ({
        name: t.name,
        title: t.name.replace(/_/g, " "),
        description: t.description,
        inputs: t.inputs,
        protocol: "webmcp",
        endpoint: site.url,
        readOnly: t.name !== "draft_contact_email",
      })),
      {
        name: "read_markdown",
        title: "Read any page as markdown",
        description: "Append .md to a page path to fetch it as text/markdown with frontmatter (title, description, canonical, last-updated).",
        inputs: "path",
        protocol: "http",
        endpoint: abs("index.md"),
        readOnly: true,
      },
    ],
    documentation: abs("llms.txt"),
    instructions: abs("agents.md"),
  };
}

// ---------------------------------------------------------------------------
// index.html: JSON-LD + no-JavaScript summary
// ---------------------------------------------------------------------------

function jsonLd() {
  const personId = `${site.url}#person`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.name,
        url: site.url,
        image: `${site.origin}${profile.photo}`,
        jobTitle: "Software Engineer 2",
        description: profile.intro,
        worksFor: { "@type": "Organization", name: "Atlan", url: "https://atlan.com" },
        email: `mailto:${profile.email}`,
        address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressRegion: "Karnataka", addressCountry: "IN" },
        alumniOf: { "@type": "CollegeOrUniversity", name: profile.education[0].school },
        knowsAbout: profile.stack,
        sameAs: [
          profile.social.github.href,
          profile.social.linkedin.href,
          profile.social.youtube.href,
          profile.social.instagram.href,
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": `${site.url}#profilepage`,
        url: site.url,
        name: `${profile.name} · Software Engineer`,
        dateModified: TODAY,
        mainEntity: { "@id": personId },
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}#website`,
        url: site.url,
        name: profile.name,
        author: { "@id": personId },
        inLanguage: "en",
      },
      {
        "@type": "SoftwareApplication",
        name: flagship.name,
        url: flagship.url,
        applicationCategory: "WebApplication",
        operatingSystem: "Web",
        description: flagship.tagline,
        author: { "@id": personId },
        offers: { "@type": "Offer", price: "0", priceCurrency: "INR", description: "Membership is free; event tickets are priced per event." },
      },
    ],
  };
}

function noScriptRoot(): string {
  const b = site.base;
  const others = projects.filter((p) => p.slug !== flagship.slug);
  return `<div id="root">
      <header><h1>${esc(profile.name)}</h1><p>${esc(profile.title.replace("@", "at"))}, ${esc(profile.location)}.</p></header>
      <main>
        <p>${esc(profile.intro)}</p>
        <nav aria-label="Site"><a href="${b}">Home</a> · <a href="${b}work">Work</a> · <a href="${b}about">About</a> · <a href="${b}contact">Contact</a></nav>
        <h2>Flagship project: ${esc(flagship.name)}</h2>
        <p>${esc(flagship.intro)}</p>
        <p><a href="${flagship.url}">${esc(flagship.urlLabel)}</a> · <a href="${b}work/${flagship.slug}">Project details</a></p>
        <h2>More work</h2>
        <ul>${others.map((p) => `<li><a href="${b}work/${p.slug}">${esc(p.name)}</a>: ${esc(p.description)}</li>`).join("")}</ul>
        <h2>Contact</h2>
        <p><a href="mailto:${profile.email}">${profile.email}</a> · <a href="${profile.social.linkedin.href}">LinkedIn</a> · <a href="${profile.social.github.href}">GitHub</a></p>
        <p>${esc(profile.availability)}</p>
        <h2>For agents</h2>
        <p><a href="${b}llms.txt">llms.txt</a> · <a href="${b}agents.md">agents.md</a> · <a href="${b}index.md">index.md</a> · <a href="${b}sitemap.xml">sitemap.xml</a> · <a href="${b}.well-known/ard.json">ard.json</a></p>
      </main>
    </div>`;
}

// ---------------------------------------------------------------------------
// The plugin
// ---------------------------------------------------------------------------

type Generated = { body: string; type: string };

function generate(): Record<string, Generated> {
  const files: Record<string, Generated> = {
    "llms.txt": { body: llmsTxt(), type: "text/plain; charset=utf-8" },
    "llms-full.txt": { body: llmsFull(), type: "text/plain; charset=utf-8" },
    "agents.md": { body: agentsMd(), type: "text/markdown; charset=utf-8" },
    "index.md": { body: indexMd(), type: "text/markdown; charset=utf-8" },
    "about.md": { body: aboutMd(), type: "text/markdown; charset=utf-8" },
    "work.md": { body: workMd(), type: "text/markdown; charset=utf-8" },
    "contact.md": { body: contactMd(), type: "text/markdown; charset=utf-8" },
    "sitemap.xml": { body: sitemapXml(), type: "application/xml; charset=utf-8" },
    "robots.txt": { body: robotsTxt(), type: "text/plain; charset=utf-8" },
    ".well-known/ard.json": { body: JSON.stringify(ardJson(), null, 2) + "\n", type: "application/json; charset=utf-8" },
    ".well-known/agent-skills/index.json": {
      body: JSON.stringify(agentSkillsJson(), null, 2) + "\n",
      type: "application/json; charset=utf-8",
    },
  };
  for (const p of projects) {
    files[`work/${p.slug}.md`] = { body: projectMd(p.slug), type: "text/markdown; charset=utf-8" };
  }
  return files;
}

export function agentFiles(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "agent-files",

    configResolved(resolved) {
      config = resolved;
    },

    transformIndexHtml(html) {
      const ld = `<script type="application/ld+json">${JSON.stringify(jsonLd())}</script>`;
      const alternates = [
        `<link rel="alternate" type="text/markdown" href="${abs("index.md")}" />`,
        `<link rel="sitemap" type="application/xml" href="${abs("sitemap.xml")}" />`,
      ].join("\n    ");
      return html
        .replace("</head>", `    ${alternates}\n    ${ld}\n  </head>`)
        .replace('<div id="root"></div>', noScriptRoot());
    },

    configureServer(server) {
      const files = generate();
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? "").split("?")[0];
        if (!url.startsWith(config.base)) return next();
        const file = files[url.slice(config.base.length)];
        if (!file) return next();
        res.setHeader("Content-Type", file.type);
        res.setHeader("Vary", "Accept");
        res.end(file.body);
      });
    },

    closeBundle() {
      if (config.command !== "build") return;
      const outDir = join(config.root, config.build.outDir);
      for (const [path, file] of Object.entries(generate())) {
        const target = join(outDir, path);
        mkdirSync(dirname(target), { recursive: true });
        writeFileSync(target, file.body);
      }
    },
  };
}
