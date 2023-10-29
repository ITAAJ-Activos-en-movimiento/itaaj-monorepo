import { Link, LinkProps } from "react-router-dom"
import styles from './ButtonLink.module.css'
import { Loader } from "..";

interface ButtonProps extends LinkProps {
    variant?: 'primary' | 'secondary' | 'cancel' | 'third' | 'danger';
    className?: string;
    children?: React.ReactNode
    loading?: boolean;
  }

const ButtonLink = ({ children, variant = 'primary', className = '', loading, ...rest }: ButtonProps) => {
  return (
    <Link
    className={`${styles.button} ${styles[variant]} ${className}`}
    {...rest}

>
  {loading ? <Loader small={true} /> :
    <>
      {children}
    </>
  }
  </Link>
  )
}

export default ButtonLink