'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from './Property.module.css'
import Link from 'next/link'
import { DivisaFormater } from '@/utils/divisa-formater'
import { Mail } from 'react-feather'
import Cform from '@/components/Contacts/Cform'
//@ts-ignore
import Modal from 'react-modal';

const Property = ({images, price, type, floor, development, name, category, bedrooms, bathrooms, area, description, slug}:any) => {

  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const Showmodal = () => {
    setModalIsOpen(true);
  };

  function closeModal () {
    setModalIsOpen(false);
  };  

  const [url, setUrl] = useState<string>('');
  
  const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina ${url} por la siguinte propiedad ${url}/${slug}`;


  useEffect(() => {
    setUrl(window.location.href)
  }, [])
  return (
  <>

    <div className={styles.card}>
    <Link href={category == "general"?  `/properties/${slug}` : `/developments/${development}`} >
      {images.length > 0 && images[0].includes('/') && (
        <Image src={images[0]} width={500} height={500} alt={name} objectFit='cover' />

      )}
    </Link>
      <div>
      <Link href={`/properties/${category == 'exclusive'? category+"/" : ''}${slug}`} >
       <div className={styles.header}>
        <h2>ITAAJ &middot; Experto inmobiliario</h2>
       </div>
       <div className={styles.content}>
        <span className={styles.price}>{DivisaFormater({value: price})}</span>
        <p className={styles.title} ><strong>{type}</strong> {name}</p>
       </div>
       <div className={styles.amenities}>
        <div>
        <i className='bx bx-bed' ></i>
        <p>{bedrooms} habs.</p>
        </div>
        <div>
        <i className='bx bx-bath' ></i>
        <p>{bathrooms} baños</p>
        </div>
        <div>
        <i className='bx bx-area' ></i>
        <p>{area.total_area} m&sup2;</p>
        </div>
        <div>
        <i className='bx bx-building-house' ></i>
          <p>1 planta</p>
        </div>
       </div>
       <div className={styles.description}>
          <p  dangerouslySetInnerHTML={{ __html: description }}></p>
        </div>
      </Link>
       <div className={styles.options}>
        <button onClick={() => Showmodal()} className={styles.message} ><Mail />  Contactar </button>
        <Link href={whatsappLink} target="_blank"><i className='bx bxl-whatsapp'></i> Mensaje</Link>
       </div>
      </div>
      </div>

    <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel='Contacto'
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
          content: {
            width: "33rem",
            height: "50rem",
            margin: "auto", // Center the modal horizontally
            padding: "0px",
            border: "none",
          },
        }}
      >
        <Cform slug={"PROP@"+slug} closeModal={closeModal} prevmsg={"Me interesa Inmueble: " + slug}/>
      </Modal>
    </>
  )
}

export default Property
