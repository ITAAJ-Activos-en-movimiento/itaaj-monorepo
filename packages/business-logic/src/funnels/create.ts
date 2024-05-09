import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Funnel, funnels } from "@itaaj/entities";

const newFunnel = {
    name: "Embudo 1",
    stages: [
      {
        name: "Lead",
        dealprobability: 100
      },
      {
        name: "Contactado",
        dealprobability: 100
      },
      {
        name: "Necesidades definidas",
        dealprobability: 100
      },
      {
        name: "Propuesta realizada",
        dealprobability: 100
      },
      {
        name: "Cerrando",
        dealprobability: 100
      }
    ]
  }
export const createFunnel = async (
  data?: any
): Promise<Funnel | Error> => {
  const result = await getDbInstance()
    .insert(funnels)
    .values({...newFunnel})
    .returning();

  return result;
};
