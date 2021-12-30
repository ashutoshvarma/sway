import React, { ReactElement } from 'react'
import { Dropdown } from 'react-dropdown-now'
import styles from './SelectInput.module.css'
import { useField, FieldHookConfig } from 'formik'
import 'react-dropdown-now/style.css'

interface Props {
  options: string[]
}

const SelectInput = ({
  options,
  ...props
}: FieldHookConfig<string> & Props): ReactElement => {
  const [field, _meta, helpers] = useField(props)
  const { value } = field

  const changeHandler = (
    option: any,
    _e: React.SyntheticEvent<Element, Event>,
  ) => {
    helpers.setValue(option.value)
    helpers.setTouched(true)
  }

  const onClose = () => {
    helpers.setTouched(true, true)
  }

  return (
    <div>
      <Dropdown
        className={`rdn ${styles['SelectInput']}`}
        options={options}
        onChange={changeHandler}
        onClose={onClose}
        value={value}
        placeholder={props.placeholder}
      />
    </div>
  )
}

export default SelectInput
