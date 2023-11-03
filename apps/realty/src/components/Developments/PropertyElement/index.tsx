'use client'
import React from 'react'
import styles from './PropertyElement.module.css'
import { DivisaFormater } from '@/utils'
import Link from 'next/link'
import Floorplans from '@/app/developments/[slug]/Plane'

const PropertyElement = ({ fn, bathrooms, bedrooms, floor, price, total_area, image, slug }: any) => {
  return (
    <div className={styles.property}>
    <h4 className={styles.price}>{DivisaFormater({value: price})}</h4>
    <span>{bedrooms} habs.</span>
    <span>{bathrooms} baños</span>
    <span>{total_area} m2</span>
    <h4>{floor}a  Planta</h4>
    <button onClick={() => fn({bathrooms, bedrooms, total_area, image})}>Mostrar plano</button>
    <Link href={`/properties/exclusive/${slug}`}>Ver más</Link>
    <Link href={`/properties/exclusive/${slug}`}>Contactar</Link>
    <Floorplans bath={bathrooms}  bed={bedrooms} />

  </div>
  )
}

export default PropertyElement