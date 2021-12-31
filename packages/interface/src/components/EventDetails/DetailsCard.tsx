import { ReactElement } from 'react'
import styles from './DetailsCard.module.css'
import thumb from '../../assets/images/event-thumb.png'
import background from '../../assets/images/event-details-background.svg'

import calender from '../../assets/icons/calender.svg'
import nft from '../../assets/icons/nft.svg'
import location from '../../assets/icons/location.svg'
import { Event as SwayEvent } from '@sway/events/src/events'
import { truncate } from '../../utils/helpers'

interface Props {
  event: SwayEvent | undefined
}

function DetailsCard({ event }: Props): ReactElement {
  return (
    <div className={styles['Card']}>
      <img className={styles['Background']} src={background} alt="" />
      <div>
        <img
          className={styles['Thumb']}
          src={event?.image || thumb}
          alt="thumbnail"
        />
        <h3>{event?.name}</h3>
        <p className={styles['Desc']}>{event?.description}</p>
      </div>
      <div className={styles['Tags']}>
        {event?.tags?.map((tag) => (
          <span>{tag}</span>
        ))}
      </div>

      <div className={styles['AdditionalInfoRow']}>
        <div>
          <img src={calender} alt="calender icon" />
          <span>17-Oct-2022</span>
        </div>
        <div>
          <img src={location} alt="location icon" />
          <span>
            {truncate(event?.city as string, 30)},{' '}
            {truncate(event?.country as string, 20)}
          </span>
        </div>
        <div>
          <img src={nft} alt="nft icon" />
          <div>
            <span className={styles['NoNftsLabel']}>Number Of NFT's</span>
            <span className={styles['NoNftsValue']}>2102</span>
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
