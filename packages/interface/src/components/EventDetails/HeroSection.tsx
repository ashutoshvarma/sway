import { ReactElement } from 'react'
import styles from './HeroSection.module.css'
import bg from '../../assets/images/dark-hero-bg.svg'
import DetailsCard from './DetailsCard'

interface Props {}

function HeroSection({}: Props): ReactElement {
  return (
    <section className={styles['HeroSection']}>
      <div
        className={styles['HeroSectionBG']}
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="wrapper narrow">
        <div className={styles['HeroContentDiv']}>
          <h2>Event Id: #8788</h2>
          <div className={styles['EventDetails']}>
            <DetailsCard />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
