'use client'
import React, { useState } from 'react'
import axios from 'axios'  //*
import styles from './Cform.module.css'

interface Props {
  slug: any
  closeModal?: Function
  prevmsg?: string
}

const Cform = ({slug, closeModal, prevmsg} : Props) => {

  const pmsg = prevmsg ? prevmsg : "";

  const [info, setInfo] = useState({
    name: '',
    email: '',
    phone: '',
    message: pmsg,
    property: slug
  });


  function reset() {
    setInfo({
      name: '',
      email: '',
      phone: '',
      message: pmsg,
      property: slug
    });
  };

  const sendData = async (e:any) => {
    e.preventDefault();
    try{
      if (info.email !='' ){
        await axios.post('https://itaajrealty.com/api//api/v1/messages', {...info})
        alert('Informacion enviada. Pronto nos pondremos en contacto contigo');
        reset();
        if (closeModal){
          closeModal();
        }
      }
      else {
        alert('El email de contacto NO puede enviarse en blanco')
      }
    }catch(err){
        console.error(err)
    }
  };


    return (
      <form className={styles.form} onSubmit={sendData}>
      <h2>Contáctanos</h2>
      <input type="text" value={info.name} placeholder='Tu nombre' onChange={(e) => setInfo((prev) => ({...prev, name: e.target.value}))} />
      <input type="email" value={info.email} id="email" placeholder='Tu e-mail(obligatorio)' onChange={(e) => setInfo((prev) => ({...prev, email: e.target.value}))} />
      <input type="text" value={info.phone} placeholder='Tu teléfono' onChange={(e) => setInfo((prev) => ({...prev, phone: e.target.value}))} />
      <input type="text" value={info.message} placeholder='Mensaje ..' onChange={(e) => setInfo((prev) => ({...prev, message: e.target.value}))} />           
      <label htmlFor="similares">
       <input type="checkbox" name="similares" id="similares" />
       <p>Quiero recibir alertas de inmuebles similares</p>
      </label>
      <label htmlFor="terms">
       <input type="checkbox" name="terms" id="terms" defaultChecked />
       <p>Acepto las condiciones de uso, la información basica de Proteccion de Datos y darme de alta en itaaj</p>
      </label>
      <button disabled={info.name.length < 3 || info.phone.length < 4 || info.email.length < 5} className={styles.btn } type='submit'>Contactar</button>
      </form>
    );
};

export default Cform;