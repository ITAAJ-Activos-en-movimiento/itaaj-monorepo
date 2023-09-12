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

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"lastname" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"password" varchar(256) NOT NULL,
	"phone" integer,
	"gender" varchar(256),
	"city" varchar(256),
	"state" varchar(256),
	"country" varchar(256),
	"method" varchar(256),
	"status" varchar(50),
	"last_login" varchar(50),
	"login_attempts" integer,
	"locked" boolean DEFAULT false,
	"birthdate" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT users_email PRIMARY KEY("email")
);

CREATE UNIQUE INDEX IF NOT EXISTS "leads_id_index" ON "leads" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "users_id_index" ON "users" ("id");