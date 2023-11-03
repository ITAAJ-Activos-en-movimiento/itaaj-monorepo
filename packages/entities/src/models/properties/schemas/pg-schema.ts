import { relations } from "drizzle-orm";
import {
  decimal,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { developments } from "../../developments/schemas/pg-schema";

export const properties = pgTable("properties", {
  id: uuid("id").defaultRandom().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  slug: varchar("slug", { length: 256 }),
  description: text("description"),
  address: varchar("address", { length: 256 }),
  city: varchar("city", { length: 256 }),
  state: varchar("state", { length: 256 }),
  country: varchar("country", { length: 256 }),
  neighborhood: varchar("neighborhood", { length: 256 }),
  street: varchar("street", { length: 256 }),
  external_number: varchar("external_number", { length: 256 }),
  internal_number: varchar("internal_number", { length: 256 }),
  location: jsonb("location"),
  price: integer("price"),
  floor: varchar("floor", { length: 256 }),
  area: jsonb("area"),
  garage: integer("garage"),
  images: varchar("images", { length: 256 }).array(),
  amenities: varchar("amenities", { length: 256 }).array(),
  bedrooms: integer("bedrooms"),
  bathrooms: decimal("bathrooms"),
  image: varchar("image", { length: 256 }),
  owner: varchar("owner", { length: 256 }),
  virtualTourUrl: varchar("virtualTourUrl", { length: 256 }),
  video: varchar("video", { length: 256 }),
  antiquity: integer("antiquity"),
  propertyStatus: varchar("propertyStatus", { length: 256 }),
  type: varchar("type", { length: 256 }),
  blockchainId: varchar("blockchainId", { length: 256 }),
  category: varchar("category", { length: 256 }),
  partner: varchar("partner", { length: 256 }),
  development: varchar("development", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const propertyRelations = relations(properties, ({ one }) => ({
  development: one(developments, {
    fields: [properties.development],
    references: [developments.id],
  }),
}));
