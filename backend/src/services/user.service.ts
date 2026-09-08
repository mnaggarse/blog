import { eq, desc } from "drizzle-orm";
import { db } from "../db/config.js";
import { users, posts, type NewUser } from "../db/schema.js";

export const createUser = async (data: Omit<NewUser, "id" | "createdAt" | "updatedAt">) => {
  const [newUser] = await db.insert(users).values(data).returning();
  return newUser;
};

export const getUserByEmail = async (email: string) => {
  const [user] = await db.select().from(users).where(eq(users.email, email));
  return user ?? null;
};

export const getAllUsers = async () => {
  return await db.select().from(users).orderBy(desc(users.createdAt));
};

export const getUserById = async (id: number) => {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user ?? null;
};

export const getUserPosts = async (userId: number) => {
  return await db
    .select()
    .from(posts)
    .where(eq(posts.userId, userId))
    .orderBy(desc(posts.createdAt));
};

export const updateUser = async (
  id: number,
  data: Partial<Omit<NewUser, "id" | "email" | "createdAt" | "updatedAt">>
) => {
  const [updatedUser] = await db
    .update(users)
    .set({
      ...data,
      updatedAt: new Date(),
    })
    .where(eq(users.id, id))
    .returning();
  return updatedUser ?? null;
};

export const deleteUser = async (id: number) => {
  const [deletedUser] = await db.delete(users).where(eq(users.id, id)).returning();
  return deletedUser ?? null;
};
