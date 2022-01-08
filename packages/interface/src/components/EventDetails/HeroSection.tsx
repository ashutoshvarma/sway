import { ReactElement } from 'react'
import styles from './HeroSection.module.css'
import bg from '../../assets/images/dark-hero-bg.svg'
import DetailsCard from './DetailsCard'
import {
  Event as SwayEvent,
  SwayDropParticipants,
} from '@sway/events/src/events'

interface Props {
  event: SwayEvent | undefined
  participants: SwayDropParticipants | undefined
  id: string
  loading: boolean
}

function HeroSection({
  event,
  id,
  loading,
  participants,
}: Props): ReactElement {
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
              participants={participants}
              event={event}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
