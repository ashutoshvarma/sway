import { ReactElement } from 'react'
import styles from './Card.module.css'
// import cardImg from "../../assets/images/default-card-img.png";
import cardImg from '../../assets/illustrations/hero-illus.svg'
import calenderIcon from '../../assets/icons/calender.svg'
import eventIcon from '../../assets/icons/event.svg'
import { EventInterface } from '../../utils/api'
import { truncate } from '../../utils/helpers'
import Tags from './Tags'
import { useNavigate } from 'react-router-dom'

interface Props {
  event: EventInterface
  loading?: Boolean
}

function Card({ event, loading }: Props): ReactElement {
  let navigate = useNavigate()
  let classes = [styles['Card']]
  if (loading) classes.push(styles['Loading'])
  return (
    <div
      className={classes.join(' ')}
      onClick={() => navigate(`/event/${event.id}`)}
    >
      <div className={styles['CardThumbContainer']}>
        <img
          src={event.metadata.image || cardImg}
          className={styles['CardThumb']}
          alt="thumbnail"
        />
      </div>
      <div className={styles['Label']}>
        <span>#{event.id}</span>
      </div>
      <h3 className={styles['Title']}>{truncate(event.metadata.name, 50)}</h3>
      {/* <p className={styles['Desc']}>
        {truncate(event.metadata.description, 100)}
      </p> */}
      <div className={styles['AdditionalInfoRow']}>
        <div>
          <img src={calenderIcon} alt="calender icon" />
          <span>17-Oct-2022</span>
        </div>
        <div>
          <img src={eventIcon} alt="quick events" />
          <span>Quick Events</span>
        </div>
      </div>
      <Tags tags={event.metadata.tags} />
      <div className={styles['AdditionalInfoRow']}>
        <div>
          <span style={{ fontWeight: 900 }}>SUPPLY</span>
          <span>{event.tokenCount}</span>
        </div>
        <div>
          <span style={{ fontWeight: 900 }}>TRANSFERS</span>
          <span>{event.transferCount}</span>
        </div>
      </div>
    </div>
  )
}

export default Card
