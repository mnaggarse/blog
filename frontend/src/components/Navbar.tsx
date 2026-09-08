import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  SparklesIcon,
  FeatherIcon,
} from "@hugeicons/core-free-icons";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function Navbar({ searchQuery, onSearchChange }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-300 group-hover:scale-105">
              <HugeiconsIcon icon={FeatherIcon} className="size-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-lg font-bold tracking-tight text-foreground">
                Chronicle
              </span>
              <span className="text-[10px] font-medium tracking-wider text-muted-foreground uppercase -mt-1">
                Publication
              </span>
            </div>
          </a>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 ml-8 text-sm font-medium text-muted-foreground">
            <a
              href="#explore"
              className="px-3 py-1.5 rounded-md hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Explore
            </a>
            <a
              href="#topics"
              className="px-3 py-1.5 rounded-md hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Topics
            </a>
            <a
              href="#features"
              className="px-3 py-1.5 rounded-md hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              Features
            </a>
          </nav>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Search Input */}
          <div className="relative hidden sm:block w-48 md:w-64">
            <HugeiconsIcon
              icon={Search01Icon}
              className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
            />
            <Input
              type="text"
              placeholder="Search stories..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9 h-9 text-xs bg-muted/30 border-muted focus-visible:bg-background transition-all"
            />
          </div>

          {/* User Auth Placeholders */}
          <Button variant="ghost" size="sm" className="text-xs font-semibold">
            Sign In
          </Button>
          <Button size="sm" className="text-xs font-semibold shadow-xs">
            <HugeiconsIcon icon={SparklesIcon} className="size-3.5" data-icon="inline-start" />
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
