import React from 'react'
import styles from './Banner.module.css'
import { Search } from 'react-feather'
import Image from 'next/image'
import Link from 'next/link'

const Banner = () => {

  return (
    <section className={styles.section}>
      <div className={styles.container_banner}></div>
      <div className={styles.search}>
        <div className={styles.content}>
          <h2>Todos tenemos un sitio</h2>
          <ul>
            <li><Link href='/properties'>Comprar</Link></li>
            <li><Link href='/properties'>Obra nueva</Link></li>
            <li><Link href='/properties'>Portafolio</Link></li>
          </ul>

          <div className={styles.params}>
            <select name="" id="">
              <option value="departament">Viviendas</option>
              <option value="new">Obra nueva</option>
              <option value="offerts">Promociones</option>
              <option value="office">Oficina</option>
              <option value="terreno">Terreno</option>
              <option value="building">Edificio</option>
            </select>
            <div>
              <input type="search" placeholder='Buscar propiedades en estados, etc...' />
              <Link href='/properties' className={styles.btn} ><Search size={20} /> <span>Buscar</span></Link>
            </div>
          </div>
        </div>
      </div>
      

      <div className={styles.options}>
          <h2>Te acompañamos en todo el proceso</h2>
          <div className={styles.boxs}>
            <Link className={styles.box} href="/blockchain">
                <Image
                  src="/blockchain.png"
                  width={48}
                  height={48}
                  alt="Tecnologia Blockchain"
                />
                <h3>Tecnología Blockchain</h3>
            </Link>
            <Link className={styles.box} href='/deals'> 
              <Image
                src="/investment.png"
                width={48}
                height={48}
                alt="Invierte"
              />

              <h3>Portafolio de desarrolladores</h3>
            </Link>
            <div className={styles.box}>
              <Image
                src="/value.png"
                width={48}
                height={48}
                alt="Valora tu casa"
              />
              <h3>Valora tu casa</h3>
            </div>
            <Link href='/itabot' className={styles.box}>
              <Image
                src="/value.png"
                width={48}
                height={48}
                alt="Valora tu casa"
              />
              <h3>Asistencia</h3>
            </Link>
          
            
            <div className={styles.box}>
              <Image
                src="/guarantee.png"
                width={48}
                height={48}
                alt="Invierte"
              />

              <h3>Protege tu casa</h3>
            </div>
          </div>
        </div>
    </section>
  )
}

export default Banner