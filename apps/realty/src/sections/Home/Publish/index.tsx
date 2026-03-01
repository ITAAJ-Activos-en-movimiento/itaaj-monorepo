import { Divider } from '@/components'
import React from 'react'
import styles from './Publish.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'react-feather'

const Publish = () => {
  return (
    <section className={styles.section}>
        <h2>Te acompañamos para que vendas tu propiedad</h2>
        <p>Publica tus anuncios en Itaaj Realty y llega a millones de personas cada semana</p>
        <Divider center />

        <div className={styles.card_container}>
          <div className={styles.card}>
            <div>
            <Image alt='Profesionales' width={400} height={400} src='/home_publishers_professionals.jpg' />
            </div>
            <div className={styles.content}>

            <h2>Si eres profesional</h2>
            <p>Haz crecer tu negocio con soluciones exclusivas pensadas para ti.</p>
            <Link href='/servicios-profesional'>Te informamos sin compromiso <ArrowRight size={17} /></Link>
            </div>

          </div>
          <div className={styles.card}>
            <div>
            <Image alt='Particular' width={400} height={400} src='/home_publishers_particular.jpg' />
            </div>
            <div className={styles.content}>

            <h2>Si eres particular</h2>
            <p>Publica tu vivienda en Itaaj Realty y te ayudamos a darme mas visibilidad para llegar a todas las personas interesadas en encontrar vivienda.</p>
            <Link href='/servicios-particular'>Publica tu inmueble gratis <ArrowRight size={17} /></Link>
            </div>

          </div>
        </div>
    </section>
  )
}

export default Publish