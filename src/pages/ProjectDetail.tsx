import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { TechTag } from "@/components/ui/TechTag";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProject } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);

  if (!project) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground mb-4">Project not found</h1>
              <p className="text-muted-foreground mb-8">Nothing lives at this URL.</p>
              <Button asChild>
                <Link to="/work">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Work
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  const hasLinks = Boolean(project.github || project.live);

  return (
    <Layout>
      <section className="py-20">
        <div className="container max-w-4xl">
          <Link
            to="/work"
            className="inline-flex items-center font-mono text-sm text-muted-foreground hover:text-primary transition-colors mb-8 opacity-0 animate-fade-in-up"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Work
          </Link>

          <div className="mb-12 opacity-0 animate-fade-in-up stagger-1">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {project.name}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {project.fullDescription}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.stack.map((tech) => (
                <TechTag key={tech}>{tech}</TechTag>
              ))}
            </div>

            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <span className="font-mono text-sm text-primary">
                <span className="text-muted-foreground">{"//"}</span> Impact: {project.impact}
              </span>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-2">
            <CodeDivider label="Highlights" />
          </div>

          <div className="mb-12 opacity-0 animate-fade-in-up stagger-3">
            <ul className="space-y-3">
              {project.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="font-mono text-primary mt-1">✓</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {project.challenges && project.challenges.length > 0 && (
            <>
              <div className="opacity-0 animate-fade-in-up stagger-3">
                <CodeDivider label="What made it hard" />
              </div>

              <div className="mb-12 opacity-0 animate-fade-in-up stagger-4">
                <ul className="space-y-3">
                  {project.challenges.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="font-mono text-primary mt-1">→</span>
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          <div className="flex flex-wrap gap-4 pt-8 border-t border-border opacity-0 animate-fade-in-up stagger-4">
            {project.github && (
              <Button asChild variant="outline" className="font-mono">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </a>
              </Button>
            )}
            {project.live && (
              <Button asChild variant="outline" className="font-mono">
                <a href={project.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live
                </a>
              </Button>
            )}
            {!hasLinks && (
              <p className="font-mono text-xs text-muted-foreground">
                <span className="text-primary">{"//"}</span> Internal work at Atlan. No public code.
              </p>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
}
