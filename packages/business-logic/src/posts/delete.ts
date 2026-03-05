import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { posts } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const deletePost = async (id: string): Promise<boolean | Error> => {
  try {
    const db = getDbInstance();
    const updatedPost = await db
      .update(posts)
      .set({ status: "deleted" })
      .where(eq(posts.id, id))
      .returning();

    if (updatedPost.length > 0) {
      return true;
    } else {
      return new Error(`No post found with id ${id}`);
    }
  } catch (error) {
    return error as Error;
  }
};