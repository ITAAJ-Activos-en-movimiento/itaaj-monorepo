import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { posts } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const getAllPosts = () => {
  const result = getDbInstance()
    .select()
    .from(posts)
    .where(eq(posts.status, "active"));

  return result;
};
