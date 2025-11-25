import React, { Suspense } from "react";
import { PropertyCard } from "./components";
import { propertiesDevelopments } from "@/services";
import { Development, Property } from "@itaaj/entities";
import styles from "./Buy.module.css";
import { Bell, Clock } from "react-feather";
import DevelopmentCard from "./components/DevelopmentCard";
import Pagination from "./components/Pagination";
import { MostSearched } from "@/sections";
import Container from "./components/Container";

type PropertyOrDevelopment = Property &
  Development & {
    itemType: "property" | "development";
  };

const Properties = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const tipo = searchParams?.tipo as string;
  // const properties = await propertiesApi({ page: 1, limit: 14 });
  const currentPage = Number(searchParams.page || 1);

  const state = (searchParams?.search as string)
    ? (searchParams?.search as string)
    : undefined;
  const properties = await propertiesDevelopments({
    type: tipo,
    page: Number(searchParams?.page || 1),
    limit: 140,
    state: state,
  });

  return (
    <Suspense>
      <Container>
        <div
          className={styles.list}
          style={{
            paddingBlock: 50,
          }}
        >
          <div className={styles.header}>
            <div>
              <h2 className={styles.title}>
                Departamentos y casas en renta en México
              </h2>
              <p className={styles.subtitle}>
                {properties.countOld} usadas y {properties.countNew} de obra
                nueva{" "}
              </p>

              <div className={styles.filter}>
                <p>
                  <Clock size={16} /> Ordenar:{" "}
                </p>
                <select name="" id="">
                  <option value="">Más recientes</option>
                  <option value="">Más baratos</option>
                  <option value="">Más caros</option>
                  <option value="">Más grandes (más m2)</option>
                  <option value="">Más pequeños (menos m2)</option>
                </select>
              </div>
            </div>
          </div>

          {properties.items
            .filter(
              (property: PropertyOrDevelopment) =>
                property.transactionType == "rent" || property.alsoRent
            )
            .map((property: PropertyOrDevelopment) => {
              if (property.itemType == "property") {
                return <PropertyCard key={property.id} {...property} />;
              } else {
                return <DevelopmentCard key={property.id} {...property} />;
              }
            })}

          <Pagination
            pages={properties.pageInfo.pages}
            currentPage={currentPage}
            searchParams={searchParams}
          />
        </div>
      </Container>

      <MostSearched />
    </Suspense>
  );
};

export default Properties;
