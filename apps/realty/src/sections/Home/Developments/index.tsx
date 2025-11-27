import React from "react";
import styles from "./Exclusive.module.css";
import { Divider, PropertyCard } from "@/components";
import Link from "next/link";
import { NextPage } from "next";
import { developments as developmentsApi } from "@/services";
import Slider from "./Slider";

const Developments: NextPage = async () => {
  const developments = await developmentsApi();
  console.log(developments);
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2>Desarrollos Exclusivos</h2>
          <p>
            Proyectos revisados detalladamente con el fin de asegurarnos que
            tengan viabilidad financiera, legal y técnica.
          </p>
          <Divider />
        </div>
        <Link href="/comprar/viviendas" className={styles.btn}>
          Mostrar todos los desarrollos
        </Link>
      </div>

      <Slider properties={developments} />
    </section>
  );
};

export default Developments;
