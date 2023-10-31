'use client'
import React, { useEffect, useState } from 'react'
import styles from './Properties.module.css'
import Link from 'next/link'
import Image from 'next/image'
import { NextPage } from 'next'
import { DivisaFormater } from '@/utils/divisa-formater'
import { useParams } from 'next/navigation'
import { PropertyCard } from '@/components'

const Property: NextPage = () => {
    const [property, setProperty] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);
  
    const [actualImage, setActualImage] = useState(property?.images?.[0]);
  const [actualImageIn, setActualImageIn] = useState(0);
  const { slug } = useParams();

  console.log({slug})
  const prevImage = () => {
    if(actualImageIn == 0){
      setActualImageIn(property.images.length - 1);
    }else{
      setActualImageIn((prev) => prev - 1);
    }
    setActualImage(property.images[actualImageIn])
  }
  
  const nextImage = () => {
    const index = property.images.length;
    if(actualImageIn == index - 1){
      setActualImageIn(0);
    }else{
      setActualImageIn((prev) => prev + 1);
    }
    setActualImage(property.images[actualImageIn])
  }
  
  const whatsappLink = typeof window !== 'undefined' ? `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj.com por la siguiente propiedad ${window.location.href}` : "https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj.com por la siguiente propiedad";

  const handleShare = async () => {
    if(navigator.share){
      await navigator.share({
        title: "Itaaj Realty",
        url: window.location.href,
      });
    }
  }

  const fetchData =  async() => {
    setLoading(true);
      const data = await fetch(
          `https://itaaj-api-v0.onrender.com/api/v1/properties/${slug}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        
        console.log(data)
        const result: any = await data.json();
        setProperty(result[0]);
        setLoading(false)
  }

  useEffect(() => {
      fetchData();
  }, [])

  if(loading) return <p>Cargando...</p>
  
  return (
    <>
      <div className={styles.header}>
       <Link href='/properties'><i className='bx bx-arrow-back' ></i> Volver</Link>
      </div>
      <div className={styles.images}>
       <div className={styles.photo1}>
        <Image src={property?.images[0]} alt='Imagen numero 1 de la propiedad'  width={800} height={800} objectFit='cover' />       
       </div>
       <Image src={property?.images[1]}  alt='Imagen numero 2 de la propiedad' width={500} height={500} />
       { property?.images[2] && (
          <Image src={property?.images[2]}  alt='Imagen numero 3 de la propiedad' width={500} height={500} />        
       )}
        {property?.images[3] && (
       <Image src={property?.images[3]}  alt='Imagen numero 4 de la propiedad' width={500} height={500} />
        
       )}
       {property?.images[4] && (
       <Image src={property?.images[4]} alt='Imagen numero 5 de la propiedad'  width={500} height={500} />        
       )} 
       
      </div>
      <div className={styles.container}>
       <div>
       <div className={styles.main}>
        <p className={styles.price}>{DivisaFormater({value: property?.price})}</p>       
        <button onClick={handleShare}><i className='bx bx-share-alt' ></i> Compartir</button>
       </div>
       <button className={styles.price_sug}><i className='bx bx-purchase-tag-alt'></i> Realizar una propuesta</button>
       <div className={styles.amenities}>
        <div>
        <i className='bx bx-bed' ></i>
        <p>{property?.bedrooms} habs.</p>
        </div>
        <div>
        <i className='bx bx-bath' ></i>
        <p>{property?.bathrooms} baños</p>
        </div>
        <div>
        <i className='bx bx-area' ></i>
        <p>{property?.area.total_area} m&sup2;</p>
        </div>
        <div>
        <i className='bx bx-building-house' ></i>
          <p>1 planta</p>
        </div>
       </div>
       <h2 className={styles.title_property}><strong>{property?.type}</strong> en venta en {property?.city}</h2>
       <p className={styles.description} dangerouslySetInnerHTML={{ __html: property?.description }}></p>
       <h2 className={styles.title_property}>
        Caracteristicas
       </h2>
       <div className={styles.specs}>
         
         <div>
         <i className='bx bx-home-heart'></i>
        <span>
         <p>Tipo de inmueble</p>
         <h3>{property?.type}</h3>
        </span>
        </div>
        <div>
        <i className='bx bx-bed' ></i>
        <span>
         <p>Habitaciones</p>
         <h3>{property?.bedrooms}</h3>
        </span>
        </div>
        <div>
        <i className='bx bx-timer' ></i>
        <span>
         <p>Antigüedad</p>
         <h3>{property?.antiquity} años</h3>
        </span>
        </div>
        <div>
        <i className='bx bx-chair' ></i>
        <span>
         <p>Amueblado</p>
         <h3>No</h3>
        </span>
        </div>
        <div>
        <i className='bx bx-buildings' ></i>
        <span>
         <p>Planta</p>
         <h3>1 planta</h3>
        </span>
        </div>
        <div>
        <i className='bx bx-wrench'></i>
        <span>
         <p>Estado</p>
         <h3>{property?.propertyStatus}</h3>
        </span>
        </div>
         
       </div>
       
       <h2 className={styles.title_property}>
        {property?.city}, {property?.country}
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
          {property
            ?.filter((prop: any) => prop.category == 'general' && prop.slug !== property.slug)
            .map((property: any) => (
              <PropertyCard key={property.uuid} {...property} />
            ))}
        </div>

       </div>
       
       <form className={styles.form}>
        <h2>Contactanos</h2>
        <input type="text" placeholder='Tu nombre' />
        <input type="text" placeholder='Tu e-mail(obligatorio)' />
        <input type="text" placeholder='Tu teléfono' />        
        <label htmlFor="">
         <input type="checkbox" name="" id="" />
         <p>Quiero recibir alertas de inmuebles similares a este</p>
        </label>
        <label htmlFor="">
         <input type="checkbox" name="" id="" />
         <p>Acepto las condiciones de uso, la información basica de Proteccion de Datos y darme de alto en itaaj</p>
        </label>
        <button>Contactar</button>
        <Link href={whatsappLink} className={styles.btn_whatsapp}>Whatsapp</Link>
        
       </form>
       
      </div>
      
      {/* <Modal open={open} closeModal={() => setOpen(!open)} property={property.uuid} /> */}
    </>
  )
}

export default Property
