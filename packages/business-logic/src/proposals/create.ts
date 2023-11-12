import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { proposals } from "@itaaj/entities";

export const createProposal = async (
  data: any
): Promise<any | Error> => {
  const result = await getDbInstance()
    .insert(proposals)
    .values(data)
    .returning();
  return result;
};
