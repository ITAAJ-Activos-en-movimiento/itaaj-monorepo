import React from 'react'
import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { User } from 'react-feather';

const Header = () => {
  return (
    <header className={styles.header}>
        <div className={styles.options}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/isotipo.png"
              alt="Logo Itaaj Realty"
              width={20}
              height={40}
            /> 
            <h3>itaaj realty</h3>
          </Link>
        </div>
        <div className={styles.options}>
          <Link href="/login" className={styles.login} >
            <User size={18} />
            <span>{"Acceder"}</span>
          </Link>
        </div>
      </header>
  )
}

export default Header