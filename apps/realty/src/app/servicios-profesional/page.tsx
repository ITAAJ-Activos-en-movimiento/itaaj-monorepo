"use client";
import styles from "./Professionals.module.css";
import React, { useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Cform from "@/components/Contacts/Cform";
//@ts-ignore
import Modal from "react-modal";

const Proffesionals: NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [slug, setSlug] = useState("");

  const Showmodal = (txt: string) => {
    setSlug(txt);
    setModalIsOpen(true);
  };

  function closeModal() {
    setModalIsOpen(false);
  }
  const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj.com por la siguiente propiedad`;

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Si eres Profesional</h1>

        <ul className={styles.list}>
          <li>
            Deseas vender uno o varios inmuebles. Nuestro Marketplace te
            permitirá promocionar tu stock inmobiliario de manera gratuita y
            conectar con nuestra comunidad de compradores, brókers e
            inversionistas.
          </li>
          <li>
            Tus propiedades serán las primeras recomendación del Asistente
            Virtual de Inteligencia Artificial (IA). Intégrate a nuestro equipo
            de meta agentes itaaj Web 3 y obtén tu registro. Consulta en nuestro
            apartado de Microservicios Inmobiliarios.
          </li>
          <li>
            Requieres Apoyo. Te ayudamos a mejorar la promoción de tu inmueble,
            conocer su valor de venta, revisión de documentos necesarios y
            asesoría jurídica, planos arquitectónicos, apoyo en el proceso de
            negociación, firma digital de contratos. Consulta nuestro apartado
            de Microservicios Inmobiliarios.
          </li>
          <li>
            Adquiere mayor tráfico para tus inmuebles. Puedes obtener un Plan
            Profesional de Leads y promoción para tus propiedades. Consulta
            nuestro apartado de Microservicios Inmobiliarios.
          </li>
          <li>
            Eres Desarrollador Inmobiliario. Nosotros nos hacernos cargo de todo
            el proceso. Solicita una consulta sobre nuestro plan para
            Desarrolladores Inmobiliarios en el apartado de Microservicios
            Inmobiliarios.
          </li>
        </ul>
      </div>

      <h2
        style={{
          textAlign: "center",
        }}
      >
        Microservicios Itaaj
      </h2>

      <div className={styles.options}>
        <div className={styles.boxs}>
          <details
            className={
              styles.box
            } /*onClick={() => Showmodal("Fotos y Diseño")}*/
          >
            <summary>
              <Image
                src="/fotosdisenoN.png"
                width={200}
                height={187}
                alt="Fotos y Diseño"
              />
              <h3>Fotos y Diseño</h3>
            </summary>
            <p>
            Mejora la presentación visual para atraer potenciales clientes. Te apoyamos en la realización de fotografías digitales profesionales de tu propiedad.
Precio: 2, 000 pesos más IVA.
              <button className={styles.btn} onClick={() => Showmodal("Fotos y Diseño")} >Contactar</button>

            </p>
          </details>

          <details
            className={
              styles.box
            } /*onClick={() => Showmodal("Conoce el valor de tu inmueble")}*/
          >
            <summary>
              <Image
                src="/valorN.png"
                width={200}
                height={210}
                alt="Conoce el valor de tu inmueble"
              />
              <h3>Conoce el valor de tu inmueble</h3>
            </summary>

            <p>
            Realizamos la Investigación de Mercado de tu inmueble con el con el fin de conocer su valor comercial. Precio: 2, 000 pesos más IVA.
              <button className={styles.btn} onClick={() => Showmodal("Conoce el valor de tu inmueble")} >Contactar</button>

            </p>
          </details>

          <details
            className={
              styles.box
            } /*onClick={() => Showmodal("Revisión documental y asesoría Jurídica")}*/
          >
            <summary>
              <Image
                src="/documentalN.png"
                width={200}
                height={198}
                alt="Revisión documental y asesoría Jurídica"
              />
              <h3>Revisión documental y asesoría Jurídica</h3>
            </summary>
            <p>
            Revisión de la documentación necesaria para la compraventa de tu inmueble. Valoración de los escenarios de exención de impuesto de acuerdo con lo establecido en la ley. Precio: 1, 500 pesos más IVA
              <button className={styles.btn} onClick={() => Showmodal("Revisión documental y asesoría Jurídica")} >Contactar</button>

            </p>
          </details>

          <details
            className={
              styles.box
            } /*onClick={() => Showmodal("Planos de inmueble")}*/
          >
            <summary>
              <Image src="/planosN.png" width={200} height={200} alt="Planos" />
              <h3>Planos</h3>
            </summary>
            <p>
              {" "}
              El costo del crédito hipotecario bancario incrementará en caso de que no cuentes con planos. Un especialista certificado te apoyara en este tema.
              <button
                className={styles.btn}
                onClick={() => Showmodal("Planos")}
              >
                Contactar
              </button>
            </p>
          </details>

          <details
            className={
              styles.box
            } /*onClick={() => Showmodal("Firma Digital")}*/
          >
            <summary>
              <Image
                src="/firmaN.png"
                width={200}
                height={200}
                alt="Firma Digital"
              />
              <h3>Firma Digital</h3>
            </summary>

            <p>
            Te ayudamos en la firma de contratos de manera remota con el más alto estándar normativo. Nuestra firma digital cumple la NOM 151 de la Secretaría de Economía en México. Firma hasta 4 documentos. Precio: 2, 000 pesos más IVA.
              <button
                className={styles.btn}
                onClick={() => Showmodal("Firma Digital")}
              >
                Contactar
              </button>
            </p>
          </details>

          <details
            className={
              styles.box
            } /*onClick={() => Showmodal("Leads Paquete Básico")}*/
          >
            <summary>
              <Image
                src="/leadsbasicN.png"
                width={200}
                height={200}
                alt="Leads Paquete Básico"
              />
              <h3>Leads Paquete Básico</h3>
            </summary>
            <p>
            Ofrece una solución más avanzada para la gestión de leads, incluyendo análisis de datos adicionales y herramientas de seguimiento para mejorar la conversión. Los costos por paquete de anuncios son:
            Gratis el primero,$110 pesos de 1 a 10 anuncios, $90 pesos de 11 a 20 anuncios, $80 pesos de 21 anuncios en adelante, son precios mensuales.
              <button className={styles.btn} onClick={() => Showmodal("Leads Paquete Básico")} >Contactar</button>

            </p>
          </details>

          <details
            className={
              styles.box
            } /*onClick={() => Showmodal("Leads Paquete Profesional")}*/
          >
            <summary>
              <Image
                src="/leadsproN.png"
                width={200}
                height={200}
                alt="Leads Paquete Profesional"
              />
              <h3>Leads Paquete Profesional</h3>
            </summary>
            <p>
            Acompaña el Plan de Leads Paquete Básico con una campaña digital ya sea de posicionamiento o de generación de leads a través de campañas en FB, IG y Google
              <button className={styles.btn} onClick={() => Showmodal("Leads Paquete Profesional")} >Contactar</button>

            </p>
          </details>

          <details
            className={
              styles.box
            } /*onClick={() => Showmodal("Desarrolladores")}*/
          >
            <summary>
              <Image
                src="/desarrolladoresN.png"
                width={200}
                height={200}
                alt="Desarrolladores"
              />
              <h3>Desarrolladores</h3>
            </summary>
            <p>
              Proporciona herramientas y recursos para desarrolladores que
              deseen integrar funcionalidades específicas de la Proptech en sus
              propias aplicaciones o plataformas, facilitando la personalización
              y la expansión del ecosistema tecnológico.
              <button className={styles.btn} onClick={() => Showmodal("Desarrolladores")} >Contactar</button>

            </p>
          </details>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Contactanos para servicio"
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          content: {
            width: "33rem",
            height: "50rem",
            margin: "auto", // Center the modal horizontally
            padding: "0px",
            border: "none",
          },
        }}
      >
        <Cform
          slug={"SRVPROF@" + slug}
          closeModal={closeModal}
          prevmsg={slug + ":"}
        />
      </Modal>

      {/* {count == 0? (
      <div className={styles.notProperties}>
        <div><i className='bx bx-shape-circle'></i></div>
        <h2>No hay Posts</h2>
        </div>
     ): (
      
      <div className={styles.posts}>
    
      {posts?.map((post:any) => (
       <PostCard />
       // <Property key={property.uuid} {...property} />      
      ))}
      </div>
     )}
       */}
    </>
  );
};

export default Proffesionals;
