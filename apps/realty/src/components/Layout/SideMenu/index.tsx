import React from 'react'
import styles from './SideMenu.module.css'
import { X } from 'react-feather'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  active: boolean
  setActive: any
}
const SideMenu = ({active, setActive} : Props) => {
  return (
    <>
       <div className={`${styles.overlay} ${active? styles.active : ''} `} />
    <div className={`${styles.menu} ${active? styles.active : ''} `}>
      <div className={styles.header}>
            <button onClick={() => setActive(false)}>
                <X />
            </button>

            <Link className={styles.logo} href="/">
            <Image src='/isotipo.png' alt='Logo Itaaj Realty' width={20} height={40}  />
                <h3>itaaj Realty</h3>
            </Link>
      </div>


            <ul>
                {/* <li><Link href='/'>Ayuda y sugerencias</Link></li> */}
                <li><Link href='/properties'>Comprar</Link></li>
                <li><Link href='/sell'>Vender</Link></li>
                {/* <li><Link href='/'>Actualidad</Link></li> */}
                <li><Link href='/'>Indice de precios</Link></li>
                {/* <li><Link href='/'>Tasacion online</Link></li> */}
                <li><Link href='/'>Hipotecas</Link></li>
                <li><Link href='/itabot'>Sofia asistente AI online</Link></li>
                <li><Link href='/servicios-profesional'>Si eres profesional</Link></li>
                <li><Link href='/servicios-particular'>Si eres particular</Link></li>
                <li><Link href='/deals'>Portafolio de desarrolladores</Link></li>
                {/* <li><Link href='/agents'>Meta agentes Itaaj</Link></li> */}
                {/* <li><Link href='/'>Blog</Link></li> */}
                <li><Link href='/'>Itaaj seguros y creditos</Link></li>
            </ul>
        </div>
    </>
  )
}

export default SideMenu