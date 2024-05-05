import styles from './EmptyTable.module.css'
import { Link } from 'react-router-dom';

interface Props {
 title: string;
 url: string;
}

const EmptyTable = ({title, url}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.circle}>
       <i className='bx bx-check'></i>
      </div>
      <h3>No hay {title}</h3>
      <p> Click en el botón de abajo para crear un nuevo {title}.</p>
      <Link to={url}>Agregar {title}</Link>
    </div>
  )
}

export default EmptyTable
