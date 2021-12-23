import React, { ReactElement } from 'react'
import 'react-dropdown/style.css'
import styles from './Gallery.module.css'
import Card from './Card'
import SearchInput from './SearchInput'
import Dropdown from 'react-dropdown'

const options = ['High to Low', 'Low to High']
const defaultOption = options[0]

interface Props {}

function Gallery({}: Props): ReactElement {
  return (
    <section className={styles.Gallery}>
      <div className="wrapper narrow">
        <div className={styles.Header}>
          <div className={styles.DropdownContainer}>
            <Dropdown
              options={options}
              // onChange={this._onSelect}
              className={styles.DropdownRoot}
              controlClassName={styles.Dropdown}
              placeholderClassName={styles.DropdownPlaceholder}
              menuClassName={styles.DropdownMenu}
              value={defaultOption}
              placeholder="Select an option"
            />
          </div>
          <h2>
            <span className="primary-color underline">Sway</span> Gallery
          </h2>
          <div className={styles.SearchInputContainer}>
            <SearchInput />
          </div>
        </div>
        <div className={styles.GalleryGrid}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
        <div className={styles.LoadMoreContainer}>
          <button>Load More</button>
        </div>
      </div>
    </section>
  )
}

export default Gallery
