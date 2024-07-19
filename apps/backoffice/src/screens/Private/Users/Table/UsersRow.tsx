import { Modal, Table } from "@/containers";
import { User } from "@itaaj/entities";
import Menus from "@/components/Shared/Menus";
import { useDeletePost } from "@/hooks";

interface Props {
  user: Partial<User>;
  index?: number;
  selected?: boolean;
  onSelect?: () => void;
}

const UsersRow = ({ user }: Props) => {
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
          {user.name}
        </h3>
      </div>
      <div>
        <h3
          style={{
            fontWeight: "500",
            fontSize: 13,
          }}
        >
          {user.lastname}
        </h3>
      </div>
      <div>
        <h3
          style={{
            fontWeight: "500",
            fontSize: 13,
          }}
        >
          {user.email}
        </h3>
      </div>

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={user.id!} />
            <Menus.List id={user.id!}>
              <Menus.Button>Ver</Menus.Button>
              <Menus.Button onClick={() => deletePost(user.id!)}>
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

export default UsersRow;
