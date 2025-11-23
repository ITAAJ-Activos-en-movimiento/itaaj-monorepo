"use client";
import React from "react";
import styles from "./Login.module.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginButton from "./LoginButton";

const Login = () => {
  return (
    <GoogleOAuthProvider
      clientId={
        "203221248558-a6j3egm9pakf8d8c3m2be7vm18k802db.apps.googleusercontent.com"
      }
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
          </form>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
