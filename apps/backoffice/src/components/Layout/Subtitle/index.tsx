import styles from './Title.module.css'

interface Props{
    text: string
}

const Subtitle = ({text}: Props) => {
  return (
    <h2 className={styles.title}>{text}</h2>
  )
}

export default Subtitle