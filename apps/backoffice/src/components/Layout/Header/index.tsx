import { Link } from 'react-router-dom'
import styles from './Header.module.css'
import { headerOptions } from './header-options'
import { DropdownMenu } from '@/components'

const Header = () => {
  return (
    <div className={styles.header}>
             <div className={styles.header_left}>
                <div className={styles.logo}>
                    <img src="/isotype.png" />
                </div>
                <nav className={styles.nav}>
                    <Link className={styles.main} to='/'>Dashboard</Link>
                    {headerOptions
                    .map((option) => (
                        <DropdownMenu 
                            key={option.title}
                            title={option.title}
                            items={option.items}
                        />
                    ))}
                    
                </nav>
            </div>
    </div>
  )
}

export default Header