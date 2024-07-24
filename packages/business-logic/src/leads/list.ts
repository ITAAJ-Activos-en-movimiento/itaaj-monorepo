import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { leads } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const getAllLeads = () => {
  const result = getDbInstance()
    .select()
    .from(leads)
    .where(eq(leads.status, "active"));

  return result;
};
