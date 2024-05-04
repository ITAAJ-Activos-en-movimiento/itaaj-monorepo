import { FormEvent, MutableRefObject, useRef, useState } from "react";
import { useSnackbar } from "@/shared/snackbar/Snackbar";
import styles from "../../KYCModal.module.css";
import useAuthContext from "@/shared/hooks/useAuthContext";
import emailjs from '@emailjs/browser';
import axios from "axios";
import { RecoverAccount } from "@/services";

export const Recover = ({ setOpenModal, setStateFormAuth }: { 
  setOpenModal: (key: boolean) => void,
  setStateFormAuth: (key: string) => void,
}) => {
  const { action } = useAuthContext()
  const snackbar = useSnackbar()
  const form = useRef(null);

  const [user, setUser] = useState({
    email: "",
  });

  const handleChangeUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setUser((user) => ({ ...user, [name]: value || checked }));
  };

  const validFields = () => {
    if (!user.email) {
      snackbar.warning({ message: "El campo Email está vacio." });
      return false;
    }

    return true;
  }
  
  const sendEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (!validFields()) return;
    if (form.current == null) return;
    

    const response = await RecoverAccount();
  };

  return (
    <form ref={form} onSubmit={sendEmail} className={styles.account}>
      <h3>Recuperar cuenta</h3>
      <div className={styles.field}>
        <input
          type="email"
          name="email"
          onChange={handleChangeUser}
          placeholder="Ingrese su Correo electrónico"
          />
      </div>
      <div className={styles.terms}>
        <p>
          {" "}
          * Ingrese su correo electrónico que está asociada a la cuenta de <b>Itaaj realty</b>
        </p>
      </div>
      <button
        type="submit"
        className={styles.buton}
      >
        Enviar Email
      </button>
      <span
        onClick={() => setStateFormAuth("LOGIN")}
        className={styles.textRegister}
      >
        Volver
      </span>
    </form>
  )
}