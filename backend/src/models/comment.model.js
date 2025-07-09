import database from "../config/database.js";

export const getAllComments = async () => {
  const result = await database.query("select * from comments");
  return result.rows;
};

export const getCommentById = async () => {
  const result = await database.query("select * from comments where id = $1", [id]);
  return result.rows[0];
};

export const createComment = async ({ content, user_id, post_id }) => {
  await database.query("insert into comments (content, user_id, post_id) values ($1, $2, $3)", [
    content,
    user_id,
    post_id,
  ]);
};
