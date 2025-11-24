import { getDbInstance } from "@itaaj/data-sources/src/postgresql"
import { properties as propertiesEntity} from "@itaaj/entities";
import { and, eq } from "drizzle-orm";

export const getPropertiesByUserId = async (userId: string) => {
  const db = await getDbInstance();

  const properties = db.select()
  .from(propertiesEntity)
  .where(and(eq(propertiesEntity.owner, userId), eq(propertiesEntity.status, 'active')));

  return properties;
}