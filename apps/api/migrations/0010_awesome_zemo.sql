ALTER TABLE "properties" ALTER COLUMN "description" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "address" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "city" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "state" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "location" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "price" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "bedrooms" DROP NOT NULL;
ALTER TABLE "properties" ALTER COLUMN "bathrooms" DROP NOT NULL;
ALTER TABLE "properties" ADD COLUMN "floor" varchar(256);