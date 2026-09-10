// One list drives Home (featured), Work (all) and /work/:slug (detail).

export interface Project {
  slug: string;
  name: string;
  description: string;
  fullDescription: string;
  stack: string[];
  impact: string;
  /** File name under public/thumbs/, 16:9. */
  image?: string;
  highlights: string[];
  challenges?: string[];
  github?: string;
  live?: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    slug: "stride-club",
    image: "stride-club.jpg",
    name: "Stride Run Club web app",
    description:
      "The full stack behind Bengaluru's most engaged running community: sign-ups, Razorpay ticketing, Strava-synced runs, memberships, and an admin console. Designed, built, and run solo.",
    fullDescription:
      "strideclub.in is the web app for Stride Run Club Bengaluru, a community of 7,000+ athletes and 52,000+ Instagram followers that runs 97+ events a year. I designed, built, and run it alone on Next.js 16 and Supabase. It handles user onboarding with Google sign-in, paid event registrations through Razorpay with signature-verified webhooks, Strava-connected run tracking with a club leaderboard, membership and pricing tiers, transactional email through Brevo, and an admin console for events, registrations, products, users, and start-line check-in. It also exposes an MCP server and agent card so AI assistants can read the club's events.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "Razorpay", "Strava API", "Tailwind CSS v4", "Vercel"],
    impact: "7,000+ athletes, 97+ events a year, payments live, solo build",
    highlights: [
      "Complete backend on Supabase: Postgres, Auth, Storage, cron, signed webhooks",
      "Razorpay payment gateway with signature-verified webhooks",
      "User onboarding: Google sign-in, profile setup, become-a-member flow",
      "Ticketing: event pages, capacity, registration states, start-line check-in",
      "Run tracking: Strava connect, My Runs, club leaderboard and milestones",
      "Membership status and pricing tiers on every profile",
      "Admin-side config for events, registrations, products, users",
      "UI/UX designed from the club's identity, mobile first, Framer Motion",
      "Agent-ready: MCP server, agent card, OpenAPI spec, markdown feeds",
    ],
    challenges: [
      "Turning a static club page into a product with accounts, payments, and an admin console, alone",
      "Making payment state trustworthy: a registration confirms only after the webhook signature checks out",
      "Keeping one Supabase project safe across staging and production deploys",
    ],
    live: "https://www.strideclub.in",
    featured: false,
  },
  {
    slug: "ai-native-cms",
    image: "ai-native-cms.jpg",
    name: "AI-native CMS for atlan.com",
    description:
      "A content system that lets Marketing launch campaign pages themselves. Campaign go-live went from 4 days to under 5 minutes across 500+ pages.",
    fullDescription:
      "Every campaign page on atlan.com used to wait on an engineer. I built an AI-native CMS and a set of self-serve growth assets so Marketing and Creative Studio could launch and tweak pages on their own. Go-live dropped from 4 days to under 5 minutes across 500+ pages, and the team ships far more experiments without adding people.",
    stack: ["React", "TypeScript", "Claude Code", "Cursor"],
    impact: "Go-live 4 days → under 5 minutes, 500+ pages",
    highlights: [
      "Self-serve landing pages for non-engineers, turnaround from 4 days to about an hour",
      "Claude-based design system rollout across the site",
      "Performance and SEO budgets held while velocity went up",
      "Figma-to-Cursor pipeline producing components about 90% code-accurate",
    ],
    challenges: [
      "Letting non-engineers ship without breaking performance or SEO",
      "Getting Marketing and Creative Studio to use AI day to day, not just once",
    ],
    featured: true,
  },
  {
    slug: "landing-page-orchestrator",
    image: "landing-page-orchestrator.svg",
    name: "Landing-page orchestrator skill",
    description:
      "The team's first Claude Code skill that builds a landing page end to end with no engineer in the loop. Taken from a rough proof of concept to production.",
    fullDescription:
      "An orchestrator skill for Claude Code that takes a brief and produces a finished landing page: copy, layout, build, and review, with performance, accessibility, and SEO checks built in. It started as a rough proof of concept and now runs in production with no engineer in the loop. Around it sit Slack-to-Cursor and Jira-to-cloud-agent pipelines, so anyone on the team can file work and get a reviewed change back.",
    stack: ["Claude Code", "Anthropic Skills", "MCP", "n8n", "React"],
    impact: "No engineer in the loop, running in production",
    highlights: [
      "Brief in, reviewed landing page out",
      "Guardrails for performance, accessibility, and SEO baked into the run",
      "Slack-triggered issue handling through n8n and MCP servers",
      "Cut LLM token usage around 10x with the right skills and plugins",
    ],
    challenges: [
      "Getting agent output to production quality reliably, not just once",
      "Keeping the runs cheap enough to be worth automating",
    ],
    featured: true,
  },
  {
    slug: "links",
    image: "links.svg",
    name: "LINKS",
    description:
      "One link for all your links. An open-source linktr.ee alternative with analytics and short links through KZILLA.XYZ, built at SRMKZILLA.",
    fullDescription:
      "LINKS lets you put every link you care about behind a single URL, with click analytics and short links through KZILLA.XYZ. I built it as Technical Associate Lead at SRMKZILLA, Mozilla's campus club at SRM, on Next.js, Tailwind, MongoDB, and Node.js. The code is open source under the srm-kzilla org.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "MongoDB", "Node.js"],
    impact: "Open source under srm-kzilla",
    highlights: [
      "Single public link page with analytics",
      "Short links through KZILLA.XYZ",
      "Open source under the srm-kzilla org",
    ],
    github: "https://github.com/srm-kzilla/links",
    featured: true,
  },
  {
    slug: "studeaz",
    image: "studeaz.svg",
    name: "StudEaz",
    description:
      "A browser extension that downloads multiple files from Google Classroom in one go. Shipped on the Chrome and Firefox stores under Microsoft Learn Student Ambassadors SRM.",
    fullDescription:
      "Google Classroom makes you download attachments one at a time. StudEaz adds a bulk download so you don't have to. Built in plain HTML, CSS, and JavaScript, published on both the Chrome and Firefox extension stores, and open source. 100+ installs.",
    stack: ["JavaScript", "HTML", "CSS", "Browser Extensions"],
    impact: "100+ installs across Chrome and Firefox",
    highlights: [
      "Bulk download of Google Classroom attachments",
      "Published on Chrome and Firefox stores",
      "Open source project under MLSA SRM",
    ],
  },
  {
    slug: "python-clik",
    image: "python-clik.jpg",
    name: "Python-CLIK",
    description:
      "Command Line Interface for Keys: a pip-installable tool that encrypts your API keys and secret tokens so they never reach a remote repo.",
    fullDescription:
      "CLIK is a small Python CLI for keeping API keys and auth tokens out of your commits. It encrypts them locally and only decrypts with a unique key you hold. Built under Microsoft Learn Student Ambassadors SRM and published on PyPI.",
    stack: ["Python", "Encryption", "CLI", "PyPI"],
    impact: "Published on PyPI, open source",
    highlights: [
      "Encrypts API keys and tokens before they hit a remote",
      "Decrypts only with a unique encryption key",
      "Installable with pip",
    ],
    github: "https://github.com/MLSA-SRM/Python-CLIK",
    live: "https://pypi.org/project/python-clik/1.0/",
  },
  {
    slug: "quizeasy",
    image: "quizeasy.jpg",
    name: "QuizEasy",
    description:
      "Upload a PDF or DOC and get quiz questions generated from it on the go.",
    fullDescription:
      "QuizEasy turns a document into a question set. Upload a PDF or DOC, and a Flask backend runs NLP over the text to generate questions and answers you can practise with. Bootstrap frontend, SQLite for storage.",
    stack: ["Python", "Flask", "NLP", "SQLite", "Bootstrap"],
    impact: "25 stars on GitHub",
    highlights: [
      "Question generation from uploaded PDF and DOC files",
      "Flask API with an NLP pipeline",
      "Bootstrap frontend, SQLite storage",
    ],
    github: "https://github.com/KG-1510/QuizEasy",
  },
  {
    slug: "moviebot",
    image: "moviebot.svg",
    name: "MovieBot",
    description:
      "A movie recommendation chatbot built on a cosine-similarity model and served with Flask. My final-year project.",
    fullDescription:
      "MovieBot is a chat interface over a recommendation model. Describe what you like and it comes back with movies scored by cosine similarity over the catalogue. Built as my final-year project with Python and Flask.",
    stack: ["Python", "Flask", "NLP", "Cosine Similarity"],
    impact: "Final-year project",
    highlights: [
      "Chat-style recommendations",
      "Cosine-similarity model over the movie catalogue",
      "Flask backend with an HTML and CSS frontend",
    ],
    github: "https://github.com/KG-1510/Movie-recommender-bot",
  },
  {
    slug: "findemy",
    image: "findemy.jpg",
    name: "Findemy",
    description:
      "A cut-down, full-stack Udemy clone built on React, Node.js, Express, and MongoDB.",
    fullDescription:
      "Findemy recreates the core of Udemy on the MERN stack: a React and TypeScript frontend styled with Tailwind, and a Node.js and Express API on MongoDB. Frontend and backend live in separate repos and the app is deployed on Netlify.",
    stack: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    impact: "Full-stack, deployed on Netlify",
    highlights: [
      "React and TypeScript frontend with Tailwind",
      "Node.js and Express API on MongoDB",
      "Separate frontend and backend repos",
    ],
    github: "https://github.com/KG-1510/findemy",
    live: "https://findemy.netlify.app",
  },
];

export const thumbUrl = (file: string) =>
  `${import.meta.env?.BASE_URL ?? "/Portfolio-Website/"}thumbs/${file}`;

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string | undefined): Project | undefined {
  return slug ? projects.find((p) => p.slug === slug) : undefined;
}
