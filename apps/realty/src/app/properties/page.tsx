import React from "react";
import styles from "./Properties.module.css";
import Property from "@/components/Buy/Property";
import {
  developments as developmentsApi,
  properties as propertiesApi,
} from "@/services";
import MapProperties from "./MapProperties";

const Properties = async () => {
  const properties = await propertiesApi();
  const developments = await developmentsApi();

  const newLocations = properties.map((property: any) => property.location);
  const locations = newLocations.filter((loca: any) => loca.latitude !== 0);

  return (
    <>
      <div className={styles.header}>
        <h2>Filtros</h2>
        <select name="" id="">
          <option value="">Estado</option>
        </select>
        <select name="" id="">
          <option value="">Colonia</option>
        </select>
        <select name="" id="">
          <option value="">Tipo de vivienda</option>
        </select>
        <select name="" id="">
          <option value="">Tipo de construcción</option>
        </select>
        <select name="" id="">
          <option value="">Precio</option>
        </select>
        <select name="" id="">
          <option value="">Habitaciones</option>
        </select>
        <select name="" id="">
          <option value="">Baños</option>
        </select>
      </div>
      {properties.length == 0 ? (
        <div className={styles.notProperties}>
          <div>
            <i className="bx bx-shape-circle"></i>
          </div>
          <h2>No hay Propiedades</h2>
        </div>
      ) : (
        <div>
          <div className={styles.filters}>
            <h2 className={styles.title}>
              Viviendas y casas en venta en Mexico
            </h2>
            <p>
              {
                properties.filter((property: any) => !property.development)
                  .length
              }{" "}
              usadas y{" "}
              {
                properties.filter((property: any) => property.development)
                  .length
              }{" "}
              de obra nueva
            </p>
            <div className={styles.option}>
              <span>
                <i className="bx bx-info-circle"></i>
                <p>Ordenar</p>
              </span>
              <select name="" id="">
                <option value="score">Puntuación</option>
                <option value="recents">Mas recientes</option>
                <option value="low">Mas baratos</option>
                <option value="high">Mas caros</option>
                <option value="big">Mas grandes</option>
                <option value="small">Mas pequeños</option>
              </select>
            </div>
          </div>
          <div className={styles.container_body} >
            <div className={styles.properties}>
              {properties?.map((property: any) => (
                <Property key={property.id} {...property} />
              ))}
            </div>
            <div className={styles.map}>
              <MapProperties locations={locations} />

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Properties;
