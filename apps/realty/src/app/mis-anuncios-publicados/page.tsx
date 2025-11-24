import styles from "./MyAds.module.css";
import React from "react";
import { NextPage } from "next";
import Image from "next/image";
import NavigationMenu from "@/components/UI/app/MyAds/NavigationMenu";
import { getServerSession } from "@/core/session";
import { redirect } from "next/navigation";
import Link from "next/link";

const MyAds: NextPage = async () => {
  const session = await getServerSession();
  if (!session?.user) redirect("/login");
  return (
    <>
      <div className={styles.container}>
        <NavigationMenu />
        <div className={styles.header}>
          <h3>Publica tus anuncios</h3>
        </div>

        <div className={styles.image}>
          <Image
            src="/ads.png"
            width={312}
            height={228}
            alt="Calcula tu hipoteca"
          />
        </div>
        <div className={styles.info}>
          <p>
            Puedes <strong>publicar gratis 2 anuncios</strong> de cada
            tipologia(vivienda, parking, trastero. etc.)
          </p>
          <p>
            Recuerda que un anuncio cuanto{" "}
            <strong>mas completa la informacion</strong> mas facil es que{" "}
            <strong>alguien se interese por el</strong>
          </p>
          <Link href="/publish" className={styles.button_blue}>
            Publicar un anuncio gratis
          </Link>
          <button className={styles.button_white}>
            Quiero valorar un inmueble
          </button>

          <p>
            Descargate la App de Itaaj Realty y recibe las novedades de tu
            anuncio en tu movil
          </p>
        </div>
      </div>
    </>
  );
};

export default MyAds;
