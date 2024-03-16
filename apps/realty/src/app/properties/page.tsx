import React from "react";
import styles from "./Properties.module.css";
import Property from "@/components/Buy/Property";
import {
  developments as developmentsApi,
  properties as propertiesApi,
} from "@/services";
import MapProperties from "./MapProperties";
import PropertiesWithMap from "./PropertiesWithMap";

const Properties = async ({
  searchParams,
}: {
  searchParams?: {
    type?: string;
    search?: string;
  };
}) => {
  const properties = await propertiesApi();

  const newLocations = properties.map((property: any) => property.location);
  const locations = newLocations.filter((loca: any) => loca.latitude !== 0);

  function compararPorDesarrollo(a: any, b: any): number {
    // Si a.development es nulo y b.development no es nulo, colocamos a después de b
    if (a.development === null && b.development !== null) {
      return 1;
    }
    // Si a.development no es nulo y b.development es nulo, colocamos a antes de b
    else if (a.development !== null && b.development === null) {
      return -1;
    }
    // En todos los demás casos, mantenemos el orden actual
    else {
      return 0;
    }
  }

  // Ordenar la lista utilizando la función de comparación personalizada
  const listaOrdenada = properties.sort(compararPorDesarrollo);
  const developmentVistos = new Set<string>();
  const listaUnica = listaOrdenada.filter((item: any) => {
    if (item.development !== null) {
      if (!developmentVistos.has(item.development)) {
        developmentVistos.add(item.development);
        return true;
      }
      return false;
    }
    return true; // Mantener todas las instancias con development nulo
  });

  return (
    <div>
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
      <PropertiesWithMap properties={listaUnica} searchParams={searchParams} locations={locations} />
      {/* 
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
          <div className={styles.container_body}>
          
          
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Properties;
