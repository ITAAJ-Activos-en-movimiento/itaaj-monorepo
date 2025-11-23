import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Property, properties } from "@itaaj/entities";
import { and, eq } from "drizzle-orm";

export const getPropertiesById = async (id: string) => {
  const result = await getDbInstance()
    .select()
    .from(properties).where(and(eq(properties.id, id)));

  const property = result[0] as Property;
  
  return property;
};