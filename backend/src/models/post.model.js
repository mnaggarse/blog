import database from "../config/database.js";

export const getAllPosts = async () => {
  const result = await database.query("select * from posts");
  return result.rows;
};

export const getPostById = async (id) => {
  const result = await database.query("select * from posts where id = $1", [id]);
  return result.rows[0];
};

export const createPost = async ({ title, description, image, content, user_id }) => {
  await database.query(
    "insert into posts (title, description, image, content, user_id) values ($1, $2, $3, $4, $5)",
    [title, description, image, content, user_id]
  );
};

export const deleteAllPosts = async () => {
  await database.query("delete from posts");
};

export const deletePostById = async (id) => {
  await database.query("delete from posts where id = $1", [id]);
};
