'use client'
import styles from './Modal.module.css'
import { ArrowRight, Calendar, Edit, Globe, Link, List, Loader, Mail, MapPin, MoreVertical, Phone, Send, ShoppingCart, X } from 'react-feather'
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { countries } from '@/utils';
import { useRouter, useSearchParams } from 'next/navigation';

interface Props {
 closeModal?: () => void; 
 property: string;
}

const Modal = ({ property }: Props) => {
  
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false);
  
  const [proposal, setProposal] = useState({
    name: '',
    nationality: '',
    email: '',
    phone: '',
    economic_proposal: 0,
    apartado: 50000,
    enganche: 0,
    rest: 0,
    fund: '',
    property: property
  }) 
  
  
  const handleChange = (e:any) => {
    // setProposal((prev) => ({...prev, ['enganche']: ((proposal.economic_proposal * 0.2) - prev.apartado) }))
    setProposal((prev) => ({...prev, [e.target.name]: e.target.value }))
    
  }
  
  const params = useSearchParams();
  const openProposal = params.get('proposal');
  console.log(openProposal)
  
  const onSubmit = async(e: FormEvent) => {
    e.preventDefault(); 
    try{
      setLoading(true);
      const { data } = await axios.post('https://itaaj-api-v0.onrender.com/api/v1/proposals', proposal);      
      console.log(data);
      setLoading(false);
      Swal.fire({
        title: 'Felicidades!',
        text: 'Tu propuesta ha sido enviada correctamente',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    //   closeModal()
      
    }
    catch(err){
      console.log(err)
    }
    
  }

  const router = useRouter()
  const closeModal = () => {
    router.push('?proposal=close')
  }
  
   useEffect(() => {
     setProposal((prev) => ({...prev, ['enganche']: Number(prev.economic_proposal * 0.2)}))
     setProposal((prev) => ({...prev, ['rest']:Number(prev.economic_proposal) - Number(prev.enganche) }))
     
  }, [proposal.economic_proposal]);
  
  
  return (
    <>
       <div
        className={
            openProposal == null || openProposal == 'close'
            ? styles.modal_overlay
            : `${styles.modal_overlay} ${styles.open}`
        }
        onClick={closeModal}
      />
      <div className={openProposal == null || openProposal == 'close' ? styles.modal : `${styles.modal} ${styles.open}`}>
        <div className={styles.header}>
          <div>
            <h2>Realizar una propuesta</h2>
          </div>
          <button onClick={closeModal} className={styles.close_btn}>
            <X />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className={styles.form}>
        <h3>Datos personales</h3>
          <div className={styles.field}>
            <label htmlFor="">
            Nombre
            <input type="text" name='name' onChange={handleChange} placeholder='Nombre' />            
              
            </label>
          </div>
          
          <div className={styles.field}>
          <label htmlFor="">
            Nacionalidad
              <select name="nationality" onChange={handleChange}>
                <option value="">Selecciona una nacionalidad</option>
                {countries.map((state) => (
                  <option value={state.countryName}>{state.countryName}</option>
                ))}
                </select>              
            </label>
          </div>
          <div className={styles.field}>
          <label htmlFor="">
            Correo electronico
              <input type="text" name='email' onChange={handleChange} placeholder='Ingresa tu correo' />            
            </label>
          </div>
          <div className={styles.field}>
          <label htmlFor="">
            Telefono
             <input type="text" name='phone' onChange={handleChange} placeholder='Ingresa tu telefono' />          
            </label>
          </div>
          
          <h3>Propuesta</h3>
          
          <div className={styles.field}>
          <label htmlFor="">
            Propuesta economica
             <input type="text" name='economic_proposal' value={proposal.economic_proposal} placeholder='Ingresa la propuesta economica' onChange={handleChange} />          
            </label>
          </div>
          
          <div className={styles.field}>
          <label htmlFor="">
            Apartado. (Monto negociable)
             <input type="text" onChange={handleChange} value='50,000' readOnly />          
            </label>
          </div>
          
          <div className={styles.field}>
          <label htmlFor="">
            Enganche = (Propuesta Económica x 20%) - Apartado
             <input type="text" onChange={handleChange} value={proposal.enganche}  readOnly />          
            </label>
          </div>
          
          <div className={styles.field}>
          <label htmlFor="">
            Restante = Propuesta Económica - Enganche
             <input type="text" onChange={handleChange} value={proposal.rest} readOnly />          
            </label>
          </div>
          {/* <div className={styles.field}>
          <label htmlFor="">
            Plazo
             <input type="text" placeholder='Ingresa la propuesta economica' />          
            </label>
          </div> */}
          
          <h3>Fondeo</h3>
          <div className={styles.field}>
          <label htmlFor="">
            Como piensas fondearlo
              <select name='fund' onChange={handleChange}>
                <option value="Efectivo">Efectivo</option>
                <option value="Efectivo & Credito">Efectivo & Crédito</option>
                <option value="Crypto">Crypto</option>
                <option value="Fiat (Efectivo o Credito) y Crypto">Fiat (Efectivo o Crédito) y Crypto</option>
              </select>
            </label>
          </div>

          <div className={styles.field}>
          <label htmlFor="">
            Prueba de fondos
            <input type="file" />
            </label>
          </div>
          
          <button className={styles.proposal_btn}>{loading? <Loader /> : 'Enviar propuesta'}</button>
        </form>
      </div> 
    </>
  )
}

export default Modal