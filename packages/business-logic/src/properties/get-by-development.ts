import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { properties } from "@itaaj/entities";
import { and, eq } from "drizzle-orm";

export const getPropertiesByDevelopment = (development: string) => {
  console.log(development)
  const result = getDbInstance()
    .select({
      id: properties.id,
      name: properties.name,
      slug: properties.slug,
      description: properties.description,
      address: properties.address,
      city: properties.city,
      state: properties.state,
      country: properties.country,
      neighborhood: properties.neighborhood,
      street: properties.street,
      external_number: properties.external_number,
      internal_number: properties.internal_number,
      location: properties.location,
      price: properties.price,
      area: properties.area,
      garage: properties.garage,
      images: properties.images,
      amenities: properties.amenities,
      bedrooms: properties.bedrooms,
      bathrooms: properties.bathrooms,
      image: properties.image,
      owner: properties.owner,
      virtualTourUrl: properties.virtualTourUrl,
      video: properties.video,
      antiquity: properties.antiquity,
      propertyStatus: properties.propertyStatus,
      category: properties.category,
      type: properties.type,
      partner: properties.partner,
      blockchainId: properties.blockchainId,
      development: properties.development
    })
    .from(properties).where(and(eq(properties.development, development)));
  return result;
};
