import { developmentApi, propertiesByDevelopment } from '@/services';
import React, { useEffect, useState } from 'react'
import styles from './Development.module.css'
import Link from 'next/link';
import { PropertyElement } from '@/components/Developments';
import Image from 'next/image';
import { DivisaFormater } from '@/utils';
import { Camera, Globe, Info, Image as ImageIcon } from 'react-feather';
import Map from './Map';
import Modal from '@/containers/Modal';
import Floorplans from './Plane';
import { useRouter } from 'next/navigation';
import Photos from './Photos';
import Cform from '@/components/Contacts/Cform'
import Properties from './Properties';
import Share from '@/app/properties/[slug]/Share';

const Development = async ({ params, searchParams }: { params: { slug: string }, searchParams?: { [key: string]: string | string[] | undefined } }) => {
  const development = await developmentApi(params.slug);
  const properties = await propertiesByDevelopment(development.id);
  const slug  = params.slug;
  const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj Realty por la siguiente propiedad ${slug}`;

  console.log(development)
  return (
    <>
      <div className={styles.header}>
        <Link href='/properties'><i className='bx bx-arrow-back' ></i> Volver</Link>
      </div>

      <div className={styles.info}>
        <div className={styles.picture}>
          <span className={styles.tag}>OBRA NUEVA</span>
          <Image src={development.images?.length > 2 ? development?.images[0] : ''} alt='Imagen numero 1 de la propiedad' width={800} height={800} objectFit='cover' />
          <div className={styles.image_info}>

          
          <Link href='?photos=true' className={styles.photos}><Camera size={14} /> {development?.images?.length} Fotos</Link>
          {development.owner && (
          <Link href={development.owner} className={styles.tres}><Info size={14} /> Brochure</Link>
          )}
          {development.virtualTourUrl && (
            <Link href={development.virtualTourUrl} className={styles.lett}><Globe size={14} />360</Link>
          )}
                {development.video && (
            <Link href={development.video} className={styles.lettre}><ImageIcon size={14} />Video</Link>
          )}
      
      </div>
        
        </div>
        <div className={styles.details}>
          <h2>{development.name}</h2>
          <h3>Preventa desde {DivisaFormater({ value: development?.price })}</h3>
          <ul>
            <li>
              <i className='bx bx-bed'></i>
              <span>
                <p>Habitaciones:</p>
                <h4>{development?.bedrooms}</h4>
              </span>
            </li>
            <li>
              <i className='bx bx-bath'></i>
              <span>
                <p>Baños:</p>
                <h4>{development?.bathrooms}</h4>
              </span>
            </li>
            <li>
              <i className='bx bx-area'></i>
              <span>
                <p>Área:</p>
                <h4>{development?.area}</h4>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.container}>
        <div>
          <div className={styles.main}>
            <Link href='?proposal=open' className={styles.btn} ><i className='bx bx-share-alt' ></i> Realizar Propuesta</Link>
            <Share />
          </div>
          <h2 className={styles.title_property}><strong>Descripción</strong></h2>
          <p className={styles.description} dangerouslySetInnerHTML={{ __html: development?.description }}></p>



          <div className={styles.propertie}>
            <h2 className={styles.title_property}>
              Inmuebles de este desarrollo...
            </h2>
            <Properties properties={properties} />
          </div>

          <h2 className={styles.title_property}>
            Caracteristicas de la preventa
          </h2>
          <div className={styles.specs}>

            <div>
              <i className='bx bx-home-heart'></i>
              <span>
                <p>Viviendas</p>
                <h3>{development?.households}</h3>
              </span>
            </div>
          </div>



          <div className={styles.map}>
            <h2 className={styles.title_property}>
              {development?.city}, {development?.country}
            </h2>
            <Map location={development.location} />

            <p>Itaaj Realty no se responsabiliza de los errores que la información mostrada a continuación pueda contener. La posición en el mapa puede ser aproximada por deseo del propietario. El usuario será el responsable del uso que dé a dicha información.</p>

          </div>
        </div>

        <div className={styles.form}>
        <Cform slug={"DEV@"+slug}/>
        <Link href={whatsappLink} target='_blank' className={styles.btn_whatsapp}>Escríbenos por Whatsapp</Link>
       </div>
        
        <Photos price={development.price} photos={development.images} />
        <Modal property={development.uuid}  />
      </div>
    </>
  )
}

export default Development