import { HugeiconsIcon } from "@hugeicons/react";
import { FeatherIcon } from "@hugeicons/core-free-icons";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <HugeiconsIcon icon={FeatherIcon} className="size-4" />
            </div>
            <span className="font-heading text-base font-bold tracking-tight text-foreground">
              Chronicle
            </span>
            <span className="text-xs text-muted-foreground ml-2">
              © {new Date().getFullYear()} Chronicle Inc. All rights reserved.
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground font-medium">
            <a href="#explore" className="hover:text-foreground transition-colors">
              Explore
            </a>
            <a href="#topics" className="hover:text-foreground transition-colors">
              Topics
            </a>
            <a href="#features" className="hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
