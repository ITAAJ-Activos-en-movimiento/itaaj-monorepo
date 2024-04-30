import { getDbInstance } from '@itaaj/data-sources/src/postgresql';
import { Development, developments} from '@itaaj/entities';
import { and, eq } from 'drizzle-orm';

function detectUuidOrSlug(input: string): 'uuid' | 'slug' | 'unknown' {
     const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
     const slugRegex = /^[a-zA-Z0-9_-]{3,}$/;
 
     if (uuidRegex.test(input)) {
         return 'uuid';
     } else if (slugRegex.test(input)) {
         return 'slug';
     } else {
         return 'slug';
     }
 }
 

export const getDevelopmentById = async (slug: string): Promise<Development> => {
    
     const type = detectUuidOrSlug(slug);

     let result;
     
     if(type == "uuid"){
          result = await getDbInstance().select().from(developments)
          .where(and(eq(developments.id, slug!)));
     }else{
          result = await getDbInstance().select().from(developments)
     .where(and(eq(developments.slug, slug!)));
     }
     
     const development = result[0] as Development;
    
     return development;
}
