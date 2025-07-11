import database from "../config/database.js";

export const getAllUsers = async () => {
  const result = await database.query("select * from users");
  return result.rows;
};

export const getUserById = async (userId) => {
  const result = await database.query("select * from users where id = $1", [userId]);
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

export const deleteUser = async (userId) => {
  await database.query("delete from users where id = $1", [userId]);
};
