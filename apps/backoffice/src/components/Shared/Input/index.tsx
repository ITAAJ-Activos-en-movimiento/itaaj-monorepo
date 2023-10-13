import React, { ReactNode, useState } from 'react'
import styles from './Input.module.css'
import { Eye, EyeOff } from 'react-feather'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  icon?: ReactNode
  className?: string
  checkBox?: boolean
}

const Input = ({icon, className, checkBox=false, type, ...rest}: InputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`${styles.input} ${checkBox && styles.check}`}>
      {icon && icon }
      <input type={type === 'password' && showPassword ? 'text' : type}  className={`${styles.input_element} ${className == 'none' && styles.input_none}`}  {...rest}  />
    
      {type === 'password' && (
        <button className={styles.btn} type="button" onClick={() => setShowPassword(!showPassword)} >          
          {showPassword ? <EyeOff size={27} color='rgba(0,0,0,0.6)' /> : <Eye size={27} color='rgba(0,0,0,0.6)' />}
        </button>
      )}
    </div>
  )
}

export default Input