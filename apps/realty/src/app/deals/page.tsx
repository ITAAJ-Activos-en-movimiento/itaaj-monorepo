'use client'

import styles from './Deals.module.css'
import Image from 'next/image'
import { NextPage } from 'next'
import { useEffect, useState } from 'react';
import { ArrowUp, Download } from 'react-feather';

const Deals: NextPage = ()  => {
  
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/hipotesis.pdf'; // Ruta relativa al archivo PDF
    link.download = 'Hipotesis_de_Inversion.pdf'; // Nombre de archivo para descargar
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const [properties, setProperties] = useState([]);


  const fetchData =  async() => {
      const data = await fetch(
          'https://itaaj-api-v0.onrender.com/api/v1/properties',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const result: any = await data.json();
        setProperties(result.items);
  }

  useEffect(() => {
      fetchData();
  }, [])
  
  return (
    <>
      <div className={styles.banner}>
        <h1>Forma parte del Equipo de Desarroladores Inmobiliarios</h1>
        <h2>Conoce nuestros proyectos</h2>
        <p>Proyectos estructurados hacia el complimiento. <br /> Solides y transparencia de la estructura <strong>Jurídica, Financiera y Fiscal</strong> de cada proyecto.</p>
      </div>
      
      <section className={styles.info}>
        <h2>Nuestros proyectos se estructuran hacia la <strong>portabilidad de derechos</strong> y <strong>seguridad jurídica</strong> del equipo de desarrolladores.</h2>
      </section>
      
      <div className={styles.selling}>
        <h2>Proyectos en curso</h2>
        <div className={styles.projects}>
          
          {properties
            ?.filter((property: any) => property.category == 'investment')
            .map((property: any, index:number) => (
              <div key={property.uuid} className={`${styles.project} ${styles['pro'+ index]}`}>
                <div className={styles.picture}>
                  <Image src={property.images[0]} alt={property.name} width={1000} height={1000} objectFit='contain' />                  
                </div>
                <div className={styles.project_info}>
                  <span>{property.city}, {property.state}</span>
                  <h2>{property.name}</h2>
                    <p className={styles.copy} dangerouslySetInnerHTML={{ __html: property.description }}></p>      
                    <p dangerouslySetInnerHTML={{ __html: property.description }}></p>      
                  
                  <div className={styles.class_info}>
                    <ul>
                      <li><i className='bx bx-calendar'></i></li>
                      <li className={styles.blue}>8 a 12 meses</li>
                      <li>Duración del Proyecto</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className={styles.rent}>RENTABILIDAD DEL PROYECTO</h4>
                    <h3 className={styles.percent}><ArrowUp size={30} /> {index == 1? "18.5%" : "20%"} </h3>
                  </div>
                  <div className={styles.property_footer}>
                    <button onClick={handleDownload}><Download size={22} color='var(--main-color)' /> ¡Hipótesis de Inversión!</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
            
     
      </div>
      
      <div className={styles.invesment_back}>
            
        <section className={styles.invesment}>
            <h2>¿Cómo invertir en nuestros deals?</h2>
            <ul>
            <li>
                <Image src='/building.png' width={100} height={90} alt='Agenda una reunion' />
                <div>
                <h3>Agenda una reunion con nuestros asesores</h3>
                <p>Conoce mas sobre Itaaj Activos en Movimiento</p>
                </div>
            </li>
            <li>
                <Image src='/savei.png' width={100} height={90} alt='Agenda una reunion' />
                <div>
                <h3>Eliges el deal que mas se ajuste a tu perfil</h3>
                <p>Invirtiendo a partir de USD 10.000</p>
                </div>
            </li>
            <li>
                <Image src='/security.png' width={100} height={90} alt='Agenda una reunion' />
                <div>
                <h3>Recibes utilidades desde el primer dia</h3>
                <p>Rentabilidad estimada entre el 10% y el 20% por proyecto</p>
                </div>
            </li>
            </ul>
            <button className={styles.investment_btn}>¡Quiero invertir!</button>
        </section>
      </div>
    </>
  )
}


export default Deals