import { relations } from "drizzle-orm";
import {
  integer,
  jsonb,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { developments } from "../../developments/schemas/pg-schema";

export const properties = pgTable("properties", {
  id: uuid("id").defaultRandom().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  slug: varchar("slug", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }).notNull(),
  address: varchar("address", { length: 256 }).notNull(),
  city: varchar("city", { length: 256 }).notNull(),
  state: varchar("state", { length: 256 }).notNull(),
  country: varchar("country", { length: 256 }).notNull(),
  neighborhood: varchar("neighborhood", { length: 256 }),
  street: varchar("street", { length: 256 }),
  external_number: varchar("external_number", { length: 256 }),
  internal_number: varchar("internal_number", { length: 256 }),
  location: jsonb("location").notNull(),
  price: integer("price").notNull(),
  area: jsonb("area").notNull(),
  garage: integer("garage").notNull(),
  images: varchar("images", { length: 256 }).array(),
  amenities: varchar("amenities", { length: 256 }).array(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  image: varchar("image", { length: 256 }),
  owner: varchar("owner", { length: 256 }),
  virtualTourUrl: varchar("virtualTourUrl", { length: 256 }),
  video: varchar("video", { length: 256 }),
  antiquity: integer("antiquity").notNull(),
  propertyStatus: varchar("propertyStatus", { length: 256 }),
  type: varchar("type", { length: 256 }).notNull(),
  blockchainId: varchar("blockchainId", { length: 256 }).notNull(),
  category: varchar("category", { length: 256 }).notNull(),
  partner: varchar("partner", { length: 256 }),
  development: varchar("development", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const propertyRelations = relations(properties, ({ one }) => ({
  development: one(developments, {
    fields: [properties.development],
    references: [developments.id],
  }),
}));
