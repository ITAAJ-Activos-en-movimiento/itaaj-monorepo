'use client'
import { useState } from 'react';
import { ModalDocuments, ModalVerifyIdentity } from '..';
import styles from './styles.module.css';

const Profile = () => {
  const [modalDoc, setModalDoc] = useState<boolean>(false);
  const [modalVerifId, setModalVerifId] = useState<boolean>(false);

  return (
    <>
      <div>
        <span>Cedula del proyecto</span>
      </div>
      <div className={styles.profileActions}>
        <div className={styles.profileAction}>
          <span>Documentos</span>
          <button 
            onClick={() => setModalDoc(true)}
          >PDF CONVENIO</button>
        </div>
        <div className={styles.profileAction}>
          <span>KYC - Verifica tu Identidad</span>
          <button 
            onClick={() => setModalVerifId(true)}
          >VERIFICAR</button>
        </div>
        <div className={styles.profileAction}>
          <span>Firma digital de documentos</span>
          <button 
          >CARGAR FIRMA</button>
        </div>
      </div>
      <div>
        <span>Contratos tokenizados y llave del Escrow</span>
      </div>

      <ModalDocuments 
        openModal={modalDoc} 
        setOpenModal={setModalDoc}
      />
      <ModalVerifyIdentity 
        openModal={modalVerifId} 
        setOpenModal={setModalVerifId}
      />
    </>
  )
}

export default Profile;