import { HugeiconsIcon } from "@hugeicons/react";
import {
  FeatherIcon,
  GlobalIcon,
  Comment01Icon,
  ZapIcon,
} from "@hugeicons/core-free-icons";

export function FeaturesSection() {
  const features = [
    {
      icon: FeatherIcon,
      title: "Distraction-Free Writing",
      description:
        "Focus on pure thought. A minimalist markdown environment designed to let your writing flow without visual clutter.",
    },
    {
      icon: GlobalIcon,
      title: "Instant Global Delivery",
      description:
        "High-performance edge caching ensures your articles load instantly for readers anywhere in the world.",
    },
    {
      icon: Comment01Icon,
      title: "Thoughtful Reader Discussions",
      description:
        "Foster meaningful conversations with built-in nested comments, real-time likes, and author interactions.",
    },
    {
      icon: ZapIcon,
      title: "Zero-Setup Analytics",
      description:
        "Understand your readership with privacy-focused engagement metrics, read duration, and audience trends.",
    },
  ];

  return (
    <section id="features" className="py-20 border-t border-border/40 bg-muted/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for thinkers & creators
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Everything you need to publish high-impact articles and build a loyal readership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="flex flex-col p-6 rounded-2xl bg-card border border-border/50 shadow-2xs hover:shadow-md transition-all duration-300"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary mb-5">
                <HugeiconsIcon icon={feature.icon} className="size-5" />
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
