ALTER TABLE "users" ADD COLUMN "code" integer;
ALTER TABLE "users" ADD COLUMN "isOfficer" boolean DEFAULT false;
ALTER TABLE "users" ADD COLUMN "isAdmin" boolean DEFAULT false;