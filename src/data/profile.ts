// Everything about me that the site renders. Edit here, not in the pages.

export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  location: string;
  /** File name under public/logos/, rendered next to the entry. */
  logo?: string;
  bullets: string[];
}

export const logoUrl = (file: string) => `${import.meta.env.BASE_URL}logos/${file}`;

export const profile = {
  name: "Kushagra Gupta",
  firstName: "Kushagra",
  handle: "kushagra",
  title: "Software Engineer 2 @ Atlan",
  headline: "I ship production web apps and AI agents, fast.",
  location: "Bengaluru, India",
  email: "guptakushagra15.10@gmail.com",
  siteUrl: "https://kg-1510.github.io/Portfolio-Website/",
  photo: `${import.meta.env.BASE_URL}me.jpg`,
  resume: `${import.meta.env.BASE_URL}resume.pdf`,

  intro:
    "I turn ideas into shipped, production web products in hours instead of weeks. The trick isn't writing more code. It's building the systems that let AI do the heavy lifting, and getting them right.",

  bio: [
    "I'm an AI-native software engineer with 3+ years building frontend and full-stack web experiences. A lot of my work these days is teaching AI how my team designs, codes, and ships, then letting it run.",
    "At Atlan I went from SWE1 to SWE2 in about 18 months. I built an AI-native CMS that took campaign go-live from 4 days to under 5 minutes across 500+ pages, put our animated homepage live in 12 hours with Cursor and Claude Code, and wrote our first orchestrator skill that builds landing pages on its own with no engineer in the loop. I also led our move from Cursor to Claude Code and cut LLM token usage by around 10x with the right skills and plugins.",
    "Before Atlan I owned customer-facing features end to end at Bajaj Finserv, in a regulated fintech setup where mistakes are expensive: 50% faster page loads, 20+ smoother user journeys, and Intern of the Year out of 277 interns. Outside work I built and launched strideclub.in on my own with Next.js and Supabase. It's my run club's main website, 2,000+ visitors a month, and it's turning into a ticketing platform on Razorpay.",
  ],

  offWork:
    "Away from the keyboard I'm a fingerstyle guitarist (Trinity College London, Plectrum Guitar Level 3) and I won MI's Got Talent at IIT Bombay's Mood Indigo in 2019.",

  philosophy: [
    "Build the system, not just the screen",
    "Shipping fast only counts if it stays reliable and cheap to run",
    "Performance and accessibility are the parts users actually feel",
    "Teach the AI how the team works, then let it run",
  ],

  skills: [
    "Frontend Engineering",
    "AI-Native Workflows",
    "Agent Orchestration",
    "Design Systems",
    "Web Performance",
    "Accessibility",
  ],

  stack: [
    "React",
    "Next.js",
    "Vue.js",
    "TypeScript",
    "Node.js",
    "Python",
    "GraphQL",
    "Supabase",
    "Tailwind CSS",
    "Claude Code",
    "Cursor",
    "n8n",
    "MCP",
    "LangChain",
    "Docker",
    "Redis",
    "AEM",
  ],

  experience: [
    {
      company: "Atlan",
      logo: "atlan.com.svg",
      role: "Software Engineer 2, Website & Brand",
      period: "Mar 2026 – Present",
      location: "Remote",
      bullets: [
        "Cut new-page and experiment delivery from 4 days to about 2 hours with AI-native workflows in Claude Code and Cursor, with performance, accessibility, and SEO checks built in.",
        "Wrote the team's first orchestrator skill that builds landing pages with no engineer in the loop, and took it from a rough proof of concept to production.",
        "Built reusable AI building blocks (CLAUDE.md, skills, Slack-to-Cursor and Jira-to-cloud-agent pipelines) so engineers and non-engineers can file, build, and review changes.",
        "Took AI agents from prototype to production for landing-page generation and Slack-triggered issue handling, using Claude Code, n8n, and MCP servers.",
      ],
    },
    {
      company: "Atlan",
      logo: "atlan.com.svg",
      role: "Software Engineer 1, Website & Brand",
      period: "Oct 2024 – Mar 2026",
      location: "Remote",
      bullets: [
        "Took campaign go-live on atlan.com from 4 days to under 5 minutes across 500+ pages by building an AI-native CMS and self-serve growth assets.",
        "Cut design-to-development time from days to same-day with a Figma-to-Cursor pipeline that produces components about 90% code-accurate.",
        "Let non-engineering teams launch and tweak landing pages on their own, dropping turnaround from 4 days to about an hour.",
      ],
    },
    {
      company: "Bajaj Finserv",
      logo: "bajajfinserv.in.svg",
      role: "Software Engineer",
      period: "Jul 2023 – Oct 2024",
      location: "Pune",
      bullets: [
        "Made pages 50% faster by leading the Bannerization project, which served product banners across the whole web app without any frontend API calls.",
        "Smoothed out 20+ user journeys on bajajfinserv.in by co-leading an SSO overhaul on a new Solid.js and AEM setup.",
        "Improved Core Web Vitals by 25% on some of the highest-volume pages.",
        "Built a consent-management framework and the Credit Pass UI, Bajaj's personalised CIBIL dashboard.",
      ],
    },
    {
      company: "Bajaj Finserv",
      logo: "bajajfinserv.in.svg",
      role: "SDE Intern (BYTE)",
      period: "Jan 2023 – Jun 2023",
      location: "Pune",
      bullets: [
        "Intern of the Year 2023 out of 277 interns, and 1st runner-up at devTalk 2.0.",
        "Built an internal React and AEM dashboard for the content operations team that cut page go-live time by 50%.",
        "Migrated bajajfinserv.in pages from Oracle CMS to AEM and React as part of the Oracle sunset.",
      ],
    },
    {
      company: "Atlan",
      logo: "atlan.com.svg",
      role: "Frontend Engineer Intern",
      period: "Aug 2022 – Nov 2022",
      location: "Remote",
      bullets: [
        "Shipped Markdown support, richer user analytics, and UI improvements in the Atlan product (Vue.js, TypeScript, Tailwind, Ant Design), reaching 100+ customers.",
        "Closed 40+ QA tickets covering UI bugs and performance.",
      ],
    },
    {
      company: "SkillsTrainer",
      role: "Intern, Technology Team",
      period: "Jan 2022 – Aug 2022",
      location: "Remote",
      bullets: [
        "Built the revamped LMS to move 1.2 million active users onto a homegrown learning interface.",
        "Built the Scholarships, Jobs, and Gift-a-Course modules from scratch in React and Tailwind.",
      ],
    },
    {
      company: "Fiserv",
      logo: "fiserv.com.svg",
      role: "Summer Intern",
      period: "Jun 2022 – Jul 2022",
      location: "Bengaluru",
      bullets: [
        "Migrated the Real Time Payment Network portal frontend from ASP.NET to React, improving load time by 10 seconds.",
        "Coordinated the team to finish a month ahead of schedule, and received a PPO.",
      ],
    },
    {
      company: "Krate (Kuddle)",
      role: "Technology Intern",
      period: "Feb 2021 – May 2022",
      location: "Remote",
      bullets: [
        "Co-created Kuddle.in, a Next.js e-commerce frontend serving 25,000+ page visits a month.",
        "Built the CRM and vendor-management portal frontend in React for 100+ vendors, and lifted traffic 10% through SEO and Lighthouse work.",
      ],
    },
    {
      company: "SRM Institute of Science and Technology",
      logo: "srmist.edu.in.jpg",
      role: "Campus roles",
      period: "2019 – 2022",
      location: "Chennai",
      bullets: [
        "Technical Lead, Microsoft Learn Student Ambassadors SRM: shipped StudEaz (100+ installs) and Python-CLIK on PyPI, and ran the SpookyPy webinar (5,000+ views).",
        "Technical Associate Lead, SRMKZILLA: built LINKS and the Money Mine event portal.",
        "CodeChef SRM recruitment-portal frontend, and electronics engineer on SRM Team Robocon for ABU Robocon 2019.",
      ],
    },
  ] satisfies ExperienceEntry[],

  education: [
    {
      school: "SRM Institute of Science and Technology",
      degree: "B.Tech, Computer Science",
      period: "2019 – 2023",
    },
  ],

  honors: [
    "Intern of the Year 2023, Bajaj Finance (out of 277)",
    "1st Runner-Up, devTalk 2.0",
    "Winner, MI's Got Talent, Mood Indigo 2019",
    "SRMJEEE 2019 Scholarship",
  ],

  social: {
    github: { href: "https://github.com/KG-1510", handle: "@KG-1510" },
    linkedin: { href: "https://www.linkedin.com/in/kg1510", handle: "/in/kg1510" },
    youtube: { href: "https://www.youtube.com/kguitar", handle: "kguitar" },
    instagram: { href: "https://www.instagram.com/kushagra.gupta.15/", handle: "@kushagra.gupta.15" },
  },

  availability:
    "Open to frontend, full-stack, AI-frontend, and forward-deployed roles, remote or in Bengaluru, where being AI-native is the default.",
};
