import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Development, developments } from "@itaaj/entities";
import slugify from 'slugify';

export const createDevelopment = async (
  data: Development
): Promise<Development | Error> => {
  const slug = slugify(data.name);
  const result = await getDbInstance()
    .insert(developments)
    .values({...data, slug})
    .returning();
  return result;
};
