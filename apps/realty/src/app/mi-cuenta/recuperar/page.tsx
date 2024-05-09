"use client"
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { NextPage } from "next";
import { useRouter, useSearchParams } from 'next/navigation';
import { RecoverAccountChangePassword, RecoverAccountValidateToken } from '@/services';
import { useSnackbar } from '@/shared/snackbar/Snackbar';
import styles from "./Recuperar.module.css";

const Recuperar: NextPage = () => {
  const path = useSearchParams();
  const snackbar = useSnackbar();
  const { push } = useRouter()
  const [password, setPassword] = useState({
    passwordNew: '',
    passwordRepeat: ''
  })
  const [isSuccess, setIsSuccess] = useState(false);
  const [idUser, setIdUser] =  useState();

  const validateAccount = async () => {
    const token = path.get("token");
    if (token == null) return snackbar.warning({ title: "¡Advertencia!", message: "Token no fue encontrado" });
    try {
      const { user } = await RecoverAccountValidateToken(token);
      setIdUser(user.id);
      setIsSuccess(true);
    } catch (error: any) {
      const { message } = error;
      console.error(message)
    }
  }

  const handleSubmitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { passwordNew, passwordRepeat } = password;
    if (passwordNew !== passwordRepeat) return snackbar.warning({ title: "¡Advertencia!", message: "Las contraseñas no coinciden." })
    
    try {
      const { passwordRepeat } = password
      const { message } = await RecoverAccountChangePassword({ password: passwordRepeat, id: idUser });
      snackbar.success({ title: "¡En hora buena!", message })
      push("/")
    } catch (error: any) {
      const { message } = error;
      console.error(message)
    }
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPassword((val) => ({ ...val, [name]: value }))
  }
  
  useEffect(() => {
    validateAccount();
    return () => {};
  }, [])

  return (
    <div className={styles.boxAccount}>
      {
        isSuccess === true &&
        <>
          <h3>Cambiar contraseña</h3>
          <form onSubmit={handleSubmitForm} className={styles.account}>
            <div className={styles.field}>
              <input
                type="text"
                name="passwordNew"
                placeholder="Ingrese su nueva contraseña"
                onChange={handleChangeInput}
                value={password.passwordNew}
              />
            </div>
            <div className={styles.field}>
              <input
                type="password"
                name="passwordRepeat"
                placeholder="Repita la contraseña"
                onChange={handleChangeInput}
                value={password.passwordRepeat}
              />
            </div>
            <button
              type="submit"
              className={styles.buton}
            >
              Cambiar contraseña
            </button>
          </form>
        </>
      }

      {
        isSuccess === false &&
        <div>Token proveido no es válido</div>
      }
    </div>
  )
}

export default Recuperar;