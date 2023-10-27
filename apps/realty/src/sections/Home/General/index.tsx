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
import { properties as propertiesApi } from '@/services';
import Slider from './Slider';

const General = async () => {
  const properties = await propertiesApi();

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

            <Slider properties={properties} />
            

        </section>
    )
}

export default General