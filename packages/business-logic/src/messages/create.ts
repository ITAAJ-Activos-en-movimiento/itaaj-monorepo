import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { messages } from "@itaaj/entities";

export const createMessage = async (
  data: any
): Promise<any | Error> => {
  const result = await getDbInstance()
    .insert(messages)
    .values(data)
    .returning();
  return result;
};
