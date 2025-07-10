import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const database = new Pool();
await database.connect();

// init database
try {
  // await database.query("drop table if exists likes");
  // await database.query("drop table if exists comments");
  // await database.query("drop table if exists posts");
  // await database.query("drop table if exists users");

  // users table
  await database.query(`
    create table if not exists users (
      id serial primary key,
      name varchar(25) not null,
      email varchar(255) not null unique,
      password varchar(255) not null,
      image text,
      description text,
      created_at timestamp default now()
    )
  `);

  // posts table
  await database.query(`
    create table if not exists posts (
      id serial primary key,
      title varchar(255) not null,
      description text not null,
      image text not null,
      content text not null,
      created_at timestamp default now(),
      user_id int not null,
      foreign key (user_id) references users(id) on delete cascade
    )
  `);

  // comments table
  await database.query(`
    create table if not exists comments (
      id serial primary key,
      content text not null,
      created_at timestamp default now(),
      user_id int not null,
      post_id int not null,
      foreign key (user_id) references users(id) on delete cascade,
      foreign key (post_id) references posts(id) on delete cascade
    )
  `);

  // likes table
  await database.query(`
    create table if not exists likes (
      user_id int not null,
      post_id int not null,
      foreign key (user_id) references users(id) on delete cascade,
      foreign key (post_id) references posts(id) on delete cascade
    )
  `);
} catch (err) {
  console.error(err);
}

export default database;
