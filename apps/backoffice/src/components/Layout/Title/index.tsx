import styles from './Title.module.css'

interface Props{
    text: string
}

const Title = ({text}: Props) => {
  return (
    <h2 className={styles.title}>{text}</h2>
  )
}

export default Title