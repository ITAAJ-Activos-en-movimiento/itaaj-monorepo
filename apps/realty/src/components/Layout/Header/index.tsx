'use client';

import React from 'react'
import styles from './Header.module.css'
import { Bell, Heart, Menu, User } from 'react-feather'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive';

const Header = () => {

    const isDesktop = useMediaQuery({ query: '(min-width: 1268px)' });
    const content = isDesktop ? 'Publica tu propiedad gratis' : 'Publica';
    const logo = isDesktop ? 'itaaj realty' : 'ir';
  
    return (
    <header className={styles.header}>
        <div className={styles.options}>
            <Menu size={18} />
            <div className={styles.logo}>
                {logo}
            </div>
            <nav className={styles.nav}>
                <Link href='/'>Comprar</Link>
                <Link href='/'>Vender</Link>
                <Link href='/' className={styles.mid} >Portafolio de desarrolladores</Link>
                <Link href='/' className={styles.mid} >Meta Agentes Itaaj</Link>
                <Link href='/' className={styles.mid} >Blog</Link>
            </nav>
        </div>
        <div className={styles.options}>
        <button className={`${styles.label_button} ${styles.alerts}`} ><Bell size={16} /> Mis alertas</button>
        <button className={styles.label_button} ><Heart size={16} /><span>Mis listas</span></button>
        <Link href='/publish' className={styles.publish}>{content}</Link>
            <button className={styles.login}><User size={18} /> Acceder</button>

        </div>
    </header>
  )
}

export default Header