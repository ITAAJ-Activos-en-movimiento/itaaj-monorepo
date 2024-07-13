import React from 'react'
import styles from './Banner.module.css'
import Image from 'next/image'
import Link from 'next/link'
import SearchProperties from './Search'
import Search from '@/components/Search'

const Banner = () => {

  return (
<>

    <section className={styles.section}>
        <div  className="home-hero-video" style={{ position: "relative", width: '100%', height: '60vh', overflow: 'hidden',  }} data-video-id="3337">
      <iframe
        src="https://app.vidzflow.com/v/H0LDXZjsnq?dq=576&amp;ap=true&amp;muted=true&amp;loop=true&amp;ctp=false&amp;bc=%234E5FFD&amp;controls="
        allow="fullscreen"
        scrolling="no"
        title="Jasper Hero Video - Abstract Urban"
        width="100%"
        height="100%"
        frameBorder="0"
        style={{ width: '100%', height: '100%', overflow: 'hidden' }}
      ></iframe>
        <div style={{
      width: "100%",
      height: "60vh",
      position: "absolute",
      backgroundColor: "rgba(0,0,0,0.3)",
      zIndex: 1,
      top: 0,
      left: 0
    }}>

    </div>
    </div>
  
      {/* <div className={styles.container_banner}></div> */}
      <div className={styles.search}>
        <div className={styles.content}>
          <h2>Todos tenemos un sitio</h2>
          {/* <ul>
            <li><Link href='/properties'>Comprar</Link></li>
            <li><Link href='/properties'>Obra nueva</Link></li>
            <li><Link href='/properties'>Portafolio</Link></li>
          </ul> */}

      <SearchProperties />
        </div>
      </div>
      

      <div className={styles.options}>
          <h2>Te acompañamos en todo el proceso</h2>
          <div className={styles.boxs}>
            <Link href="?search=route" className={styles.box} >
                <Image src="/commute_time.svg" width={40} height={40} alt='Buscar por trayecto' />
                <h3>Buscar por trayecto</h3>
            </Link>
            {/* <Link className={styles.box} href="/blockchain">
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
            <Link href='/hipotecas' className={styles.box}>
              <Image
                src="/hipo_icon.svg"
                width={45}
                height={45}
                alt="Calcula tu hipoteca"
              />
              <h3>Calcula tu hipoteca</h3>
            </Link>
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
            </div> */}
          </div>
        </div>
    </section>

<Search />

</>
  )
}

export default Banner