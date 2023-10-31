import React from 'react'
import styles from './PropertyElement.module.css'
import { DivisaFormater } from '@/utils'
import Link from 'next/link'

const PropertyElement = ({ bathrooms, bedrooms, floor, price, total_area, slug }: any) => {
  return (
    <div className={styles.property}>
    <h4 className={styles.price}>{DivisaFormater({value: price})}</h4>
    <span>{bedrooms} habs.</span>
    <span>{bathrooms} baños</span>
    <span>{total_area} m2</span>
    <h4>{floor}a  Planta</h4>
    <button>Mostrar plano</button>
    <Link href={`/properties/exclusive/${slug}`}>Ver más</Link>
    <Link href={`/properties/exclusive/${slug}`}>Contactar</Link>

  </div>
  )
}

export default PropertyElement