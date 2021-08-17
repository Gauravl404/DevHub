CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TYPE "user_status" AS ENUM (
  'active',
  'inactive'
);

CREATE TYPE "gender" AS ENUM (
  'M',
  'F'
);

CREATE TYPE "relation" AS ENUM (
  'pending',
  'friends',
  'teammates'
);

CREATE TYPE "usertype" AS ENUM (
  'dev',
  'rec'
);

CREATE TYPE "bidstatus" AS ENUM (
  'active',
  'accepted',
  'rejected'
);
CREATE TYPE "jobstatus" AS ENUM (
  'todo',
  'doing',
  'done'
);

CREATE TABLE "users" (
  "user_id" uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  "full_name" varchar,
  "mail_id" varchar NOT NULL,
  "password" varchar,
  "created_at" timestamp  DEFAULT (now()),
  "country_code" int,
  "gender" gender,
  "team_id" int,
  "image" varchar,
  "handle_url" varchar,
  "type" usertype,
  "status" user_status
);

CREATE TABLE "relationship" (
  "relationship_id" uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id_1" uuid NOT NULL,
  "user_id_2" uuid NOT NULL,
  "status" relation,
  "action_user_id" uuid,
  "created_at" timestamp  DEFAULT (now())
);

CREATE TABLE "following" (
  "follower_id" uuid,
  "following_id" uuid
);

CREATE TABLE "projects" (
  "project_id" uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  "posted_by" uuid NOT NULL,
  "title" varchar,
  "description" varchar,
  "amount" integer,
  "created_at" timestamp  DEFAULT (now())
);

CREATE TABLE "bidding" (
  "bid_id" uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  "project_id" uuid,
  "bider_id" uuid,
  "bidder_type" usertype,
  "bidding_amount" integer,
  "description" varchar,
  "created_at" timestamp  DEFAULT (now()),
  "bid_status" bidstatus
);

CREATE TABLE "chat" (
  "chat_id" uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  "from_id" uuid,
  "to_id" uuid,
  "message" varchar,
  "created_at" timestamp  DEFAULT (now())
);

CREATE TABLE "teamchat" (
  "teamchat_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "from_id" uuid,
  "team_id" uuid,
  "message" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "website" (
  "web_id" uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  "user_id" uuid,
  "handle" varchar,
  "type" varchar
);

CREATE TABLE "countries" (
  "code" integer PRIMARY KEY,
  "name" varchar,
  "continent_name" varchar
);

CREATE TABLE "teams" (
  "team_id" uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" varchar,
  "m_id1" uuid,
  "m_id2" uuid,
  "m_id3" uuid,
  "m_id4" uuid,
  "m_id5" uuid,
  "total" integer,
  "created_at" timestamp  DEFAULT (now())
);

CREATE TABLE "posts" (
  "post_id" uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  "title" varchar,
  "user_id" uuid NOT NULL,
  "content" varchar,
  "media" varchar,
  "likes" int,
  "total_comments" int,
  "status" varchar,
  "created_at" timestamp DEFAULT (now())
);

CREATE TABLE "comments" (
  "comment_id" uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  "post_id" uuid,
  "commented_by" uuid,
  "content" varchar,
  "created at" timestamp DEFAULT (now())
);

CREATE TABLE "likes" (
  "like_id" uuid  PRIMARY KEY DEFAULT uuid_generate_v4(),
  "post_id" uuid,
  "liked_by" uuid
);

CREATE TABLE "todos" (
  "job_id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  "job_desc" varchar,
  "link" varchar,
  "media" varchar,
  "assigned_to" uuid,
  "assigned_by" uuid,
  "status" jobstatus,
  "created_at" timestamp DEFAULT (now())
); 

ALTER TABLE "todos" ADD FOREIGN KEY ("assigned_to") REFERENCES "users" ("user_id");

ALTER TABLE "todos" ADD FOREIGN KEY ("assigned_by") REFERENCES "users" ("user_id");

ALTER TABLE "relationship" ADD FOREIGN KEY ("user_id_1") REFERENCES "users" ("user_id");

ALTER TABLE "relationship" ADD FOREIGN KEY ("user_id_2") REFERENCES "users" ("user_id");

ALTER TABLE "relationship" ADD FOREIGN KEY ("action_user_id") REFERENCES "users" ("user_id");

ALTER TABLE "following" ADD FOREIGN KEY ("follower_id") REFERENCES "users" ("user_id");

ALTER TABLE "following" ADD FOREIGN KEY ("following_id") REFERENCES "users" ("user_id");

ALTER TABLE "projects" ADD FOREIGN KEY ("posted_by") REFERENCES "users" ("user_id");

ALTER TABLE "bidding" ADD FOREIGN KEY ("project_id") REFERENCES "projects" ("project_id");

ALTER TABLE "bidding" ADD FOREIGN KEY ("bider_id") REFERENCES "users" ("user_id");

ALTER TABLE "chat" ADD FOREIGN KEY ("from_id") REFERENCES "users" ("user_id");

ALTER TABLE "chat" ADD FOREIGN KEY ("to_id") REFERENCES "users" ("user_id");

ALTER TABLE "teamchat" ADD FOREIGN KEY ("from_id") REFERENCES "users" ("user_id");

ALTER TABLE "users" ADD FOREIGN KEY ("country_code") REFERENCES "countries" ("code");

ALTER TABLE "website" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "teams" ADD FOREIGN KEY ("m_id1") REFERENCES "users" ("user_id");

ALTER TABLE "teams" ADD FOREIGN KEY ("m_id2") REFERENCES "users" ("user_id");

ALTER TABLE "teams" ADD FOREIGN KEY ("m_id3") REFERENCES "users" ("user_id");

ALTER TABLE "teams" ADD FOREIGN KEY ("m_id4") REFERENCES "users" ("user_id");

ALTER TABLE "teams" ADD FOREIGN KEY ("m_id5") REFERENCES "users" ("user_id");

ALTER TABLE "teamchat" ADD FOREIGN KEY ("team_id") REFERENCES "teams" ("team_id");

ALTER TABLE "posts" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("user_id");

ALTER TABLE "comments" ADD FOREIGN KEY ("commented_by") REFERENCES "users" ("user_id");

ALTER TABLE "comments" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("post_id");

ALTER TABLE "likes" ADD FOREIGN KEY ("post_id") REFERENCES "posts" ("post_id");

ALTER TABLE "likes" ADD FOREIGN KEY ("liked_by") REFERENCES "users" ("user_id");

CREATE INDEX "followingid" ON "following" ("follower_id", "following_id");

CREATE INDEX "product_status" ON "posts" ("user_id", "status");

CREATE UNIQUE INDEX ON "posts" ("post_id");
