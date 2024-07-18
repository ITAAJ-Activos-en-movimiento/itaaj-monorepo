"use client";
import React from "react";
import styles from "./Login.module.css";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import LoginButton from "./LoginButton";

const Login = () => {

  return (
    <GoogleOAuthProvider
      clientId={"10748540302-3radc5uefaie52b9sfif74l8d5j1s3e9.apps.googleusercontent.com"}
    >
      <div className={styles.container}>
        <div className={styles.form}>
          <form action="">
            <h3>Entra o regístrate en Itaaj Realty</h3>
            <LoginButton />
            {/* <GoogleLogin
              locale="es_ES"
              text="continue_with"
              width={320}
              onSuccess={function (
                credentialResponse: CredentialResponse
              ): void {
                throw new Error("Function not implemented.");
              }}
            /> */}
            <p className={styles.divider}> O </p>

            <label htmlFor="">
              Introduce tu email para iniciar sesión o crear una cuenta
            </label>
            <input type="text" placeholder="Correo" />
            <button>Continuar</button>
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
