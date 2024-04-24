import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { StatusType, funnels } from "@itaaj/entities"

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

export const getAllFunnels = async ({page = 1, limit = 14, search= ''}: Params) => {
    const result = await getDbInstance().select().from(funnels)

    console.log({result})
 const query: Query = { status: StatusType.ACTIVE }

 if(search){
    query.name = { $regex: search, $options: 'i' };
  }
 
 const pageSize = limit;
 const skip = (page - 1) * pageSize;

 const total = result.length;


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
}