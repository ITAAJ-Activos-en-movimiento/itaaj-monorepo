import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Property, properties } from "@itaaj/entities";
import slugify from "slugify";

export const createProperty = async (
  data: Property
): Promise<Property | Error> => {
  console.log(data)
  const slug = slugify(data.name, {
    lower: true
  });
  const result = await getDbInstance()
    .insert(properties)
    .values({...data, slug})
    .returning();
  return result;
};
