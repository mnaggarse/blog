import database from "../config/database.js";

export const getAllPosts = async () => {
  const result = await database.query("select * from posts");
  return result.rows;
};

export const getPostById = async (postId) => {
  const result = await database.query("select * from posts where id = $1", [postId]);
  return result.rows[0];
};

export const getUserPosts = async (userId) => {
  const result = await database.query("select * from posts where user_id = $1", [userId]);
  return result.rows;
};

export const createPost = async ({ title, description, image, content, userId }) => {
  await database.query(
    "insert into posts (title, description, image, content, user_id) values ($1, $2, $3, $4, $5)",
    [title, description, image, content, userId]
  );
};

export const updatePost = async ({ title, description, image, content, postId }) => {
  await database.query(
    "update posts set title = $1, description = $2, image = $3, content = $4 where id = $5",
    [title, description, image, content, postId]
  );
};

export const deleteUserPosts = async (userId) => {
  await database.query("delete from posts where user_id = $1", [userId]);
};

export const deletePostById = async ({ userId, postId }) => {
  await database.query("delete from posts where user_id = $1 and id = $2", [userId, postId]);
};
