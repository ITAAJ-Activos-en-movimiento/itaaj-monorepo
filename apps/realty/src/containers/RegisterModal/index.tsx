'use client'
import styles from './RegisterModal.module.css'
import { ArrowRight, Calendar, Edit, Globe, Link, List, Loader, Mail, MapPin, MoreVertical, Phone, Send, ShoppingCart, X } from 'react-feather'
import { FormEvent, useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { countries } from '@/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

interface Props {
 closeModal?: () => void; 
 property: string;
}

const RegisterModal = () => {
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
  }) 
  
  
  const handleChange = (e:any) => {
    // setProposal((prev) => ({...prev, ['enganche']: ((proposal.economic_proposal * 0.2) - prev.apartado) }))
    setProposal((prev) => ({...prev, [e.target.name]: e.target.value }))
    
  }

  const [account, setAccount] = useState({});
  const onSubmitLoginGoogle = async(token: string) => {
    try{
      const {data} = await axios.post('https://itaajrealty.com/api/v1/auth/login-google', token, {
        headers: {
          "Content-Type": 'application/json',
          "api-key": "a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd"
      }
      });
      setAccount({token: "token"})
      alert("Usuario logeado correctamente")
      if (typeof window !== 'undefined'){
        localStorage.setItem('user', JSON.stringify({token: data}))
      }
    }catch(err){
      alert("Error logeando el usuario")
      console.log(err)
    }
  }
  
  const handleGoogleSuccess = async(credentialsResponse: CredentialResponse) => {
    if(credentialsResponse.credential){
      const token_id = credentialsResponse.credential;
      onSubmitLoginGoogle(token_id);
    }
  }


  const handleGoogleError = () => {
  }

  const params = useSearchParams();
  const register = params.get('register');
  console.log(register)
  
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
    router.push('?register=close')
  }
  
   useEffect(() => {
     setProposal((prev) => ({...prev, ['enganche']: Number(prev.economic_proposal * 0.2)}))
     setProposal((prev) => ({...prev, ['rest']:Number(prev.economic_proposal) - Number(prev.enganche) }))
     
  }, [proposal.economic_proposal]);
  
  
  return (
    <GoogleOAuthProvider clientId="259968467063-s0d076kvsf87se4bgmofbll4ivf6gom3.apps.googleusercontent.com">
       <div
        className={
            register == null || register == 'close'
            ? styles.modal_overlay
            : `${styles.modal_overlay} ${styles.open}`
        }
        onClick={closeModal}
      />
      <div className={register == null || register == 'close' ? styles.modal : `${styles.modal} ${styles.open_modal}`}>
        <div className={styles.header}>
          <div>
          </div>
          <button onClick={closeModal} className={styles.close_btn}>
            <X />
          </button>
        </div>
        
        <form onSubmit={onSubmit} className={styles.form}>
        <h3>Entra o regístrate en Itaaj Realty</h3>
          <div className={styles.field}>
            <input type="text" name='Correo electronico' onChange={handleChange} placeholder='Correo electronico' />            
          </div>      
          <button className={styles.proposal_btn}>{loading? <Loader /> : 'Continuar'}</button>
        <p className={styles.copy}>0</p>
        <div className={styles.google_btn}> 
        <GoogleLogin  useOneTap onError={handleGoogleError} onSuccess={handleGoogleSuccess} />

        </div>

        </form>
      </div> 
    </GoogleOAuthProvider>
  )
}

export default RegisterModal