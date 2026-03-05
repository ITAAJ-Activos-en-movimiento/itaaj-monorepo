import { relations } from "drizzle-orm";
import {
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { properties } from "../../properties";

export const proposals = pgTable("proposals", {
  id: uuid("id").defaultRandom(),
  name: varchar("name", { length: 256 }),
  nationality: varchar("nationality", { length: 256 }),
  email: varchar("email", { length: 256 }),
  phone: varchar("phone", { length: 256 }),
  proposal: varchar("proposal", { length: 256 }),
  funding: varchar("funding", { length: 256 }),
  userId: varchar("userId"),
  funds: varchar("funds", { length: 256 }),
  development: varchar("development", { length: 256 }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const proposalsRelations = relations(proposals, ({ one }) => ({
  development: one(properties),
}));
