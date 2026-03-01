import { getDbInstance } from '@itaaj/data-sources/src/postgresql';
import { Development, developments} from '@itaaj/entities';
import { and, eq } from 'drizzle-orm';
 
export const getDevelopmentById = async (slug: string): Promise<Development> => {
    
    const result = await getDbInstance().select().from(developments)
     .where(and(eq(developments.slug, slug!)));
     const development = result[0] as Development;
    
     return development;
}
