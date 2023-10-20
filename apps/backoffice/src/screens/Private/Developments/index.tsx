import { useEffect, useState } from "react";
import { Field, Input, Loader } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoutes } from "@/constant-definitions";
import { EmptyTable, HeaderPage, Layout, Table } from "@/containers";
import Breadcrumbs from "@/components/Shared/Breadcumbs";
import { AppStore } from "@/redux/store";
import styles from "./Developments.module.css";
import { useDevelopments } from "@/hooks";

const Developments = () => {
  const [search, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const { developments, isLoading } = useDevelopments();
  console.log("NUEVOS", developments);

  return (
    <Layout>
      <HeaderPage title="Developments">
        <Breadcrumbs items={["Realty", "Developments"]} />
      </HeaderPage>
      <div className={styles.header_page}>
        <Field>
          <Input
            type="search"
            placeholder="Search developments"
            onChange={({ target }) => setSearch(target.value)}
          />
        </Field>
        <Link to="/developments/create">Add Development</Link>
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
    </Layout>
  );
};

export default Developments;
