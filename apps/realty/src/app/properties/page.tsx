'use client'
import React, { useEffect, useState } from 'react'
import styles from './Properties.module.css'
import { NextPage } from 'next'
import Property from '@/components/Buy/Property'

const Properties:NextPage = () => {
    const [properties, setProperties] = useState([]);


    const fetchData =  async() => {
        const data = await fetch(
            'https://itaajrealty.com/api/v1/properties',
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const result: any = await data.json();
          setProperties(result);
    }

    useEffect(() => {
        fetchData();
    }, [])
    return (
    <>
      <div className={styles.header}>
       <h2>Filtros</h2>
       <select name="" id="">
        <option value="">Estado</option>        
       </select>
       <select name="" id="">
        <option value="">Colonia</option>        
       </select>
       <select name="" id="">
        <option value="">Tipo de vivienda</option>        
       </select>
       <select name="" id="">
        <option value="">Tipo de construcción</option>        
       </select>
       <select name="" id="">
        <option value="">Precio</option>        
       </select>
       <select name="" id="">
        <option value="">Habitaciones</option>        
       </select>
       <select name="" id="">
        <option value="">Baños</option>        
       </select>
      </div>
     {properties.length == 0? (
      <div className={styles.notProperties}>
        <div><i className='bx bx-shape-circle'></i></div>
        <h2>No hay Propiedades</h2>
        </div>
     ): (
      
      <div className={styles.properties}>
      <div>
        <h2 className={styles.title}>Viviendas y casas en venta en Mexico</h2>
        <p>14.556 usadas y 3.194 de obra nueva</p>
        <div className={styles.option}>
          <span>
          <i className='bx bx-info-circle'></i>
            <p>Ordenar</p>
          </span>
          <select name="" id="">
            <option value="score">Puntuación</option>
            <option value="recents">Mas recientes</option>
            <option value="low">Mas baratos</option>
            <option value="high">Mas caros</option>
            <option value="big">Mas grandes</option>
            <option value="small">Mas pequeños</option>
          </select>
        </div>
      </div>
      {properties?.map((property:any) => (
       <Property key={property.id} {...property} />      
      ))}
      </div>
     )}
      
    </>
  )
}

export default Properties
