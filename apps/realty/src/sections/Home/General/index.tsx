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

const General = () => {
    const [properties, setProperties] = useState([]);


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
        <section className={styles.section}>
            <div className={styles.header}>
                <div>

                <h2>Propiedades en General</h2>
                <p>Viviendas en México</p>
                <Divider />
                </div>
                <Link href='/' className={styles.btn}>Mostrar todos los inmuebles</Link>
            </div>

            
            <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={4}
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
            ?.filter((property: any) => property.category == 'general')
            .sort((property:any) => property.price - property.price)
            .map((property: any) => (
                    <SwiperSlide key={property.uuid} >
                    <PropertyCard {...property} />
                </SwiperSlide>
                ))}                
            </Swiper>

        </section>
    )
}

export default General