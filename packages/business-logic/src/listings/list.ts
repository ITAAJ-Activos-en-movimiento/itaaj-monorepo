import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Base, Development, Result, StatusType, developments, properties, Property, Location } from "@itaaj/entities";
import { and, eq, gte, lte, or, sql } from "drizzle-orm";

export type ListingType = 'SALE' | 'RENT_LONG' | 'RENT_SHORT' | 'RENT_TO_OWN' | 'AUCTION' | 'ROOM_RENT';
export type ListingStatus = 'DRAFT' | 'REVIEW' | 'PUBLISHED' | 'PAUSED' | 'EXPIRED' | 'WITHDRAWN';
export type ISODateString = string;

const toSlug = (value: string) => {
  return value
    ?.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
};
export interface Listing  {
    organizationId?: string;
    propertyId?: string | null;
    slug: string;
    images: string[];
    unitId?: string | null;
    type: ListingType;
    listingStatus: ListingStatus;
    currency: string;
    price: number;
    expenses?: number | null;
    deposit?: number | null;
    availableFrom?: ISODateString | null;
    publishedAt?: ISODateString | null;
    expiresAt?: ISODateString | null;
    metadata?: Record<string, unknown> | null;
    location: Location;
    city: string;
    state: string;
    country: string;

    createdAt: Date;
    updatedAt: Date;
    modality?: 'FULL_PROPERTY' | 'ROOM_SHARE' | 'RENT_TO_OWN' | 'AUCTION' | 'BANK_OWNED';
}

const listingConver: { [key: string]: string } = {
  SALE: "comprar",
  RENT_LONG: "rentar",
};


interface Params {
  transaction?: string;        
  propertyType?: string;       
  city?: string;               
  neighborhood?: string;       
  page?: number;
  limit?: number;
  search?: string;
  state?: string;
  constructionType?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}

export const getAllListings = async (params: Params): Promise<Result<Listing>> => {
  const db = getDbInstance();

  const page = params.page && params.page > 0 ? params.page : 1;
  const pageSize = params.limit && params.limit > 0 ? params.limit : 14;
  const offset = (page - 1) * pageSize;

const {
    transaction,
    propertyType,
    city,
    neighborhood,
    search,
    state,
    constructionType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
  } = params;


  let resultProperties = await getDbInstance()
    .select()
    .from(properties)
    .where(eq(properties.status, "active")) as Property[];

    let resultDevelopments = await getDbInstance()
      .select()
      .from(developments) as Development[];

      console.log(resultProperties)
    let listings: Listing[] = [...resultProperties.map((property) => ({
       id: property._id,
       slug: property.slug,
       type: property.alsoRent ? 'RENT_LONG' as ListingType: 'SALE'  as ListingType,
       listingStatus: 'PUBLISHED' as ListingStatus,
       images: property.images,
       location: property.location,
       price: property.rentPrice > 0 ? property.rentPrice : property.price,
       currency: 'MXN',
       city: property.city,
       country: property.country,
       state: property.state,

       description: property.description,
       createdAt: property.createdAt,
       updatedAt: property.updatedAt,

     })), ...resultDevelopments.map((development) => ({
       id: development._id,
       slug: development.slug,
       type: 'SALE'  as ListingType,
       listingStatus: 'PUBLISHED' as ListingStatus,
       images: development.images,
       price: development.price,
       location: development.location,
              city: development.city,
       country: development.country,
       state: development.state,
       currency: 'MXN',
        description: development.description,
       createdAt: development.createdAt,
       updatedAt: development.updatedAt,
     }))];

     console.log(city)
     listings = listings.filter((listing) => toSlug(listing.city) == city || toSlug(listing.state) == city || toSlug(listing.country) == city).filter((listing) => listingConver[listing.type] === transaction)
     const total = listings.length;

   const paginatedItems = listings.slice(offset, offset + pageSize);

   const pages = Math.ceil(total / pageSize);
   const hasPreviousPage = page > 1;
   const hasNextPage = page < pages;
   const nextPage = hasNextPage ? page + 1 : page;
   const previousPage = hasPreviousPage ? page - 1 : page;

    return {
        count: listings.length,
        items: paginatedItems,
        pageInfo: {
            page: page,
            pages: pages,
            hasNextPage: hasNextPage,
            hasPreviousPage: hasPreviousPage,
            nextPage: nextPage,
            previousPage: previousPage
        }        
    };
}


// interface Query {
//   status: StatusType;
//   name?: { $regex: string; $options: string };
// }

