'use client'
import React, { useEffect, useState } from 'react'
import styles from './Exclusive.module.css'
import { Divider, PropertyCard } from '@/components';
import Link from 'next/link';
import { NextPage } from 'next';
import { properties as propertiesApi } from '@/services';
import Slider from './Slider';

const Exclusive: NextPage = async () => {

  const properties = await propertiesApi();

  console.log(properties)
  
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>

          <h2>Propiedades Exclusivas</h2>
          <p>Proyectos revisados detalladamente con el fin de asegurarnos que tengan viabilidad financiera, legal y técnica.</p>
          <Divider />
        </div>
        <Link href='/properties' className={styles.btn}>Mostrar todos los inmuebles</Link>
      </div>

    {/* <Slider properties={properties} /> */}

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
