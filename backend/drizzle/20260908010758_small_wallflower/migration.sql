CREATE TABLE "posts" (
	"id" serial PRIMARY KEY,
	"title" varchar(255) NOT NULL,
	"image_url" text,
	"description" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
