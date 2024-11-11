import { getDbInstance } from "@itaaj/data-sources/src/postgresql"
import { properties as propertiesEntity} from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const getPropertiesByUserId = async (userId: string) => {
  const db = await getDbInstance();

  const properties = db.select()
  .from(propertiesEntity)
  .where(eq(propertiesEntity.owner, userId));

  return properties;
}