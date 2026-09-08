import { and, eq } from "drizzle-orm";
import { db } from "../db/config.js";
import { likes } from "../db/schema.js";

export const toggleLike = async (userId: number, postId: number) => {
  const [existingLike] = await db
    .select()
    .from(likes)
    .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));

  if (existingLike) {
    await db
      .delete(likes)
      .where(and(eq(likes.userId, userId), eq(likes.postId, postId)));

    return { status: "unliked" };
  } else {
    await db.insert(likes).values({ userId, postId });

    return { status: "liked" };
  }
};
