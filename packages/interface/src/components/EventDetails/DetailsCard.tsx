import { ReactElement } from 'react'
import styles from './DetailsCard.module.css'
import thumb from '../../assets/images/event-thumb.png'
import background from '../../assets/images/event-details-background.svg'

import calender from '../../assets/icons/calender.svg'
import nft from '../../assets/icons/nft.svg'
import location from '../../assets/icons/location.svg'
import {
  Event as SwayEvent,
  SwayDropParticipants,
} from '@sway/events/src/events'
import moment from 'moment'
import { truncate } from '../../utils/helpers'

interface Props {
  event: SwayEvent | undefined
  loading?: boolean
  participants?: SwayDropParticipants | undefined
}

function DetailsCard({ event, loading }: Props): ReactElement {
  let classes = [styles['Card']]
  // loading = true
  if (loading) classes.push(styles['Loading'])

  return (
    <div className={classes.join(' ')}>
      <img className={styles['Background']} src={background} alt="" />
      <div>
        <div className={styles['ThumbContainer']}>
          <img
            className={styles['Thumb']}
            src={event?.image || thumb}
            alt="thumbnail"
          />
        </div>
        <h3>{event?.name}</h3>
        <p className={styles['Desc']}>{event?.description}</p>
      </div>
      <div className={styles['Tags']}>
        {event?.tags?.map((tag, i) => (
          <span key={i}>{tag}</span>
        ))}
        {loading ? (
          <>
            <span>Loading</span>
            <span>Loading</span>
            <span>Loading</span>
            <span>Loading</span>
            <span>Loading</span>
            <span>Loading</span>
          </>
        ) : null}
      </div>

      <div className={styles['AdditionalInfoRow']}>
        <div>
          <img src={calender} alt="calender icon" />
          <span>{moment(event?.start_date).format('Do MMM YY')}</span>
        </div>
        <div>
          <img src={location} alt="location icon" />
          <span>
            {truncate(event?.city || '', 20)},{' '}
            {truncate(event?.country || '', 20)}
          </span>
        </div>
        <div>
          <img src={nft} alt="nft icon" />
          <div>
            <span className={styles['NoNftsLabel']}>Number Of NFT's</span>
            <span className={styles['NoNftsValue']}>
              {/* {event?.virtual_event} */}2022
            </span>
          </div>
        </div>
      </div>

      <div className={styles['JoinContainer']}>
        <button>Join the event</button>
      </div>
    </div>
  )
}

export default DetailsCard
