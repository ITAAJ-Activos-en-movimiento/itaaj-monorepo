import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { User, users } from "@itaaj/entities";
import { genSaltSync, hashSync } from "bcrypt";
import { eq } from "drizzle-orm";

export const changePassword = async (
  data: Partial<User>
): Promise<User | Error> => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(data.password, salt);

  const result = await getDbInstance()
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, data.id || ""))
    .returning();

  return result[0];
};

export const updateCodeUser = async (
  data: Partial<User>
): Promise<User | Error> => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(data.password, salt);

  const result = await getDbInstance()
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, data.id || ""))
    .returning();

  return result[0];
};