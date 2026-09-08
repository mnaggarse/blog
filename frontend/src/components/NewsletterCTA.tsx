import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, CheckIcon } from "@hugeicons/core-free-icons";

export function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-primary text-primary-foreground p-8 sm:p-12 lg:p-16 shadow-lg">
          {/* Decorative background shape */}
          <div className="pointer-events-none absolute -right-12 -top-12 size-64 rounded-full bg-primary-foreground/10 blur-2xl" />

          <div className="relative max-w-2xl mx-auto text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/15 mb-6">
              <HugeiconsIcon icon={Mail01Icon} className="size-6 text-primary-foreground" />
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight">
              Get weekly curated essays in your inbox
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-primary-foreground/80 leading-relaxed max-w-lg mx-auto">
              Join over 12,000+ readers. No spam ever—just our top hand-picked technology, design, and culture stories delivered once a week.
            </p>

            {subscribed ? (
              <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-foreground/20 px-6 py-2.5 text-xs font-semibold text-primary-foreground animate-in fade-in zoom-in duration-300">
                <HugeiconsIcon icon={CheckIcon} className="size-4" />
                Thank you for subscribing! Check your email for confirmation.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 h-11 text-xs focus-visible:ring-primary-foreground/30"
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="h-11 px-6 text-xs font-bold shrink-0 shadow-sm"
                >
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
