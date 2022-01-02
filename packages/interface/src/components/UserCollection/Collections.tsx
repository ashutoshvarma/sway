import { ReactElement } from 'react'
import 'react-dropdown/style.css'
import styles from './Collections.module.css'
import Card from './Card'

import Dropdown from 'react-dropdown'

const options = ['Event', 'Something else']
const defaultOption = options[0]

function Collections(): ReactElement {
  return (
    <section className={styles['Collection']}>
      <div className="wrapper narrow">
        <div className={styles['Header']}>
          <h3>Collection</h3>
          <div style={{ display: 'flex' }}>
            <Dropdown
              options={options}
              // onChange={this._onSelect}
              className={styles['DropdownRoot']}
              controlClassName={styles['Dropdown']}
              placeholderClassName={styles['DropdownPlaceholder']}
              menuClassName={styles['DropdownMenu']}
              value={defaultOption}
              placeholder="Select an option"
            />
          </div>
        </div>
        <div className={styles['CollectionGrid']}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className={styles['CreateContainer']}>
          <button>Create Event</button>
        </div>
      </div>
    </section>
  )
}

export default Collections
