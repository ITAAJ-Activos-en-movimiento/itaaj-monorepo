import { Post } from "@itaaj/entities";
import { Table } from "@/containers";
import { useUsers } from "@/hooks";
import Menus from "@/components/Shared/Menus";
import BlogRow from "./UsersRow";

interface Props {
  search: string;
}

const UsersTable = ({ search }: Props) => {
  const { users } = useUsers({ search });

  return (
    <Menus>
      <Table columns="1fr 1fr 1fr 5rem">
        <Table.Header>
          <div>Nombre</div>
          <div>Apellido</div>
          <div>Correo</div>
        </Table.Header>
        <Table.Body<Post>
          data={users}
          render={(user, index) => (
            <BlogRow user={user} index={index} key={user?.uuid} />
          )}
        />
      </Table>
    </Menus>
  );
};

export default UsersTable;
