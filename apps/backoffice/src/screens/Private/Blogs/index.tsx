import { usePosts } from "@/hooks";
import { Loader } from "@/components";
import { EmptyTable, HeaderPage, Modal } from "@/containers";
import styles from "./Blog.module.css";
import BlogTable from "./Table/PropertyTable";
import CreatePost from "./Create";

const Blog = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) return <Loader />;
  return (
    <div className={styles.container}>
      <Modal>
        <HeaderPage title="Blog">
          <CreatePost />
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
      </Modal>
    </div>
  );
};

export default Blog;
