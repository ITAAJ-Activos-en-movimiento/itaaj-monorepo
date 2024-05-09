import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Lead, developments, leads } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const updateLead = async (
  leadId:string,
  data: Partial<Lead>
): Promise<Lead | Error> => {
  const result = await getDbInstance()
    .update(leads)
    .set({...data})
    .where(eq(developments.id, leadId || ""))
    .returning();

  return result[0];
};
