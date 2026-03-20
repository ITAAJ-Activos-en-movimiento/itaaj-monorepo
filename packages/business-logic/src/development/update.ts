import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { developments } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const updateDevelopment = async (data: any) => {
  const updateData = {
    name: data.name,
    slug: data.slug,
    description: data.description,
    address: data.address,
    city: data.city,
    state: data.state,
    country: data.country,
    households: data.households,
    location: data.location,
    price: data.price,
    alsoRent: data.alsoRent,
    alsoSell: data.alsoSell,
    area: data.area,
    garage: data.garage,
    images: data.images,
    bedrooms: data.bedrooms,
    bathrooms: data.bathrooms,
    owner: data.owner,
    virtualTourUrl: data.virtualTourUrl,
    video: data.video,
    antiquity: data.antiquity,
    propertyStatus: data.propertyStatus,
    type: data.type,
    partner: data.partner,
    zipcode: data.zipcode,
  };

  const cleanUpdateData = Object.fromEntries(
    Object.entries(updateData).filter(([, value]) => value !== undefined)
  );

  const result = await getDbInstance()
    .update(developments)
    .set(cleanUpdateData)
    .where(eq(developments.slug, data.slug || ""))
    .returning();

  return result[0];
};