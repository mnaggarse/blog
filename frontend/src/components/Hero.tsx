import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight01Icon,
  FeatherIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 pb-20 md:pt-24 md:pb-28">
      {/* Background Decorative Gradients */}
      <div className="pointer-events-none absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl opacity-30 dark:opacity-20">
        <div className="aspect-1155/678 w-288.75 bg-linear-to-tr from-primary to-accent" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <div className="mb-6 inline-flex items-center gap-2">
            <Badge
              variant="outline"
              className="px-3.5 py-1 text-xs font-medium rounded-full bg-muted/40 border-primary/20 backdrop-blur-xs"
            >
              <HugeiconsIcon
                icon={SparklesIcon}
                className="size-3 text-primary"
                data-icon="inline-start"
              />
              Introducing Chronicle v2.0 • Digital Publishing Reimagined
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:leading-[1.1]">
            Ideas that reshape how we{" "}
            <span className="underline decoration-primary/40 underline-offset-8">
              build
            </span>
            , think, and create.
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base text-muted-foreground sm:text-lg md:text-xl leading-relaxed">
            A modern publishing platform for software engineers, product
            designers, and independent storytellers. Share deep technical
            insights and thoughtful essays.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#explore">
              <Button
                size="lg"
                className="w-full sm:w-auto text-sm font-semibold px-6 shadow-sm"
              >
                Explore Stories
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  className="size-4"
                  data-icon="inline-end"
                />
              </Button>
            </a>
            <Button
              variant="outline"
              size="lg"
              className="sm:w-auto text-sm font-semibold px-6"
            >
              <HugeiconsIcon
                icon={FeatherIcon}
                className="size-4"
                data-icon="inline-start"
              />
              Start Writing
            </Button>
          </div>

          {/* Metric Stats */}
          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-border/50 pt-8 text-left max-w-xl mx-auto">
            <div>
              <p className="text-2xl font-bold text-foreground tracking-tight">
                12K+
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                Monthly Readers
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground tracking-tight">
                4.8K
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                Published Essays
              </p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground tracking-tight">
                100%
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 font-medium">
                Open Content
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
