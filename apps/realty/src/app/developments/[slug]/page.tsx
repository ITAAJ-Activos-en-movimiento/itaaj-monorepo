import { developmentApi, propertiesByDevelopment } from '@/services';
import React, { useEffect, useState } from 'react'
import styles from './Development.module.css'
import Link from 'next/link';
import { PropertyElement } from '@/components/Developments';
import Image from 'next/image';
import { DivisaFormater } from '@/utils';
import { Camera } from 'react-feather';
import Map from './Map';
import Modal from '@/containers/Modal';
import Floorplans from './Plane';
import { useRouter } from 'next/navigation';
import Photos from './Photos';
import Cform from '@/components/Contacts/Cform'

const Development = async ({ params, searchParams }: { params: { slug: string }, searchParams?: { [key: string]: string | string[] | undefined } }) => {
  const development = await developmentApi(params.slug);
  const properties = await propertiesByDevelopment(development.id);
  const slug  = params.slug;
  const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj Realty por la siguiente propiedad ${slug}`;

  function Ffunc () {
    console.log("env");
  };  

  console.log(properties)
  return (
    <>
      <div className={styles.header}>
        <Link href='/properties'><i className='bx bx-arrow-back' ></i> Volver</Link>
      </div>

      <div className={styles.info}>
        <div className={styles.picture}>
          <span className={styles.tag}>OBRA NUEVA</span>
          <Image src={development.images?.length > 2 ? development?.images[0] : ''} alt='Imagen numero 1 de la propiedad' width={800} height={800} objectFit='cover' />
          <Link href='?photos=true' className={styles.photos}><Camera size={14} /> {development?.images?.length} Fotos</Link>
        </div>
        <div className={styles.details}>
          <h2>{development.name}</h2>
          <h3>Preventa desde {DivisaFormater({ value: development?.price })}</h3>
          <ul>
            <li>
              <i className='bx bx-bed'></i>
              <span>
                <p>Habitaciones:</p>
                <h4>{development.bedrooms}</h4>
              </span>
            </li>
            <li>
              <i className='bx bx-bath'></i>
              <span>
                <p>Baños:</p>
                <h4>{development.bathrooms}</h4>
              </span>
            </li>
            <li>
              <i className='bx bx-area'></i>
              <span>
                <p>Área:</p>
                <h4>{development.area}</h4>
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.container}>
        <div>
          <div className={styles.main}>
            <Link href='?proposal=open' className={styles.btn} ><i className='bx bx-share-alt' ></i> Realizar Propuesta</Link>
            <button ><i className='bx bx-share-alt' ></i> Compartir</button>
          </div>
          <h2 className={styles.title_property}><strong>Descripción</strong></h2>
          <p className={styles.description} dangerouslySetInnerHTML={{ __html: development?.description }}></p>



          <div className={styles.propertie}>
            <h2 className={styles.title_property}>
              Inmuebles de este desarrollo...
            </h2>
            {properties?.map((property: any) => (
                <PropertyElement key={property.id} {...property} total_area={property.area?.total_area} />
            ))} 
          </div>

          <h2 className={styles.title_property}>
            Caracteristicas de la preventa
          </h2>
          <div className={styles.specs}>

            <div>
              <i className='bx bx-home-heart'></i>
              <span>
                <p>Viviendas</p>
                <h3>{development.households}</h3>
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