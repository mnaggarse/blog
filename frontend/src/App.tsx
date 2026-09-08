import { useEffect, useState } from "react";
import { fetchPosts, type Post } from "@/lib/api";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeaturedPostCard } from "@/components/FeaturedPostCard";
import { PostGrid } from "@/components/PostGrid";
import { FeaturesSection } from "@/components/FeaturesSection";
import { NewsletterCTA } from "@/components/NewsletterCTA";
import { Footer } from "@/components/Footer";

export default function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadPosts() {
      setIsLoading(true);
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (err) {
        console.error("Failed to load posts:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  const featuredPost = posts.length > 0 ? posts[0] : null;
  const remainingPosts = posts.length > 1 ? posts.slice(1) : posts;

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      {/* Navigation */}
      <Navbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      {/* Main Content */}
      <main>
        {/* Hero Banner */}
        <Hero />

        {/* Post Showcase Container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Featured Post Card */}
          {!isLoading && featuredPost && <FeaturedPostCard post={featuredPost} />}

          {/* Grid of Blog Posts */}
          <PostGrid posts={remainingPosts} isLoading={isLoading} searchQuery={searchQuery} />
        </div>

        {/* Platform Features Section */}
        <FeaturesSection />

        {/* Newsletter Subscription CTA */}
        <NewsletterCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
