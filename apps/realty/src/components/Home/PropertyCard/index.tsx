import React from 'react'
import { Heart, Mail, Phone } from 'react-feather'
import styles from './PropertyCard.module.css'
import Image from 'next/image'
import { DivisaFormater } from '@/utils/divisa-formater'
import { changeLanguage } from '@/utils/change-language'
import Link from 'next/link'
const ProeprtyCard = ({images, city, name, price, category, slug, type, bedrooms, bathrooms, total_area }: any) => {
  return (
    <Link href={`/properties/exclusive/${slug}`}>
        <picture className={styles.picture}>

        <Image src={images && images[0]?.length > 6? images[0] : '/img-placeholder.jpg'} width={1050} height={150} style={{
            objectFit: 'cover'
        }} alt='Casa en venta' />
        </picture>

        <h3>{DivisaFormater({value: price})}</h3>
        <p><strong>{changeLanguage(type)}</strong> En {city}</p>
        <span className={styles.info}>
            <span>{bedrooms} habs</span> &middot; <span>{bathrooms} baños</span> &middot; <span>{total_area} m²</span>
        </span>
        <ul className={styles.options}>
            <li> <Mail  size={20} color='var(--second-color)' /> </li>
            <li className={styles.phone}> <Phone size={20} color='var(--second-color)' /> </li>
            <li> <Heart size={20} color='#e84079' /> </li>
        </ul>

    </Link>
  )
}

export default ProeprtyCard