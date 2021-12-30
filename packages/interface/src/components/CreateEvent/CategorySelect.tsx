import { ReactElement } from 'react'
import styles from './CategorySelect.module.css'
import { Field } from 'formik'

interface Props1 {
  name: string
  options: CategoryOptions1[]
}

interface Props2 {
  name: string
  options: CategoryOptions2[]
}

export interface CategoryOptions1 {
  value: string
  label: string
  imageUrl: string
}

export interface CategoryOptions2 {
  value: string
  label: string
}

export function CategorySelect1({ name, options }: Props1): ReactElement {
  return (
    <div className={styles['Container']}>
      {options.map((op, i) => (
        <label key={i} className={styles['Label']}>
          <Field type="radio" name={name} value={op.value} hidden />
          <div className={styles['ImageContainer']}>
            <img src={op.imageUrl} alt="nft icon" />
          </div>
          <span>{op.label}</span>
        </label>
      ))}
    </div>
  )
}

export function CategorySelect2({ name, options }: Props2): ReactElement {
  return (
    <div className={styles['Container2']}>
      {options.map((op, i) => (
        <label key={i} className={styles['Label2']}>
          <Field type="radio" name={name} value={op.value} hidden />
          <span>{op.label}</span>
        </label>
      ))}
    </div>
  )
}
