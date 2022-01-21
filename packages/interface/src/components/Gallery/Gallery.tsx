import { ReactElement, useEffect, useState } from 'react'
import 'react-dropdown/style.css'
import styles from './Gallery.module.css'
import Card from './Card'
import SkeletonCard from './SkeletonCard'

import SearchInput from './SearchInput'
import Dropdown from 'react-dropdown'
import {
  EventSearchOptions,
  EventSortBy,
  SortDirection,
  useGetFetchEvents,
} from '../../hooks/events'
import { EventInterface } from '../../utils/api'

const dropOptions = ['High to Low', 'Low to High']
const defaultOption = dropOptions[0]

const PAGE_LIMIT = 6
const DEFAULT_SEARCH_OPTIONS: EventSearchOptions = {
  page: 0,
  maxCount: PAGE_LIMIT,
  sortBy: EventSortBy.ID,
  sortDirection: SortDirection.Descending,
}

function Gallery(): ReactElement {
  const [options, setOptions] = useState<EventSearchOptions>(
    DEFAULT_SEARCH_OPTIONS,
  )
  const [events, setEvents] = useState<EventInterface[]>([])
  const [next, setNext] = useState<number>()
  const { fetchEvents, loading } = useGetFetchEvents()

  useEffect(() => {
    const fetched = fetchEvents(options, events)
    setEvents(fetched.events)
    setNext(fetched.next)
    console.log(fetched)
    // eslint-disable-next-line
  }, [fetchEvents, options])

  async function loadMoreHandler(): Promise<void> {
    if (next !== undefined) {
      setOptions((o) => ({ ...o, page: next }))
    }
  }

  return (
    <section className={styles['Gallery']}>
      <div className="wrapper narrow">
        <div className={styles['Header']}>
          <div className={styles['DropdownContainer']}>
            <Dropdown
              options={dropOptions}
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
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : null}
        </div>

        {loading || next === undefined ? null : (
          <div className={styles['LoadMoreContainer']}>
            <button onClick={loadMoreHandler}>Load More</button>
          </div>
        )}
      </div>
    </section>
  )
}

export default Gallery
