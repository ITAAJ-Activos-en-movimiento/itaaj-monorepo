'use client'
import React, { useState } from 'react'
import styles from './PropertyElement.module.css'
import { DivisaFormater } from '@/utils'
import Link from 'next/link'
import Floorplans from '@/app/developments/[slug]/Plane'
import { useRouter } from 'next/navigation'

const PropertyElement = ({  bathrooms, bedrooms, floor, price, total_area, image, slug }: any) => {
  const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj.com por la sigueinte propiedad`;
  const router = useRouter()
  const [img, setImg] = useState();
  console.log('MAGES', image)
  const closeModal = () => {
    console.log('enter')
    router.push('?plane=open')
  }
  
  
  return (
    <div className={styles.property}>
    <h4 className={styles.price}>{DivisaFormater({value: price})}</h4>
    <span>{bedrooms} habs.</span>
    <span>{bathrooms} baños</span>
    <span>{total_area} m2</span>
    <h4>{floor}a  Planta</h4>
    <Link href={'?plane=open'}  >Mostrar plano</Link>
    <Link href={whatsappLink}>Contactar</Link>
    {image && (
    <Floorplans bath={bathrooms} bed={bedrooms} image={image} />
    )}

  </div>
  )
}

export default PropertyElement