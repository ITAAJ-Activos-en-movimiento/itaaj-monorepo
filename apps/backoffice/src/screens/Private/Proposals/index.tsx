import { useState } from "react";
import {  Field, Input, Loader } from "@/components";
// import { useNavigate } from "react-router-dom";
import {  HeaderPage } from "@/containers";
import Breadcrumbs from "@/components/Shared/Breadcumbs";
import styles from "./Developments.module.css";
import { useProposals } from "@/hooks";

const Proposals = () => {
  const [, setSearch] = useState<string>("");
  // const [limit, setLimit] = useState<number>(5);
  // const [, setPage] = useState<number>(1);
  // const navigate = useNavigate();

  const { isLoading } = useProposals();

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
          {/* {proposals?.length > 0 ? (
            <Table
              headers={["Name", "Nationality", "Proposal", "Funding", "Found"]}
              deleteItem={() => ({})}
              setItemSelected={({ slug }: { slug: string }) => {
                navigate(`${PrivateRoutes.PROPERTIES}/${slug}`);
              }}
            />
          ) : (
            <EmptyTable title="Proposals" url="/properties/create" />
          )} */}
        </>
      )}
    </div>
  );
};

export default Proposals;
