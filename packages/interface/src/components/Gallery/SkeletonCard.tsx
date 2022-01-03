import { ReactElement } from 'react'
import styles from './Card.module.css'
import cardImg from '../../assets/illustrations/hero-illus.svg'
import Tags from './Tags'

const SAMPLE_DATA = {
  created: '1640523288',
  id: '124343532',
  tokenCount: '3',
  transferCount: '6',
  metadata: {
    description: 'This is an event description',
    external_url: 'https://static.sway.community/metadata/12',
    image_url: 'https://static.sway.community/badges/2',
    image: 'https://static.sway.community/badges/2',
    name: 'This is a name',
    year: 2021,
    tags: ['sway', 'event'],
    start_date: '2021-01-22',
    end_date: '2021-02-22',
    virtual_event: true,
    city: 'city name ',
    country: 'small country',
    event_url: 'https://www.sway.community/',
  },
}

function SkeletonCard(): ReactElement {
  let classes = [styles['Card'], styles['Loading']]
  let event = SAMPLE_DATA
  return (
    <>
      <div className={classes.join(' ')}>
        <div className={styles['CardThumbContainer']}>
          <img src={cardImg} className={styles['CardThumb']} alt="thumbnail" />
        </div>
        <div className={styles['Label']}>
          <span>#{event.id}</span>
        </div>
        <h3 className={styles['Title']}>{event.metadata.name}</h3>
        <p className={styles['Desc']}>{event.metadata.description}</p>

        <Tags tags={['tag1', 'taggg2', 'tag3', 'tagtag4']} loading />
      </div>
    </>
  )
}

export default SkeletonCard
