import { useField } from 'formik'

import styles from './styles.module.css'

function SelectField({ label, ...props }) {
  const [field, meta] = useField(props)

  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.id || props.name}>
        {label}
      </label>
      <select className={styles.field} {...field} {...props} />
      {meta.touched && meta.error && (
        <div className={styles.error}>
          <p className={styles.errortext}>{meta.error}</p>
        </div>
      )}
    </div>
  )
}

export default SelectField
