ALTER TABLE "developments" ALTER COLUMN "garage" DROP NOT NULL;
ALTER TABLE "developments" ALTER COLUMN "bathrooms" SET DATA TYPE varchar(256);
ALTER TABLE "developments" ALTER COLUMN "bathrooms" DROP NOT NULL;
ALTER TABLE "developments" ALTER COLUMN "antiquity" DROP NOT NULL;