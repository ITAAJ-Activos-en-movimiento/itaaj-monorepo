import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Development, developments } from "@itaaj/entities";

export const createDevelopment = async (
  data: Development
): Promise<Development | Error> => {
  const result = await getDbInstance()
    .insert(developments)
    .values(data)
    .returning();
  return result;
};
