import { getDbInstance } from "@itaaj/data-sources/src/postgresql"
import { properties } from "@itaaj/entities"

export const getPropertiesById = (id: number) => {
  const result = getDbInstance()
    .select()
    .from(properties)
    .where({ id })
  return result;
}