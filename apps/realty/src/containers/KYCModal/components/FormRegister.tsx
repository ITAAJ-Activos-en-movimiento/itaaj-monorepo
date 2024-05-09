"use client";
import { useState } from 'react';
import { useSDK } from '@metamask/sdk-react';
import { UserProps } from './auth/Register';
import { useSnackbar } from '@/shared/snackbar/Snackbar';
import styles from '../KYCModal.module.css';
import useAuthContext from '@/shared/hooks/useAuthContext';

interface StepProps { 
  moveStep: (prop: number) => void
  handleChangeUser?: (prop: React.ChangeEvent<HTMLInputElement>) => void 
  setStateFormAuth?: (prop: string) => void
  setOpenModal?: (prop: boolean) => void
  setUser?: ((prop: UserProps) => void)
  setRole?: ((prop: "INVESTOR" | "BROKER" | null) => void)
  role?: "INVESTOR" | "BROKER" | null
  user?: UserProps
}

export const StepRegisterAccount = ({ moveStep, handleChangeUser, user, setStateFormAuth }: StepProps) => {
  const snackbar = useSnackbar()
  
  const validateField = () => {
    if (!user?.name) return snackbar.warning({ message: "Nombre esta vacio" });
    if (!user?.lastname) return snackbar.warning({ message: "Apellido esta vacio" });
    if (!user?.email) return snackbar.warning({ message: "Email esta vacio" });
    if (!user?.phone) return snackbar.warning({ message: "Teléfono esta vacio" });
    if (!user?.password) return snackbar.warning({ message: "Contraseña esta vacio" });
    if (!user?.checkTerms) return snackbar.warning({ message: "No has aceptado los terminos y condiciones" });
    moveStep(1);
  }
  
  return (
    <div className={styles.account}>
      <h3>Crea tu cuenta</h3>
      <div className={styles.field}>
        <input
          type="text"
          name="name"
          onChange={handleChangeUser}
          placeholder="Nombre"
        />
      </div>
      <div className={styles.field}>
        <input
          type="text"
          name="lastname"
          onChange={handleChangeUser}
          placeholder="Apellido"
        />
      </div>
      <div className={styles.field}>
        <input
          type="text"
          name="email"
          onChange={handleChangeUser}
          placeholder="Correo electronico"
        />
      </div>
      <div className={styles.field}>
        <input
          type="text"
          name="phone"
          onChange={handleChangeUser}
          placeholder="Teléfono"
        />
      </div>
      <div className={styles.field}>
        <input
          type="password"
          name="password"
          onChange={handleChangeUser}
          placeholder="Contraseña"
        />
      </div>
      <label className={styles.terms}>
        <input type="checkbox" name='checkTerms' onChange={handleChangeUser} required />{" "}
        <p>
          {" "}
          Acepto las condiciones de uso y la informacion basica de
          Proteccionde Datos *
        </p>
      </label>
      <button
        type="button"
        className={styles.buton}
        onClick={validateField}
      >
        Crear mi cuenta
      </button>
      <span
        onClick={() => setStateFormAuth && setStateFormAuth("LOGIN")}
        className={styles.textRegister}
      >
        Ya tengo cuenta en Itaaj Realty
      </span>
    </div>
  )
}

export const StepConnectToWallet = ({ moveStep, user, setUser }: StepProps) => {
  const { sdk, connected, chainId, account } = useSDK();
  const [isRequestingAccounts, setIsRequestingAccounts] = useState(false);

  const connect = async () => {
    try {
      if (!isRequestingAccounts && sdk && setUser) {
        setIsRequestingAccounts(true);
        const wallet: any = await sdk.connect();
        setUser({ ...user, public_key: wallet[0] })
        moveStep(1);
      }
    } catch (err) {
      console.warn(`No accounts found`, err);
    } finally {
      setIsRequestingAccounts(false);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <div className={styles.connectWallet}>
      <h3>Conecta tu Wallet</h3>
      <button
        type="button"
        className={styles.buton}
        onClick={connect}
      >
        Conectar Wallet
      </button>
      {/* {connected && (
        <div>
          <>
            {(chainId != null) && `Connected chain: ${chainId}`}
            <p></p>
            {(account != null) && `Connected account: ${account}`}
            <br />
          </>
        </div>
      )} */}
    </div>
  )
}

export const StepSelectRole = ({ moveStep, setUser, user, setRole }: StepProps) => {
  const handleClickProfile = (roleId: number | null, role: "INVESTOR" | "BROKER") => {
    const dataUser = user;
    setUser && setUser({ ...dataUser, roleId });
    setRole && setRole(role);
    moveStep(1);
  }
  return (
    <div className={styles.selectRole}>
      <button onClick={() => handleClickProfile(1, "INVESTOR")}>Eres inversionista</button>
      <button onClick={() => handleClickProfile(2, "BROKER")}>Soy broker</button>
    </div>
  )
}

export const StepAdditionalData = ({ handleChangeUser, user, role, setOpenModal }: StepProps) => {
  const { action } = useAuthContext();
  const snackbar = useSnackbar();

  const validateField = () => {
    if (!user?.residence) return snackbar.warning({ message: "Residencia esta vacio" });
    if (!user?.identification) return snackbar.warning({ message: "Identificación esta vacio" });
    registerUser();
  }
  
  const messageByRole = {
    INVESTOR: "Eres Inversionista",
    BROKER: "Eres Broker",
  }

  const registerUser = async (): Promise<void> => {
    try {
      await action.register(user);
      setOpenModal && setOpenModal(false);
    } catch (error) {
      console.error(error)
    }
  }

  const formByRole = {
    INVESTOR: <>
      <div className={styles.field}>
        <input
          type="text"
          name="residence"
          onChange={handleChangeUser}
          placeholder="Domicilio"
        />
      </div>
      <div className={styles.field}>
        <input
          type="text"
          name="identification"
          onChange={handleChangeUser}
          placeholder="Identificación oficial / Pasaporte"
        />
      </div>
    </>,
    BROKER: <>
      <div className={styles.field}>
        <input
          type="text"
          name="residence"
          onChange={handleChangeUser}
          placeholder="Domicilio"
        />
      </div>
      <div className={styles.field}>
        <input
          type="text"
          name="identification"
          onChange={handleChangeUser}
          placeholder="Identificación oficial / Pasaporte"
        />
      </div>
    </>,
    "": null,
  }
  
  return (
    <div className={styles.additionalData}>
      <h3>{ role && messageByRole[role] }</h3>
      <div className={styles.account}>{ formByRole[role ?? ""]}</div>
      <button onClick={validateField}>Register</button>
    </div>
  )
}