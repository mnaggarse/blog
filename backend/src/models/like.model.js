import database from "../config/database.js";

export const getLikesCount = async (post_id) => {
  const result = await database.query("select count(*) from likes where post_id = $1", [post_id]);
  return result.rows[0];
};

export const addLike = async ({ user_id, post_id }) => {
  await database.query("insert into likes (user_id, post_id) values ($1, $2)", [user_id, post_id]);
};

export const removeLike = async ({ user_id, post_id }) => {
  await database.query("delete from likes where user_id = $1 and post_id = $2", [user_id, post_id]);
};

export const isLiked = async ({ user_id, post_id }) => {
  const result = await database.query("select * from likes where user_id = $1 and post_id = $2", [
    user_id,
    post_id,
  ]);
  return result.rows[0];
};
