import {
  jsonb,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const funnels = pgTable("funnels", {
  id: uuid("id").defaultRandom().notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  stages: jsonb("stages").array(),
  status: varchar("status", { length: 256 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
