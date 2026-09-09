import { Link } from "react-router-dom";
import { TechTag } from "./TechTag";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { thumbUrl } from "@/data/projects";

interface ProjectCardProps {
  name: string;
  description: string;
  stack: string[];
  impact: string;
  slug: string;
  image?: string;
  /** "grid" stacks the thumbnail above the text; "row" puts it beside on md+ screens. */
  layout?: "grid" | "row";
  className?: string;
}

export function ProjectCard({
  name,
  description,
  stack,
  impact,
  slug,
  image,
  layout = "grid",
  className,
}: ProjectCardProps) {
  const row = layout === "row";

  return (
    <Link to={`/work/${slug}`} className="block h-full">
      <article
        className={cn(
          "group h-full overflow-hidden bg-card border border-border rounded-lg transition-all hover:border-primary/50 hover:bg-card/80 cursor-pointer",
          row && "md:flex",
          className
        )}
      >
        {image && (
          <div
            className={cn(
              "relative overflow-hidden border-b border-border bg-secondary",
              row ? "aspect-video md:aspect-auto md:w-80 md:shrink-0 md:border-b-0 md:border-r" : "aspect-video"
            )}
          >
            <img
              src={thumbUrl(image)}
              alt={`${name} preview`}
              className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
              loading="lazy"
              width={960}
              height={540}
            />
          </div>
        )}

        <div className="flex flex-col p-6 md:flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-mono text-lg font-medium text-foreground group-hover:text-primary transition-colors">
              {name}
            </h3>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </div>

          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {stack.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-border">
            <span className="font-mono text-xs text-primary">
              <span className="text-muted-foreground">{"//"}</span> {impact}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
