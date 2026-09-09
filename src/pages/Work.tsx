import { Layout } from "@/components/layout/Layout";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects } from "@/data/projects";

export default function Work() {
  return (
    <Layout>
      <section className="py-20">
        <div className="container">
          <div className="max-w-2xl mb-12 opacity-0 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Work
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Things I've built, at work and outside it. The recent ones are about getting
              AI to ship production web pages on its own. The older ones are where I learned
              to ship at all.
            </p>
          </div>

          <div className="opacity-0 animate-fade-in-up stagger-1">
            <CodeDivider label="Projects" />
          </div>

          <div className="grid gap-8">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className={`opacity-0 animate-fade-in-up stagger-${Math.min(index + 2, 4)}`}
              >
                <ProjectCard {...project} className="hover-lift" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
