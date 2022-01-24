import { ReactElement, useState } from 'react'
import styles from './DetailsCard.module.css'

import {
  Event as SwayEvent
} from '@sway/events/src/events'
import { ClaimStatus } from '../../hooks/events'
import moment from 'moment'
import { truncate } from '../../utils/helpers'
import { toast } from 'react-toastify'
//assets
import thumb from '../../assets/images/event-thumb.png'
import background from '../../assets/images/event-details-background.svg'
import calender from '../../assets/icons/calender.svg'
import nft from '../../assets/icons/nft.svg'
import location from '../../assets/icons/location.svg'

interface Props {
  event: SwayEvent | undefined
  loading?: boolean
  claimStatus: ClaimStatus
  claimLoading: Boolean,
  claimEvent: (() => Promise<string>) | null
}

function DetailsCard({ event, loading: eventLoading, claimStatus, claimLoading, claimEvent }: Props): ReactElement {
  const [joinLoading, setJoinLoading] = useState(false);

  const joinEventHandler = async () => {
    if (!claimEvent) return;
    try {
      setJoinLoading(true)
      let hash = await claimEvent();
      toast.success(`Yey! Success! ${hash}`)
    }
    catch (error: any) {
      toast.error(error.message)
    }
    finally {
      setJoinLoading(false)
    }
  }

  const renderClaimSection = () => {

    if (claimLoading) return null
    if (claimStatus === ClaimStatus.AVAIL)
      return (<div className={styles['JoinContainer']}>
        <button onClick={joinEventHandler}>Join the event</button>
      </div>)
    else if (claimStatus === ClaimStatus.CLAIMED)
      return <div className={styles['EventJoined']}>You've already joined this event!</div>
    else if (claimStatus === ClaimStatus.NOT_CONNECTED)
      return <div className={styles['Connect']}>Connect a wallet to join the event</div>
    else
      return <div className={styles['NotAvail']}>Not available</div>
  }

  let classes = [styles['Card']]
  if (eventLoading) classes.push(styles['Loading'])

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
        {eventLoading ? (
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
      {joinLoading ? <div className={styles['Loader']}><div></div><div></div><div></div><div></div></div> : renderClaimSection()}
    </div>
  )
}

export default DetailsCard
