import { Divider } from '@/components'
import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'react-feather'
import styles from './Questions.module.css'

const Questions = () => {
  return (
    <section className={styles.section}>
        <h2>¿Todavía tienes dudas? Encuentra lo que estás buscando</h2>
        <p>Encuentra tu casa o participa en alguno de nuestros proyectos inmobiliarios</p>
        <Divider center />

        <div className={styles.options}>
            <article>
                <h3>Inmuebles a la venta</h3>
                <p>Encuentra casas en venta, departamentos, chalets y mucho más en Itaaj Realty. Utiliza nuestros filtros y alertas para estar al día de todas las novedades.</p>
                <Link href='/'>Ver inmuebles a la venta <ArrowRight size={17} /></Link>
            </article>
            <article>
                <h3>Proyectos inmobiliarios</h3>
                <p>Descubre los mejores proyectos inmobiliarios en cada ciudad. Filtra por precio, número de habitaciones, baños, barrios… y contacta fácilmente para mas informacion.</p>
                <Link href='/'>Ver proyectos <ArrowRight size={17} /></Link>
            </article>
            <article>
                <h3>Vender tu casa</h3>
                <p>Comparte y encuentra el comprador perfecto para tu propiedad. Configura tus alertas y guárdalos en favoritos para estart al dia con las ofertas sobre tu inmueble.</p>
                <Link href='/'>Vender mi propiedad <ArrowRight size={17} /></Link>
            </article>
        </div>
    </section>
  )
}

export default Questions