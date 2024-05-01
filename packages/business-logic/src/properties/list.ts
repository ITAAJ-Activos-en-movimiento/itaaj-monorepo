import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { properties } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const getAllProperties = () => {
  const result = getDbInstance()
    .select()
    .from(properties)
    .where(eq(properties.status, "active"));

    result.forEach(async (data: any) => {
      const code = generatePropertyCode();
      if (!data.blockchainId) {
        const result = await getDbInstance()
        .update(properties)
        .set({...data, blockchainId:code })
        .where(eq(properties.id, data.id || ""))
        .returning();
      }
  });
  return result;
};


function generatePropertyCode(): string {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numeros = '0123456789';
  const letraInicial = letras.charAt(Math.floor(Math.random() * letras.length));
  let codigo = letraInicial;
  
  for (let i = 0; i < 5; i++) { // Generar 5 dígitos numéricos después de la letra
      codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }
  
  return codigo;
}