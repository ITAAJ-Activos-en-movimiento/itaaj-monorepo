import { getDbInstance } from "@itaaj/data-sources/src/postgresql";
import { Post, posts } from "@itaaj/entities";
import slugify from "slugify";

export const createPost = async (data: Post): Promise<Post | Error> => {
  const slug = slugify(data.title, { lower: true });
  const result = await getDbInstance()
    .insert(posts)
    .values({ ...data, slug, status: "active" })
    .returning();
  return result;
};
