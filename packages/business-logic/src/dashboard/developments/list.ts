import { getDbInstance } from "@itaaj/data-sources/src/postgresql"
import { developments } from "@itaaj/entities";

export const getDevelopmentsById = (id: number) => {
  const result = getDbInstance()
    .select({
      id: developments.id,
      name: developments.name,
      price: developments.price,
      images: developments.images,
      city: developments.city,
      type: developments.type,
      createdAt: developments.createdAt,
      address: developments.address,
      state: developments.state,
    })
    .from(developments)
  return result;
}