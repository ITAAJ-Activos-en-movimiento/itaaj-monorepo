import React from "react"
import styles from './ScreenHeader.module.css'

interface Props{
    children: React.ReactNode
}

const ScreenHeader = ({children}: Props) => {
  return (
    <div className={styles.container}>
        {children}
    </div>
  )
}

export default ScreenHeader