import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { properties } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const getAllProperties = async () => {
  const result = await getDbInstance()
    .select()
    .from(properties)
    .where(eq(properties.status, "active"));

  return result;
};


