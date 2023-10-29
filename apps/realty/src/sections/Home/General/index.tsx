import React from 'react'
import styles from './Exclusive.module.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Divider } from '@/components';
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