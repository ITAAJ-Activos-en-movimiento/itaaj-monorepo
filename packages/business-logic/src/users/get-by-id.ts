import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { User, users } from "@itaaj/entities";
import { and, eq } from "drizzle-orm";

export const getUsersById = async (id: string) => {
  const result = await getDbInstance()
    .select()
    .from(users).where(and(eq(users.id, id)));

  const user = result[0] as User;
  
  return user;
};