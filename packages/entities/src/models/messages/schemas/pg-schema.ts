import { text, pgTable, timestamp,  uuid, varchar } from 'drizzle-orm/pg-core';

export const messages = pgTable('messages', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    phone: varchar('phone', {length: 255}),
    message: text('message'),
    property: varchar('property', { length: 256 }),
    type: varchar('type', { length: 256 }),
    status: varchar('status', { length: 50 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});