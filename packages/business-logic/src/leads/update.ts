import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Lead, leads } from "@itaaj/entities";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const updateLead = async (
  leadId: string,
  data: any
): Promise<any | Error> => {
  try {
    console.log("en la logica de negocio", leadId);
    console.log("en la logica de negocio la data", data);
    const infoInstance = await getDbInstance();
    const db = drizzle(infoInstance, { schema: { leads } });
    const result = await db
      .update(leads)
      .set({ ...data })
      .where(eq(leads.id, leadId || ""))
      .returning();
    console.log("en la logica de negocio result", result);
    return result[0];
  } catch (error) {
    console.log("ERROR EN EL ACTUALIZAR", error);
  }
};
