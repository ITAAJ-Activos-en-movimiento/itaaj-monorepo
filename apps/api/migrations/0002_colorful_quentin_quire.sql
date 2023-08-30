CREATE TABLE IF NOT EXISTS "leads" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" integer,
	"gender" varchar(256),
	"lead_status" varchar(256),
	"city" varchar(256),
	"property" varchar(256),
	"state" varchar(256),
	"country" varchar(256),
	"type" varchar(256),
	"status" varchar(50),
	"reportes" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT leads_email PRIMARY KEY("email")
);

CREATE UNIQUE INDEX IF NOT EXISTS "leads_id_index" ON "leads" ("id");