import { useState } from "react";
import { ButtonLink, Field, Input, Loader } from "@/components";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/constant-definitions";
import { EmptyTable, HeaderPage, Table } from "@/containers";
import Breadcrumbs from "@/components/Shared/Breadcumbs";
import styles from "./Developments.module.css";
import { useProperties } from "@/hooks";
import PropertyTable from "./Table/PropertyTable";

const Properties = () => {
  const [, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(5);
  const [, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const { properties, isLoading } = useProperties();

  return (
    <div className={styles.container}>
      <HeaderPage title="Propiedades Corretaje">
        <Breadcrumbs items={["Realty", "Propiedades"]} />
      </HeaderPage>
      <div className={styles.header_page}>
        <Field className={styles.field}>
          <Input
            type="search"
            placeholder="Buscar propiedades"
            onChange={({ target }) => setSearch(target.value)}
          />
        </Field>
        <ButtonLink to='/properties/create'>Agregar Propiedad</ButtonLink>
      </div>
      <div className={styles.content} >

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {properties?.length > 0 ? (
            <PropertyTable />
          ) : (
            <EmptyTable title="Properties" url="/properties/create" />
          )}
        </>
      )}
      </div>

    </div>
  );
};

export default Properties;
