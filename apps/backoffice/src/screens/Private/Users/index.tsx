import { HeaderPage } from "@/containers";
import UsersTable from "./Table/UsersTable";
import styles from "./Users.module.css";

import { Field, Input } from "@/components";
import { useState } from "react";

const Users = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <div className={styles.container_users}>
      <HeaderPage title="Usuarios">
        <Field className={styles.field}>
          <Input
            type="search"
            placeholder="Buscar usuario"
            onChange={({ target }) => setSearch(target.value)}
          />
        </Field>
      </HeaderPage>

      <div className={styles.content}>
        <UsersTable search={search} />
      </div>
    </div>
  );
};

export default Users;
