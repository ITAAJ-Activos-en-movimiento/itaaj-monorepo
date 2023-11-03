import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { properties } from "@itaaj/entities";

export const getAllProperties = () => {
  const result = getDbInstance()
    .select()
    .from(properties);
  return result;
};
