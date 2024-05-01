import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { developments } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const getAllDevelopments = async () => {
  const result = getDbInstance()
    .select({
      id: developments.id,
      name: developments.name,
      slug: developments.slug,
      description: developments.description,
      address: developments.address,
      city: developments.city,
      state: developments.state,
      country: developments.country,
      neighborhood: developments.neighborhood,
      street: developments.street,
      external_number: developments.external_number,
      internal_number: developments.internal_number,
      location: developments.location,
      price: developments.price,
      area: developments.area,
      garage: developments.garage,
      images: developments.images,
      amenities: developments.amenities,
      bedrooms: developments.bedrooms,
      bathrooms: developments.bathrooms,
      image: developments.image,
      owner: developments.owner,
      virtualTourUrl: developments.virtualTourUrl,
      video: developments.video,
      antiquity: developments.antiquity,
      propertyStatus: developments.propertyStatus,
      category: developments.category,
      type: developments.type,
      partner: developments.partner,
      blockchainId: developments.blockchainId,
    })
    .from(developments);

    const elements = result as any[];

    await Promise.all(elements.map(async (data: any) => {
      const code = generatePropertyCode();
      if (!data.blockchainId) {
        await getDbInstance()
          .update(developments)
          .set({...data, blockchainId: code })
          .where(eq(developments.id, data.id || ""))
          .returning();
      }
    }));
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