import { ReactElement, useEffect, useState } from 'react'
import 'react-dropdown/style.css'
import styles from './Gallery.module.css'
import Card from './Card'
import SkeletonCard from './SkeletonCard'

import SearchInput from './SearchInput'
import Dropdown, { Option } from 'react-dropdown'
import {
  EventSearchOptions,
  EventSortBy,
  SortDirection,
  useGetFetchEvents,
} from '../../hooks/events'
import { EventInterface } from '../../utils/api'

const dropOptions = ['ID: Asc', 'ID: Desc', 'Created: Asc', 'Created: Desc', 'Token Count: Asc', 'Token Count: Desc', 'Transfer Count: Asc', 'Transfer Count: Desc']

const dropOptionsToValueMap: any = {
  'ID: Asc': { sortBy: EventSortBy.ID, sortDirection: SortDirection.Ascending },
  'ID: Desc': { sortBy: EventSortBy.ID, sortDirection: SortDirection.Descending },
  'Created: Asc': { sortBy: EventSortBy.Created, sortDirection: SortDirection.Ascending },
  'Creted: Desc': { sortBy: EventSortBy.Created, sortDirection: SortDirection.Descending },
  'Token Count: Asc': { sortBy: EventSortBy.TokenCount, sortDirection: SortDirection.Ascending },
  'Token Count: Desc': { sortBy: EventSortBy.TokenCount, sortDirection: SortDirection.Descending },
  'Transfer Count: Asc': { sortBy: EventSortBy.TransferCount, sortDirection: SortDirection.Ascending },
  'Transfer Count: Desc': { sortBy: EventSortBy.TransferCount, sortDirection: SortDirection.Descending },
}

const defaultOption = dropOptions[1]

const PAGE_LIMIT = 6
const DEFAULT_SEARCH_OPTIONS: EventSearchOptions = {
  page: 0,
  maxCount: PAGE_LIMIT,
  sortBy: EventSortBy.ID,
  sortDirection: SortDirection.Descending,
  query: undefined,
}

function Gallery(): ReactElement {
  const [options, setOptions] = useState<EventSearchOptions>(
    DEFAULT_SEARCH_OPTIONS,
  )
  const [events, setEvents] = useState<EventInterface[]>([])
  const [next, setNext] = useState<number>()
  const { fetchEvents, loading } = useGetFetchEvents()



  useEffect(() => {
    if (loading) return;
    const fetched = fetchEvents(options, options.page === 0 ? [] : events);
    setEvents(fetched.events)
    setNext(fetched.next)
    console.log(fetched, loading)
    // eslint-disable-next-line
  }, [loading, options])



  async function loadMoreHandler(): Promise<void> {
    if (next !== undefined) {
      setOptions((o) => ({ ...o, page: next }))
    }
  }

  const searchHandler: React.ChangeEventHandler<HTMLInputElement> | undefined = (e) => {
    setOptions({ ...options, query: e.target.value, page: 0 })
  }

  const sortHandler = (arg: Option) => {
    let sortingConfig = dropOptionsToValueMap[arg.value]
    setOptions({ ...options, ...sortingConfig, page: 0 })
  }


  return (
    <section className={styles['Gallery']}>
      <div className="wrapper narrow">
        <div className={styles['Header']}>
          <div className={styles['DropdownContainer']}>
            <Dropdown
              options={dropOptions}
              onChange={sortHandler}
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
            <SearchInput inputHandler={searchHandler} />
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
