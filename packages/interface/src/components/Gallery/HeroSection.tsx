import React, { ReactElement } from 'react'
import styles from './HeroSection.module.css'
import hero from '../../assets/illustrations/gallery-illus.svg'

interface Props {}

function HeroSection({}: Props): ReactElement {
  return (
    <section className={styles.HeroSection}>
      <div className={`wrapper narrow ${styles.SectionContentWrapper}`}>
        <div className={styles.SectionContentDiv}>
          <h2>
            Make <span className={styles.Primary}>NFTs</span> for your <br />
            <span className={styles.Primary}>Community</span>
          </h2>
          <p>
            We believe that NFTs should define your community and people should
            be proud of it. Join us in this revolution and make your own NFTs
          </p>
        </div>
        <div className={styles.IllusContainer}>
          <div
            className={styles.Illustration}
            style={{ backgroundImage: `url(${hero})` }}
          ></div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
