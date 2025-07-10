import database from "../config/database.js";

export const getPostLikes = async (postId) => {
  const result = await database.query("select count(*) from likes where post_id = $1", [postId]);
  return result.rows[0];
};

export const addLike = async ({ userId, postId }) => {
  await database.query("insert into likes (user_id, post_id) values ($1, $2)", [userId, postId]);
};

export const removeLike = async ({ userId, postId }) => {
  await database.query("delete from likes where user_id = $1 and post_id = $2", [userId, postId]);
};

export const isLiked = async ({ userId, postId }) => {
  const result = await database.query("select * from likes where user_id = $1 and post_id = $2", [
    userId,
    postId,
  ]);
  return result.rows[0];
};
