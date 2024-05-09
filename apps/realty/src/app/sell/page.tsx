'use client'

import React, { useState } from 'react'
import styles from './Sell.module.css'
import Image from 'next/image'
import states from '@/utils/states'
import axios from 'axios'

const Sell = () => {

  const [info, setInfo] = useState({
    name: '',
    email: '',
    state: '',
    phone: ''
  });

  const sendData = async (e:any) => {
    e.preventDefault();

    try{
        await axios.post('https://itaajrealty.com/api//api/v1/leads', {...info})
        alert('Informacion enviada correctamente')
    }catch(err){
        console.error(err)
    }
  } 

  return (
    <>
      <div className={styles.banner}>
        <div className={styles.image}>
        {/* <Image src='/México.jpg' width={1600} height={468} alt='México' objectFit='cover' />           */}
        </div>
        <div className={styles.banner_content}>
          <div>
            <p>BIENVENIDO!</p>
            <h2>Te ofertamos por tu inmueble en menos de 7 dias</h2>
          </div>
          <form onSubmit={sendData} >
            <h3>Dejanos tus datos y te contactamos</h3>
            <div className={styles.field}>
              <label htmlFor="">Nombre*</label>
              <input type="text" onChange={(e) => setInfo((prev) => ({...prev, name: e.target.value}))} placeholder='Nombre de contacto' />
            </div>
            <div className={styles.field}>
              <label htmlFor="">Email*</label>
              <input type="text" placeholder='Email de contacto' onChange={(e) => setInfo((prev) => ({...prev, email: e.target.value}))} />
            </div>
            <div className={styles.field}>
              <label htmlFor="">Estado(Opcional)</label>
              <select name="" id="" onChange={(e) => setInfo((prev) => ({...prev, state: e.target.value}))} >
                {states.map(state => (
                  <option key={state.clave} value={state.nombre}>{state.nombre}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label htmlFor="">Teléfono</label>
              <input type="text" onChange={(e) => setInfo((prev) => ({...prev, phone: e.target.value}))} placeholder='Teléfono de contacto' />
            </div>
            
            <div className={styles.field_box}>
              <input type="checkbox" />
              <label htmlFor="">Acepto la Proteccion de datos</label>
            </div>
            <button className={styles.btn} type='submit'>Me interesa</button>
            
            <span>
              <p>O llamanos al Teléfono</p>
              <h4>+52 1 999 547 1508</h4>
            </span>
          </form>
        </div>
      </div>
      
      <section className={styles.section}>
        <div className={styles.left}>
          
        <h2>Recibe una propuesta</h2>
        <p>Si por algún motivo te urge vender tu propiedad, recibe una propuesta comercial para comprar tu inmueble en plazo no mayor a 7 días.</p>
        
        <p>Prueba nuestro servicio, configúralo a tu medida y gestiona de forma sencilla y eficiente tus inmuebles.
          <br /> ¿Te interesa captar público extranjero? Con Itaaj tendrás difusión de tus inmuebles nacional e internacionalmente.</p>
          <div className={styles.image}>
          <Image src='/proposal.jpg' width={450} height={250} alt='Recibe una propuesta' />            
          </div>
        
        </div>
        
        <div className={styles.right}>
          <h2>Completa nuestro formulario</h2>
          <p>Obtén una propuesta de compra personalizada para tu propiedad completando nuestro formulario. Uno de nuestros expertos se pondrá en contacto contigo para explicarte la oferta en detalle y responder a cualquier pregunta que tengas. ¡Solicita tu propuesta hoy mismo!</p>
        </div>
      </section>
      
      <section className={styles.section}>
        <div className={styles.left_two}>
        <h2>Promocionamos tu Propiedad</h2>
        <p>Obtén una propuesta de compra personalizada para tu propiedad completando nuestro formulario. Uno de nuestros expertos se pondrá en contacto contigo para explicarte la oferta en detalle y responder a cualquier pregunta que tengas. ¡Solicita tu propuesta hoy mismo!</p>
        </div>
        <div className={styles.image_two}>
        <Image src='/promotion.png' width={550} height={500} alt='Imagen de promocion' />
        </div>
      </section>
    </>
  )
}

export default Sell
