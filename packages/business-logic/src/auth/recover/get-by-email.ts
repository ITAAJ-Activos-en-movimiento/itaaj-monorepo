import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { User, users } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const validateIfExistsEmail = async (
  data: Partial<User>
): Promise<User | Error> => {
  const { email } = data;
  const result = await getDbInstance()
    .select()
    .from(users)
    .where(eq(users.email, email || ""));

  return result[0];
};

