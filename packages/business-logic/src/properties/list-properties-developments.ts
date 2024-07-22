import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { StatusType, developments, properties } from "@itaaj/entities";
import { and, eq, gte, lte, or, sql } from "drizzle-orm";

interface Params {
  page?: number;
  limit?: number;
  house?: string;
  search?: string;
  state?: string;
  propertyType?: string;
  constructionType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}

interface Query {
  status: StatusType;
  name?: { $regex: string; $options: string };
}

interface PropertiesWithType {
  itemType: "proeprty" | "development";
}

export const getAllDevelopmentsAndProperties = async ({
  page = 1,
  limit = 14,
  house = "",
  search = "",
  state,
  propertyType,
  constructionType,
  minPrice,
  maxPrice,
  bedrooms,
  bathrooms,
}: Params) => {
  const db = getDbInstance();
  const pageSize = Number(limit);
  const skip = Number((page - 1) * pageSize);

  const query: Query = { status: StatusType.ACTIVE };

  let resultProperties = db
    .select()
    .from(properties)
    .where(eq(properties.status, "active"));

  let developmentsQuery = getDbInstance().select().from(developments);

  if (state) {
    const stateCondition = eq(properties.state, state);
    resultProperties = resultProperties.where(stateCondition);
    developmentsQuery = developmentsQuery.where(stateCondition);
  }

  if (propertyType !== "undefined" && propertyType.length > 0) {
    console.log("Enter here", { propertyType });
    resultProperties = resultProperties.where(
      and(eq(properties.type, propertyType), eq(properties.status, "active"))
      
    );
    developmentsQuery = developmentsQuery.where(
      eq(developments.type, propertyType)
    );
  }

  if (constructionType) {
    // resultProperties = resultProperties.where(eq(properties.constructionType, constructionType));
  }

  if (minPrice) {
    resultProperties = resultProperties.where(gte(properties.price, minPrice));
  }

  if (maxPrice) {
    resultProperties = resultProperties.where(lte(properties.price, maxPrice));
  }

  if (bedrooms) {
    resultProperties = resultProperties.where(
      gte(properties.bedrooms, bedrooms)
    );
  }

  if (bathrooms) {
    resultProperties = resultProperties.where(
      gte(properties.bathrooms, bathrooms)
    );
  }

  resultProperties = await resultProperties;
  developmentsQuery = await developmentsQuery;

  const resultDevelopments = developmentsQuery.map((development) => ({
    ...development,
    properties: resultProperties.filter(
      (property) => property.development === development.id
    ),
  }));

  const allProperties: PropertiesWithType[] = [
    ...resultDevelopments.map((property: PropertiesWithType) => ({
      ...property,
      itemType: "development",
    })),
    ...resultProperties
      .filter((prop) => prop.category == "general")
      .map((property: PropertiesWithType) => ({
        ...property,
        itemType: "property",
      })),
  ];

  const total = allProperties.length;

  const paginatedItems = allProperties.slice(skip, skip + pageSize);

  const pages = Math.ceil(total / pageSize);
  const hasPreviousPage = page > 1;
  const hasNextPage = page < pages;
  const nextPage = hasNextPage ? page + 1 : page;
  const previousPage = hasPreviousPage ? page - 1 : page;

  return {
    count: total,
    countNew: resultDevelopments.length,
    countOld: resultProperties.filter((prop) => prop.category == "general")
      .length,
    items: paginatedItems,
    pageInfo: {
      page,
      pages,
      hasPreviousPage,
      hasNextPage,
      nextPage,
      previousPage,
    },
  };
};
