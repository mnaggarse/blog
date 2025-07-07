import database from "../config/database.js";

export const getUserById = async (id) => {
  const result = await database.query("select * from users where id = $1", [id]);
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await database.query("select * from users where email = $1", [email]);
  return result.rows[0];
};

export const createUser = async ({ name, email, password, image, description }) => {
  await database.query(
    "insert into users (name, email, password, image, description) values ($1, $2, $3, $4, $5)",
    [name, email, password, image, description]
  );
};
