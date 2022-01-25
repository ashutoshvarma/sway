import { ReactElement, useEffect, useState } from 'react'
import styles from './HeroSection.module.css'
import bg from '../../assets/images/dark-hero-bg.svg'
import DetailsCard from './DetailsCard'
import {
  Event as SwayEvent,
  SwayDropParticipants,
} from '@sway/events/src/events'
import api from '../../utils/api'
import { useClaimStatus, useClaimCallback } from '../../hooks/events'



interface Props {
  id: string
}

function HeroSection({ id }: Props): ReactElement {

  const [event, setEvent] = useState<SwayEvent>()
  const [loading, setLoading] = useState<boolean>(true)
  const [swayParticipants, setSwayParticpants] = useState<
    SwayDropParticipants | undefined
  >()
  const [claimStatus, claimLoading, forceCheckStatus] = useClaimStatus(id, swayParticipants)
  const { callback: claimEvent } = useClaimCallback(id, swayParticipants)


  //Fetching Event Details
  useEffect(() => {
    ; (async () => {
      setLoading(true)
      let eventData = await api.getEventMetadata(id)
      try {
        let sway_participants = await api.getEventMerkleDetails(id)
        setSwayParticpants(sway_participants)
      }
      catch { }
      finally {
        setEvent(eventData)
        setLoading(false)
      }
    })()
  }, [id])



  return (
    <section className={styles['HeroSection']}>
      <div
        className={styles['HeroSectionBG']}
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="wrapper narrow">
        <div className={styles['HeroContentDiv']}>
          <h2>Event Id: #{id}</h2>
          <div className={styles['EventDetails']}>
            <DetailsCard
              event={event}
              loading={loading}
              claimStatus={claimStatus}
              claimLoading={claimLoading}
              claimEvent={claimEvent}
              forceCheckStatus={forceCheckStatus}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
