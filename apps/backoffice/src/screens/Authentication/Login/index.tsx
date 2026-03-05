import styles from './Login.module.css';
import { Link, useNavigate } from 'react-router-dom';
import {
  CredentialResponse,
  GoogleLogin,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { itaajApi } from '@/api';

const Login = () => {
  const navigate = useNavigate();

  const handleGoogleSuccess = async (
    credentialsResponse: CredentialResponse
  ) => {
    if (!credentialsResponse.credential) return;
    try {
      console.log(credentialsResponse)
      const {data} = await itaajApi.post("/auth/login-google",
        credentialsResponse.credential,
         { headers: { "Content-Type": "text/plain" } }
      );

      // if (!data) {
      //   console.error(data);
      //   alert("No se pudo iniciar sesión con Google.");
      //   return;
      // }

      // localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));
      navigate(`/developments`);
    } catch (error) {
      console.error(error);
      alert("Error al iniciar sesión con Google.");
    }
  }

    const handleGoogleError = () => {
    console.error("Error en Google Login");
    alert("No se pudo completar el inicio de sesión con Google.");
  };
    return (
            <GoogleOAuthProvider clientId="203221248558-a6j3egm9pakf8d8c3m2be7vm18k802db.apps.googleusercontent.com">

            <title>¡Hola! Bienvenido a Itaaj Realty Pro</title>
            <div className={styles.container} >

                <header className={styles.header} >
                    <h2>Itaaj Realty Pro</h2>
                    <Link to='/'>Ayuda</Link>
                </header>
                <h1 className={styles.mainTitle} >¡Hola! Bienvenido a Itaaj Realty Pro</h1>
                <div className={styles.content} >
                    <h2 className={styles.title}>Inicia sesión en tu cuenta</h2>
                    <p className={styles.desc}>Panel de acceso clientes Itaaj Realty. Si aún no es cliente, contáctenos para solicitar su acceso</p>

                    {/* <form action="" className={styles.form} >
                        <Input icon={<Mail strokeWidth='1px' size={20} />} placeholder='josealvarez@email.com' />
                        <Button className={styles.btn}  >Continuar</Button>
                    </form> */}
                    <form action="" className={styles.form}>
                        <GoogleLogin
            useOneTap
            onError={handleGoogleError}
            onSuccess={handleGoogleSuccess}
          />
                    </form>
                      
                    <p className={styles.information}><strong>¿Aún no eres cliente?</strong> <Link to='/'>Pedir más información</Link> y empieza a disfrutar de una gestión mucho más eficiente.</p>
                </div>
                <div className={styles.doubt} >
                    <picture >
                        <img src="/images/login/service-desk.svg" alt="Tienes dudas?" width={40} />
                    </picture>
                    <div>
                        <h3>¿Tienes dudas?</h3>
                        <p>
                            Envíanos un email o llámanos al +52 1 999 547 1508.</p>
                    </div>
                </div>
            </div>
            </GoogleOAuthProvider>

    )
}

export default Login