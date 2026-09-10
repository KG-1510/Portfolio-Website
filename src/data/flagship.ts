// The flagship project block on the home page. Facts come from the Stride codebase
// (stride-run-club-frontend) and the club's own published numbers.

import {
  Activity,
  BadgeCheck,
  Bot,
  CreditCard,
  Palette,
  Server,
  Settings2,
  Ticket,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

export interface FlagshipCapability {
  icon: LucideIcon;
  title: string;
  body: string;
}

export const flagship = {
  slug: "stride-club",
  label: "Flagship project",
  name: "Stride Run Club web app",
  tagline: "The ticketing platform behind Bengaluru's most engaged running community.",
  url: "https://www.strideclub.in",
  urlLabel: "strideclub.in",
  image: "stride-club.jpg",

  intro:
    "strideclub.in is the web app for Stride Run Club Bengaluru, and I designed, built, and run it alone. It started as a page to point people at. Today it handles sign-ups, paid event registrations, Strava-synced runs, memberships, and the admin work behind 97+ events a year, for a community of 7,000+ athletes and 52,000+ Instagram followers.",

  /** Screenshots under public/stride/, 16:9, in carousel order. */
  screens: [
    { file: "stride-home.jpg", title: "Home", caption: "\"Move as one.\" The landing page, with the next runs and the member CTA." },
    { file: "stride-events.jpg", title: "Events", caption: "Every upcoming run with venue, distance, price, and registration state." },
    { file: "stride-become-a-member.jpg", title: "Onboarding", caption: "Become a member: Google sign-in, profile, and a Stride Tag that tracks runs attended." },
    { file: "stride-leaderboard.jpg", title: "Leaderboard", caption: "Club leaderboard built from Strava-synced runs." },
    { file: "stride-milestones.jpg", title: "Milestones", caption: "Membership tiers and what each one unlocks." },
    { file: "stride-pricing.jpg", title: "Pricing", caption: "Free membership; event tickets priced per run, paid through Razorpay." },
    { file: "stride-about.jpg", title: "About", caption: "Who Stride is, how a run works, and the 2025 numbers." },
    { file: "stride-blog.jpg", title: "Blog", caption: "Markdown blog with an admin editor behind it." },
  ],

  stats: [
    { value: "52,000+", label: "Instagram followers" },
    { value: "7,000+", label: "athletes" },
    { value: "97+", label: "events a year" },
    { value: "2,000+", label: "monthly visitors" },
  ],

  stack: [
    "Next.js 16",
    "React 19",
    "TypeScript",
    "Tailwind CSS v4",
    "Supabase",
    "PostgreSQL",
    "Razorpay",
    "Strava API",
    "Brevo",
    "Framer Motion",
    "MCP",
    "Vercel",
  ],

  capabilities: [
    {
      icon: Server,
      title: "Complete backend",
      body:
        "Next.js App Router on Supabase: Postgres, Auth, Storage, cron jobs, and signed webhooks. One codebase, no separate server to babysit.",
    },
    {
      icon: CreditCard,
      title: "Payment gateway",
      body:
        "Razorpay hosted checkout with signature-verified webhooks, so a registration only confirms once the payment has actually landed.",
    },
    {
      icon: UserPlus,
      title: "User onboarding",
      body:
        "Google sign-in through Supabase Auth, a profile with photo crop, and a become-a-member flow that takes a first-timer from Instagram to their first run.",
    },
    {
      icon: Ticket,
      title: "Ticketing",
      body:
        "Event pages with pricing and capacity, registrations that move through pending, confirmed, and cancelled, and check-in for volunteers at the start line.",
    },
    {
      icon: Activity,
      title: "Run tracking",
      body:
        "Connect Strava, see your runs on a personal My Runs page, and climb a club leaderboard and milestones built from real activity data.",
    },
    {
      icon: BadgeCheck,
      title: "Membership status",
      body:
        "Membership and pricing tiers, status on every profile, and a graduation flow for runners moving up in the club.",
    },
    {
      icon: Settings2,
      title: "Admin-side config",
      body:
        "An admin console for events, registrations, products, users, and check-in, so the club runs day to day without anyone touching the database.",
    },
    {
      icon: Palette,
      title: "UI/UX design",
      body:
        "Designed from the club's own identity: purple and gold, \"Move as one\", Framer Motion, animated leaderboard numbers. Mobile first.",
    },
    {
      icon: Bot,
      title: "Agent-ready",
      body:
        "An MCP server, agent card, OpenAPI spec, and markdown feeds under /.well-known, so AI assistants can read events and answer questions about the club.",
    },
  ] satisfies FlagshipCapability[],
};
