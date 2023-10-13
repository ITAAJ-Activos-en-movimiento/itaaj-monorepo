import React from 'react'
import styles from './SideMenu.module.css'
import { X } from 'react-feather'
import Link from 'next/link'

const SideMenu = () => {
  return (
    <div className={styles.overlay}>
        <div className={styles.menu}>
            <button>
                <X />
            </button>

            <ul>
                <li><Link href='/'>Ayuda y sugerencias</Link></li>
                <li><Link href='/'>Comprar</Link></li>
                <li><Link href='/'>Vender</Link></li>
                <li><Link href='/'>Actualidad</Link></li>
                <li><Link href='/'>Indice de precios</Link></li>
                <li><Link href='/'>Tasacion online</Link></li>
                <li><Link href='/'>Hipotecas</Link></li>
                <li><Link href='/'>Asistente online</Link></li>
                <li><Link href='/'>Publiicadores profesionales</Link></li>
                <li><Link href='/'>Publiicadores particulares</Link></li>
                <li><Link href='/'>Portafolio de desarrolladores</Link></li>
                <li><Link href='/'>Meta agentes Itaaj</Link></li>
                <li><Link href='/'>Blog</Link></li>
                <li><Link href='/'>Itaaj Seguros</Link></li>
            </ul>
        </div>
    </div>
  )
}

export default SideMenu