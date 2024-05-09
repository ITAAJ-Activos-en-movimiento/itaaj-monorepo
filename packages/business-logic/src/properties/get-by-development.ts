import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { properties } from "@itaaj/entities";
import { and, eq } from "drizzle-orm";

export const getPropertiesByDevelopment = (development: string) => {
  const result = getDbInstance()
    .select()
    .from(properties).where(eq(properties.development, development));
  return result;
};
