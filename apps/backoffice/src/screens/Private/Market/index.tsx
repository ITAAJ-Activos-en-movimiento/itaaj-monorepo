import { useState } from "react";
import { ButtonLink, Field, Input, Loader } from "@/components";
// import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/constant-definitions";
import { EmptyTable, HeaderPage } from "@/containers";
import Breadcrumbs from "@/components/Shared/Breadcumbs";
import styles from "./Developments.module.css";
import DevelopmentTable from "./Table/DevelopmentTable";

const Market = () => {
  const [, setSearch] = useState<string>("");

  const analysis = {
    items: []
  }

  const isLoading= false;

  return (
    <div className={styles.container}>
      <HeaderPage title="Análisis de Mercado">
        <Breadcrumbs items={["Realty", "Análisis de Mercado"]} />
      </HeaderPage>
      <div className={styles.header_page}>
        <Field className={styles.field}>
          <Input
            type="search"
            placeholder="Buscar análisis"
            onChange={({ target }) => setSearch(target.value)}
          />
        </Field>
        <ButtonLink to={"/market/create"}>
          Nuevo Análisis
        </ButtonLink>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.content}>
          {analysis.items?.length > 0 ? (
            <DevelopmentTable />
          ) : (
            <EmptyTable title="Análisis" url="/properties/create" />
          )}
        </div>
      )}
    </div>
  );
};

export default Market;
