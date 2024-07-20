import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Lead, leads } from "@itaaj/entities";

export const createLead = async (data: Lead): Promise<any | Error> => {
  console.log("INFO EN LA LOGICa", data);
 // const email = data.email ?? "emailtest@email.com";
  const result = await getDbInstance()
    .insert(leads)
    .values({ ...data, status: "active" })
    .returning();
  return result;
};
