import database from "../config/database.js";

export const getAllComments = async () => {
  const result = await database.query("select * from comments");
  return result.rows;
};

export const createComment = async ({ content, user_id, post_id }) => {
  await database.query("insert into comments (content, user_id, post_id) values ($1, $2, $3)", [
    content,
    user_id,
    post_id,
  ]);
};

export const deleteComment = async (id) => {
  await database.query("delete from comments where id = $1", [id]);
};
