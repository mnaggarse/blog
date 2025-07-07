import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const database = new Pool();
await database.connect();

// init database
try {
  await database.query(`
    create table if not exists users (
      id serial primary key,
      name varchar(255) not null,
      email varchar(255) not null unique,
      password text not null,
      image text,
      description varchar(255),
      created_at timestamp default now()
    )
  `);

  await database.query(`
    create table if not exists posts (
      id serial primary key,
      title varchar(255) not null unique,
      description varchar(255) not null,
      image text not null,
      content text not null,
      user_id int not null,
      foreign key (user_id) references users(id)
    )
  `);
} catch (err) {
  console.error(err);
}

export default database;
