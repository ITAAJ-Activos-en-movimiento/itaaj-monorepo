import { useState } from "react";
import { ButtonLink, Field, Input, Loader } from "@/components";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/constant-definitions";
import { EmptyTable, HeaderPage, Table } from "@/containers";
import Breadcrumbs from "@/components/Shared/Breadcumbs";
import styles from "./Developments.module.css";
import { useProperties } from "@/hooks";

const Properties = () => {
  const [, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(5);
  const [, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const { properties, isLoading } = useProperties();

  return (
    <div className={styles.container}>
      <HeaderPage title="Properties">
        <Breadcrumbs items={["Realty", "Properties"]} />
      </HeaderPage>
      <div className={styles.header_page}>
        <Field className={styles.field}>
          <Input
            type="search"
            placeholder="Search properties"
            onChange={({ target }) => setSearch(target.value)}
          />
        </Field>
        <ButtonLink to='/properties/create'>Add Property</ButtonLink>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {properties?.length > 0 ? (
            <Table
              count={properties?.length}
              data={properties}
              setLimit={setLimit}
              limit={limit}
              setPage={setPage}
              headers={["Name", "Address", "Country", "Price"]}
              deleteItem={() => ({})}
              setItemSelected={({ slug }: { slug: string }) => {
                navigate(`${PrivateRoutes.PROPERTIES}/${slug}`);
              }}
            />
          ) : (
            <EmptyTable title="Properties" url="/properties/create" />
          )}
        </>
      )}
    </div>
  );
};

export default Properties;
