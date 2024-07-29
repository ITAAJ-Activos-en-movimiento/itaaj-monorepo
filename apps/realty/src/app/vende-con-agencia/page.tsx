import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import svg from "../../../public/online_appraisal_how_A_desktop.svg";
import svg2 from "../../../public/online_appraisal_how_B_desktop.svg";
import svg3 from "../../../public/online_appraisal_how_C_b.svg";
import { MostSearched } from "@/sections";

const page = () => {
  return (
    <div>
      <section className={styles.banner_container}>
        <h1>Vende con agencia</h1>
        <p>
          Para poder ofrecerte la agencia que mejor se adapte a ti, introduce la
          dirección del inmueble.
        </p>
        <form>
          <label htmlFor="buscar-por-agencia">
            <h4>Buscar por dirección</h4>
            <span></span>
            <div>
              <input id="buscar-por-agencia" type="text" placeholder="Introduce la dirección, numero y municipio" />
              <button>Buscar agencia</button>
            </div>
          </label>
        </form>
      </section>
      <div className={styles.content_layout}>
        <section>
          <div className={styles.first_section}>
            <h2>¿Cómo vender o alquilar con agencia?</h2>
            <span></span>
            <div className={styles.first_sectionContent}>
              <div>
                <Image src={svg} alt="imagen 1" />
                <h4>1. Identifuca el inmueble</h4>
                <p>
                  Indica la dirección o la referencia catastral para saber dónde
                  se encuentra la vivienda.
                </p>
              </div>
              <div>
                <Image src={svg2} alt="imagen 2" />
                <h4>2. Indica las características</h4>
                <p>
                  Introduce los datos básicos del inmueble que conoces, no son
                  obligatorios.
                </p>
              </div>
              <div>
                <Image src={svg3} alt="imagen 3" />
                <h4>3. Contacta con profesionales</h4>
                <p>
                  Te mostraremos los mejores profesinales de tu zona que pueden
                  ayudarte a vender o alquilar.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.second_section}>
            <h2>¿Por qué vender o alquilar con agencia?</h2>
            <span></span>
            <div className={styles.second_sectionContent}>
              <div className={styles.second_sectionCard}>
                <img
                  src="https://img.freepik.com/foto-gratis/mujer-mostrando-mano-mini-casa-concepto-inmobiliario-ai-generativo_123827-24098.jpg?w=740&t=st=1721494036~exp=1721494636~hmac=a5ccd7347d786125b475e71dd7e0533082e9b05f30ba4a3d6566c9ffbd5d7891"
                  alt="imagen 3"
                />
                <div>
                  <h3>Conoce el mercado y la zona</h3>
                  <p>
                    Gracias a la experiencia y los años de trayectoria, las
                    agencias podran ofrecerte un análisis completo dle mercado
                    de la vivienda y de la zona en la que se encuentra el
                    inmueble.
                  </p>
                </div>
              </div>
              <div className={styles.second_sectionCard}>
                <img
                  src="https://img.freepik.com/foto-gratis/mujer-mostrando-mano-mini-casa-concepto-inmobiliario-ai-generativo_123827-24098.jpg?w=740&t=st=1721494036~exp=1721494636~hmac=a5ccd7347d786125b475e71dd7e0533082e9b05f30ba4a3d6566c9ffbd5d7891"
                  alt="imagen 3"
                />
                <div>
                  <h3>
                    Disponen de una base actualizada de clientes potenciales
                  </h3>
                  <p>
                    Una base de datos actualizada de clientes potenciales
                    facilitará el encontrar personas que se interesen por las
                    caracteristicas de tu vivienda.
                  </p>
                </div>
              </div>
              <div className={styles.second_sectionCard}>
                <img
                  src="https://img.freepik.com/foto-gratis/mujer-mostrando-mano-mini-casa-concepto-inmobiliario-ai-generativo_123827-24098.jpg?w=740&t=st=1721494036~exp=1721494636~hmac=a5ccd7347d786125b475e71dd7e0533082e9b05f30ba4a3d6566c9ffbd5d7891"
                  alt="imagen 3"
                />
                <div>
                  <h3>
                    Analizan la fiabilidad de pago de los posibles compradores
                  </h3>
                  <p>
                    Las agencias realizan la fiabilidad a los clientes
                    potenciales para comprender la posibilidad real de adquirir
                    la vivienda.
                  </p>
                </div>
              </div>
              <div className={styles.second_sectionCard}>
                <img
                  src="https://img.freepik.com/foto-gratis/mujer-mostrando-mano-mini-casa-concepto-inmobiliario-ai-generativo_123827-24098.jpg?w=740&t=st=1721494036~exp=1721494636~hmac=a5ccd7347d786125b475e71dd7e0533082e9b05f30ba4a3d6566c9ffbd5d7891"
                  alt="imagen 3"
                />
                <div>
                  <h3>Te ayudamos a definir el precio más competitivo</h3>
                  <p>
                    A través de un análisis exhaustivo de la competencia, las
                    agencias propondrán mejoras en la vivienda para destacar
                    frente a la oferta de inmuebles en la zona.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className={styles.preguntas}>
        <div className={styles.content_layout}>
          <div className={styles.thirt_section}>
            <h2>Preguntas frecuentes</h2>
            <span></span>
            <div>
              <article>
                <h3>¿Cuáles son los pasos para vender o alquilar con inmobiliaria?</h3>
                <a href="">Puedes descubrir cómo es trabajar con inmobiliarias en este articulo de Itaaj.</a>
              </article>
              <article>
                <h3>¿Cuánto cobra una inmobiliaria por tramitar la venta de una vivienda?</h3>
                <p>Las inmobiliarias suelen cobrar unos hoborarios sobre el precio de la venta de la vivienda que oscila, de manera general entre un 3% y un 7%. A este importe hay que sumarle, además, el iva del 21%, ya que este impuesto sobre el consumo no siele venir incluido en el porcentaje de los honorarios (salvo que la inmobiliaria así lo indique).</p>
              </article>
              <article>
                <h3>¿Cuál es la función de Itaaj?</h3>
                <p>Desde Itaaj únicamente queremos ayudarte a encontrar las agencias que mejor se adapten a las caracteristicas de tu vivienda y facilitarte el proceso de venta o alquiler a través de expertos en el sector.</p>
              </article>
              <article>
                <h3>¿Puedo vender un inmueble que ya está en otra inmobiliaria?</h3>
                <p>La posibilidad de vender con más de una inmobiliaria dependerá de si has firmado un contrato de exclusividad. Un contrato de exclusividad obliga al vendedor o arrendaror de un inmueble a afectar la operación únicamente a través de la agencia inmobiliaria con la que ha firmado.</p>
                <a href="">Puedes saber más acerca de lso impuestos de este Ebook de Itaaj</a>
              </article>
              <article>
                <h3>¿Que impuestos se pagan al vender una vivienda?</h3>
                <p>La tasación de una casa a través de internet tiene como principal beneficio que es totalmente gratuito y no tienes que moverte de casa. Además, podrás tomar decisiones sobre si es un buen momento para comprar o alquilar, si la vivienda te encaja en tu presupuesto, etc.</p>
                <a href="">Puedes saber más acerca de loo impuestos de este Ebook de Itaaj</a>
              </article>
              <article>
                <h3>¿Qué documentos o trámites son necesarios para la venta?</h3>
                <a href="">Si no sabes cuáles son los documentos o trámites necesarios para la venta de una vivienda puedes consultarlo en este Ebook de Itaaj</a>
              </article>
            </div>
          </div>
        </div>
      </section>
      {/* <div className={styles.content_layout}>
        <MostSearched />
      </div> */}
    </div>
  );
};

export default page;
