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
      <h3>There are no {title}</h3>
      <p> Click on the button to create a new {title}. Created {title} will appear here.</p>
      <Link to={url}>Add {title}</Link>
    </div>
  )
}

export default EmptyTable
