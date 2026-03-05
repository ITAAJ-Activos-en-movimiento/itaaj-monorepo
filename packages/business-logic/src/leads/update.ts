import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { leads } from "@itaaj/entities";
import { InferInsertModel, eq } from "drizzle-orm";

export const updateLead = async (
  leadId: string,
  data: InferInsertModel<typeof leads>
): Promise<any | Error> => {
  try {
    const { createdAt, id, ...dataWithoutDate } = data;
    const result = await getDbInstance()
      .update(leads)
      .set(dataWithoutDate)
      .where(eq(leads.id, leadId)).returning();

    return result[0];
  } catch (error) {
    console.log("ERROR EN EL ACTUALIZAR", error);
  }
};
