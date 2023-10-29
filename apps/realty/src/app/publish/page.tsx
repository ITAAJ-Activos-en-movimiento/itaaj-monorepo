'use client'
import React, { useEffect, useState } from 'react'
import styles from './Publish.module.css'
import Link from 'next/link'
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import axios from 'axios';
import {v4 as uuid} from 'uuid'
// import { useUploadImage } from '@/hooks/useUploadImage';
// import Loader from '@/components/Loader';
import { ArrowLeft, Loader } from 'react-feather';
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useUploadImage } from '@/hooks';

const CreateProperty = () => {
  const { t } = useTranslation();
  const [type, setType] = useState('house');

  const handleChange = (event: any) => {
    const { name, value } = event.target;
    setProperty((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeUser = (event: any) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeArea = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProperty((prev) => ({ ...prev, area: { ...prev.area, [name]: value}}));
  };

  let lastAccount = "" 

  if (typeof window !== 'undefined'){
    JSON.parse(localStorage.getItem('user') || '{}')? JSON.parse(localStorage.getItem('user') || "{}") : null
  }
  const [account, setAccount] = useState({
    token: lastAccount
  });
  const [register, setRegister] = useState(false);

  const uuidD = uuid();
  const [property, setProperty] = useState({
    id: uuidD,
    uuid: uuidD,
    name: "",
    address: "",
    city: "",
    state: "",
    country: "Mexico",
    price: 0,
    description: "",
    area: {
      land_area: "",
      total_area: "",
      building_area: ""
    },
    images: [],
    garage: 0,
    bedrooms: 1,
    bathrooms: 1,
    antiquity: 0,
    balcony: 0,
    kitcken: 0,
    propertyStatus: "",
    type: type,
    createdAt: new Date().toString(),
    category: "general",
    partner: "",
    neighborhood:"",
    street: "",
    external_number: 0,
    internal_number: 0,
    slug:""
  });

  const onSubmit = async() => {
    try{
      await axios.post('https://itaaj-api.onrender.com/api/v1/properties', {...property, images:urls}, {
        headers: {
          "api-key": "a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd"
      }
      });

      alert("Propiedad enviado correctamente")
    }catch(err){
      console.log(err)
    }
  }

  const onSubmitRegister = async() => {
    try{
      const {data} = await axios.post('https://troting.com/api/v1/auth/register', user, {
        headers: {
          "api-key": "a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd"
      }
      });
      alert("Usuario registrado correctamente")
      if (typeof window !== 'undefined'){
        localStorage.setItem('user', JSON.stringify({token: data}))
      }
    }catch(err){
      alert("Error registrando el usuario")
      console.log(err)
    }
  }

  const onSubmitLoginGoogle = async(token: string) => {
    try{
      const {data} = await axios.post('https://troting.com/api/v1/auth/login-google', token, {
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

  console.log(account)

  const registerUser = (e:any) => {
    e.preventDefault();
    // localStorage.setItem('user', JSON.stringify(user))
  }

  const { isLoading, uploadImage, urls } = useUploadImage();

    
  const addImages = (e: any) => {
    uploadImage(e?.target?.files![0]);
  };

  const handleGoogleSuccess = async(credentialsResponse: CredentialResponse) => {
    if(credentialsResponse.credential){
      const token_id = credentialsResponse.credential;
      onSubmitLoginGoogle(token_id);
    }
  }


  const handleGoogleError = () => {
  }

 
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: ""
  })


  const whatsappLink = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj.com por la sigueinte propiedad`;
  const whatsappLinkHelp = `https://api.whatsapp.com/send?phone=+5219995471508&text=Te hablo de la pagina Itaaj.com, porque necesito ayuda para valorar mi propiedad`;

  return (
    <GoogleOAuthProvider clientId="259968467063-s0d076kvsf87se4bgmofbll4ivf6gom3.apps.googleusercontent.com">
         <header className={styles.header}>
      
      {/* <nav className={styles.nav}>
        <Link className={styles.logo} href='/'>
        <Image src="/img/logos/isotipo.png" width={20} height={40} alt='Itaaj logo' />
        <h2>Itaaj</h2>      
        
      </Link>
      </nav> */}
      {/* <div className={styles.options}>

        <Link target="_blank" rel="noopener noreferrer" href={whatsappLink} passHref >
              {t('common:contact')}
        </Link>
      </div> */}
    </header>
    <div className={styles.container}>
    <Link href='/' className={styles.back}><ArrowLeft /> Atras</Link>

      <div>
       <h3>Tipo de propiedad</h3>
       <div className={styles.type}>
        <div onClick={() => setType('house')} className={type == 'house'? styles.active : ''}>
          <span>
          <svg viewBox="0 0 24 24"><path d="M21 9.75a.75.75 0 0 1 .743.648l.007.102v12a.75.75 0 0 1-.648.743L21 23.25h-6a.75.75 0 0 1-.743-.648l-.007-.102v-5.25a2.25 2.25 0 0 0-4.495-.154l-.005.154v5.25a.75.75 0 0 1-.648.743L9 23.25H3a.75.75 0 0 1-.743-.648L2.25 22.5v-12a.75.75 0 0 1 1.493-.102l.007.102v11.25h4.5v-4.5a3.75 3.75 0 0 1 3.55-3.745l.2-.005a3.75 3.75 0 0 1 3.745 3.55l.005.2v4.5h4.5V10.5a.75.75 0 0 1 .648-.743L21 9.75z"></path><path d="M23.25 21.75a.75.75 0 0 1 .102 1.493l-.102.007H.75a.75.75 0 0 1-.102-1.493l.102-.007h22.5zm-3-18H3.75a.75.75 0 0 0-.602.303L.306 7.882l-.069.111A2.25 2.25 0 0 0 2.25 11.25h19.5a2.25 2.25 0 0 0 2.013-3.257l-.069-.111-2.842-3.829a.75.75 0 0 0-.602-.303zm-.377 1.5 2.566 3.458-.018-.043a.75.75 0 0 1-.67 1.085H2.25a.75.75 0 0 1-.638-.356l-.051-.098a.75.75 0 0 1-.024-.53l.023-.058L4.126 5.25h15.747z"></path><path d="M18.75.75a2.25 2.25 0 0 1 2.245 2.096L21 3v1.5a.75.75 0 0 1-1.493.102L19.5 4.5V3a.75.75 0 0 0-.648-.743l-.102-.007H5.25a.75.75 0 0 0-.743.648L4.5 3v1.5a.75.75 0 0 1-1.493.102L3 4.5V3A2.25 2.25 0 0 1 5.096.755L5.25.75h13.5z"></path></svg>
          </span>
         <h4>Casa</h4>
        </div>
        <div onClick={() => setType('department')} className={type == 'department'? styles.active : ''}>
          <span>
          <svg viewBox="0 0 24 24"><path d="M21.75 12a.75.75 0 0 1 .743.648l.007.102v9a2.25 2.25 0 0 1-2.096 2.245L20.25 24H3.75a2.25 2.25 0 0 1-2.245-2.096L1.5 21.75v-9a.75.75 0 0 1 1.493-.102L3 12.75v9c0 .38.282.693.648.743l.102.007h16.5a.75.75 0 0 0 .743-.648L21 21.75v-9a.75.75 0 0 1 .75-.75zm-.603-12H2.852c-.703 0-1.311.487-1.465 1.173L.017 7.337 0 7.5a3 3 0 0 0 3 3l.176-.005a2.99 2.99 0 0 0 1.926-.854l.148-.158.016.019A2.99 2.99 0 0 0 7.5 10.5l.176-.005a2.993 2.993 0 0 0 2.058-.993l.015-.019.017.019A2.99 2.99 0 0 0 12 10.5l.176-.005a2.993 2.993 0 0 0 2.058-.993l.015-.019.017.019a2.99 2.99 0 0 0 2.234.998l.176-.005a2.99 2.99 0 0 0 1.926-.854l.148-.158.016.019A3 3 0 0 0 24 7.5l-.018-.163-1.37-6.163A1.499 1.499 0 0 0 21.147 0zM1.507 7.644l-.004-.076L2.852 1.5h18.296l1.349 6.07.003-.07a1.5 1.5 0 0 1-3 0c0-.958-1.378-.998-1.492-.12L18 7.5a1.5 1.5 0 0 1-3 0c0-.958-1.378-.998-1.492-.12l-.008.12a1.5 1.5 0 0 1-3 0c0-.958-1.378-.998-1.492-.12L9 7.5a1.5 1.5 0 0 1-3 0c0-.958-1.378-.998-1.492-.12L4.5 7.5a1.5 1.5 0 0 1-2.993.144z"></path><path d="M15 16.5a.75.75 0 0 1 .102 1.493L15 18H2.25a.75.75 0 0 1-.102-1.493l.102-.007H15z"></path><path d="M15 12a.75.75 0 0 1 .743.648l.007.102v10.5a.75.75 0 0 1-1.493.102l-.007-.102v-10.5A.75.75 0 0 1 15 12z"></path></svg>
          </span>
         <h4>Departamento</h4>
        </div>
        <div onClick={() => setType('condo')} className={type == 'condo'? styles.active : ''}>
        <span><svg viewBox="0 0 24 24"><path d="M23.25 22.075a.75.75 0 0 1 .102 1.493l-.102.007H.75a.75.75 0 0 1-.102-1.493l.102-.007h22.5z"></path><path d="M21.75 8.575H2.25a.75.75 0 0 0-.75.75v13.5c0 .414.336.75.75.75h19.5a.75.75 0 0 0 .75-.75v-13.5a.75.75 0 0 0-.75-.75zm-.75 1.5v12H3v-12h18z"></path><path d="M11.293.6.793 6.2c-.49.26-.797.768-.799 1.322v1.053a1.5 1.5 0 0 0 1.5 1.5h21a1.5 1.5 0 0 0 1.5-1.5L24 7.529a1.505 1.505 0 0 0-.799-1.329L12.703.601a1.505 1.505 0 0 0-1.41 0zM1.494 8.575V7.526L12 1.926l10.5 5.602-.006 1.047h-21zm17.256 3H5.25a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-10.5a.75.75 0 0 0-.75-.75zm-.75 1.5v9H6v-9h12z"></path><path d="M15.75 16.075a.75.75 0 0 1 .102 1.493l-.102.007h-7.5a.75.75 0 0 1-.102-1.493l.102-.007h7.5zm0 3a.75.75 0 0 1 .102 1.493l-.102.007h-7.5a.75.75 0 0 1-.102-1.493l.102-.007h7.5z"></path></svg></span>
         <h4>Condominio</h4>
        </div>
        <div onClick={() => setType('townhouse')} className={type == 'townhouse'? styles.active : ''}>
        <span><svg viewBox="0 0 24 24"><path d="M20 18.332v-2.716a3.63 3.63 0 0 0-.38-.925c-.227-.384-.502-.657-.9-.826-.792-.497-1.17-1.283-1.477-2.62a24.79 24.79 0 0 1-.066-.295l-.062-.287c-.281-1.3-.48-1.663-.923-1.663H8.274c-.454 0-.724.445-1.152 1.852l-.096.315c-.501 1.636-.916 2.394-1.787 2.72a2.252 2.252 0 0 0-.832.708c-.276.386-.39.773-.407.964v2.773c2.04.89 13.96.89 16 0zm-17 .286.002-3.1c.032-.396.195-.95.591-1.505a3.279 3.279 0 0 1 1.244-1.04c.51-.193.825-.767 1.233-2.1l.096-.313C6.73 8.703 7.157 8 8.274 8h7.918c1.143 0 1.519.688 1.9 2.452l.063.286c.023.108.043.198.063.283.252 1.096.534 1.683.956 1.957.55.222.979.647 1.308 1.206.28.475.437.943.507 1.271l.011.104v3.059a.5.5 0 0 1-.193.394c-1.694 1.317-15.92 1.317-17.614 0A.5.5 0 0 1 3 18.618z"></path><path d="M4 19.5a.5.5 0 0 1 .547-.498l2.5.235a.5.5 0 0 1 .453.498V21.5a.5.5 0 0 1-.5.5H4.5a.5.5 0 0 1-.5-.5zm1 .55V21h1.5v-.81zM19 21v-.95l-1.5.14V21zm.5 1H17a.5.5 0 0 1-.5-.5v-1.765a.5.5 0 0 1 .453-.498l2.5-.235A.5.5 0 0 1 20 19.5v2a.5.5 0 0 1-.5.5zm-11-5.5a.5.5 0 1 1 0-1h7a.5.5 0 1 1 0 1zm1 1.5a.5.5 0 1 1 0-1h5a.5.5 0 1 1 0 1zM6 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm12 1a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm0-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zM4.875 13.939a.5.5 0 1 1 .006-1l14.269.095a.5.5 0 1 1-.007 1L4.875 13.94z"></path><path d="M6.5 11v1H4.098c-.047 0-.135.165-.085.406.072.35.398.594 1.04.594v1c-1.101 0-1.848-.561-2.02-1.392-.161-.785.272-1.59 1.054-1.608zM18 12v-1h1.953c.801.018 1.23.876.97 1.664-.27.82-1.149 1.336-2.437 1.336v-1c.889 0 1.366-.28 1.488-.65.07-.21 0-.35-.032-.35zM3 5.385v.466l8.873-2.335a.5.5 0 0 1 .254 0L21 5.851v-.466l-9-2.368zm9-.868L2.627 6.984A.5.5 0 0 1 2 6.5V5a.5.5 0 0 1 .373-.484l9.5-2.5a.5.5 0 0 1 .254 0l9.5 2.5A.5.5 0 0 1 22 5v1.5a.5.5 0 0 1-.627.484z"></path></svg></span>
         <h4>Townhouse</h4>
        </div>
        <div onClick={() => setType('landscape')} className={type == 'landscape'? styles.active : ''}>
        <span><svg viewBox="0 0 24 24"><path d="M12 12.744a.75.75 0 0 1 .743.648l.007.102v9.75a.75.75 0 0 1-1.493.102l-.007-.102v-9.75a.75.75 0 0 1 .75-.75z"></path><path d="M4.5 14.994a.75.75 0 0 0-.75.75 8.25 8.25 0 0 0 8.25 8.25.75.75 0 0 0 .75-.75 8.25 8.25 0 0 0-8.25-8.25zm.797 1.547.138.017a6.754 6.754 0 0 1 5.75 5.751l.017.137-.137-.016a6.754 6.754 0 0 1-5.75-5.751l-.018-.138z"></path><path d="M19.5 14.994a8.25 8.25 0 0 0-8.25 8.25c0 .414.336.75.75.75a8.25 8.25 0 0 0 8.25-8.25.75.75 0 0 0-.75-.75zm-.798 1.547-.016.138a6.754 6.754 0 0 1-5.751 5.75l-.138.017.017-.137a6.754 6.754 0 0 1 5.751-5.75l.137-.018zM11.854.015a1.5 1.5 0 0 0-1.155.745L8.851 3.99 6.407 1.387C6.09.934 5.413.709 4.793.907A1.5 1.5 0 0 0 3.75 2.335v3.66a8.25 8.25 0 1 0 16.5 0V2.336A1.5 1.5 0 0 0 19.208.908L19.064.87a1.5 1.5 0 0 0-1.534.594l-2.382 2.528L13.3.762a1.5 1.5 0 0 0-1.301-.754l-.145.007zM9.65 5.616 12 1.508l2.35 4.108a.75.75 0 0 0 1.198.141l3.14-3.344.063-.077v3.658a6.75 6.75 0 0 1-6.75 6.75l-.237-.004A6.75 6.75 0 0 1 5.25 5.994V2.337l3.203 3.42a.75.75 0 0 0 1.198-.14z"></path></svg></span>
         <h4>Terreno</h4>
        </div>
        <div onClick={() => setType('other')} className={type == 'other'? styles.active : ''}>
        <span><svg viewBox="0 0 24 24"><path d="M.75 13.488a.75.75 0 0 1 .743.648l.007.102v9a.75.75 0 0 1-1.493.102L0 23.238v-9a.75.75 0 0 1 .75-.75zm22.5 0h-9a.75.75 0 0 0-.75.75v8.5c0 .69.56 1.25 1.25 1.25h8c.69 0 1.25-.56 1.25-1.25v-8.5a.75.75 0 0 0-.75-.75zm-.75 1.5v7.5H15v-7.5h7.5z"></path><path d="M22.75 10.488H1.25c-.69 0-1.25.56-1.25 1.25v2.5c0 .414.336.75.75.75h22.5a.75.75 0 0 0 .75-.75v-2.5c0-.69-.56-1.25-1.25-1.25zm-.25 1.5v1.5h-21v-1.5h21zm.75 6a.75.75 0 0 1 .102 1.493l-.102.007h-9a.75.75 0 0 1-.102-1.493l.102-.007h9zm-9-18h-9A2.25 2.25 0 0 0 3 2.238v4.5a2.25 2.25 0 0 0 2.25 2.25h9a2.25 2.25 0 0 0 2.25-2.25v-4.5a2.25 2.25 0 0 0-2.25-2.25zm-9 1.5h9a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-9a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 1 .75-.75z"></path><path d="M9.75 7.488a.75.75 0 0 1 .743.648l.007.102v3a.75.75 0 0 1-1.493.102L9 11.238v-3a.75.75 0 0 1 .75-.75z"></path></svg></span>
         <h4>Otro</h4>
        </div>
       </div>
      </div>
      <div>
       <span className={styles.type_sell}>Esta propiedad sera publicada para venta</span>
      </div>
      <div>
       <h3>Caracteristicas basicas</h3>
       <div>
       <div className={styles.field}>
          <label>Nombre para tu propiedad</label>
          <input onChange={handleChange} name='name' placeholder='Ingresa un nombre' />
        </div>
        <div className={styles.field}>
          <label>Precio de venta</label>
          <input onChange={handleChange} name='price' type="number" placeholder='Precio de venta' />
          <span className={styles.tip}>¿Dudas con el precio? <Link href={whatsappLinkHelp} target='_blank'>Contactanos</Link></span>
        </div>
        <div className={styles.field}>
        <label>Superficie</label>
        <input onChange={handleChangeArea} name='total_area' type="text" placeholder='Superficie' />
        </div>
       </div>
       <div>
        <div className={styles.col}>
          <div className={styles.field}>
          <label>Habitaciones</label>
          <input type='number' name='bedrooms' onChange={handleChange}  defaultValue={1} placeholder='Habitacionces' />
          </div>
          <div className={styles.field}>
          <label>Baños</label>
          <input type="number" name='bathrooms'  onChange={handleChange} defaultValue={1} placeholder='Baños' />
          </div>
        </div>
        <div className={styles.col}>
          <div className={styles.field}>
          <label>Estado del inmueble</label>
          <select onChange={handleChange}  name="propertyStatus" id="">
          <option value="">Selecciona</option>
            <option value="Casi nuevo">Casi nuevo</option>
            <option value="Muy bien">Muy bien</option>
            <option value="Bien">Bien</option>
            <option value="A reformar">A reformar</option>
            <option value="Reformado">Reformado</option>
          </select>
          </div>
          <div className={styles.field}>
          <label>Antigüedad</label>
          <select onChange={handleChange}  name="antiquity" id="">

          <option value={0}>Menos de 1 año</option>
            <option value={1}>1 a 5 años</option>
            <option value={510}>5 a 10 años</option>
            <option value={1020}>10 a 20 años</option>
            <option value={2030}>20 a 30 años</option>
            <option value={3050}>30 a 50 años</option>
            <option value={5070}>50 a 70 años</option>
            <option value={70100}>70 a 100 años</option>
            <option value={100}>más de 100 años</option>
          </select>
          </div>
        </div>
       </div>
      </div>
      <div className={styles.field}>
       <h3>Ubicación del inmueble</h3>
       <div className={styles.col}>

     
       <div className={styles.field}>
       <h4>Ciudad</h4>
       <input type="text" name='city' onChange={handleChange} placeholder=''/>
       </div>
       <div className={styles.field}>
       <h4>Estado</h4>
       <input type="text" name='state' onChange={handleChange} placeholder=''/>
       </div>

      </div>
      <div className={styles.field}>
       <h4>Dirección</h4>
       <input type="text" name='address' onChange={handleChange} placeholder=''/>
       </div>
       <div className={styles.property_map}><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15021635.698595606!2d-113.2586835703016!3d23.192397844676776!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84043a3b88685353%3A0xed64b4be6b099811!2sMexico!5e0!3m2!1sen!2sco!4v1681829545463!5m2!1sen!2sco" width="700" height="450" loading="lazy" ></iframe></div>
      </div>

<div className={styles.field}>
    <h3>Fotos de tu propiedad</h3>
    <div className={styles.file_input}>
      <input type="file" onChange={(e) => addImages(e)} name="image" id="image" accept=".png,.jpg,.jpeg,.svg" />
      <label htmlFor="image">
        <div className={styles.input_box}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
          {isLoading? <Loader /> : (
          <span>Puedes subir hasta 30 fotos</span>

          )}
        </div>
        <div className={styles.file_types}>
          <span>Archivos permitidos: .png, .jpg, .jpeg</span>
        </div>
        <button>Subit fotos</button>

      </label>
    </div>
    <div className={styles.images_cont}>
      {urls?.map((ur:any) => (
        <img key={ur} src={ur} alt="" className={styles.image_create} />
      ))}
    </div>
    </div>
  

    
    <div  className={styles.field}>
    <h3>Descripcion</h3>
    <textarea onChange={handleChange} name="description" id="" placeholder='La gente valora informacion que no aparece en las fotos, como luminosidad o altura de la vivienda. Asi como informacion relevante de la zona'></textarea>
    </div>

        {!account.token  && (
            <>
        {register? (
            <div className={styles.account}>
        <h3>Crea tu cuenta</h3>
        <div className={styles.field}>
       <input type="text" name='name' onChange={handleChangeUser} placeholder='Nombre'/>
       </div>
       <div className={styles.field}>
       <input type="text" name='lastname' onChange={handleChangeUser} placeholder='Apellido'/>
       </div>
        <div className={styles.field}>
       <input type="text" name='email' onChange={handleChangeUser} placeholder='Correo electronico'/>
       </div>
       <div className={styles.field}>
       <input type="password" name='password' onChange={handleChangeUser} placeholder='Contraseña'/>
       </div>
       <label className={styles.terms}>
        <input type='checkbox' required /> <p> Acepto las condiciones de uso y la informacion basica de Proteccionde Datos *</p>
       </label>
        <button type='button' className={styles.buton} onClick={onSubmitRegister} >Crear mi cuenta</button>

        <p>o</p>
        <GoogleLogin  useOneTap onError={handleGoogleError} onSuccess={handleGoogleSuccess} />

        <button onClick={()=> setRegister(false)}  className={styles.register}>Ya tengo cuenta en Itaaj Realty</button>
      </div>
        ): (

            
      <div className={styles.account}>
        <h3>Accede a tu cuenta</h3>
        <div className={styles.field}>
       <input type="text" name='email' onChange={handleChangeUser} placeholder='Correo electronico'/>
       </div>
       <div className={styles.field}>
       <input type="password" name='password' onChange={handleChangeUser} placeholder='Contraseña'/>
       </div>
        <Link href='/' className={styles.forgot} >He olvidado mi contraseña</Link>
        <button type='button'className={styles.buton} onClick={registerUser} >Iniciar sesion</button>

        <p>o</p>
        <GoogleLogin  width="1000px" useOneTap onError={handleGoogleError} onSuccess={handleGoogleSuccess} />

        <button onClick={() => setRegister(true)}  className={styles.register}>No tengo cuenta y quiero registrarme</button>
      </div>
        )}            

      </>

    )}

</div>


    <div className={styles.footer}>
      <button style={{
        
      }} className={styles.opacity} onClick={onSubmit}>Publicar</button>
    </div>
    </GoogleOAuthProvider>
  )
}

export default CreateProperty
