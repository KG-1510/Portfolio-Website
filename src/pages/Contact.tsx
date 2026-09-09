import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Github, Instagram, Linkedin, Mail, Send, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { profile } from "@/data/profile";

const socialLinks = [
  { href: profile.social.github.href, icon: Github, label: "GitHub", handle: profile.social.github.handle },
  { href: profile.social.linkedin.href, icon: Linkedin, label: "LinkedIn", handle: profile.social.linkedin.handle },
  { href: `mailto:${profile.email}`, icon: Mail, label: "Email", handle: profile.email },
  { href: profile.social.youtube.href, icon: Youtube, label: "YouTube", handle: profile.social.youtube.handle },
  { href: profile.social.instagram.href, icon: Instagram, label: "Instagram", handle: profile.social.instagram.handle },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // No backend here. The form composes an email in the visitor's own mail client.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}${email ? ` (${email})` : ""}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    toast({
      title: "Opening your email app",
      description: `If nothing happens, write to ${profile.email} directly.`,
    });

    setIsSubmitting(false);
    form.reset();
  };

  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Contact
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Working on something that needs a frontend engineer who can make AI do the
              heavy lifting? Or just want to talk shop about Claude Code, run clubs, or
              guitar? Say hi.
            </p>
          </div>

          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <CodeDivider label="Send a Message" />

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mono text-sm">
                    <span className="text-primary">{"//"}</span> Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    required
                    className="bg-card border-border font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono text-sm">
                    <span className="text-primary">{"//"}</span> Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="bg-card border-border font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="font-mono text-sm">
                    <span className="text-primary">{"//"}</span> Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="What are you building?"
                    rows={6}
                    required
                    className="bg-card border-border font-mono text-sm resize-none"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="font-mono">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </div>

            <div>
              <CodeDivider label="Connect" />

              <div className="space-y-6">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors group"
                  >
                    <div className="flex items-center justify-center w-12 h-12 bg-secondary rounded-lg group-hover:bg-primary/10 transition-colors">
                      <link.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="font-mono text-sm text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </p>
                      <p className="font-mono text-xs text-muted-foreground">{link.handle}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-8 p-4 bg-card border border-border rounded-lg">
                <p className="font-mono text-xs text-muted-foreground mb-2">
                  <span className="text-primary">/*</span> Availability{" "}
                  <span className="text-primary">*/</span>
                </p>
                <p className="text-sm text-foreground">{profile.availability}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
