import { useState } from "react";
import type { Post } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ThumbsUpIcon,
  Comment01Icon,
  Clock01Icon,
  Search01Icon,
} from "@hugeicons/core-free-icons";

interface PostGridProps {
  posts: Post[];
  isLoading: boolean;
  searchQuery: string;
}

export function PostGrid({ posts, isLoading, searchQuery }: PostGridProps) {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(
      new Set(posts.map((p) => p.tag).filter((t): t is string => Boolean(t)))
    ),
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.tag === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <section id="explore" className="py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
            Latest Stories
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore insightful articles written by creators around the world.
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 1 && (
          <div id="topics" className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="xs"
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full text-xs px-3.5 h-7 font-medium shrink-0"
              >
                {cat}
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Grid Container */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((idx) => (
            <Card key={idx} className="overflow-hidden">
              <Skeleton className="aspect-16/10 w-full" />
              <CardHeader className="p-5">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-6 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardFooter className="p-5 pt-0 flex justify-between items-center">
                <Skeleton className="size-8 rounded-full" />
                <Skeleton className="h-4 w-16" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-muted/20">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
            <HugeiconsIcon icon={Search01Icon} className="size-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-base font-semibold text-foreground">No stories found</h3>
          <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
            {posts.length === 0
              ? "There are no published stories available right now. Check back later!"
              : "We couldn't find any articles matching your search filter. Try clearing your search query or selecting another topic."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => {
            const authorInitials = post.author.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)
              .toUpperCase();

            const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            });

            return (
              <Card
                key={post.id}
                className="group flex flex-col justify-between overflow-hidden border-border/60 shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  {/* Card Cover Image */}
                  <div className="relative aspect-16/10 overflow-hidden bg-muted">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge
                        variant="secondary"
                        className="bg-background/90 backdrop-blur-md text-[11px] font-medium px-2.5 py-0.5"
                      >
                        {post.tag}
                      </Badge>
                    </div>
                  </div>

                  {/* Card Header & Content */}
                  <CardHeader className="p-5 pb-3 space-y-2">
                    <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <HugeiconsIcon icon={Clock01Icon} className="size-3" />
                        {post.readTime || "4 min read"}
                      </span>
                      <span>•</span>
                      <span>{formattedDate}</span>
                    </div>

                    <CardTitle className="text-base font-bold leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>

                    <CardDescription className="text-xs line-clamp-3 text-muted-foreground/90 mt-1">
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                </div>

                {/* Card Footer */}
                <CardFooter className="p-5 pt-3 border-t border-border/40 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="size-7">
                      <AvatarImage src={post.author.avatarUrl || undefined} alt={post.author.name} />
                      <AvatarFallback className="text-[10px]">{authorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs font-medium text-foreground truncate max-w-27.5">
                      {post.author.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <div className="flex items-center gap-1">
                      <HugeiconsIcon icon={ThumbsUpIcon} className="size-3.5" />
                      <span>{post.likesCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <HugeiconsIcon icon={Comment01Icon} className="size-3.5" />
                      <span>{post.commentsCount}</span>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
