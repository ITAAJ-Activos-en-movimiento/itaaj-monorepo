import { useGoogleLogin } from '@react-oauth/google'
import React from 'react'
import styles from "./Login.module.css"

const LoginButton = () => {
    const login = useGoogleLogin({
        onSuccess: tokenResponse => console.log(tokenResponse)
    })
      
  return (
    <button className={styles.google_btn} onClick={() => login()} >Continuar con Google</button>

  )
}

export default LoginButton