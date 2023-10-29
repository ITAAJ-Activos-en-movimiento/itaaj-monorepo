import { MoreVertical } from 'react-feather'
import styles from './Header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
        <h3>Itaaj Realty</h3>
             <div className={styles.header_left}>
                {/* <div className={styles.logo}>
                    <img src="/isotype.png" />
                </div> */}
                {/* <nav className={styles.nav}>
                    <Link className={styles.main} to='/'>Dashboard</Link>
                    {headerOptions
                    .map((option) => (
                        <DropdownMenu 
                            key={option.title}
                            title={option.title}
                            items={option.items}
                        />
                    ))}
                    
                </nav> */}
                <MoreVertical />
            </div>
    </div>
  )
}

export default Header