import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Development, developments } from "@itaaj/entities";
import { eq } from "drizzle-orm";
import slugify from 'slugify';

export const updateDevelopment = async (
  data: Partial<Development>
): Promise<Development | Error> => {

  // const db = drizzle(infoInstance, { schema: { users } })
  
  // const result = await db.update(users)
  //     .set(data)
  //     .where(eq(users.id, data.id))
  //     .returning();
      
  // return result[0];
  const result = await getDbInstance()
    .update(developments)
    .set({...data})
    .where(eq(developments.slug, data.slug))
    .returning();

  return result[0];
};
