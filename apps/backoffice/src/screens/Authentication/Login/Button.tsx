import React, { useEffect, useState } from "react";
import styles from "./Login.module.css";
import { Mail } from "react-feather";
import { useNavigate } from "react-router-dom";
import { Field, Loader } from "@/components";
import { useLoginEmail } from "@/hooks";

const Button = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { isSending, login } = useLoginEmail();

  const navigate = useNavigate();
  const loginFn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    try {
        await login(email, {
            onSuccess(){
                navigate("/verification");
            }
        })
      // const token = await loginOfficer({ username, password });
      // console.log(token)
    //   if (typeof window !== "undefined") {
    //     // localStorage.setItem("token", token)
    //     localStorage.setItem("token", "torkeonevr ejurbiveb");
    //   }
    } catch (err) {
      if (err) {
        setError("Credenciales incorrectas");
      }
    }
  };

  useEffect(() => {
    // const token = localStorage.getItem("token")
    // if(token){
    //     route.push("/")
    // }
  }, []);
  return (
    <div>
        <Field label="Correo electrónico" tip="Te enviaremos un código a este correo, con el podrás intresar a tu cuenta" >

      <div className={styles.input}>
        <Mail size={20} color="rgba(0,0,0,0.5)" />
        <input
          type="text"
          onChange={({ target }) => setEmail(target.value)}
          placeholder="Ingresa tu correo electrónico"
        />
      </div>
      </Field>

      <button className={styles.btn} onClick={loginFn}> {isSending ? <Loader /> : "Continuar"}</button>
      {error && (
        <p
          style={{
            color: "red",
            fontSize: "1.4rem",
            marginTop: "1rem",
          }}
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Button;
