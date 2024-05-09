'use client'
import { useState } from 'react';
import { ModalDocuments, ModalVerifyIdentity } from '..';
import styles from './styles.module.css';
import { useSDK } from '@metamask/sdk-react';
import { useSnackbar } from '@/shared/snackbar/Snackbar';
import useAuthContext from '@/shared/hooks/useAuthContext';

const Profile = () => {
  const [modalDoc, setModalDoc] = useState<boolean>(false);
  const [modalVerifId, setModalVerifId] = useState<boolean>(false);
  const { account, connected } = useSDK();
  const { state } = useAuthContext()
  const snackbar = useSnackbar()
  const actionsProfile = (action: number) => {
    switch (action) {
      case 1:
        setModalDoc(true);
        break;
      case 2:
        if (validateWallet()) setModalVerifId(true);
        break;
      case 3:
        if (validateWallet()) {}
        break;
      default:
        break;
    }
  }

  const validateWallet = (): boolean => {
    const userData = state.user as any;
    
    if (!connected) {
      snackbar.warning({ title: "¡Advertencia!", message: "No hemos detectado tu wallet conectada." })
      return false;
    }
    if (account !== userData?.public_key) {
      snackbar.warning({ title: "¡Advertencia!", message: "La wallet conectada no coincide con la wallet registrada." })
      return false;
    }
    
    return true;
  }

  return (
    <>
      <div>
        <span>Cedula del proyecto</span>
      </div>
      <div className={styles.profileActions}>
        <div className={styles.profileAction}>
          <span>Documentos</span>
          <button 
            onClick={() => actionsProfile(1)}
          >PDF CONVENIO</button>
        </div>
        <div className={styles.profileAction}>
          <span>KYC - Verifica tu Identidad</span>
          <button 
            onClick={() => actionsProfile(2)}
          >VERIFICAR</button>
        </div>
        <div className={styles.profileAction}>
          <span>Firma digital de documentos</span>
          <button 
            onClick={() => actionsProfile(3)}
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