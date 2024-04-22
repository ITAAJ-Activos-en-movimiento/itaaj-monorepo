import { usePosts } from "@/hooks";
import { Loader, Title } from "@/components";
import { Container, EmptyTable, Modal, ScreenHeader } from "@/containers";
import styles from "./Blog.module.css";
import BlogTable from "./Table/PropertyTable";
import CreatePost from "./Create";

const Blog = () => {
  const { posts, isLoading } = usePosts();

  if (isLoading) return <Loader />;
  return (
    <>
      <Modal>
        <Container>
          <ScreenHeader>
            <div>
              <Title text="Blog" />
            </div>
            <CreatePost />
          </ScreenHeader>
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
        </Container>
      </Modal>
    </>
  );
};

export default Blog;
