import Link from "next/link";
import React from "react";
import styles from "./Prices.module.css";
import Image from "next/image";

const PriceIndex = () => {
  return (
    <div>
      <section className={styles.banner_container}>
        <div className={styles.banner}>
          <div>
            <h1>Índice Inmobiliario de precios Itaaj</h1>
            <p>
              Consulta el precio por m2 de las propiedades en tu zona y su
              evolución
            </p>

            <div className={styles.field}>
              <input placeholder="Introduce el estado, ciudad, colonia, barrio" />
              <button>Buscar</button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.list_section}>
        <h2>Búsquedas más frecuentes de precio de vivienda por colonias</h2>
        <div className={styles.list}>
          <ul>
            <li>
              <Link href="/properties">Precio casas Tecamachalco</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Santa Fe</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Roma Sur</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Polanco</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Coyoacán</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas San Ángel</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas La Juárez</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Nápoles</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Del Valle</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Escandón</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Lomas de Chapultepec</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Tacubaya</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Buenavista</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link href="/properties">Precio casas Interlomas</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Bosque Real</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Tecamachalco</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas La Herradura</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Los Arboledas</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas San Ángel</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas La Juárez</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Nápoles</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas La Piedad</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Escandón</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Lomas de Chapultepec</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Tacubaya</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Buenavista</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link href="/properties">Precio casas Jardines de Morelos</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas San Cristóbal Centro</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Ciudad Azteca</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Santa Clara Coatitla</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas La Perla</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Benito Juárez</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas El Sol</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Nápoles</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Del Valle</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Escandón</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Lomas de Chapultepec</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Tacubaya</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Buenavista</Link>
            </li>
          </ul>

          <ul>
            <li>
              <Link href="/properties">Precio casas Centro Histórico</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Altabrisa</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Montecristo</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Colonia México</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Itzimná</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Reforma</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Colonia Centro</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas San Bernardino</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Ciprés</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Universidad</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas Lomas Verdes</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas El Mirador</Link>
            </li>
            <li>
              <Link href="/properties">Precio casas San Bartolo</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.desc_section}>
        <div className={styles.content}>
          <div>
            <h2>¿Qué es el índice inmobiliario de Itaaj?</h2>
            <span className={styles.divider} />
            <p>
              El portal inmobiliario Itaaj Realty publica un índice inmobiliario
              con una periodicidad mensual de precios de venta. Se ha
              desarrollado esta vía de estudio para proporcionar información
              relevante del mercado de la vivienda en Colombia, que sea fiable y
              oportuno, de rápida intrumentación y difusión.
            </p>
            <p>
              El índice se elabora a partir de la base de datos del portal Itaaj
              Realty, lo que permite extraer las estadísticas con la rpaidez
              necesaria para que familias, empresas, entidades financieras y
              estudiosos del sector puedan aprovechar este detallado annálisis
              de los precios medios por metro cuadrado en cada zona de México.
            </p>
          </div>
          <Image
            src="/article-img1.jpeg"
            width={500}
            height={350}
            alt="Indice de precios Itaaj"
          />
        </div>
        <div className={styles.content}>
        <Image
            src="/article-img2.jpeg"
            width={500}
            height={450}
            alt="Indice de precios Itaaj"
          />
          <div>
            <h2>¿Qué se tiene en cuenta para calcular el precio medio de las casas?</h2>
            <span className={styles.divider} />
            <p>
            En el estudio se incluyen los precios del mercado inmobiliario de segunda mano de todo el territorio nacional. Se presentan datos desglosados para comunidades autónomas, provincias, municipios, distritos, barrios y principales calles de las más importantes capitales.
            </p>
            <p>
            Los datos hacen referencia a viviendas tanto de particulares como de profesionales, y provienen de quienes publican sus ofertas en el portal de Itaaj Realty. Por lo tanto, los valores indicados son de oferta y no necesariamente constituyen el precio al que, finalmente, se cierran las transacciones.
            </p>
            <p>Además, la información se refiere a pisos y áticos. Se excluyen otras viviendas, como apartamentos, dúplex y lofts, y las unifamiliares, torres, chalés y casas adosadas, con el fin de tener una muestra más homogénea.</p>
            <p>Los precios indicados son los precios medios por cada categoría, expresados originalmente en euros por metro cuadrado construido de la vivienda. Los precios que se visualizan mensualmente son la media de las últimas 4 semanas.</p>
          </div>
         
        </div>
      </section>
    </div>
  );
};

export default PriceIndex;
