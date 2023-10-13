'use client'

import React, { useEffect, useState } from 'react';
import styles from './Property.module.css';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

  console.log(property)
  return (
    <>
    {loading? <p>Cargando...</p> : (

    <>
      <div className={styles.banner}>
        <div className={styles.info_banner}>
          <h2>
            {property?.name}
          </h2>
          <p>
             {property?.type} de {property?.area?.total_area} m&sup2;
          </p>
        </div>
        <Image
          src={property?.images?.[0]}
          alt={property?.name}
          width={1920}
          height={1200}
          objectFit="contain"
        />
      </div>
      <div className={styles.header}>
        <div className={styles.title}>
          <h2>CONOCE TU PROXIMO {property?.type?.toString().toUpperCase()} EN {property?.city?.toString().toUpperCase()}</h2>
       <p dangerouslySetInnerHTML={{ __html: property?.description }}></p>          
        </div>
        <div className={styles.info}>
          <div className={styles.image}></div>
          <p>{property?.bedrooms} - RECAMARAS </p>
          <p>{property?.bathrooms} - BAÑOS </p>

          <span>LOCALIZADO EN</span>
          <p>{property?.city}, {property?.state}</p>
          <p>{property?.country}</p>
            <div className={styles.buttons_list}>
          <button onClick={handleShare} className={styles.btn_share}><i className='bx bx-share-alt' ></i> Compartir</button>
          {/* <button>CONTACTO</button> */}
          <Link href={whatsappLink} target="_blank" className={styles.btn_whatsapp} >Whatsapp</Link>
        
            </div>
        </div>
      </div>

      <div className={styles.specs}>
         <div className={styles.swiper}>
            <div  className={styles.slide}>
            <Image src={actualImage} width={600} height={600} objectFit='cover' alt='Imagen Propiedad' />
            <div className={styles.buttons}>
            <button onClick={prevImage}><i className='bx bx-chevron-left'></i></button>
            <button onClick={nextImage}><i className='bx bx-chevron-right'></i></button>
            </div>
          </div>
        
            
         </div>
         <div className={styles.caract}>
          <h2>Caracteristicas</h2>
          <ul>
            <li>{property?.type} de {property?.area?.total_area} m&sup2;</li>
            <li>{property?.bedrooms} recamaras</li>
            <li>{property?.bathrooms} baños</li>
            {property?.amenities?.map((amenity: string) => (
            <li key={amenity}>{amenity}</li>
            ) )}
          </ul>
         </div>
      </div>
    </>
    )}

</>

  );
};

export default Property;