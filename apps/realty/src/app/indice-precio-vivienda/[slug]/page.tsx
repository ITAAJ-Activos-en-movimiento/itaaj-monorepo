import React from "react";
import Map from "../components/Map";
import styles from "./Desc.module.css";
import Image from "next/image";

const colonia = "Tecamachalco";

const PriceIndexDesc = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info} >
        <h1>Precio por m² de las propiedades en {colonia}</h1>
        <div className={styles.header} >
          <h4>Comprar</h4>
          <span>Junio de 2024</span>
        </div>

        <h3>Precio de compra de propiedades en {colonia}</h3>

        <div  className={styles.main_pricing} >

          <div className={styles.info_card} >
            <Image src="/area.svg" width={35} height={35} alt="Area Icono" />
            <div>
              <h3>$5.442 /m²</h3>
              <p>Precio por m²</p>
            </div>
          </div>
          <div className={styles.info_card} >
            <Image src="/house.svg" width={35} height={35} alt="Area Icono" />

            <div>
              <h3>$591.4692 /m²</h3>
              <p>Valor medio de un inmueble</p>
            </div>
          </div>
        </div>

        <h4 className={styles.middle_title} >Precio m² por número de habitaciones</h4>
        <div className={styles.grid_info} >
        <div className={styles.info_card} >
            <Image src="/1room.svg" width={25} height={25} alt="Area Icono" />
            <div>
              <h3>$5.285 /m²</h3>
              <p>Precio por estudio o 1 habitación</p>
            </div>
          </div>
          <div className={styles.info_card} >
            <Image src="/3room.svg" width={25} height={25} alt="Area Icono" />
            <div>
              <h3>$5.442 /m²</h3>
              <p>Precio de 3 habitaciones</p>
            </div>
          </div>
          <div className={styles.info_card} >
            <Image src="/2room.svg" width={25} height={25} alt="Area Icono" />
            <div>
              <h3>$5.442 /m²</h3>
              <p>Precio de 2 habitaciones</p>
            </div>
          </div>
          <div className={styles.info_card} >
            <Image src="/4room.svg" width={25} height={25} alt="Area Icono" />
            <div>
              <h3>$5.442 /m²</h3>
              <p>Precio de más de 3 habitaciones</p>
            </div>
          </div>
        </div>

        <h4 className={styles.middle_title} >Precio medio de prpiedades por tamaño</h4>
        <div className={styles.grid_info} >
        <div className={styles.info_card} >
            <div>
              <h3>$545.442 </h3>
              <p>Precio por {'<'} 100m² </p>
            </div>
          </div>
          <div className={styles.info_card} >
            <Image src="/4room.svg" width={25} height={25} alt="Area Icono" />
            <div>
              <h3>$956.442 /m²</h3>
              <p>Precio por {'>'} 100m² </p>
            </div>
          </div>
        </div>
      </div>

      <Map />
    </div>
  );
};

export default PriceIndexDesc;
