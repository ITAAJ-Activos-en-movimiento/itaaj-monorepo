import { useState } from "react";
import { ButtonLink, Field, Input, Loader } from "@/components";
import { EmptyTable, HeaderPage } from "@/containers";
import Breadcrumbs from "@/components/Shared/Breadcumbs";
import styles from "./Developments.module.css";
import { usePropertiesDevelopments } from "@/hooks";
import PropertyTable from "./Table/PropertyTable";

const PropertiesModel = () => {
  const [, setSearch] = useState<string>("");
  const { properties, isLoading } = usePropertiesDevelopments();

  console.log("DATITA", properties)
  return (
    <div className={styles.container}>
      <HeaderPage title="Modelos de Desarrollos ">
        <Breadcrumbs items={["Realty", "Propiedades"]} />
      </HeaderPage>
      <div className={styles.header_page}>
        <Field className={styles.field}>
          <Input
            type="search"
            placeholder="Buscar modelos"
            onChange={({ target }) => setSearch(target.value)}
          />
        </Field>
        <ButtonLink to="/properties/developments/create">Agregar Modelo</ButtonLink>
      </div>
      <div className={styles.content}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {properties?.length > 0 ? (
              <PropertyTable />
            ) : (
              <EmptyTable title="Modelos" url="/properties/create" />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PropertiesModel;
