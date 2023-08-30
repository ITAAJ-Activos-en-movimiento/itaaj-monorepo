ALTER TABLE "users" ADD COLUMN "last_login" varchar(50);
ALTER TABLE "users" ADD COLUMN "login_attempts" integer;
ALTER TABLE "users" ADD COLUMN "locked" boolean DEFAULT false;