CREATE TABLE IF NOT EXISTS "messages" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(255),
	"message" text,
	"property" varchar(256),
	"type" varchar(256),
	"status" varchar(50),
	"created_at" timestamp DEFAULT now() NOT NULL
);
