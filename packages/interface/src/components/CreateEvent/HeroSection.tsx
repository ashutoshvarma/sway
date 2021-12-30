import { ReactElement } from 'react'
import styles from './HeroSection.module.css'
import bg from '../../assets/images/dark-hero-bg.svg'
// import DetailsCard from "./DetailsCard";

// interface Props {}

function HeroSection(): ReactElement {
  return (
    <section className={styles['HeroSection']}>
      <div
        className={styles['HeroSectionBG']}
        style={{ backgroundImage: `url(${bg})` }}
      ></div>
      <div className="wrapper narrow">
        <div className={styles['HeroContentDiv']}>
          <h2>Create Event</h2>
          <p>
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words.
          </p>
          {/* <div className={styles.Progress}>
						<div className={styles.Active}>
							1. General Information
						</div>
						<div>2. Event Type</div>
						<div>3. Event Date {"&"} time</div>
						<div>4. Additional Details</div>
					</div> */}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
