import { useState } from "react";
import { ButtonLink, Field, Input, Loader } from "@/components";
import { EmptyTable, HeaderPage } from "@/containers";
import Breadcrumbs from "@/components/Shared/Breadcumbs";
import styles from "./Developments.module.css";
import { useProperties } from "@/hooks";
import PropertyTable from "./Table/PropertyTable";

const Properties = () => {
  const [, setSearch] = useState<string>("");
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
