ALTER TABLE "properties" ALTER COLUMN "country" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "area" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "garage" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "bathrooms" SET DATA TYPE numeric;
ALTER TABLE "properties" ALTER COLUMN "antiquity" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "type" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "blockchainId" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "category" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "created_at" DROP NOT NULL;