import React, { ReactElement } from 'react'
import styles from './SearchInput.module.css'

interface Props {
  style?: React.CSSProperties | undefined
}

function SearchInput({ style }: Props): ReactElement {
  return (
    <div className={styles['InputDiv']} style={style}>
      <input placeholder="Search" />
    </div>
  )
}

export default SearchInput
