'use client';

import React, { useState } from 'react'
import styles from './Header.module.css'
import { Bell, Heart, Menu, User } from 'react-feather'
import Link from 'next/link'
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import SideMenu from '../SideMenu';
import RegisterModal from '@/containers/RegisterModal';
import KYCModal from '@/containers/KYCModal';
import { useSDK } from '@metamask/sdk-react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import useAuthContext from '@/shared/hooks/useAuthContext';
import { useRouter } from 'next/navigation';

const Header = () => {
    const { connected, account } = useSDK();
    const isDesktop = useMediaQuery({ query: '(min-width: 1268px)' });
    const content = isDesktop ? 'Publica tu propiedad gratis' : 'Publica';
    const [openModalKYC, setOpenModalKYC] = useState<boolean>(false);
    const logo = isDesktop ? 'itaaj realty' : '';
    const { push } = useRouter();
    const { state } = useAuthContext()
    const [active, setActive] = useState(false);
    const handleClickAccess = () => {
        if (state.isAuthenticated) return push('/dashboard');
        document.body.style.overflow = 'hidden';
        setOpenModalKYC(true);
    }
//    console.log(state, "STATE")
    return (
    <GoogleOAuthProvider clientId="259968467063-s0d076kvsf87se4bgmofbll4ivf6gom3.apps.googleusercontent.com">
        <header className={styles.header}>
            <div className={styles.options}>
                <button className={styles.btn} onClick={() => setActive(true)} >
                    <Menu size={20} />
                </button>
                <Link href='/' className={styles.logo}>
                    <Image src='/isotipo.png' alt='Logo Itaaj Realty' width={20} height={40}  />
                    <h3>{logo}</h3>
                </Link>
                <nav className={styles.nav}>
                    <Link href='/properties'>Comprar</Link>
                    <Link href='/vende-tu-propiedad'>Vender</Link>
                    <Link href='/deals' className={styles.mid} >Portafolio de desarrolladores</Link>
                    {/* <Link href='/agents' className={styles.mid} >Meta Agentes Itaaj</Link> */}
                    <Link href='/' className={styles.mid} >Blog</Link>
                </nav>
            </div>
            <div className={styles.options}>
                <button className={`${styles.label_button} ${styles.alerts}`} ><Bell size={16} /> Mis alertas</button>
                <button className={styles.label_button} ><Heart size={16} /><span>Mis listas</span></button>
                <Link href='/publish' className={styles.publish}>{content}</Link>
                <button className={styles.login} onClick={handleClickAccess}>
                    <User size={18} /> 
                    <span>{ state.isAuthenticated ? 'Mi Perfil' : 'Acceder' }</span>
                </button>
            </div>

            <SideMenu active={active} setActive={setActive} />
            <RegisterModal />
            <KYCModal openModal={openModalKYC} setOpenModal={setOpenModalKYC} />
        </header>
    </GoogleOAuthProvider>
  )
}

export default Header