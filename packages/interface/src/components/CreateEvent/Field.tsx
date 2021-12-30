import { ReactElement } from 'react'
import { FieldAttributes, Field as FormikField, ErrorMessage } from 'formik'
import styles from './Field.module.css'

interface Props {
  label?: string
  input?: ReactElement<FieldAttributes<any>>
}

function Field({
  label,
  className,
  input,
  ...props
}: Props & FieldAttributes<any>): ReactElement {
  if (props.id === undefined) props.id = props.name
  let FieldComponent = input || FormikField
  return (
    <label className={[styles['FieldLabel'], className].join(' ')}>
      <span>{label}</span>
      <ErrorMessage name={props.name} />
      <FieldComponent className={styles['Input']} {...props} />
    </label>
  )
}

export default Field
