import { defineRelations } from "drizzle-orm";
import { integer, pgTable, primaryKey, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  imageUrl: text("image_url").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  tag: text("tag").default("General"),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const likes = pgTable(
  "likes",
  {
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    postId: integer("post_id")
      .notNull()
      .references(() => posts.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.postId] })]
);

export const comments = pgTable("comments", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  postId: integer("post_id")
    .notNull()
    .references(() => posts.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const relations = defineRelations({ users, posts, likes, comments }, (r) => ({
  users: {
    posts: r.many.posts(),
    likes: r.many.likes(),
    comments: r.many.comments(),
  },
  posts: {
    author: r.one.users({
      from: r.posts.userId,
      to: r.users.id,
    }),
    likes: r.many.likes(),
    comments: r.many.comments(),
  },
  likes: {
    user: r.one.users({
      from: r.likes.userId,
      to: r.users.id,
    }),
    post: r.one.posts({
      from: r.likes.postId,
      to: r.posts.id,
    }),
  },
  comments: {
    author: r.one.users({
      from: r.comments.userId,
      to: r.users.id,
    }),
    post: r.one.posts({
      from: r.comments.postId,
      to: r.posts.id,
    }),
  },
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Post = typeof posts.$inferSelect;
export type NewPost = typeof posts.$inferInsert;

export type Like = typeof likes.$inferSelect;
export type NewLike = typeof likes.$inferInsert;

export type Comment = typeof comments.$inferSelect;
export type NewComment = typeof comments.$inferInsert;
