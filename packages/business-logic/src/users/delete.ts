import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { users } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const deleteUser = async (id: string): Promise<boolean | Error> => {
  try {
    const db = getDbInstance();
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    if (deletedUser.length > 0) {
      return true;
    } else {
      return new Error(`No user found with id ${id}`);
    }
  } catch (error) {
    return error as Error;
  }
};
