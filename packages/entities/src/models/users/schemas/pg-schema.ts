import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, primaryKey, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
import { roles } from '../../roles/schemas/pg-schema';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().notNull(),
    // roleId: varchar('name', { length: 256 }).notNull(),
    residence: varchar('residence', { length: 256 }),
    identification: varchar('residence', { length: 11 }).notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    lastname: varchar('lastname', { length: 256 }).notNull(),
    email: varchar('email', { length: 256 }).notNull(),
    password: varchar('password', { length: 256 }).notNull(),
    phone: integer('phone'),
    gender: varchar('gender', { length: 256 }),
    city: varchar('city', { length: 256 }),
    state: varchar('state', { length: 256 }),
    country: varchar('country', { length: 256 }),
    method: varchar('method', { length: 256 }),
    status: varchar('status', { length: 50 }),
    last_login: varchar('last_login', { length: 50 }),
    login_attempts: integer('login_attempts'),
    locked: boolean('locked').default(false),
    public_key: varchar('public_key', { length: 256 }),
    birthdate: timestamp('birthdate'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (users) => {
    return {
        cpk: primaryKey(users.email),
        idIndex: uniqueIndex('users_id_index').on(users.id)
    }
});

// export const usersRelations = relations(users, ({ one }) => ({
//     development: one(roles, {
//       fields: [users.roleId],
//       references: [roles.id],
//     }),
//   }));
  