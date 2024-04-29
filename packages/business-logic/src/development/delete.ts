import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { developments } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const deleteDevelopment = async (id: string): Promise<boolean | Error> => {
  try {
    const db = getDbInstance();
    const updatedPost = await db
      .delete(developments)
      .where(eq(developments.id, id))
      .returning();

    if (updatedPost.length > 0) {
      return true;
    } else {
      return new Error(`No properties found with id ${id}`);
    }
  } catch (error) {
    return error as Error;
  }
};