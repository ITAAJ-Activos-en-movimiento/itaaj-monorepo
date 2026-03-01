import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { posts } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const getBySlug = async (slug: string) => {
  const db = await getDbInstance();
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug));

  return result.length > 0 ? result[0] : null;
};



