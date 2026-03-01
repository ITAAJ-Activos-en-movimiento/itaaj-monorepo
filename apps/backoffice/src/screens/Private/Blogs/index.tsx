import { usePosts } from "@/hooks";
import { Loader } from "@/components";
import { EmptyTable, HeaderPage } from "@/containers";
import styles from "./Blog.module.css";
import BlogTable from "./Table/PropertyTable";
import { Link } from "react-router-dom";

const Blog = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) return <Loader />;
  return (
    <div className={styles.container}>
      <HeaderPage title="Blog">
        <Link className={styles.link} to={"create"}>
          Nuevo post
        </Link>
      </HeaderPage>

      <div className={styles.content}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {posts?.length > 0 ? (
              <BlogTable />
            ) : (
              <EmptyTable title="Blog" url="/properties/create" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Blog;
