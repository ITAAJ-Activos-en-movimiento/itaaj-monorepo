import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Post, posts } from "@itaaj/entities";
import { eq } from "drizzle-orm";

export const updatePost = async (
  id: string,
  data: Partial<Post>
): Promise<boolean | Error> => {
  try {
    const db = getDbInstance();
    const updatedPost = await db
      .update(posts)
      .set({ ...data })
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
