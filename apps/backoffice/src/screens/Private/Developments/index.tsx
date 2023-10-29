import { useState } from "react";
import { ButtonLink, Field, Input, Loader } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/constant-definitions";
import { EmptyTable, HeaderPage, Layout, Table } from "@/containers";
import Breadcrumbs from "@/components/Shared/Breadcumbs";
import styles from "./Developments.module.css";
import { useDevelopments } from "@/hooks";

const Developments = () => {
  const [, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(5);
  const [, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const { developments, isLoading } = useDevelopments();

  console.log(developments)
  return (
    <div className={styles.container}>
      <HeaderPage title="Developments">
        <Breadcrumbs items={["Realty", "Developments"]} />
      </HeaderPage>
      <div className={styles.header_page}>
        <Field className={styles.field}>
          <Input
            type="search"
            placeholder="Search developments"
            onChange={({ target }) => setSearch(target.value)}
          />
        </Field>
        <ButtonLink to={PrivateRoutes.CREATE_DEVELOPMENT}>Add Development</ButtonLink>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {developments?.length > 0 ? (
            <Table
              count={developments?.length}
              data={developments}
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
            <EmptyTable title="Developments" url="/properties/create" />
          )}
        </>
      )}
    </div>
  );
};

export default Developments;
