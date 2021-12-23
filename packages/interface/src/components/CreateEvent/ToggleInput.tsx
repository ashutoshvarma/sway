import React, { ReactElement } from 'react'
import styles from './ToggleInput.module.css'
import { useField, FieldHookConfig } from 'formik'

interface Props {
  label?: string
  choices: [string, string]
}

const ToggleInput = ({
  label,
  choices,
  ...props
}: FieldHookConfig<string> & Props): ReactElement => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label>
        {label}
        <input className={styles.Input} {...field} type="checkbox" />
        <div className={styles.ToggleContainer}>
          <div className={styles.Toggle}>
            <span>{choices[0]}</span>
            <span>{choices[1]}</span>
          </div>
        </div>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}

export default ToggleInput
