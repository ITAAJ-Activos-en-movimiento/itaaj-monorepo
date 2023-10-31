import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { Briefcase, ChevronRight, Home } from 'react-feather'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
             <div className={styles.header_left}>
                <nav className={styles.nav}>
                    <button><ChevronRight /></button>
                    <Link to='/developments'> <Briefcase /> </Link>
                    <Link to='/properties'> <Home /> </Link>
                </nav>
            </div>
    </aside>
  )
}

export default Sidebar