import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { users } from "@itaaj/entities";
import { ilike, or, ne, and, eq } from "drizzle-orm";

interface Params {
  search?: string;
}

export const getAllUsers = async ({ search = "" }: Params) => {
  const db = getDbInstance();

  let query = db.select().from(users);

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
