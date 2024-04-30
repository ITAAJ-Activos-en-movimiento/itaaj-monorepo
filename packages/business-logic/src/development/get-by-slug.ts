import { getDbInstance } from '@itaaj/data-sources/src/postgresql';
import { Development, developments} from '@itaaj/entities';
import { and, eq } from 'drizzle-orm';

export const getDevelopmentById = async (slug: string): Promise<Development> => {
    
     let result = await getDbInstance().select().from(developments)
     .where(and(eq(developments.slug, slug!)));
     
     if(!result){
          result = await getDbInstance().select().from(developments)
          .where(and(eq(developments.id, slug!)));
     }
    
     const development = result[0] as Development;
    
     return development;
}
