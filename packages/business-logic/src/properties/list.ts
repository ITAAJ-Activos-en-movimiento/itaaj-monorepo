import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { StatusType, properties } from "@itaaj/entities";
import { eq, and } from 'drizzle-orm';


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

export const getAllProperties = async ({page = 1, limit = 1004, search= ''}: Params) => {
  // const result = await getDbInstance()
  //   .select()
  //   .from(properties)
  //   .where(eq(properties.status, "active"));

   
 const query: Query = { status: StatusType.ACTIVE }

 if(search){
    query.name = { $regex: search, $options: 'i' };
  }
 
 const pageSize = limit;
 const skip = (page - 1) * pageSize;

 let result = await getDbInstance()
 .select()
 .from(properties)
 .where(and(eq(properties.status, "active"), eq(properties.development, "")))
 .limit(pageSize)
 .offset(skip);
 
 const totalResult = await getDbInstance()
 .select()
 .from(properties)
 .where(and(eq(properties.status, "active"), eq(properties.development, "")))
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