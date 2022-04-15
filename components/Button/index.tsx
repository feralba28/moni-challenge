import { ReactNode } from 'react'

import styles from './styles.module.css'

interface Props {
  variant: 'primary' | 'secondary' | 'accent'
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

function Button(props: Props): JSX.Element {
  const { variant, children, type, disabled } = props

  return (
    <button
      className={`${styles.btn} ${styles[variant]} ${
        disabled ? styles.disabled : ''
      }`}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
