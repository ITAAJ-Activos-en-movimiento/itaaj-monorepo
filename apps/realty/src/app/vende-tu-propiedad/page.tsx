import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import styles from "./Sell.module.css";
import Image from "next/image";
import { MostSearched } from "@/sections";

export const metadata: Metadata = {
  title: "Vende tu propiedad rápido y al mejor precio con Itaaj Realty",
  description:
    "Más de 1.500.000 departamentos en venta, casas y oficinas nuevos o de segunda mano. Vende o compra tu departamento o casa en Itaaj Realty completamente GRATIS!",
};

const SellProperty = () => {
  return (
    <div>
      <section className={styles.banner_container}>
        <div className={styles.banner}>
          <div>
            <h1>Te ayudamos a vender tu inmueble</h1>
            <p>
              Para ayudarte, en cada paso, a elegir bien y tomar la mejor
              decisión
            </p>
          </div>
          <div className={styles.boxs}>
            <div className={styles.box}>
              <Image
                src="/value.png"
                width={48}
                height={48}
                alt="Valora tu casa"
              />
              <h3>Valora tu casa</h3>
            </div>
            <Link href="/vende-con-agencia" className={styles.box}>
              <Image
                src="/value.png"
                width={48}
                height={48}
                alt="Valora tu casa"
              />
              <h3>Vende con Agencia</h3>
            </Link>

            <div className={styles.box}>
              <Image
                src="/guarantee.png"
                width={48}
                height={48}
                alt="Invierte"
              />

              <h3>Publica tu inmueble</h3>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.title}>Descubre qué te ofrece Itaaj Realty</h2>
        <p className={styles.copy}>
          Explora las posibilidades para vender tu inmueble rápido y al mejor
          precio
        </p>

        <div className={styles.list}>
          <article className={styles.article}>
            <Image src="/price.png" width={550} height={450} alt="Precio" />

            <div className={styles.info}>
              <h2>¿Cuánto vale tu inmueble?</h2>
              <p>
                Calcula el precio en base a sus características y a otros pisos
                de la zona. Acompañarte es darte todas las herramientas sin
                coste.
              </p>
              <Link href="/">Valorar inmueble</Link>
            </div>
          </article>
          <article className={styles.article}>
            <div className={styles.info}>
              <h2>Descubre las agencias expertas en tu zona</h2>
              <p>
                Te ayudamos a encontrar agencias expertas en tu zona dispuestas
                a ahorrarte tiempo y esfuerzos. Benefíciate de su experiencia y
                conocimiento del mercado.
              </p>
              <Link href="/">Buscar Agencia</Link>
            </div>
            <Image src="/agencia.png" width={550} height={450} alt="Precio" />
          </article>
          <article className={styles.article}>
            <Image src="/ad.png" width={550} height={450} alt="Precio" />

            <div className={styles.info}>
              <h2>Publica tu inmueble en Itaaj Realty</h2>
              <p>
                Aprovecha la amplia visibilidad y el acceso a una gran audiencia
                de posibles compradores.
              </p>
              <Link href="/publish">Publicar inmueble</Link>
            </div>
          </article>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Preguntas frecuentes</h2>
        <details>
          <summary>¿Cual es la función de Itaaj Realty?</summary>
          <p>
            Desde Itaaj Realty únicamente queremos ayudarte a encontrar las
            características de tu propiedad y facilitarte el proceso de venta o
            alquiler a través de expertos en el sector.
          </p>
        </details>
        <details>
          <summary>¿Qué hay que dar para vender una casa?</summary>
          <p>
            Al contratar los servicios de una agencia inmobiliaria, esta actúa
            como intermediaria entre el vendedor y los potenciales compradores,
            brindando asesoramiento y gestionando todo el proceso de venta que
            es el siguiente: Evaluación inicial: Los agentes inmobiliarios
            realizan una primera visita para evaluar y determinar el valor de
            mercado. Factores como la ubicación, tamaño, estado de la propiedad
            y precios de venta comparables en la zona se tendrán en cuenta para
            determinar el valor final. Firma de contrato: Una vez acordados los
            términos y condiciones de la venta, se firma un contrato de
            intermediación con la agencia en el que se establecen las
            condiciones de venta, los honorarios de la agencia y la duración del
            contrato. Preparación para la venta: Las agencias pueden sugerir
            mejoras o arreglos para mostrar la propiedad de una forma más
            atractiva para los compradores. Limpieza, reparaciones o incluso
            reformas pueden mejorar considerablemente la apariencia de una
            vivienda. Promoción y publicación en portales: La promoción del piso
            para atraer compradores potenciales es primordial. Publicar anuncios
            en portales como Fotocasa o Habitaclia, realizar fotografías
            profesionales o difundir en redes sociales son algunos de los
            métodos más efectivos para dicha promoción. Visitas y negociaciones:
            El agente inmobiliario organiza y coordina las visitas a la
            propiedad, así como la gestión de sus consultas y las negociaciones
            entre vendedor y los potenciales compradores. Gestión de
            documentación: El agente inmobiliario se encarga de preparar la
            documentación necesaria para formalizar la venta una vez se tiene un
            comprador interesado. Esto puede incluir la redacción del contrato
            de compraventa, la obtención de certificados, estudio de viabilidad
            económica del comprador y la coordinación con notarios o
            profesionales necesarios. Cierre de la venta: Una vez se ha llegado
            a un acuerdo para la venta de la propiedad, la agencia se encarga de
            gestionar los trámites finales, como la firma del contrato de
            compraventa y la transferencia de la propiedad. En resumen, vender
            una vivienda a través de una agencia implica aprovechar los
            conocimientos y la experiencia de los agentes inmobiliarios para
            facilitar el proceso de venta desde la evaluación inicial hasta el
            cierre de la transacción.
          </p>
        </details>
        <details>
          <summary>Qué puedo hacer para vender mi casa rápido?</summary>
          <p>
            Si quieres vender tu vivienda lo antes posible, hacerlo a través de
            una agencia puede ofrecerte una serie de ventajas y beneficios que
            reducirán el tiempo de venta: Conocimiento del mercado: Las agencias
            inmobiliarias tienen experiencia y conocimiento del mercado local.
            Conocen las tendencias del mercado, los precios de venta comparables
            a fin de poder definir el mejor precio para la venta de tu inmueble.
            Amplia red de contactos: Las agencias inmobiliarias tienen una
            amplia red de contactos, incluyendo posibles compradores,
            inversores, agentes de otras agencias y profesionales del sector.
            Además, pueden filtrar los perfiles interesados de manera que la
            gestión es mucho más directa. Marketing y promoción: Las agencias
            cuentan con recursos y estrategias de marketing para promocionar tu
            vivienda de una forma efectiva. Ahorro de tiempo y esfuerzo: La
            venta de una vivienda implica una serie de tareas y gestiones. Una
            agencia inmobiliaria se encargará de estos aspectos de una forma
            profesional, ahorrándote tiempo y esfuerzo considerablemente. En
            esta página de Itaaj podrás encontrar las agencias expertas en tu
            zona dispuestas a ayudarte con la venta de tu vivienda.
          </p>
        </details>
        <details>
          <summary>Qué hay que pagar para vender un inmueble?</summary>
          <p>
            Cuando se vende una vivienda existen ciertos gastos y costos
            asociados que, por norma general, recaen sobre el vendedor. Estos
            pueden variar según cada situación, pero a continuación se enumeran
            una lista de gastos comunes que se deben considerar: Honorarios de
            la agencia inmobiliaria: En caso de vender tu vivienda con un
            agencia inmobiliaria, normalmente tendrás que pagar unos honorarios
            que suelen ser un porcentaje del precio de venta. El porcentaje
            suele oscilar, de manera general, entre el 3% y un 7%. Impuestos
            sobre la venta de la propiedad: Certificados y documentos legales:
            Al vender una vivienda existen ciertos certificados y documentos
            legales que generalmente se requieren como pueden ser la escritura
            de compraventa, nota simple del Registro de la Propiedad o los
            certificados de deudas pendientes con la comunidad de propietarios y
            el IBI. Costos de cancelación de hipotecas: En caso de tener una
            hipoteca sobre la propiedad que se va a vender, es posible que se
            tenga que pagar una penalización por la cancelación anticipada de la
            hipoteca. Certificado energético: Es obligatorio obtener un
            certificado energético antes de vender una vivienda. Dicho
            certificado evalúa la eficiencia energética de la propiedad y el
            costo puede variar según el tamaño y la ubicación de la vivienda.
          </p>
        </details>
        <details>
          <summary>
            ¿Cuál es la cantidad máxima que me darán con la hipoteca?
          </summary>
          <p>
            Por norma general, las entidades ofrecen una financiación de, como
            máximo, el 80% del valor más bajo entre el precio de compraventa y
            el valor de tasación. Algunas entidades pueden llegar a ofrecer
            hasta un 90% de financiación.
          </p>
        </details>
        <details>
          <summary>
            ¿Qué tengo que tener en cuenta para comprar hipotecas?
          </summary>
          <p>
            Lo primero que tenemos que hacer antes de ponernos a estudiar lo que
            el mercado nos ofrece, es estudiar bien nuestro perfil. Tus
            ingresos, tipo de contrato, número de titulares, edad, etc. Una vez
            conozcamos bien nuestra situación, llega el momento de buscar las
            entidades que se ajustan a nuestras necesidades. Y, cuando tenemos
            varias ofertas, tendremos que comparar los tipos de interés y las
            bonificaciones de cada uno. Tanto para estudiar tu perfil, como para
            conseguir varias ofertas, lo ideal si no conoces este tipo de
            gestiones es recurrir a un experto hipotecario. Los expertos de
            Itaaj Realty Hipotecas te acompañarán en todo el proceso de
            contratación de tu hipoteca de forma completamente gratuita.
          </p>
        </details>
        <details>
          <summary>¿Es mejor plazo largo o corto?</summary>
          <p>
            Nuevamente, y como ocurre cuando comparamos los diferentes tipos de
            interés, todo dependerá de tu perfil. Si tienes un plazo largo, en
            conjunto tu hipoteca será más cara, porque pagarás más intereses,
            pero tu cuota mensual será más baja. En cambio, si el plazo de
            amortización es corto, la cuota mensual será más alta, pero pagarás
            menos intereses a largo plazo.
          </p>
        </details>
      </section>

      <MostSearched />
    </div>
  );
};

export default SellProperty;
