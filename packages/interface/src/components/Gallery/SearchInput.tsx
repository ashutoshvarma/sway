import React, { ReactElement } from 'react'
import styles from './SearchInput.module.css'

interface Props {
  style?: React.CSSProperties | undefined
  inputHandler: React.ChangeEventHandler<HTMLInputElement> | undefined
}

function SearchInput({ style, inputHandler }: Props): ReactElement {
  return (
    <div className={styles['InputDiv']} style={style}>
      <input placeholder="Search" onChange={inputHandler} />
    </div>
  )
}

export default SearchInput
