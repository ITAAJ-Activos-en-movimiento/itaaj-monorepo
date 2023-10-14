import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Lead, leads } from "@itaaj/entities";

export const createLead = async (data: Lead): Promise<any | Error> => {
  const result = await getDbInstance().insert(leads).values(data).returning();
  return result;
};
