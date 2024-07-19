import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { users } from "@itaaj/entities";
import { ilike, or } from "drizzle-orm";

interface Params {
  search?: string;
}

export const getAllUsers = async ({ search = "" }: Params) => {
  const db = getDbInstance();

  let query = db
    .select({
      id: users.id,
      name: users.name,
      lastname: users.lastname,
      email: users.email,
      roleId: users.roleId,
      residence: users.residence,
      identification: users.identification,
      method: users.method,
      phone: users.phone,
      birthdate: users.birthdate,
      state: users.state,
      city: users.city,
      country: users.country,
    })
    .from(users);

  if (search) {
    query = query.where(
      or(
        ilike(users.name, `%${search}%`),
        ilike(users.lastname, `%${search}%`),
        ilike(users.email, `%${search}%`)
      )
    );
  }

  const result = await query;
  return result;
};
