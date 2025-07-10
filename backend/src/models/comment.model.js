import database from "../config/database.js";

export const getCommentsByPostId = async (postId) => {
  const result = await database.query("select * from comments where post_id = $1", [postId]);
  return result.rows;
};

export const getCommentById = async (commentId) => {
  const result = await database.query("select * from comments where id = $1", [commentId]);
  return result.rows[0];
};

export const createComment = async ({ content, userId, postId }) => {
  await database.query("insert into comments (content, user_id, post_id) values ($1, $2, $3)", [
    content,
    userId,
    postId,
  ]);
};

export const deleteCommentById = async (commentId) => {
  await database.query("delete from comments where id = $1", [commentId]);
};
