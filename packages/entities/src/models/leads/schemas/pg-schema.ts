import {
  integer,
  pgTable,
  primaryKey,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const leads = pgTable(
  "leads",
  {
    id: uuid("id").defaultRandom().notNull(),
    name: varchar("name", { length: 256 }),
    email: varchar("email", { length: 256 }),
    phone: varchar("phone", { length: 255 }),
    gender: varchar("gender", { length: 256 }),
    lead_status: varchar("lead_status", { length: 256 }),
    city: varchar("city", { length: 256 }),
    property: varchar("property", { length: 256 }),
    state: varchar("state", { length: 256 }),
    country: varchar("country", { length: 256 }),
    type: varchar("type", { length: 256 }),
    status: varchar("status", { length: 50 }),
    source: varchar("source", { length: 255 }),
    userId: varchar("userId"),
    currency: varchar("currency"),
    funnelId: varchar("funnelId"),
    contactId: varchar("contactId"),
    contactName: varchar("contactName"),
    personName: varchar("personName"),
    value: integer("value"),
    potential: integer("potential"),
    stageId: varchar("stageId"),
    reporter: varchar("reporter", { length: 256 }),
    dueDate: varchar("dueDate", { length: 256 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (leads) => {
    return {
      idIndex: uniqueIndex("leads_id_index").on(leads.id),
    };
  }
);
