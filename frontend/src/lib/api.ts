export interface Author {
  id: number;
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export interface Post {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  content: string;
  userId: number;
  createdAt: string;
  updatedAt?: string;
  author: Author;
  likesCount: number;
  commentsCount: number;
  tag?: string;
  readTime?: string;
}

const FALLBACK_POSTS: Post[] = [
  {
    id: 101,
    title: "The Architecture of Distributed Systems in 2026",
    description:
      "An in-depth exploration of fault isolation, edge-first data synchronization, and event-driven micro-services built for massive scale.",
    content:
      "Building resilient distributed systems requires a departure from traditional monolithic patterns...",
    imageUrl:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    userId: 1,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    likesCount: 142,
    commentsCount: 28,
    tag: "Engineering",
    readTime: "6 min read",
    author: {
      id: 1,
      name: "Elena Rostova",
      email: "elena@chronicle.io",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 102,
    title: "Crafting Micro-Interactions That Feel Invisible Yet Essential",
    description:
      "How subtle haptic feedback, fluid physics, and intentional spring animations transform good interfaces into magical user experiences.",
    content:
      "Great interaction design lives in the quiet details. When an element responds instantly to human intent...",
    imageUrl:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
    userId: 2,
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    likesCount: 289,
    commentsCount: 45,
    tag: "Design",
    readTime: "4 min read",
    author: {
      id: 2,
      name: "Marcus Vance",
      email: "marcus@designsystems.co",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 103,
    title: "The Art of Long-Form Essay Writing in the Instant Era",
    description:
      "Why deep-dive journalism and reflective personal narratives are experiencing a quiet renaissance among digital readers.",
    content:
      "In a world dominated by seconds-long content snippets, reader appetite for deep intellectual substance is soaring...",
    imageUrl:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80",
    userId: 3,
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    likesCount: 98,
    commentsCount: 16,
    tag: "Culture",
    readTime: "8 min read",
    author: {
      id: 3,
      name: "Sophia Chen",
      email: "sophia@thoughtworks.org",
      avatarUrl:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 104,
    title: "Autonomous Agents & The Next Decade of Creative Work",
    description:
      "Exploring how human synthesis and machine intelligence collaborate to unlock novel artistic and technical domains.",
    content:
      "Artificial intelligence is transitioning from raw generation to goal-oriented synthesis and collaboration...",
    imageUrl:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    userId: 4,
    createdAt: new Date(Date.now() - 86400000 * 9).toISOString(),
    likesCount: 310,
    commentsCount: 52,
    tag: "AI & Tech",
    readTime: "5 min read",
    author: {
      id: 4,
      name: "Dr. Liam Thorne",
      email: "liam@futurelabs.ai",
      avatarUrl:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 105,
    title: "Building High-Performance Web Apps with Vite and Tailwind v4",
    description:
      "A pragmatic overview of sub-millisecond hot module reloads, zero-config styling, and modern React runtime optimizations.",
    content:
      "Tooling has evolved rapidly. Modern web frameworks allow developers to iterate faster than ever before...",
    imageUrl:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
    userId: 5,
    createdAt: new Date(Date.now() - 86400000 * 12).toISOString(),
    likesCount: 175,
    commentsCount: 22,
    tag: "Engineering",
    readTime: "7 min read",
    author: {
      id: 5,
      name: "Alexander Wright",
      email: "alex@devpulse.io",
      avatarUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    },
  },
  {
    id: 106,
    title: "Design Systems Beyond UI Components: Culture & Workflows",
    description:
      "Why successful design systems require organizational alignment, shared vocabulary, and continuous developer-designer feedback loops.",
    content:
      "A design system is not just a UI component library; it is a shared mindset and contract across teams...",
    imageUrl:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&w=1200&q=80",
    userId: 2,
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
    likesCount: 215,
    commentsCount: 34,
    tag: "Design",
    readTime: "5 min read",
    author: {
      id: 2,
      name: "Marcus Vance",
      email: "marcus@designsystems.co",
      avatarUrl:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    },
  },
];

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`API server returned ${response.status}. Using fallback posts.`);
      return FALLBACK_POSTS;
    }

    const data = await response.json();
    if (Array.isArray(data) && data.length > 0) {
      return data.map((post: any, idx: number) => ({
        ...post,
        tag: post.tag || ["Engineering", "Design", "Culture", "AI & Tech", "Writing"][idx % 5],
        readTime: post.readTime || `${Math.max(3, Math.ceil((post.content?.length || 500) / 400))} min read`,
      }));
    }

    return FALLBACK_POSTS;
  } catch (error) {
    console.warn("Failed to reach backend API. Using curated fallback posts.", error);
    return FALLBACK_POSTS;
  }
}
