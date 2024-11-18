import React from "react";
import { PropertyCard } from "./components";
import {
  properties as propertiesApi,
  propertiesDevelopments,
} from "@/services";
import { developments as developmentsApi } from "@/services";
import { Development, Property } from "@itaaj/entities";
import styles from "./Buy.module.css";
import { Bell, Clock } from "react-feather";
import DevelopmentCard from "./components/DevelopmentCard";
import FilterForm from "./components/FilterForm";
import Link from "next/link";
import Pagination from "./components/Pagination";
import Map from "./components/Map";
import { MostSearched } from "@/sections";
import Container from "./components/Container";
import { MapProvider } from "./context/MapContext";
import OpenMap from "./components/OpenMap";

type PropertyOrDevelopment = Property &
  Development & {
    itemType: "property" | "development";
  };

const Properties = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const estado = searchParams.estado as string;
  const tipo = searchParams.tipo as string;
  const tipoConstruccion = searchParams.tipoConstruccion as string;
  const precio = searchParams.precio as string;
  const habitaciones = searchParams.habitaciones as string;
  const banos = searchParams.banos as string;
  // const properties = await propertiesApi({ page: 1, limit: 14 });
  console.log("Search", (searchParams?.search as string))

  const state = (searchParams?.search as string) ? (searchParams?.search as string) : undefined;
  const properties = await propertiesDevelopments({
    type: tipo,
    page: Number(searchParams?.page || 1),
    limit: 14,
    state: state
  });

  console.log(properties)


  return (
    <MapProvider>
      <>
        {/* <FilterForm /> */}
        <Container>

          <div
            style={{
              paddingBlock: 50,
            }}
          >
            <div className={styles.header} >
            <div  >

            <h2 className={styles.title}>
              Departamentos y casas en venta en México
            </h2>
            <p className={styles.subtitle}>
              {properties.countOld} usadas y {properties.countNew} de obra nueva{" "}
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
            <OpenMap />

            </div>

            {properties.items.map((property: PropertyOrDevelopment) => {
              if (property.itemType == "property") {
                return <PropertyCard key={property.id} {...property} />;
              } else {
                return <DevelopmentCard key={property.id} {...property} />;
              }
            })}

            <Pagination pages={properties.pageInfo.pages} />
          </div>
          <div className={styles.map_view}>
          <Map properties={properties} />
          </div>

        </Container>

        <MostSearched />

      </>
    </MapProvider>
  );
};

export default Properties;
