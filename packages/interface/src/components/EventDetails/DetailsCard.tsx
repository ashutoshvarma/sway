import React, { ReactElement } from 'react'
import styles from './DetailsCard.module.css'
import thumb from '../../assets/images/event-thumb.png'
import background from '../../assets/images/event-details-background.svg'

import calender from '../../assets/icons/calender.svg'
import nft from '../../assets/icons/nft.svg'
import location from '../../assets/icons/location.svg'

interface Props {}

function DetailsCard({}: Props): ReactElement {
  return (
    <div className={styles.Card}>
      <img className={styles.Background} src={background} alt="" />
      <div>
        <img className={styles.Thumb} src={thumb} alt="thumbnail" />
        <h3>Collect Best NFT’s Quickly!</h3>
        <p className={styles.Desc}>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable
          you are going to use a passage. There are many variations of passages
          of Lorem Ipsum available, but the majority have suffered alteration.
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </p>
      </div>
      <div className={styles.AdditionalInfoRow}>
        <div>
          <img src={calender} alt="calender icon" />
          <span>17-Oct-2022</span>
        </div>
        <div>
          <img src={location} alt="location icon" />
          <span>Delhi</span>
        </div>
        <div>
          <img src={nft} alt="nft icon" />
          <div>
            <span className={styles.NoNftsLabel}>Number Of NFT's</span>
            <span className={styles.NoNftsValue}>2102</span>
          </div>
        </div>
      </div>
      <div className={styles.JoinContainer}>
        <button>Join the event</button>
      </div>
    </div>
  )
}

export default DetailsCard
