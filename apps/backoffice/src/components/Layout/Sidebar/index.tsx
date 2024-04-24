import { Link } from 'react-router-dom'
import styles from './Sidebar.module.css'
import { Briefcase, ChevronRight, Crosshair, Home, BookOpen } from 'react-feather'

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
             <div className={styles.header_left}>
                <nav className={styles.nav}>
                    <button><ChevronRight /></button>
                    <Link to='/developments' title='Developments' > <Briefcase /> <p>Desarrollos</p> </Link>
                    <Link to='/properties' title='Properties' > <Home /> <p>Propiedades</p> </Link>
                    <Link to='/proposals' title='Proposals' > <Crosshair /> <p>Propuestas</p> </Link>
                    <Link to='/blogs' title='Proposals' > <BookOpen /> <p>Blog</p> </Link>
                </nav>
            </div>
    </aside>
  )
}

export default Sidebar