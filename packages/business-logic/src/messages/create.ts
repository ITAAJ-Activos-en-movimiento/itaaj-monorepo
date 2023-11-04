import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Property, messages, properties } from "@itaaj/entities";
import slugify from "slugify";

export const createMessage = async (
  data: any
): Promise<any | Error> => {
  const result = await getDbInstance()
    .insert(messages)
    .values(data)
    .returning();
  return result;
};
