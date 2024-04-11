import { useState } from "react";
import { ButtonLink, Field, Input, Loader } from "@/components";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/constant-definitions";
import { EmptyTable, HeaderPage, Table } from "@/containers";
import Breadcrumbs from "@/components/Shared/Breadcumbs";
import styles from "./Developments.module.css";
import { useDevelopments } from "@/hooks";
import DevelopmentTable from "./Table/DevelopmentTable";

const Developments = () => {
  const [, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(5);
  const [, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const { developments, isLoading } = useDevelopments();

  return (
    <div className={styles.container}>
      <HeaderPage title="Desarrollos">
        <Breadcrumbs items={["Realty", "Desarrollos"]} />
      </HeaderPage>
      <div className={styles.header_page}>
        <Field className={styles.field}>
          <Input
            type="search"
            placeholder="Buscar desarrollos"
            onChange={({ target }) => setSearch(target.value)}
          />
        </Field>
        <ButtonLink to={PrivateRoutes.CREATE_DEVELOPMENT}>
          Agregar Desarrollo
        </ButtonLink>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.content}>
          {developments?.length > 0 ? (
            <DevelopmentTable />
          ) : (
            <EmptyTable title="Desarrollos" url="/properties/create" />
          )}
        </div>
      )}
    </div>
  );
};

export default Developments;
