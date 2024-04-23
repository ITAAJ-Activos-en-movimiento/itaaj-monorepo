import { Modal, Table } from "@/containers";
import { Post } from "@itaaj/entities";
import Menus from "@/components/Shared/Menus";
import { Link } from "react-router-dom";
import { useDeletePost } from "@/hooks";

interface Props {
  post: Partial<Post>;
  index?: number;
  selected?: boolean;
  onSelect?: () => void;
}

const BlogRow = ({ post }: Props) => {
  const { deletePost } = useDeletePost();
  return (
    <Table.Row>
      <div>
        <h3
          style={{
            fontWeight: "500",
            fontSize: 13,
          }}
        >
          {post.title}
        </h3>
      </div>
      <div>
        <h3
          style={{
            fontWeight: "500",
            fontSize: 13,
          }}
        >
          {post.category}
        </h3>
      </div>

      <div>
        <h3
          style={{
            fontWeight: "500",
            fontSize: 13,
          }}
        >
          {post.createdAt ? new Date(post.createdAt).toISOString() : ""}
        </h3>
      </div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={post.id!} />

            <Menus.List id={post.id!}>
              <Modal.Open opens="edit">
                <Link to={"/post/" + post.slug}>Ver</Link>
              </Modal.Open>

              <Menus.Button onClick={() => deletePost(post.id!)}>
                Eliminar
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window title="" name="delete">
            <div></div>
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
};

export default BlogRow;
