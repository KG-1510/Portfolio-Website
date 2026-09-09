import { Github, Instagram, Linkedin, Mail, Youtube } from "lucide-react";
import { profile } from "@/data/profile";

const socialLinks = [
  { href: profile.social.github.href, icon: Github, label: "GitHub" },
  { href: profile.social.linkedin.href, icon: Linkedin, label: "LinkedIn" },
  { href: profile.social.youtube.href, icon: Youtube, label: "YouTube" },
  { href: profile.social.instagram.href, icon: Instagram, label: "Instagram" },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="font-mono text-sm text-muted-foreground">
            <span className="text-primary">{"//"}</span> © {currentYear} {profile.name}
          </p>

          <p className="font-mono text-xs text-muted-foreground">
            Built with React, Vite, and Tailwind. Deployed on GitHub Pages.
          </p>

          <div className="flex items-center gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
