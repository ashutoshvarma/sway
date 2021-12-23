import React, { ReactElement } from 'react'
import styles from './Card.module.css'
// import cardImg from "../../assets/images/default-card-img.png";
import cardImg from '../../assets/illustrations/hero-illus.svg'
import calenderIcon from '../../assets/icons/calender.svg'
import eventIcon from '../../assets/icons/event.svg'

interface Props {}

function Card({}: Props): ReactElement {
  return (
    <div className={styles.Card}>
      <div className={styles.CardThumbContainer}>
        <img src={cardImg} className={styles.CardThumb} alt="thumbnail" />
      </div>
      <div className={styles.Label}>
        <span>#4340</span>
      </div>
      <h3 className={styles.Title}>Collect Best NFT’s Quickly!</h3>
      <p className={styles.Desc}>
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which.
      </p>
      <div className={styles.AdditionalInfoRow}>
        <div>
          <img src={calenderIcon} alt="calender icon" />
          <span>17-Oct-2022</span>
        </div>
        <div>
          <img src={eventIcon} alt="quick events" />
          <span>Quick Events</span>
        </div>
      </div>
      <div className={styles.AdditionalInfoRow}>
        <div>
          <span style={{ fontWeight: 900 }}>SUPPLY</span>
          <span>1</span>
        </div>
        <div>
          <span style={{ fontWeight: 900 }}>TRANSFERS</span>
          <span>1</span>
        </div>
      </div>
    </div>
  )
}

export default Card
