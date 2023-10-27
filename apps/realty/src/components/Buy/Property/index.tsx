'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './Property.module.css'
import Link from 'next/link'
import { DivisaFormater } from '@/utils/divisa-formater'
import { Mail } from 'react-feather'

const Property = ({images, price, type, name, category, bedrooms, bathrooms, area, description, slug}:any) => {
  const [url, setUrl] = useState<string>('');
  
  const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina ${url} por la sigueinte propiedad ${url}/${slug}`;

  useEffect(() => {
    setUrl(window.location.href)
  }, [])
  return (
    <Link className={styles.card} href={`/properties/${category == 'exclusive'? category+"/" : ''}${slug}`} >
      {/* <Image src={images[0]} width={500} height={500} alt={name} objectFit='cover' /> */}
      <div>
       <div className={styles.header}>
        <h2>ITAAJ &middot; Experto inmobiliario</h2>
       </div>
       <div className={styles.content}>
        <span className={styles.price}>{DivisaFormater({value: price})}</span>
        <p className={styles.title} ><strong>{type}</strong> {name}</p>
       </div>
       <div className={styles.amenities}>
        <div>
        <i className='bx bx-bed' ></i>
        <p>{bedrooms} habs.</p>
        </div>
        <div>
        <i className='bx bx-bath' ></i>
        <p>{bathrooms} baños</p>
        </div>
        <div>
        <i className='bx bx-area' ></i>
        <p>{area.total_area} m&sup2;</p>
        </div>
        <div>
        <i className='bx bx-building-house' ></i>
          <p>1 planta</p>
        </div>
       </div>
       <div className={styles.description}>
          <p  dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
       <div className={styles.options}>
        <Link href='/' className={styles.message} ><Mail /> Contactar</Link>
        <Link href={whatsappLink} target="_blank"><i className='bx bxl-whatsapp'></i> Mensaje</Link>
       </div>
      </div>
    </Link>
  )
}

export default Property
