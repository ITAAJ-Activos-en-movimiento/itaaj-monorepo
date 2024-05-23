import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Property, properties } from "@itaaj/entities";
import slugify from "slugify";

export const createProperty = async (
  data: Property
): Promise<Property | Error> => {
  console.log(data)
  const slug = slugify(data.name, {
    lower: true
  });

  const blockchainId = generatePropertyCode();
  const result = await getDbInstance()
    .insert(properties)
    .values({...data, slug, blockchainId})
    .returning();
  return result;
};


function generatePropertyCode(): string {
  const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numeros = '0123456789';
  const letraInicial = letras.charAt(Math.floor(Math.random() * letras.length));
  let codigo = letraInicial;
  
  for (let i = 0; i < 8; i++) { 
      codigo += numeros.charAt(Math.floor(Math.random() * numeros.length));
  }
  
  return codigo;
}