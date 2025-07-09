import database from "../config/database.js";

export const getAllUsers = async () => {
  const result = await database.query("select * from users");
  return result.rows;
};

export const getUserById = async (id) => {
  const result = await database.query("select * from users where id = $1", [id]);
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const result = await database.query("select * from users where email = $1", [email]);
  return result.rows[0];
};

export const createUser = async ({ name, email, password }) => {
  await database.query("insert into users (name, email, password) values ($1, $2, $3)", [
    name,
    email,
    password,
  ]);
};
