import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { StatusType, developments, properties } from "@itaaj/entities";
import { and, eq, isNotNull, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";

interface Query {
  status: StatusType;
  name?: { $regex: string; $options: string };
  account?: string;
}

interface Params {
  account?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export const getAllDevelopments = async ({page = 1, limit = 1004, search= ''}: Params) => {
 const query: Query = { status: StatusType.ACTIVE }

 if(search){
    query.name = { $regex: search, $options: 'i' };
  }
 
 const pageSize = limit;
 const skip = (page - 1) * pageSize;

 
 let developmentsQuery = await getDbInstance()
 .select()
 .from(developments)
 .limit(pageSize)
 .offset(skip);
 
 const propertiesResult = await getDbInstance().select()
 .from(properties);

 const result = developmentsQuery.map(development => ({
  ...development,
  properties: propertiesResult.filter(property => property.development === development.id)
}));

console.log(result)
 const totalResult = await getDbInstance()
 .select()
 .from(developments)

 const total = totalResult.length;

 console.log({total})
 const pages = Math.ceil(total / pageSize);

 const hasPreviousPage = page > 1;
 const previousPage = hasPreviousPage ? page - 1 : page;
 const hasNextPage = page < pages;
 const nextPage = hasNextPage ? page + 1 : page;


 
 return {
  count: total,
  items: result,
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
