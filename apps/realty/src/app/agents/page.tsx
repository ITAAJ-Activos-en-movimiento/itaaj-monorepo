import React from 'react'
import styles from './Agents.module.css'
import { NextPage } from 'next'
import Link from 'next/link'
import Image from 'next/image'

const Agents:NextPage = () => {
 const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj.com por la sigueinte propiedad`;

  return (
    <>
      <div className={styles.container}>
       
      <h1 className={styles.title}>Si eres Broker y deseas ser Meta Agente Itaaj</h1>
      
     <ul className={styles.list}>
      <li>I.	Si eres agente inmobiliario puedes comercializar tu stock con nosotros. En caso de que desees someter alguna de tus propiedades a la opción de solicitar una oferta en efectivo evaluaremos su factibilidad para incluirla en nuestro mercado.</li>
      <li>II.	Si tu propiedad no es elegible, podrás de todas maneras integrar tu listado de propiedades directamente en nuestro Marketplace. Nuestro Marketplace te permitirá promocionar tu stock y conectar con nuestros clientes y potenciales compradores.</li>
      <li>III.	Cuando refieres a un cliente que compra, ganas el 25 % de la tarifa de cotización de 3,0 % de itaaj por cada transacción.</li>
      <li>IV.	Cuando publicas una propiedad que se vende, itaaj solo te cobra el 3.0% del precio de venta en el cierre exitoso. Tu retienes el saldo restante de cualquier tarifa que le hayas cobrado al vendedor.</li>
      <li>V.	Si no tienes stock y deseas participar como agente también contáctanos. Tenemos una oferta para ti.</li>
      <li>VI.	Solo aplicará geográficamente para la CDMX y Mérida Yucatán.</li>
      
     </ul>
     </div>
     <section className={styles.questions}>
        <div className={styles.image}>
          <Image
            src="/agent.jpg"
            width={300}
            height={400}
            alt="Agente Itaaj"
            objectFit="contain"
          />
        </div>
        <div>
          <h2>¿Aún tienes dudas?</h2>
          <p>
            Contáctanos a través de nuestro WhatsApp y recibe ayuda de nuestros
            asesores.
          </p>
          <Link href={whatsappLink} target="_blank">
             Habla con un agente
          </Link>
        </div>
      </section>
      
     
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

export default Agents