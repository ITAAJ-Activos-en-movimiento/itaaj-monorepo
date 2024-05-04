'use client'
import React from 'react'
import styles from './Floors.module.css'
import { X } from 'react-feather'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { DivisaFormater } from '@/utils'

const Photos = ({price, photos}: any) => {
    const params = useSearchParams();
    const openProposal = params.get('photos');

    const router = useRouter()
    const closeModal = () => {
      router.push('?photos=close')
    }
    
  return (
    <div className={ openProposal == null || openProposal == 'close'? styles.container : styles.open}>
        <div className={styles.header}>
            <button onClick={closeModal} ><X /> Cerrar</button>
            <div>
                <p className={styles.price}>Desde {DivisaFormater({value: price})}</p>
            </div>
            <div className={styles.re}></div>
        </div>
        
        <div className={styles.img}>
          {photos?.map((photo: string) => (
            <Image key={photo} src={photo} width={1000} height={800} alt='IMAGE' />
          ))}

        </div>
    </div>
  )
}

export default Photos