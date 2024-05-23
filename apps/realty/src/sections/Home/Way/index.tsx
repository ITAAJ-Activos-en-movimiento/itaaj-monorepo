import Image from 'next/image'
import React from 'react'
import styles from './Way.module.css'
const Way = () => {
  return (
    <section className={styles.section}>
        <h2>El camino hacia tu nuevo hogar</h2>
        <Image src="/ppath.png" alt='El camino hacia tu nuevo hogar' width={900} height={300}  /> 
    </section>
  )
}

export default Way