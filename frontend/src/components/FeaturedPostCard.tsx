import type { Post } from "@/lib/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ThumbsUpIcon,
  Comment01Icon,
  Clock01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

interface FeaturedPostCardProps {
  post: Post;
}

export function FeaturedPostCard({ post }: FeaturedPostCardProps) {
  const authorInitials = post.author.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="mb-12">
      <div className="flex items-center gap-2 mb-4">
        <HugeiconsIcon icon={SparklesIcon} className="size-4 text-primary" />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Featured Story
        </span>
      </div>

      <Card className="overflow-hidden border-border/60 shadow-md hover:shadow-lg transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0">
        {/* Post Cover Image */}
        <div className="lg:col-span-7 relative aspect-video lg:aspect-auto overflow-hidden bg-muted">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-4 left-4">
            <Badge variant="secondary" className="bg-background/90 backdrop-blur-md text-xs font-medium">
              {post.tag}
            </Badge>
          </div>
        </div>

        {/* Content Side */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 lg:p-8">
          <div>
            <CardHeader className="p-0 mb-4 space-y-2">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <HugeiconsIcon icon={Clock01Icon} className="size-3.5" />
                  {post.readTime || "5 min read"}
                </span>
                <span>•</span>
                <span>{formattedDate}</span>
              </div>

              <CardTitle className="text-xl sm:text-2xl font-bold leading-tight hover:text-primary transition-colors cursor-pointer">
                {post.title}
              </CardTitle>

              <CardDescription className="text-sm line-clamp-3 text-muted-foreground/90 mt-2">
                {post.description}
              </CardDescription>
            </CardHeader>
          </div>

          <CardFooter className="p-0 pt-6 mt-6 border-t border-border/40 flex items-center justify-between">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarImage src={post.author.avatarUrl || undefined} alt={post.author.name} />
                <AvatarFallback>{authorInitials}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-foreground">{post.author.name}</span>
                <span className="text-[11px] text-muted-foreground">Author</span>
              </div>
            </div>

            {/* Engagement Counts */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={ThumbsUpIcon} className="size-4" />
                <span>{post.likesCount}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={Comment01Icon} className="size-4" />
                <span>{post.commentsCount}</span>
              </div>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  );
}
