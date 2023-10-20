import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Property, properties } from "@itaaj/entities";

export const createProperty = async (
  data: Property
): Promise<Property | Error> => {
  const result = await getDbInstance()
    .insert(properties)
    .values(data)
    .returning();
  return result;
};
