CREATE TABLE IF NOT EXISTS "proposals" (
	"id" uuid DEFAULT gen_random_uuid(),
	"name" varchar(256),
	"nationality" varchar(256),
	"email" varchar(256),
	"phone" varchar(256),
	"proposal" varchar(256),
	"funding" varchar(256),
	"funds" varchar(256),
	"development" varchar(256),
	"created_at" timestamp DEFAULT now()
);
