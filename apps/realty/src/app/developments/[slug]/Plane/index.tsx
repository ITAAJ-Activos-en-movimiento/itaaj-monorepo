'use client'
import React from 'react'
import styles from './Floors.module.css'
import { X } from 'react-feather'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'

const Floorplans = ({bed, bath, area, image}: any) => {
    const params = useSearchParams();
    const openProposal = params.get('plane');

    const router = useRouter()
    const closeModal = () => {
      router.push('?plane=close')
    }
    
  return (
    <div className={ openProposal == null || openProposal == 'close'? styles.container : styles.open}>
        <div className={styles.header}>
            <button onClick={closeModal} ><X /> Cerrar</button>
            <div>
                <p>{bed} habs.</p>
                <p>{bath} baños</p>
                <p>{area} m2</p>
            </div>
            <div className={styles.re}></div>
        </div>
        
        <div className={styles.img}>
        <Image src={image} width={800} height={800} alt='IMAGE' />

        </div>
    </div>
  )
}

export default Floorplans