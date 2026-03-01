import { ReactNode } from 'react';
import styles from './Header.module.css';

const Header = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.header} > 
        <h3 className={styles.title} >Nuevo Análisis de Mercado</h3>
        <div className={styles.options} >
            {children}
        </div>
    </div>
  )
}

export default Header