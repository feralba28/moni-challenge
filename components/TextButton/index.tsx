import styles from './styles.module.css'

interface Props {
  text: string
  variant: 'accent' | 'warning'
  onClick: Function
}

function TextButton(props: Props): JSX.Element {
  const { text, variant, onClick } = props

  const handleOnClick = () => {
    onClick()
  }

  return (
    <button
      className={`${styles.btn} ${styles[variant]}`}
      onClick={handleOnClick}
    >
      {text}
    </button>
  )
}

export default TextButton
