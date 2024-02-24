"use client";
import { useState } from 'react';
import { useSDK } from '@metamask/sdk-react';
import styles from '../KYCModal.module.css';
import Web3 from 'web3';
import { UserProps } from '..';
import axios from 'axios';

interface StepProps { 
  moveStep: (prop: number) => void
  handleChangeUser?: (prop: React.ChangeEvent<HTMLInputElement>) => void 
  setOpenModal?: (prop: boolean) => void
  setUser?: ((prop: UserProps) => void)
  setRole?: ((prop: "INVESTOR" | "BROKER" | null) => void)
  role?: "INVESTOR" | "BROKER" | null
  user?: UserProps
}

export const StepRegisterAccount = ({ moveStep, handleChangeUser, user }: StepProps) => {
  const validateField = () => {
    if (!user?.name) return alert("Nombre esta vacio");
    if (!user?.lastname) return alert("Apellido esta vacio");
    if (!user?.email) return alert("Email esta vacio");
    if (!user?.phone) return alert("Teléfono esta vacio");
    if (!user?.password) return alert("Contraseña esta vacio");
    if (!user?.checkTerms) return alert("No has aceptado los terminos y condiciones");
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
    </div>
  )
}

export const StepConnectToWallet = ({ moveStep }: StepProps) => {
  const { sdk, connected, chainId, account } = useSDK();
  const [isRequestingAccounts, setIsRequestingAccounts] = useState(false);

  const connect = async () => {
    try {
      if (!isRequestingAccounts && sdk) {
        setIsRequestingAccounts(true);
        await sdk.connect();
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
  const validateField = () => {
    if (!user?.residence) return alert("Residencia esta vacio");
    if (!user?.identification) return alert("Identificación esta vacio");
    registerUser();
  }
  
  const messageByRole = {
    INVESTOR: "Eres Inversionista",
    BROKER: "Eres Broker",
  }

  const registerUser = async (): Promise<void> => {
    try {
      const { data } = await axios.post(
        "https://itaajrealty.com/api/api/v1/auth/register",
        user,
        {
          headers: {
            "api-key":
              "a0341d0de71a21b122a134576803f9fea2e9841a307b4e26f9240ac2f7d363ff3018a17f2d7f3ecb5a9fe62327e4eaf306864ec741e6432aa50faaf9d92aa6bd",
          },
        }
      );
      alert("Usuario registrado correctamente");
      setOpenModal && setOpenModal(false);
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify({ token: data }));
      }
    } catch (err) {
      alert("Error registrando el usuario");
      console.log(err);
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