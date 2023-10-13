'use client'
import React, { useEffect, useState } from 'react'
import styles from './Exclusive.module.css'
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Divider, PropertyCard } from '@/components';
import Link from 'next/link';
import { NextPage } from 'next';

const Exclusive: NextPage = () => {

  const [properties, setProperties] = useState([]);


  const fetchData = async () => {
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

  console.log(properties)
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>

          <h2>Propiedades Exclusivas</h2>
          <p>Proyectos revisados detalladamente con el fin de asegurarnos que tengan viabilidad financiera, legal y técnica.</p>
          <Divider />
        </div>
        <Link href='/' className={styles.btn}>Mostrar todos los inmuebles</Link>
      </div>


      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={4}
        loop
        breakpoints={{
          768: {
            width: 768,
            slidesPerView: 3,
          },
          480: {
            width: 480,
            slidesPerView: 2,
          },
        }}

        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        {properties
          ?.filter((property: any) => property.category == 'exclusive')
          .sort((property: any) => property.price - property.price)
          .map((property: any) => (
            <SwiperSlide key={property.uuid} >
              <PropertyCard {...property} />
            </SwiperSlide>
          ))}
        {/* {[0,1,2,3,4,5,6,7].map((p) => ( */}

        {/* ))}                 */}
      </Swiper>

    </section>
  )
}

export default Exclusive;

export const getServerSideProps: any = async () => {
  const res = await fetch(
    'https://itaaj-api.onrender.com/api/v1/properties',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  console.log(res)
  const result: any = await res.json();
  // const resultsProducts: GetComputersResults = await resProducts.json();

  return {
    props: {
      properties: result.items,
    },
  };
};
