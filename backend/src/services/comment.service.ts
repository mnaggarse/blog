import { eq, desc } from "drizzle-orm";
import { db } from "../db/config.js";
import { comments, users, type NewComment } from "../db/schema.js";

export const addComment = async (
  data: Omit<NewComment, "id" | "createdAt" | "updatedAt">
) => {
  const [newComment] = await db.insert(comments).values(data).returning();

  if (!newComment) {
    throw new Error("Failed to insert comment.");
  }

  const [commentWithAuthor] = await db
    .select({
      id: comments.id,
      content: comments.content,
      postId: comments.postId,
      createdAt: comments.createdAt,
      updatedAt: comments.updatedAt,
      author: {
        id: users.id,
        name: users.name,
        avatarUrl: users.avatarUrl,
      },
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.id, newComment.id));

  return commentWithAuthor;
};

export const getPostComments = async (postId: number) => {
  return await db
    .select({
      id: comments.id,
      content: comments.content,
      postId: comments.postId,
      createdAt: comments.createdAt,
      updatedAt: comments.updatedAt,
      author: {
        id: users.id,
        name: users.name,
        avatarUrl: users.avatarUrl,
      },
    })
    .from(comments)
    .innerJoin(users, eq(comments.userId, users.id))
    .where(eq(comments.postId, postId))
    .orderBy(desc(comments.createdAt));
};

export const deleteComment = async (id: number) => {
  const [deletedComment] = await db
    .delete(comments)
    .where(eq(comments.id, id))
    .returning();

  return deletedComment ?? null;
};
