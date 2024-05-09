import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Funnel, funnels } from "@itaaj/entities";
import { and, eq } from "drizzle-orm";

export const getFunnelById = async(id: string): Promise<Funnel | null> => {
    const result = await getDbInstance()
    .select()
    .from(funnels).where(and(eq(funnels.id, id)));    
    const funnel = result[0] as Funnel;
    return funnel;
}