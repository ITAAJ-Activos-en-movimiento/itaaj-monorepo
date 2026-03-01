import { getDbInstance } from "@itaaj/data-sources/src/postgresql"
import { users } from "@itaaj/entities"
import { eq } from "drizzle-orm";

export const fetchMyProfile = (id: string) => {
  const result = getDbInstance()
    .select({
      name: users.name,
      email: users.email,
    })
    .from(users)
    .where(eq(users.id, id))
  return result;
}