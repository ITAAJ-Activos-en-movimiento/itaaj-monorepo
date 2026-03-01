import { Button, Input } from '@/components';
import styles from './Login.module.css';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
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

                    <form action="" className={styles.form} >
                        <Input icon={<Mail strokeWidth='1px' size={20} />} placeholder='josealvarez@email.com' />
                        <Button className={styles.btn} >Continuar</Button>
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
        </>
    )
}

export default Login