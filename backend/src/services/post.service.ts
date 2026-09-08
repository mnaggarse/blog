import { eq, desc } from "drizzle-orm";
import { db } from "../db/config.js";
import { posts, type NewPost } from "../db/schema.js";

export const createPost = async (data: Omit<NewPost, "id" | "createdAt" | "updatedAt">) => {
  const [newPost] = await db.insert(posts).values(data).returning();
  return newPost;
};

export const getAllPosts = async () => {
  return await db.select().from(posts).orderBy(desc(posts.createdAt));
};

export const getPostById = async (id: number) => {
  const [post] = await db.select().from(posts).where(eq(posts.id, id));
  return post ?? null;
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
