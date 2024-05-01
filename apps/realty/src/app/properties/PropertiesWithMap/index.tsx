"use client";
import React, { useEffect, useState } from "react";
import styles from "../Properties.module.css";
import Property from "@/components/Buy/Property";
import MapProperties from "../MapProperties";
import Link from "next/link";
import { Map } from "react-feather";

const PropertiesWithMap = ({ developments, properties, searchParams, locations }: any) => {
  const [scrollTop, setScrollTop] = useState(0);

  const [hidden, setHidden] = useState(true);

  const handleHidden = () => {
    setHidden(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      setScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const mapOffset = scrollTop * 0.5;

  return (
    <div className={hidden ? styles.general_center_container : styles.general_container}>
      <div className={styles.content}>
        <div className={styles.publish}>
          <p>Compara ofertas de distintos bancos y elige tu mejor hipoteca</p>
          <Link href="/hipotecas" >Calcular tu Hipoteca</Link>
        </div>
        <div className={styles.h_title}>
      <div>

        <h2 className={styles.title}>Viviendas y casas en venta en México</h2>
        <p>
          {properties.filter((property: any) => !property.development).length}{" "}
          usadas y{" "}
          {properties.filter((property: any) => property.development).length} de
          obra nueva
        </p>
      </div>
      {hidden && (
          <button onClick={() => setHidden(false)} ><Map size={18} /> Ver mapa</button>

      )}
        </div>
        
        <div className={styles.properties}>
          {developments
            ?.filter(
              (property: any) =>
                property.type
                  .toLowerCase()
                  .includes(searchParams?.type?.toLowerCase() || "") ||
                property.address
                  .toLowerCase()
                  .includes(searchParams?.search?.toLowerCase() || "") ||
                property.city
                  .toLowerCase()
                  .includes(searchParams?.search?.toLowerCase()) ||
                property.state
                  .toLowerCase()
                  .includes(searchParams?.search?.toLowerCase())
            )
            .map((property: any) => (
              <Property key={property.id} isDevelopment={true} {...property} />
            ))}
        </div>
        <div className={styles.properties}>
          {properties
            ?.filter(
              (property: any) =>
                property.type
                  .toLowerCase()
                  .includes(searchParams?.type?.toLowerCase() || "") ||
                property.address
                  .toLowerCase()
                  .includes(searchParams?.search?.toLowerCase() || "") ||
                property.city
                  .toLowerCase()
                  .includes(searchParams?.search?.toLowerCase()) ||
                property.state
                  .toLowerCase()
                  .includes(searchParams?.search?.toLowerCase())
            )
            .map((property: any) => (
              <Property key={property.id} isDevelopment={false} {...property} />
            ))}
        </div>
      </div>

      {!hidden && (
        <div className={styles.map_container}>
          <MapProperties
            locations={locations}
            scrollTop={mapOffset}
            onHidden={handleHidden}
          />
        </div>
      )}
    </div>
  );
};

export default PropertiesWithMap;
