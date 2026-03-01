import React from 'react'
import styles from './Divider.module.css'

interface Props{
  center?: boolean
}
const Divider = ({center = false}: Props) => {
  return (
    <hr style={{
      marginInline: center? 'auto' : ''
    }} className={styles.divider} />
  )
}

export default Divider