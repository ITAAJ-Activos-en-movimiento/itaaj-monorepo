import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { developments } from "@itaaj/entities";

export const getAllDevelopments = () => {
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
  return result;
};
