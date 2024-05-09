import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { properties } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const deleteProperty = async (id: string): Promise<boolean | Error> => {
  try {
    const db = getDbInstance();
    const updatedPost = await db
      .update(properties)
      .set({ status: "deleted" })
      .where(eq(properties.id, id))
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