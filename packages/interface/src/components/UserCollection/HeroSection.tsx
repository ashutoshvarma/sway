import { ReactElement } from 'react'
import bg from '../../assets/images/dark-hero-bg.svg'
import styles from './HeroSection.module.css'

interface Props {}

function HeroSection({}: Props): ReactElement {
  return (
    <section
      className={styles['HeroSection']}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className={styles['HeroSectionBG']}></div>
      <div className="wrapper narrow">
        <div className={styles['HeroContentDiv']}>
          <h2>User Collection</h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