// interface PropertiesWithType {
//   itemType: "proeprty" | "development";
// }

// export const getAllDevelopmentsAndProperties = async ({
//   page = 1,
//   limit = 14,
//   house = "",
//   search = "",
//   state,
//   propertyType,
//   constructionType,
//   minPrice,
//   maxPrice,
//   bedrooms,
//   bathrooms,
// }: Params) => {
//   const db = getDbInstance();
//   const pageSize = Number(limit);
//   const skip = Number((page - 1) * pageSize);

//   const query: Query = { status: StatusType.ACTIVE };

//   let resultProperties = db
//     .select()
//     .from(properties)
//     .where(eq(properties.status, "active"));

//   let developmentsQuery = getDbInstance().select().from(developments);

//   // if (state) {
//   //   const stateCondition = eq(properties.state, state);
//   //   resultProperties = resultProperties.where(stateCondition);
//   //   developmentsQuery = developmentsQuery.where(stateCondition);
//   // }

//   if (propertyType !== "undefined" && propertyType.length > 0) {
//     console.log("Enter here", { propertyType });
//     resultProperties = resultProperties.where(
//       and(eq(properties.type, propertyType), eq(properties.status, "active"))
      
//     );
//     developmentsQuery = developmentsQuery.where(
//       eq(developments.type, propertyType)
//     );
//   }

//   if (constructionType) {
//     // resultProperties = resultProperties.where(eq(properties.constructionType, constructionType));
//   }

//   if (minPrice) {
//     resultProperties = resultProperties.where(gte(properties.price, minPrice));
//   }

//   if (maxPrice) {
//     resultProperties = resultProperties.where(lte(properties.price, maxPrice));
//   }

//   if (bedrooms) {
//     resultProperties = resultProperties.where(
//       gte(properties.bedrooms, bedrooms)
//     );
//   }

//   if (bathrooms) {
//     resultProperties = resultProperties.where(
//       gte(properties.bathrooms, bathrooms)
//     );
//   }

//   resultProperties = await resultProperties;
//   developmentsQuery = await developmentsQuery;

//   const resultDevelopments = developmentsQuery.map((development) => ({
//     ...development,
//     properties: resultProperties.filter(
//       (property) => property.development === development.id
//     ),
//   }));

//   let allProperties: PropertiesWithType[] = [];

//   console.log("ESTATE", state)
  
//   const informa = resultDevelopments.map((prop) => prop.state)



//   if(state !== 'undefined'){

//   allProperties = [
//     ...resultDevelopments
//     .filter((prop) => normalizeText(prop.state).includes(state.toLowerCase() ? state.toLowerCase() : ''))
//     .map((property: PropertiesWithType) => ({
//       ...property,
//       itemType: "development",
//     })),
//     ...resultProperties
//       .filter((prop) => prop.category == "general" && normalizeText(prop.state).includes(state.toLowerCase() ? state.toLowerCase() : ''))
//       .map((property: PropertiesWithType) => ({
//         ...property,
//         itemType: "property",
//       })),
//   ];
// }

//   if(state == 'undefined'){
//     console.log("Enmter NO state", state)

//   allProperties = [
//     ...resultDevelopments
//     .map((property: PropertiesWithType) => ({
//       ...property,
//       itemType: "development",
//     })),
//     ...resultProperties
//       .filter((prop) => prop.category == "general")
//       .map((property: PropertiesWithType) => ({
//         ...property,
//         itemType: "property",
//       })),
//   ];
// }

// console.log(allProperties)

//   const total = allProperties.length;

//   const paginatedItems = allProperties.slice(skip, skip + pageSize);

//   const pages = Math.ceil(total / pageSize);
//   const hasPreviousPage = page > 1;
//   const hasNextPage = page < pages;
//   const nextPage = hasNextPage ? page + 1 : page;
//   const previousPage = hasPreviousPage ? page - 1 : page;

//   return {
//     count: total,
//     countNew: resultDevelopments.length,
//     countOld: resultProperties.filter((prop) => prop.category == "general")
//       .length,
//     items: paginatedItems,
//     pageInfo: {
//       page,
//       pages,
//       hasPreviousPage,
//       hasNextPage,
//       nextPage,
//       previousPage,
//     },
//   };
// };

// const normalizeText = (text: string) => {
//   return text
//     .toLowerCase() // Convierte todo a minúsculas
//     .normalize("NFD") // Descompone caracteres con diacríticos
//     .replace(/[\u0300-\u036f]/g, ""); // Remueve diacríticos
// };