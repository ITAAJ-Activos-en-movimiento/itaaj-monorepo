import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgTable,
  timestamp,
  uuid,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { properties } from "../../properties";

export const developments = pgTable("developments", {
  id: uuid("id").defaultRandom().notNull(),
  name: varchar("name", { length: 256 }),
  slug: varchar("slug", { length: 256 }),
  description: text("description"),
  address: varchar("address", { length: 256 }),
  city: varchar("city", { length: 256 }),
  state: varchar("state", { length: 256 }),
  country: varchar("country", { length: 256 }),
  neighborhood: varchar("neighborhood", { length: 256 }),
  households: varchar("households", { length: 256 }),
  street: varchar("street", { length: 256 }),
  external_number: varchar("external_number", { length: 256 }),
  internal_number: varchar("internal_number", { length: 256 }),
  location: jsonb("location"),
  price: integer("price"),
  area: varchar("area", { length: 256 }),
  garage: integer("garage"),
  images: varchar("images", { length: 256 }).array(),
  amenities: varchar("amenities", { length: 256 }).array(),
  bedrooms: varchar("bedrooms", { length: 256 }),
  bathrooms: varchar("bathrooms", { length: 256 }),
  image: varchar("image", { length: 256 }),
  owner: varchar("owner", { length: 256 }),
  virtualTourUrl: varchar("virtualTourUrl", { length: 256 }),
  video: varchar("video", { length: 256 }),
  antiquity: integer("antiquity"),
  propertyStatus: varchar("propertyStatus", { length: 256 }),
  type: varchar("type", { length: 256 }).notNull(),
  blockchainId: varchar("blockchainId", { length: 256 }),
  category: varchar("category", { length: 256 }),
  partner: varchar("partner", { length: 256 }),
  development: uuid("development"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const developmentRelations = relations(developments, ({ many }) => ({
  properties: many(properties),
}));
