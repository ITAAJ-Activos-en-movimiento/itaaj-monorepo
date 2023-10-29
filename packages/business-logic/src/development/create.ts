import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Development, developments } from "@itaaj/entities";

export const createDevelopment = async (
  data: Development
): Promise<Development | Error> => {
  const slug = data.name.toLowerCase().split(" ").join("-");
  const result = await getDbInstance()
    .insert(developments)
    .values({...data, slug})
    .returning();
  return result;
};
