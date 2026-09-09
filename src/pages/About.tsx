import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { TechTag } from "@/components/ui/TechTag";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          <div className="max-w-3xl mb-12 opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              About
            </h1>
          </div>

          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main column */}
            <div className="lg:col-span-2 space-y-6">
              <div className="mb-8 opacity-0 animate-fade-in-up stagger-1">
                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-2 border-primary/30 transition-all duration-300 hover:border-primary">
                  <img
                    src={profile.photo}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    width={160}
                    height={160}
                  />
                </div>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-1">
                <p className="text-lg text-foreground leading-relaxed">
                  I'm <span className="text-primary font-medium">{profile.name}</span>, a{" "}
                  {profile.title.replace("@", "at")}, based in {profile.location}.{" "}
                  {profile.bio[0]}
                </p>
              </div>

              {profile.bio.slice(1).map((paragraph, index) => (
                <div
                  key={index}
                  className={`opacity-0 animate-fade-in-up stagger-${Math.min(index + 2, 4)}`}
                >
                  <p className="text-muted-foreground leading-relaxed">{paragraph}</p>
                </div>
              ))}

              <div className="opacity-0 animate-fade-in-up stagger-4">
                <p className="text-muted-foreground leading-relaxed">{profile.offWork}</p>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-4">
                <CodeDivider label="How I work" />
              </div>

              <div className="space-y-4 font-mono text-sm opacity-0 animate-fade-in-up stagger-4">
                {profile.philosophy.map((line) => (
                  <p
                    key={line}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-primary">{"//"}</span> {line}
                  </p>
                ))}
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-4">
                <CodeDivider label="Experience" />
              </div>

              <ol className="relative border-l border-border ml-2 space-y-10 opacity-0 animate-fade-in-up stagger-4">
                {profile.experience.map((entry) => (
                  <li key={`${entry.company}-${entry.role}`} className="pl-6 relative">
                    <span className="absolute -left-[5px] top-2 h-2 w-2 rounded-full bg-primary" />
                    <div className="flex flex-col gap-1 mb-3 md:flex-row md:items-baseline md:justify-between">
                      <div>
                        <h3 className="font-mono text-base font-medium text-foreground">
                          {entry.role}
                        </h3>
                        <p className="text-sm text-primary">
                          {entry.company}
                          <span className="text-muted-foreground"> · {entry.location}</span>
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground whitespace-nowrap">
                        {entry.period}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {entry.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="font-mono text-primary mt-0.5">→</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="opacity-0 animate-fade-in-up stagger-2">
                <Button asChild className="font-mono w-full">
                  <a href={profile.resume} target="_blank" rel="noopener noreferrer">
                    <FileText className="mr-2 h-4 w-4" />
                    Download resume
                  </a>
                </Button>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-2">
                <h2 className="font-mono text-sm text-primary mb-4">
                  <span className="text-muted-foreground">/*</span> Skills{" "}
                  <span className="text-muted-foreground">*/</span>
                </h2>
                <ul className="space-y-2">
                  {profile.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span className="text-primary mr-2">→</span>
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-3">
                <h2 className="font-mono text-sm text-primary mb-4">
                  <span className="text-muted-foreground">/*</span> Stack{" "}
                  <span className="text-muted-foreground">*/</span>
                </h2>
                <div className="flex flex-wrap gap-2">
                  {profile.stack.map((tech) => (
                    <TechTag key={tech}>{tech}</TechTag>
                  ))}
                </div>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-4">
                <h2 className="font-mono text-sm text-primary mb-4">
                  <span className="text-muted-foreground">/*</span> Education{" "}
                  <span className="text-muted-foreground">*/</span>
                </h2>
                <div className="space-y-3 text-sm text-muted-foreground">
                  {profile.education.map((edu) => (
                    <div key={edu.school}>
                      <p className="text-foreground">{edu.degree}</p>
                      <p>{edu.school}</p>
                      <p className="font-mono text-xs">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="opacity-0 animate-fade-in-up stagger-4">
                <h2 className="font-mono text-sm text-primary mb-4">
                  <span className="text-muted-foreground">/*</span> Honors{" "}
                  <span className="text-muted-foreground">*/</span>
                </h2>
                <ul className="space-y-2">
                  {profile.honors.map((honor) => (
                    <li key={honor} className="text-sm text-muted-foreground">
                      <span className="text-primary mr-2">→</span>
                      {honor}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
