CREATE TABLE IF NOT EXISTS "developments" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256) NOT NULL,
	"description" text,
	"address" varchar(256) NOT NULL,
	"city" varchar(256) NOT NULL,
	"state" varchar(256) NOT NULL,
	"country" varchar(256) NOT NULL,
	"neighborhood" varchar(256),
	"households" varchar(256),
	"street" varchar(256),
	"external_number" varchar(256),
	"internal_number" varchar(256),
	"location" jsonb NOT NULL,
	"price" integer NOT NULL,
	"area" varchar(256),
	"garage" integer,
	"images" varchar(256)[],
	"amenities" varchar(256)[],
	"bedrooms" varchar(256),
	"bathrooms" varchar(256),
	"image" varchar(256),
	"owner" varchar(256),
	"virtualTourUrl" varchar(256),
	"video" varchar(256),
	"antiquity" integer,
	"propertyStatus" varchar(256),
	"type" varchar(256) NOT NULL,
	"blockchainId" varchar(256),
	"category" varchar(256),
	"partner" varchar(256),
	"development" varchar(256),
	"created_at" timestamp DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "leads" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"email" varchar(256) NOT NULL,
	"phone" varchar(255),
	"gender" varchar(256),
	"lead_status" varchar(256),
	"city" varchar(256),
	"property" varchar(256),
	"state" varchar(256),
	"country" varchar(256),
	"type" varchar(256),
	"status" varchar(50),
	"source" varchar(255),
	"reportes" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT leads_email PRIMARY KEY("email")
);

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

CREATE TABLE IF NOT EXISTS "properties" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"slug" varchar(256),
	"description" text,
	"address" varchar(256),
	"city" varchar(256),
	"state" varchar(256),
	"country" varchar(256),
	"neighborhood" varchar(256),
	"street" varchar(256),
	"external_number" varchar(256),
	"internal_number" varchar(256),
	"location" jsonb,
	"price" integer,
	"floor" varchar(256),
	"area" jsonb,
	"garage" integer,
	"images" varchar(256)[],
	"amenities" varchar(256)[],
	"bedrooms" integer,
	"bathrooms" numeric,
	"image" varchar(256),
	"owner" varchar(256),
	"virtualTourUrl" varchar(256),
	"video" varchar(256),
	"antiquity" integer,
	"propertyStatus" varchar(256),
	"type" varchar(256),
	"blockchainId" varchar(256),
	"category" varchar(256),
	"partner" varchar(256),
	"development" varchar(256),
	"created_at" timestamp DEFAULT now()
);

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

CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(256) NOT NULL,
	"residence" varchar(11) NOT NULL,
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

CREATE TABLE IF NOT EXISTS "roles" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" text,
	"status" boolean,
	"created_at" timestamp DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS "leads_id_index" ON "leads" ("id");
CREATE UNIQUE INDEX IF NOT EXISTS "users_id_index" ON "users" ("id");