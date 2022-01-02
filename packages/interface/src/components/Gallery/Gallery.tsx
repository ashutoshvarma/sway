import { ReactElement, useEffect, useState } from 'react'
import 'react-dropdown/style.css'
import styles from './Gallery.module.css'
import Card from './Card'
import SearchInput from './SearchInput'
import Dropdown from 'react-dropdown'
import api, { EventInterface } from '../../utils/api'

const options = ['High to Low', 'Low to High']
const defaultOption = options[0]

const PAGE_LIMIT = 2

function Gallery(): ReactElement {
  const [events, setEvents] = useState<EventInterface[]>([])
  const [loading, setLoading] = useState<Boolean>(true)
  const [moreAvailable, setMoreAvailable] = useState<Boolean>(true)

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      let eventsData = await api.getEvents(PAGE_LIMIT)
      if (eventsData.length < PAGE_LIMIT) setMoreAvailable(false)
      setEvents(eventsData)
      setLoading(false)
    })()
  }, [])

  async function loadMoreHandler(): Promise<void> {
    console.log('loading more')
    setLoading(true)
    let eventsData = await api.getEvents(PAGE_LIMIT, events[events.length - 1])
    if (eventsData.length < PAGE_LIMIT) setMoreAvailable(false)
    setLoading(false)
    setEvents([...events, ...eventsData])
  }

  return (
    <section className={styles['Gallery']}>
      <div className="wrapper narrow">
        <div className={styles['Header']}>
          <div className={styles['DropdownContainer']}>
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
          <h2>
            <span className="primary-color underline">Sway</span> Gallery
          </h2>
          <div className={styles['SearchInputContainer']}>
            <SearchInput />
          </div>
        </div>
        <div className={styles['GalleryGrid']}>
          {events.map((event) => (
            <Card event={event} key={event.id} />
          ))}
          {/* <SkeletonCard /> */}
        </div>

        {loading || moreAvailable === false ? null : (
          <div className={styles['LoadMoreContainer']}>
            <button onClick={loadMoreHandler}>Load More</button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
