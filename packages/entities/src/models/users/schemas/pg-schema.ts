import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, primaryKey, timestamp, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';
import { roles } from '../../roles/schemas/pg-schema';

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().notNull(),
    roleId: varchar('roleId', { length: 256 }),
    residence: varchar('residence', { length: 256 }),
    identification: varchar('identification', { length: 11 }),
    name: varchar('name', { length: 256 }),
    lastname: varchar('lastname', { length: 256 }),
    email: varchar('email', { length: 256 }).notNull(),
    password: varchar('password', { length: 256 }),
    phone: varchar('phone'),
    code: integer('code'),
    gender: varchar('gender', { length: 256 }),
    isOfficer: boolean('isOfficer').default(false),
    isAdmin: boolean('isAdmin').default(false),
    city: varchar('city', { length: 256 }),
    state: varchar('state', { length: 256 }),
    country: varchar('country', { length: 256 }),
    method: varchar('method', { length: 256 }),
    status: varchar('status', { length: 50 }),
    last_login: varchar('last_login'),
    login_attempts: integer('login_attempts'),
    locked: boolean('locked').default(false),
    birthdate: timestamp('birthdate'),
    createdAt: timestamp('created_at').defaultNow(),
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
  