'use client'
import React, { useState } from 'react'
import styles from './PropertyElement.module.css'
import { DivisaFormater } from '@/utils'
import Link from 'next/link'
import Floorplans from '@/app/developments/[slug]/Plane'
import { useRouter } from 'next/navigation'
import Cform from '@/components/Contacts/Cform'
import { Mail } from 'react-feather'
//@ts-ignore
import Modal from 'react-modal';

const PropertyElement = ({  bathrooms, bedrooms, floor, price, total_area, image, slug }: any) => {
  const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj.com por la sigueinte propiedad`;
  const router = useRouter()
  const closeModaln = () => {
    console.log('enter')
    router.push('?plane=open')
  }

  const [modalIsOpen, setModalIsOpen] = useState(false); 
  const Showmodal = () => {
    setModalIsOpen(true);
  };

  function closeModal () {
    setModalIsOpen(false);
  };


  return (
    <>
    <div className={styles.property}>
      <h4 className={styles.price}>{DivisaFormater({value: price})}</h4>
      <span>{bedrooms} habs.</span>
      <span>{bathrooms} baños</span>
      <span>{total_area} m2</span>
      <h4>{floor}a  Planta</h4>
      <Link href={'?plane=open'}  >Mostrar plano</Link>
      <button onClick={() => Showmodal()} className={styles.message} ><Mail /> Contactar</button>
      <Floorplans bath={bathrooms} bed={bedrooms} image={image} />
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
        <Cform slug={"SDEV@"+slug} closeModal={closeModal} prevmsg={"Me interesa Inmueble: " + slug}/>
      </Modal>

  </>
  )
}

export default PropertyElement