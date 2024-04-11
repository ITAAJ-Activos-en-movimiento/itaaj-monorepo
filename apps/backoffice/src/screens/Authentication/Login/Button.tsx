import React, { useEffect, useState } from 'react'
import styles from "./Login.module.css"
import { Lock, User } from 'react-feather'
import { useNavigate } from 'react-router-dom';

const Button = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const login = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        try{
            // const token = await loginOfficer({ username, password });
            // console.log(token)
            if (typeof window !== 'undefined') {
                // localStorage.setItem("token", token)
                localStorage.setItem("token", "torkeonevr ejurbiveb")

            }
            navigate("/")
        }catch(err){
            if(err){
                setError("Credenciales incorrectas")
            }
        }
    }

    useEffect(() => {
        // const token = localStorage.getItem("token")
        // if(token){
        //     route.push("/")
        // }
    }, [])
  return (
    <div>

<div className={styles.input} >
            <User size={20} color='rgba(0,0,0,0.5)' />
            <input type="text" onChange={({ target }) => setUsername(target.value)} placeholder='Ingresa tu numbre de usuario' />
          </div>

          <div className={styles.input} >
            <Lock size={20} color='rgba(0,0,0,0.5)' />
            <input type="password" onChange={({ target }) => setPassword(target.value)} placeholder='Ingresa tu contraseña' />
          </div>
        <button onClick={login} >Entrar</button>
        {error && (
            <p style={
                {
                    color: "red",
                    fontSize: "1.4rem",
                    marginTop: "1rem"
                }
            } >{error}</p>
        )}
    </div>
  )
}

export default Button
 