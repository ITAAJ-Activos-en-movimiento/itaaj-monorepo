import styles from './Blockchain.module.css'
import Image from 'next/image'

const Blockchain = () => {
  return (
    <>
     <div className={styles.hero_back}>      
     <section className={styles.hero}>
      <div>
        <h4 className={styles.title}>
        Compra tu inmueble en 4 pasos!          
        </h4>
        
        <ul className={styles.list}>
          <li>1. Realiza una propuesta económica en nuestra plataforma.</li>
          <li>2. Una vez aceptada, realiza el pago del apartado con el fín de formalizar la propuesta.</li>
          <li>3. Fijaremos fecha de firma del contrato de compraventa. El comprador deberá pagar el enganche en ese evento y fijar los tiempos para el pago total de inmueble.</li>
          <li>4. A la feha de liquidación recibirás el 100% de los derechos sobre tu propiedad de forma compretamente digital. </li>
        </ul>
       
      </div>
      <Image src='/block1.png' width={500} height={500} alt="Blockchain iamge" />
     </section>
     </div>
     
     <section>
     <ul className={styles.list_down}>
          <li>• Los contratos firmados digitalmente quedarán registrados y encriptados en una Blockchain privada, asegurando con ello su inalterabilidad y confidencialidad.</li>
          <li>•	Cada documento procesado se vuelve único, irrepetible e inalterable. </li>
          <li>•	Comprueba que la persona que firma o acepta es realmente quien dice ser, cumple con regulaciones de KYC.</li>
        </ul>
     </section>

     <div className={styles.hero_back}>      
     <section className={styles.hero}>
      <div>
       <h2>Ahora puedes hacer operaciones en bienes raices con Crypto</h2>
       <p>Si eres amante de la tecnología y quieres adquirir una propiedad, ahora puedes hacerlo en Itaaj. Te ofrecemos una oportunidad única: separa en el proyecto de tus sueños usando Bitcoin.</p>
       <p>Hemos seleccionado proyectos innovadores y muy interesantes, en los cuales podrás acceder a la selección del apartamento que quieras adquirir, apartándolo con la red monetaria más innovadora, eficiente y segura.</p>
       <p>La revolución de las criptomonedas es una realidad y tú, con La Itaaj, puedes ser parte.</p>
      </div>
      <Image src='/btc-hero.avif' width={428} height={480} alt='Ahora puedes hacer operaciones en bienes raices con Crypto' /> 
     </section>
     </div>
     
      <section className={styles.how}>
        <h1>¿Cómo adquirir una vivienda usando Crypto?</h1>
        <Image src='/blockpro.png' width={400} height={400} alt='IMagen' />
      </section>
      <section className={styles.future}>
       <h2>¡Súmate al futuro!</h2>
       <div>
        <h2>Itaaj esta respaldado por inversores de clase mundial como:</h2>
       </div>
      </section>
    </>
  )
}

export default Blockchain