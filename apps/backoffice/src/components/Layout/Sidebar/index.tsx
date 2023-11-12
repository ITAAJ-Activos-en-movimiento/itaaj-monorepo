import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { Briefcase, Cast, ChevronRight, Crosshair, Home } from 'react-feather'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
             <div className={styles.header_left}>
                <nav className={styles.nav}>
                    <button><ChevronRight /></button>
                    <Link to='/developments' title='Developments' > <Briefcase /> </Link>
                    <Link to='/properties' title='Properties' > <Home /> </Link>
                    <Link to='/proposals' title='Proposals' > <Crosshair /> </Link>

                </nav>
            </div>
    </aside>
  )
}

export default Sidebar