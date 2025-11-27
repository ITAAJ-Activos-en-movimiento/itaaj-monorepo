"use client";
import React, { useState } from "react";
import styles from "./Login.module.css";
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import LoginButton from "./LoginButton";
import { useClientSession } from "@/modules/publish/hooks/useClientSession";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const { session, loading } = useClientSession();
  const router = useRouter();

  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!session);

  const handleGoogleSuccess = async (
    credentialsResponse: CredentialResponse
  ) => {
    if (!credentialsResponse.credential) return;

    setIsAuthLoading(true);
    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ credential: credentialsResponse.credential }),
      });

      if (!res.ok) {
        console.error(await res.text());
        alert("No se pudo iniciar sesión con Google.");
        return;
      }

      const data = await res.json();

      setIsAuthenticated(true);
      router.push(`/user/mis-anuncios`);
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión con Google.");
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleGoogleError = () => {
    console.error("Error en Google Login");
    alert("No se pudo completar el inicio de sesión con Google.");
  };

  return (
    <GoogleOAuthProvider clientId="203221248558-a6j3egm9pakf8d8c3m2be7vm18k802db.apps.googleusercontent.com">
      <main className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Entra o regístrate en Itaaj Realty</h1>
          <GoogleLogin
            useOneTap
            onError={handleGoogleError}
            onSuccess={handleGoogleSuccess}
          />
        </div>
        <div className={styles.footer}>
          <Image
            src="/images/login/user_generic_footer.svg"
            width={175}
            height={200}
            alt=""
          />
        </div>
      </main>
    </GoogleOAuthProvider>
  );
};

export default Login;
