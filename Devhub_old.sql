CREATE DATABASE devhub;

\c devhub;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "user_status" AS ENUM (
  'active',
  'inactive'
);

CREATE TABLE "users" (
  "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "full_name" varchar,
  "mail_id" varchar NOT NULL,
  "password" varchar,
  "created_at" timestamp with time zone DEFAULT (now()),
  "country_code" int DEFAULT 91,
  "team_id" int,
  "image" varchar,
  "type" int,
  "status" user_status DEFAULT 'active'
);

CREATE TABLE "website" (
  "id" int PRIMARY KEY,
  "user_id" int,
  "handle" varchar,
  "type" varchar
);

CREATE TABLE "countries" (
  "code" int PRIMARY KEY,
  "name" varchar,
  "continent_name" varchar
);

CREATE TABLE "posts" (
  "id" int PRIMARY KEY,
  "title" varchar,
  "user_id" int NOT NULL,
  "content" varchar,
  "media" varchar,
  "likes" int,
  "total_comments" int,
  "status" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "comments" (
  "id" int PRIMARY KEY,
  "post_id" int,
  "commented_by" int,
  "content" varchar,
  "created at" varchar
);

CREATE TABLE "likes" (
  "id" int PRIMARY KEY,
  "post_id" int,
  "liked_by" int
);

ALTER TABLE "users" ADD FOREIGN KEY ("country_code") REFERENCES "countries" ("code");

ALTER TABLE "website" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "comments" ADD FOREIGN KEY ("commented_by") REFERENCES "users" ("id");

ALTER TABLE "posts" ADD FOREIGN KEY ("id") REFERENCES "comments" ("post_id");

ALTER TABLE "posts" ADD FOREIGN KEY ("id") REFERENCES "likes" ("post_id");

ALTER TABLE "users" ADD FOREIGN KEY ("id") REFERENCES "likes" ("liked_by");

INSERT INTO countries VALUES (1,'INDIA','INDIA');

 INSERT INTO users(full_name,mail_id,password,country_code,team_id,image,type,status) VALUES (
   'admin','admin@gmail.com','123456',91,01,'https://res.cloudinary.com/devhubimg/image/upload/v1609787709/gj.jpg',1,'active');