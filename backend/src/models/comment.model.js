import database from "../config/database.js";

export const getCommentsByPostId = async (postId) => {
  const result = await database.query("select * from comments where post_id = $1", [postId]);
  return result.rows;
};

export const createComment = async ({ content, userId, postId }) => {
  await database.query("insert into comments (content, user_id, post_id) values ($1, $2, $3)", [
    content,
    userId,
    postId,
  ]);
};
