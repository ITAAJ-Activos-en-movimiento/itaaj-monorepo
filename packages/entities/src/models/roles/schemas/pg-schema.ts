import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().notNull(),
  role: varchar("name", { length: 50 }).notNull(),
  description: text("description"),
  status: boolean('status'),
  createdAt: timestamp("created_at").defaultNow(),
});