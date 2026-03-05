import styles from './Field.module.css'

interface Props {
    label?: string;
    name?: string;
    tip?: string;
    error?: string;
    width?: string;
    children: React.ReactNode
    className?: string;
}

const Field = ({label, width, className, error, tip, children}: Props) => {
  return (
    <div className={`${styles.field} ${className}`} style={{width: width}}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {tip && <div className={styles.tip}>{tip}</div> }
      {error && <div className={styles.error}>{error}</div> }
    </div>
  )
}

export default Field