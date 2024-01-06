'use client'
import styles from './Particulars.module.css'
import React, { useEffect, useState } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import Cform from '@/components/Contacts/Cform'
//@ts-ignore
import Modal from 'react-modal';

const Particulars:NextPage = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [slug, setSlug] = useState("");
  
  const Showmodal = (txt:string) => {
    setSlug(txt);
    setModalIsOpen(true);
  };

  function closeModal () {
    setModalIsOpen(false);
  };  
 const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj.com por la siguiente propiedad`;

  return (
    <>
      <div className={styles.container}>
       
      <h1 className={styles.title}>Si eres particular</h1>
      
     <ul className={styles.list}>
      <li>Deseas vender tu inmueble. Nuestro Marketplace te permitirá promocionar tu inmueble de manera gratuita y conectar con nuestra comunidad de compradores, brókers e inversionistas.</li>
      <li>Requieres Apoyo. Te ayudamos a mejorar la promoción de tu inmueble, conocer su valor de venta, revisión de documentos necesarios y asesoría jurídica, planos arquitectónicos, o ayuda en el proceso de negociación, firma digital de contratos. Consulta nuestro apartado de Microservicios Inmobiliarios.</li>
      <li>Adquiere mayor tráfico para tu o tus inmuebles. Puedes obtener un plan de Leads y promoción adicional para tus propiedades. Consulta nuestro apartado de Microservicios Inmobiliarios.</li>
      <li>No deseas hacer absolutamente nada. Nosotros nos hacernos cargo de todo el proceso, desde la identificación del cliente hasta que recibes tu dinero por una comisión general de 5%. Consulta nuestro apartado de Microservicios Inmobiliarios y solicita una consulta.</li>      
     </ul>
     </div>
     <h2 style={{
      textAlign: "center"
     }} >Microservicios Itaaj</h2>

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
              Ofrece servicios relacionados con la captura y edición de imágenes
              de propiedades, mejorando la presentación visual para atraer a
              posibles compradores o inquilinos.
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
              Proporciona herramientas para evaluar de manera precisa el valor
              de una propiedad, basándose en datos de mercado y análisis
              comparativo.
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
              Facilita la revisión y gestión de documentos legales relacionados
              con transacciones inmobiliarias, ofreciendo asesoría jurídica para
              garantizar procesos seguros y conformes a la normativa.
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
              Proporciona acceso a planos digitales actualizados de propiedades,
              facilitando la visualización y comprensión de la distribución y
              diseño arquitectónico.
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
              Permite la firma digital de documentos relacionados con
              transacciones inmobiliarias, agilizando procesos y proporcionando
              un medio seguro y legalmente válido para la firma de contratos.
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
              Ofrece una solución más avanzada para la gestión de leads,
              incluyendo análisis de datos adicionales, segmentación avanzada y
              herramientas de seguimiento para mejorar la conversión.
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
              Gestiona y analiza leads (clientes potenciales) generados a través
              de diferentes canales, proporcionando información básica para
              identificar oportunidades de negocio.
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
        contentLabel='Contactanos para servicio'
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
        <Cform slug={"SRVPART@"+slug} closeModal={closeModal} prevmsg={slug + ":"}/>
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
  )
}

export default Particulars