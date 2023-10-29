ALTER TABLE "developments" ALTER COLUMN "description" SET DATA TYPE text;
ALTER TABLE "developments" ALTER COLUMN "description" DROP NOT NULL;
ALTER TABLE "developments" ALTER COLUMN "bedrooms" SET DATA TYPE varchar(256);
ALTER TABLE "developments" ALTER COLUMN "bedrooms" DROP NOT NULL;
ALTER TABLE "developments" ADD COLUMN "households" varchar(256);