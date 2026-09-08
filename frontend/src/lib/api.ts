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
  tag: string;
  readTime?: string;
}

const API_BASE_URL = "http://localhost:5000/api";

export async function fetchPosts(): Promise<Post[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.warn(`API server returned status ${response.status}.`);
      return [];
    }

    const data = await response.json();
    if (Array.isArray(data)) {
      return data.map((post: any) => ({
        ...post,
        readTime: post.readTime || `${Math.max(3, Math.ceil((post.content?.length || 500) / 400))} min read`,
      }));
    }

    return [];
  } catch (error) {
    console.warn("Failed to reach backend API.", error);
    return [];
  }
}
