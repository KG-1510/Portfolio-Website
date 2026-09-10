import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CodeDivider } from "@/components/ui/CodeDivider";
import { TechTag } from "@/components/ui/TechTag";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { flagship } from "@/data/flagship";
import { thumbUrl } from "@/data/projects";

const screenUrl = (file: string) => `${import.meta.env.BASE_URL}stride/${file}`;

export function FlagshipProject() {
  return (
    <section className="py-20 border-t border-border">
      <div className="container">
        <div className="opacity-0 animate-fade-in-up">
          <CodeDivider label={flagship.label} />
        </div>

        {/* Header row: copy left, screenshot right */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="opacity-0 animate-fade-in-up stagger-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {flagship.name}
            </h2>
            <p className="font-mono text-sm text-primary mb-6">
              <span className="text-muted-foreground">{"//"}</span> {flagship.tagline}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">{flagship.intro}</p>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="font-mono transition-transform hover:scale-105">
                <a href={flagship.url} target="_blank" rel="noopener noreferrer">
                  Visit {flagship.urlLabel}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="font-mono">
                <Link to={`/work/${flagship.slug}`}>
                  Project details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 border-t border-border pt-6">
              {flagship.stats.map((stat) => (
                <div key={stat.label}>
                  <dd className="font-mono text-xl md:text-2xl font-bold text-primary tracking-tight">
                    {stat.value}
                  </dd>
                  <dt className="text-xs text-muted-foreground mt-0.5">{stat.label}</dt>
                </div>
              ))}
            </dl>
          </div>

          <a
            href={flagship.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block opacity-0 animate-fade-in-up stagger-2 hover-lift"
            aria-label={`Open ${flagship.urlLabel}`}
          >
            <div className="aspect-video overflow-hidden rounded-xl border-2 border-primary/30 transition-colors hover:border-primary">
              <img
                src={thumbUrl(flagship.image)}
                alt={`${flagship.name} homepage`}
                className="h-full w-full object-cover object-top"
                width={960}
                height={540}
              />
            </div>
          </a>
        </div>

        {/* Screenshot carousel */}
        <div className="mt-12 opacity-0 animate-fade-in-up stagger-3">
          <p className="font-mono text-sm text-primary mb-6">
            <span className="text-muted-foreground">/*</span> Inside the app{" "}
            <span className="text-muted-foreground">*/</span>
          </p>
          <Carousel opts={{ loop: true, align: "start" }} className="relative">
            <CarouselContent className="-ml-4">
              {flagship.screens.map((screen) => (
                <CarouselItem key={screen.file} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <figure className="group h-full rounded-lg border border-border bg-card overflow-hidden transition-colors hover:border-primary/50">
                    <div className="aspect-video overflow-hidden border-b border-border">
                      <img
                        src={screenUrl(screen.file)}
                        alt={`${flagship.name}: ${screen.title}`}
                        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                        width={1200}
                        height={675}
                      />
                    </div>
                    <figcaption className="p-4">
                      <p className="font-mono text-sm text-foreground mb-1">
                        <span className="text-primary">{"//"}</span> {screen.title}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{screen.caption}</p>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 md:-left-5 border-border bg-card hover:bg-card hover:text-primary" />
            <CarouselNext className="-right-3 md:-right-5 border-border bg-card hover:bg-card hover:text-primary" />
          </Carousel>
        </div>

        {/* Capabilities */}
        <div className="mt-12 opacity-0 animate-fade-in-up stagger-3">
          <p className="font-mono text-sm text-primary mb-6">
            <span className="text-muted-foreground">/*</span> What I built{" "}
            <span className="text-muted-foreground">*/</span>
          </p>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {flagship.capabilities.map((cap) => (
              <div
                key={cap.title}
                className="group rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-md bg-secondary text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary">
                    <cap.icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-mono text-sm font-medium text-foreground">{cap.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{cap.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="mt-10 opacity-0 animate-fade-in-up stagger-4">
          <p className="font-mono text-sm text-primary mb-4">
            <span className="text-muted-foreground">/*</span> Stack{" "}
            <span className="text-muted-foreground">*/</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {flagship.stack.map((tech) => (
              <TechTag key={tech}>{tech}</TechTag>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
