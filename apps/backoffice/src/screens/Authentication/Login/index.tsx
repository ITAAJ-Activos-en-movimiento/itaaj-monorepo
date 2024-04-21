import styles from "./Login.module.css"
import Button from './Button';
import { useGratting } from "@/hooks";

const Login = () => {
  const { gratting } = useGratting();

  return (
    <div className={styles.container}>
        <form className={styles.form} >
          <img src="/isotipo.png" width={30} height={60} alt="Logo Itaaj" />
          <h4>{gratting}</h4>
          <h3 className={styles.welcome} >Inicia sesión con tu correo</h3>
          <Button />
        </form>
    </div>
  )
}

export default Login