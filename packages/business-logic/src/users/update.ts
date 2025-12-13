import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { User, users } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const updateUser = async (id: string, data: Partial<User>): Promise<boolean | Error> => {
  try {
    const db = getDbInstance();
    const updatedUser = await db
      .update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();

      return updatedUser

  } catch (error) {
    return error as Error;
  }
};
