import { integer, pgTable, primaryKey, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const leads = pgTable('leads', {
    id: uuid('id').defaultRandom().notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    phone: integer('phone'),
    gender: varchar('gender', { length: 256 }),
    lead_status: varchar('lead_status', { length: 256 }),
    city: varchar('city', { length: 256 }),
    property: varchar('property', { length: 256 }),
    state: varchar('state', { length: 256 }),
    country: varchar('country', { length: 256 }),
    type: varchar('type', { length: 256 }),
    status: varchar('status', { length: 50 }),
    reporter: varchar('reportes', { length: 256 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (leads) => {
    return {
        cpk: primaryKey(leads.email),
        idIndex: uniqueIndex('leads_id_index').on(leads.id)
    }
});