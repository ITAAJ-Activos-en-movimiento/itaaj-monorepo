import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { leads } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const deleteLead = async (id: string): Promise<boolean | Error> => {
  try {
    const db = getDbInstance();
    const updatedLead = await db
      .delete(leads)
      .where(eq(leads.id, id))
      .returning();

    if (updatedLead.length > 0) {
      return true;
    } else {
      return new Error(`No leads found with id ${id}`);
    }
  } catch (error) {
    return error as Error;
  }
};
