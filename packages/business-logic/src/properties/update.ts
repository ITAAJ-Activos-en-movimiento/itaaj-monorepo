import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Property, properties } from "@itaaj/entities";
import { eq } from "drizzle-orm";
import slugify from "slugify";

export const updateProperty = async (
  id: string,
  data: Partial<Property>
): Promise<boolean | Error> => {
  const {
    name,
    description,
    address,
    city,
    state,
    country,
    neighborhood,
    street,
    external_number,
    internal_number,
    location,
    price,
    floor,
    area,
    garage,
    images,
    amenities,
    bedrooms,
    bathrooms,
    image,
    owner,
    virtualTourUrl,
    video,
    antiquity,
    propertyStatus,
    type,
    blockchainId,
    category,
    partner,
    development,
    createdAt,
    zipcode,
    floorPlans,
    status,
  } = data;

  const slug = slugify(data.name, { lower: true });

  const db = getDbInstance();

  const updatedProperty = await db
    .update(properties)
    .set({
      name,
      slug,
      description,
      address,
      city,
      state,
      country,
      neighborhood,
      street,
      external_number,
      internal_number,
      location,
      price,
      floor,
      area,
      garage,
      images,
      amenities,
      bedrooms,
      bathrooms,
      image,
      owner,
      virtualTourUrl,
      video,
      antiquity,
      propertyStatus,
      type,
      blockchainId,
      category,
      partner,
      development,
      createdAt,
      zipcode,
      floorPlans,
      status,
    })
    .where(eq(properties.id, id))
    .returning();

  return updatedProperty;
};

{
  /**import { clientDb } from "@joobs/data-sources";
import { User, users } from "@joobs/entities";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

export const updateUser = async (data: User): Promise<any | Error> => {
    const infoInstance = await clientDb();

    const db = drizzle(infoInstance, { schema: { users } })
  
    const result = await db.update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning();
        
    return result[0];
} */
}
