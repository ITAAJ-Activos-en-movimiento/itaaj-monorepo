"use client";

import { PublishFormData } from "@/app/(publish)/publish/page";
import styles from "./StepContact.module.css";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useEffect, useState } from "react";
import { useClientSession } from "@/modules/publish/hooks/useClientSession";

type SessionUser = {
  id: string;
  email: string;
  name?: string;
  picture?: string;
};

interface StepContactProps {
  value: PublishFormData;
  onChange: (partial: Partial<PublishFormData>) => void;
  onBack: () => void;
  onSubmit: () => Promise<void> | void;
  isSubmitting: boolean;
}

export const StepContact: React.FC<StepContactProps> = ({
  value,
  onChange,
  onBack,
  onSubmit,
  isSubmitting,
}) => {
  const { session, loading } = useClientSession();

  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!session);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 👉 Si ya viene logeado desde el server, rellenamos datos de contacto
  useEffect(() => {
    if (!loading && session?.user) {
      const user = session.user;
      onChange({
        contactEmail: value.contactEmail || user.email,
        owner: user.id,
      });
      setIsAuthenticated(true);
    }
    // value lo usas solo para leer contactEmail en esta rama,
    // no pasa nada si no lo pones en deps, pero si quieres ser estricto:
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, session, onChange]);

  const handleSubmit = async () => {
    await onSubmit();
  };

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

      if (data?.email && !value.contactEmail) {
        onChange({ contactEmail: data.email });
      }
      await onChange({ owner: data.id });
      setIsAuthenticated(true);
      await handleSubmit();
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
    <div className={styles.container}>
      <h2 className={styles.heading}>Datos de contacto</h2>

      <p className={styles.helper}>
        {isAuthenticated
          ? "Usaremos tus datos de cuenta para este anuncio. Puedes modificar tu email de contacto si lo necesitas."
          : "Entra o regístrate para publicar tu anuncio en Itaaj."}
      </p>

      {!isAuthenticated && isMounted && (
        <>
          <div className={styles.socialButtons}>
            <GoogleLogin
              useOneTap
              onError={handleGoogleError}
              onSuccess={handleGoogleSuccess}
            />
          </div>

          <div className={styles.divider}>
            <span className={styles.dividerLine} />
            <span className={styles.dividerText}>o</span>
            <span className={styles.dividerLine} />
          </div>
        </>
      )}

      <div className={styles.fieldGroup}>
        <label className={styles.label}>
          Introduce tu email para crear una cuenta o iniciar sesión
        </label>
        <input
          type="email"
          className={styles.input}
          placeholder="tu-email@ejemplo.com"
          value={value.contactEmail ?? ""}
          onChange={(e) => onChange({ contactEmail: e.target.value })}
        />
      </div>

      <div className={styles.fieldGroup}>
        <label className={styles.label}>Teléfono</label>
        <input
          type="tel"
          className={styles.input}
          placeholder="Ej. +34 600 123 456"
          value={value.contactPhone ?? ""}
          onChange={(e) => onChange({ contactPhone: e.target.value })}
        />
      </div>

      <div className={styles.footer}>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onBack}
          disabled={isSubmitting || isAuthLoading}
        >
          Atrás
        </button>
        <button
          type="button"
          className={styles.primaryButton}
          onClick={handleSubmit}
          disabled={isSubmitting || isAuthLoading || !value.contactEmail}
        >
          {isSubmitting ? "Publicando…" : "Publicar anuncio"}
        </button>
      </div>
    </div>
  );
};
