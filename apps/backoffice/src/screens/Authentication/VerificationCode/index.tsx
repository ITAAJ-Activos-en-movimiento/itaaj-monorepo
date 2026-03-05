import { Field } from "@/components";
import styles from "../Login/Login.module.css"
import { useGratting } from "@/hooks";
import { Code } from "react-feather";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const VerificationCode = () => {
    const [, setCode] = useState("");
  const { gratting } = useGratting();

  const navigate = useNavigate();

  const login = () => {
    localStorage.setItem("token", "oktoeniewrngejrg er")
    navigate("/")
  }
  return (
    <div className={styles.container}>
    <form className={styles.form} >
      <img src="/isotipo.png" width={30} height={60} alt="Logo Itaaj" />
      <h4>{gratting}</h4>
      <h3 className={styles.welcome} >Te hemos enviado un correo electrónico</h3>
      <div>
        <Field label="Código" tip="Te enviaremos un código a este correo, con el podrás intresar a tu cuenta" >

      <div className={styles.input}>
        <Code size={20} color="rgba(0,0,0,0.5)" />
        <input
          type="text"
          onChange={({ target }) => setCode(target.value)}
          placeholder="Ingresa tu correo electrónico"
        />
      </div>
      </Field>

      <button className={styles.btn} onClick={login}>Continuar</button>
      {/* {error && (
        <p
          style={{
            color: "red",
            fontSize: "1.4rem",
            marginTop: "1rem",
          }}
        >
          {error}
        </p>
      )} */}
    </div>
    </form>
</div>
  )
}

export default VerificationCode