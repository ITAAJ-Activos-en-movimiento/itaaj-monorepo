import { useState } from "react";
import { ButtonLink, Field, Input, Loader } from "@/components";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "@/constant-definitions";
import { EmptyTable, HeaderPage, Table } from "@/containers";
import Breadcrumbs from "@/components/Shared/Breadcumbs";
import styles from "./Developments.module.css";
import { useProposals } from "@/hooks";

const Proposals = () => {
  const [, setSearch] = useState<string>("");
  const [limit, setLimit] = useState<number>(5);
  const [, setPage] = useState<number>(1);
  const navigate = useNavigate();

  const { proposals, isLoading } = useProposals();

  return (
    <div className={styles.container}>
      <HeaderPage title="Propuestas">
        <Breadcrumbs items={["Realty", "Propuestas"]} />
      </HeaderPage>
      <div className={styles.header_page}>
        <Field className={styles.field}>
          <Input
            type="search"
            placeholder="Buscar propuestas"
            onChange={({ target }) => setSearch(target.value)}
          />
        </Field>
        {/* <ButtonLink to='/proposals/create'>Add Property</ButtonLink> */}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {proposals?.length > 0 ? (
            <Table
              count={proposals?.length}
              data={proposals}
              setLimit={setLimit}
              limit={limit}
              setPage={setPage}
              headers={["Name", "Nationality", "Proposal", "Funding", "Found"]}
              deleteItem={() => ({})}
              setItemSelected={({ slug }: { slug: string }) => {
                navigate(`${PrivateRoutes.PROPERTIES}/${slug}`);
              }}
            />
          ) : (
            <EmptyTable title="Proposals" url="/properties/create" />
          )}
        </>
      )}
    </div>
  );
};

export default Proposals;
