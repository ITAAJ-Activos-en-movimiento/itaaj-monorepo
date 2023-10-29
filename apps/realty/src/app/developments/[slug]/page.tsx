'use client'
import React, { useEffect, useState } from 'react'
import styles from './Development.module.css'
import { DivisaFormater } from '@/utils/divisa-formater'
import Link from 'next/link'
import Image from 'next/image'
import { Bold, Box, Camera, Square } from 'react-feather'
import { changeLanguage } from '@/utils'

const Development = () => {
  const [properties, setProperties] = useState<any>([]);


  const fetchData =  async() => {
      const data = await fetch(
          'https://itaaj-api-v0.onrender.com/api/v1/properties',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const result: any = await data.json();
        setProperties(result.items);
  }

  useEffect(() => {
      fetchData();
  }, [])
  return (
    <div>
    <div className={styles.header}>
       <Link href='/properties'><i className='bx bx-arrow-back' ></i> Volver</Link>
      </div>
      <div className={styles.info}>
       <div className={styles.picture}>
        <span className={styles.tag}>OBRA NUEVA</span>
        <Image src='/development.avif' alt='Imagen numero 1 de la propiedad'  width={800} height={800} objectFit='cover' />       
        <button className={styles.photos}><Camera size={14} /> 12 Fotos</button>
       </div>
      <div className={styles.details}>
        <h2>Quinta Maria Isabel</h2>
        <h3>Promoción desde {DivisaFormater({value: 3400000})}</h3>
        <ul>
          <li>
          <i className='bx bx-bed'></i>
            <span>
              <p>Habitaciones:</p>
              <h4>De 2 a 3</h4>
            </span>
          </li>
          <li>
          <i className='bx bx-bath'></i>
            <span>
              <p>Banos:</p>
              <h4>De 2 a 3</h4>
            </span>
          </li>
          <li>
          <i className='bx bx-area'></i>
            <span>
              <p>Area:</p>
              <h4>Desde 98 a 123</h4>
            </span>
          </li>
        </ul>
      </div>
      </div>
      <div className={styles.container}>
       <div>
       <div className={styles.main}>
        <p></p>       
        <button ><i className='bx bx-share-alt' ></i> Compartir</button>
       </div>
       <h2 className={styles.title_property}><strong>Descripcion</strong></h2>
       <p className={styles.description} dangerouslySetInnerHTML={{ __html: properties[0]?.description }}></p>

       <div className={styles.propertie}>
        <h2 className={styles.title_property}>
        Inmuebles de este desarrollo...
       </h2>
          <div className={styles.property}>
            <h4 className={styles.price}>{DivisaFormater({value: 900000})}</h4>
            <span>2 habs.</span>
            <span>2 banos</span>
            <span>168 m2</span>
            <h4>4a Planta</h4>
            <button>Mostrar plano</button>
            <button>Mostrar propiedad</button>
          </div>
          <div className={styles.property}>
            <h4 className={styles.price}> {DivisaFormater({value: 1500000})}</h4>
            <span>3 habs.</span>
            <span>2 banos</span>
            <span>198 m2</span>
            <h4>2a Planta</h4>
            <button>Mostrar plano</button>
            <button>Mostrar propiedad</button>
          </div>
          <div className={styles.property}>
            <h4 className={styles.price}>{DivisaFormater({value: 1500000})}</h4>
            <span>3 habs.</span>
            <span>2 banos</span>
            <span>198 m2</span>
            <h4>2a Planta</h4>
            <button>Mostrar plano</button>
            <button>Mostrar propiedad</button>
          </div>
          <div className={styles.property}>
            <h4>{DivisaFormater({value: 1500000})}</h4>
            <span>3 habs.</span>
            <span>2 banos</span>
            <span>198 m2</span>
            <h4>2a Planta</h4>
            <button>Mostrar plano</button>
            <button>Mostrar propiedad</button>
          </div>
          <div className={styles.property}>
            <h4 className={styles.price}>{DivisaFormater({value: 1500000})}</h4>
            <span>3 habs.</span>
            <span>2 banos</span>
            <span>198 m2</span>
            <h4>2a Planta</h4>
            <button>Mostrar plano</button>
            <button>Mostrar propiedad</button>
          </div>
          <div className={styles.property}>
            <h4 className={styles.price}>{DivisaFormater({value: 1500000})}</h4>
            <span>3 habs.</span>
            <span>2 banos</span>
            <span>198 m2</span>
            <h4>2a Planta</h4>
            <button>Mostrar plano</button>
            <button>Mostrar propiedad</button>
          </div>
          <div className={styles.property}>
            <h4 className={styles.price}>{DivisaFormater({value: 1500000})}</h4>
            <span>3 habs.</span>
            <span>2 banos</span>
            <span>198 m2</span>
            <h4>2a Planta</h4>
            <button>Mostrar plano</button>
            <button>Mostrar propiedad</button>
          </div>


        </div>
       
        <h2 className={styles.title_property}>
        Caracteristicas de la promocion
       </h2>
       <div className={styles.specs}>
         
         <div>
         <i className='bx bx-home-heart'></i>
        <span>
         <p>Viviendas</p>
         <h3>15</h3>
        </span>
        </div>
       </div>
       <h2 className={styles.title_property}>
        {properties[0]?.city}, {properties[0]?.country}
       </h2>
       <div className={styles.map}>
       <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15021635.698595606!2d-113.2586835703016!3d23.192397844676776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84043a3b88685353%3A0xed64b4be6b099811!2sMexico!5e0!3m2!1sen!2sco!4v1681829545463!5m2!1sen!2sco" width="800" height="450" style={{border:0}} loading="lazy"></iframe>
       <p>Itaaj Realty no se responsabiliza de los errores que la información mostrada a continuación pueda contener. La posición en el mapa puede ser aproximada por deseo del propietario. El usuario será el responsable del uso que dé a dicha información.</p>
       </div>
       {/* <iframe width="100%" height="640" frameBorder="0" allow="xr-spatial-tracking; gyroscope; accelerometer" allowFullScreen scrolling="no" src="https://kuula.co/share/collection/7lqnK?logo=1&info=1&fs=1&vr=0&sd=1&thumbs=1"></iframe> */}

       
       <h2 className={styles.title_property}>
        Propiedades similares...
       </h2>
       
       <div className={styles.properties_list}>
          {/* {properties
            ?.filter((prop: any) => prop.category == 'general' && prop.slug !== property.slug)
            .map((property: any) => (
              <PropertyCard key={property.uuid} {...property} />
            ))} */}
        </div>

       </div>
       
       <form className={styles.form}>
        <h2>Contactanos</h2>
        <input type="text" placeholder='Tu nombre' />
        <input type="text" placeholder='Tu e-mail(obligatorio)' />
        <input type="text" placeholder='Tu telefono' />        
        <label htmlFor="">
         <input type="checkbox" name="" id="" />
         <p>Quiero recibir alertas de inmuebles similares a este</p>
        </label>
        <label htmlFor="">
         <input type="checkbox" name="" id="" />
         <p>Acepto las condiciones de uso, la información basica de Proteccion de Datos y darme de alto en itaaj</p>
        </label>
        <button className={styles.btn}>Contactar</button>
        <Link href='/' className={styles.btn_whatsapp} >Whatsapp</Link>
        
       </form>
       
      </div>
      
     
    </div>
  )
}

export default Development