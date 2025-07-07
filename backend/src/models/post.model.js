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

export const updatePost = async ({ title, description, image, content, id }) => {
  await database.query(
    "update posts set title = $1, description = $2, image = $3, content = $4 where id = $5",
    [title, description, image, content, id]
  );
};

export const deleteAllPosts = async () => {
  await database.query("delete from posts");
};

export const deletePostById = async (id) => {
  await database.query("delete from posts where id = $1", [id]);
};
