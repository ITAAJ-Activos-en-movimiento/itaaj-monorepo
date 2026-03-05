import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { developments, proposals } from "@itaaj/entities";

export const getAllProposals = () => {
  const result = getDbInstance()
    .select()
    .from(proposals);
  return result;
};
