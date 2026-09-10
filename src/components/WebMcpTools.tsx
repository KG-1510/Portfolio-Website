import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerWebMcpTools, toolError, toolJson } from "@/lib/webmcp";
import { profile } from "@/data/profile";
import { getProject, projects } from "@/data/projects";
import { flagship } from "@/data/flagship";
import { site } from "@/data/site";

/**
 * Site-wide WebMCP tools, mounted once inside the router so they exist on every
 * page. Every tool is read-only over content this site already shows. The one
 * that touches the outside world, draft_contact_email, only opens the visitor's
 * own mail client; a human still has to press send.
 */

const PAGES: Record<string, string> = {
  home: "/",
  work: "/work",
  about: "/about",
  contact: "/contact",
};

const publicProject = (slug: string) => {
  const p = getProject(slug);
  if (!p) return null;
  return {
    slug: p.slug,
    name: p.name,
    description: p.description,
    fullDescription: p.fullDescription,
    stack: p.stack,
    impact: p.impact,
    highlights: p.highlights,
    challenges: p.challenges ?? [],
    github: p.github ?? null,
    live: p.live ?? null,
    url: `${site.url}work/${p.slug}`,
    markdown: `${site.url}work/${p.slug}.md`,
  };
};

export function WebMcpTools() {
  const navigate = useNavigate();

  useEffect(() => {
    return registerWebMcpTools([
      {
        name: "get_profile",
        description:
          "Who Kushagra Gupta is: title, location, bio, skills, stack, social links, resume URL, and what roles he is open to. Use for any 'who is', 'what does he do', or 'is he available' question.",
        execute: () =>
          toolJson({
            name: profile.name,
            title: profile.title,
            headline: profile.headline,
            location: profile.location,
            intro: profile.intro,
            bio: profile.bio,
            offWork: profile.offWork,
            philosophy: profile.philosophy,
            skills: profile.skills,
            stack: profile.stack,
            availability: profile.availability,
            email: profile.email,
            resume: `${site.origin}${profile.resume}`,
            links: {
              site: site.url,
              github: profile.social.github.href,
              linkedin: profile.social.linkedin.href,
              youtube: profile.social.youtube.href,
              instagram: profile.social.instagram.href,
            },
          }),
      },
      {
        name: "list_projects",
        description:
          "Every project on this site with slug, one-line description, stack, impact, and links. The flagship is the Stride Run Club web app. Call get_project with a slug for the full write-up.",
        execute: () =>
          toolJson({
            flagship: flagship.slug,
            projects: projects.map((p) => ({
              slug: p.slug,
              name: p.name,
              description: p.description,
              stack: p.stack,
              impact: p.impact,
              github: p.github ?? null,
              live: p.live ?? null,
              url: `${site.url}work/${p.slug}`,
            })),
          }),
      },
      {
        name: "get_project",
        description:
          "Full detail for one project: description, stack, impact, highlights, challenges, code and live links. Slugs come from list_projects.",
        inputSchema: {
          type: "object",
          required: ["slug"],
          properties: {
            slug: { type: "string", description: "Project slug, e.g. stride-club" },
          },
        },
        execute: (args) => {
          const slug = String(args.slug ?? "").trim();
          const project = publicProject(slug);
          if (!project) {
            return toolError(
              `No project with slug "${slug}". Valid slugs: ${projects.map((p) => p.slug).join(", ")}.`,
            );
          }
          return toolJson(project);
        },
      },
      {
        name: "get_experience",
        description:
          "Work history (company, role, dates, bullets), education, and honors. Use for questions about where Kushagra has worked or what he did there.",
        execute: () =>
          toolJson({
            experience: profile.experience,
            education: profile.education,
            honors: profile.honors,
          }),
      },
      {
        name: "open_page",
        description: `Navigate this browser to a page on the site. Valid values: ${Object.keys(PAGES).join(", ")}, or a project slug from list_projects. Read-only navigation.`,
        inputSchema: {
          type: "object",
          required: ["page"],
          properties: {
            page: { type: "string", description: "home, work, about, contact, or a project slug" },
          },
        },
        execute: (args) => {
          const page = String(args.page ?? "").trim().toLowerCase();
          const path = PAGES[page] ?? (getProject(page) ? `/work/${page}` : null);
          if (!path) return toolError(`Unknown page "${page}".`);
          navigate(path);
          return toolJson({ opened: `${site.url}${path.replace(/^\//, "")}` });
        },
      },
      {
        name: "draft_contact_email",
        description:
          "Open the visitor's mail client with an email to Kushagra prefilled. Nothing is sent until the human presses send in their own mail app. Use when someone wants to reach out about a role or a project.",
        inputSchema: {
          type: "object",
          required: ["message"],
          properties: {
            subject: { type: "string" },
            message: { type: "string" },
            from_name: { type: "string" },
          },
        },
        execute: (args) => {
          const message = String(args.message ?? "").trim();
          if (!message) return toolError("Provide a message.");
          const subject = encodeURIComponent(String(args.subject ?? "Hello from your portfolio"));
          const from = String(args.from_name ?? "").trim();
          const body = encodeURIComponent(`${message}${from ? `\n\n— ${from}` : ""}`);
          window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
          return toolJson({ status: "mail client opened", to: profile.email });
        },
      },
    ]);
  }, [navigate]);

  return null;
}
