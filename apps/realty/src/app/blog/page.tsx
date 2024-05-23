import { getPostsApi } from "@/services";
import styles from "./Blog.module.css";
import Image from "next/image";
import Link from "next/link";
import { ChevronsRight } from "react-feather";

const Blog = async () => {
  const posts = await getPostsApi();

  const truncateExcerpt = (text: string, limit: number) => {
    const words = text.split(" ");
    if (words.length > limit) {
      return words.slice(0, limit).join(" ") + " ...";
    } else {
      return text;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header_title}>
        <div className={styles.title}>
          <h1>Tendencias, tips y noticias del Sector Inmobiliario en México</h1>
        </div>
      </div>

      <div className={styles.container_banner}>
        <div className={styles.card_principal}>
          <div className={styles.new}>
            <span>Nuevo</span>
          </div>
          <div className={styles.bn_img}>
            <Image
              src={posts?.[0]?.featuredImage}
              width={550}
              height={320}
              alt={posts?.[0].title}
            />
          </div>
          <div>
            <div className={styles.banner}>
              <h5>{posts[0]?.category}</h5>
              <h1>{posts[0]?.title}</h1>

              <p>{truncateExcerpt(posts[0]?.excerpt, 26)}</p>
              <Link
                className={styles.show_more}
                href={`/blog/${posts?.[0]?.slug}`}
              >
                Ver más <ChevronsRight />{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.container_cards}>
          {posts?.map(
            (post: {
              title: string;
              category: string;
              excerpt: string;
              slug: string;
              featuredImage: string;
            }) => (
              <div key={post.slug} className={styles.card}>
                <div className={styles.image}>
                  <Image
                    src={post?.featuredImage}
                    layout="fill"
                    objectFit="cover"
                    alt={post?.title}
                  />
                </div>
                <div>
                  <div className={styles.banner_card}>
                    <h5>{post?.category}</h5>
                    <h3>{truncateExcerpt(posts[0]?.title, 10)}</h3>
                    <span>{truncateExcerpt(posts[0]?.excerpt, 20)}</span>
                    <Link
                      className={styles.show_more}
                      href={`/blog/${post?.slug}`}
                    >
                      Ver más <ChevronsRight />{" "}
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
