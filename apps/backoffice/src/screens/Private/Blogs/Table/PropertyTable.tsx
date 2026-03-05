import { Post } from "@itaaj/entities";
import { Table } from "@/containers";
import { usePosts } from "@/hooks";
import Menus from "@/components/Shared/Menus";
import BlogRow from "./BlogRow";

const BlogTable = () => {
  const { posts } = usePosts();

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 5rem">
        <Table.Header>
          <div>Titulo</div>
          <div>Categoria</div>
          <div>Fecha</div>
        </Table.Header>
        <Table.Body<Post>
          data={posts}
          render={(post, index) => (
            <BlogRow post={post} index={index} key={post?.uuid} />
          )}
        />
      </Table>
    </Menus>
  );
};

export default BlogTable;
