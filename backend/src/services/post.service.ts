import { eq, desc, sql } from "drizzle-orm";
import { db } from "../db/config.js";
import { posts, users, type NewPost } from "../db/schema.js";
import { getPostComments } from "./comment.service.js";

export const createPost = async (data: Omit<NewPost, "id" | "createdAt" | "updatedAt">) => {
  const [newPost] = await db.insert(posts).values(data).returning();
  return newPost;
};

export const getAllPosts = async () => {
  const rows = await db
    .select({
      id: posts.id,
      title: posts.title,
      imageUrl: posts.imageUrl,
      description: posts.description,
      content: posts.content,
      tag: posts.tag,
      userId: posts.userId,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      author: {
        id: users.id,
        name: users.name,
        email: users.email,
        avatarUrl: users.avatarUrl,
      },
      likesCount: sql<number>`(select count(*)::int from likes where likes.post_id = ${posts.id})`,
      commentsCount: sql<number>`(select count(*)::int from comments where comments.post_id = ${posts.id})`,
    })
    .from(posts)
    .innerJoin(users, eq(posts.userId, users.id))
    .orderBy(desc(posts.createdAt));

  return rows;
};

export const getPostById = async (id: number) => {
  const [row] = await db
    .select({
      id: posts.id,
      title: posts.title,
      imageUrl: posts.imageUrl,
      description: posts.description,
      content: posts.content,
      tag: posts.tag,
      userId: posts.userId,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
      author: {
        id: users.id,
        name: users.name,
        email: users.email,
        avatarUrl: users.avatarUrl,
      },
      likesCount: sql<number>`(select count(*)::int from likes where likes.post_id = ${posts.id})`,
      commentsCount: sql<number>`(select count(*)::int from comments where comments.post_id = ${posts.id})`,
    })
    .from(posts)
    .innerJoin(users, eq(posts.userId, users.id))
    .where(eq(posts.id, id));

  if (!row) {
    return null;
  }

  const postComments = await getPostComments(id);

  return {
    ...row,
    comments: postComments,
  };
};

export const updatePost = async (
  id: number,
  data: Partial<Omit<NewPost, "id" | "createdAt" | "updatedAt">>
) => {
  const [updatedPost] = await db
    .update(posts)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(posts.id, id))
    .returning();

  return updatedPost ?? null;
};

export const deletePost = async (id: number) => {
  const [deletedPost] = await db.delete(posts).where(eq(posts.id, id)).returning();
  return deletedPost ?? null;
};
