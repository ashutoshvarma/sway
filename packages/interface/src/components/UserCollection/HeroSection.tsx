import { ReactElement } from 'react'
import bg from '../../assets/images/dark-hero-bg.svg'
import styles from './HeroSection.module.css'

function HeroSection(): ReactElement {
  return (
    <section
      className={styles['HeroSection']}
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className={styles['HeroSectionBG']}></div>
      <div className="wrapper narrow">
        <div className={styles['HeroContentDiv']}>
          <h2>NFT Collection</h2>
          <p>
           All the SWAY NFTs owned by your cryto wallet are listed here,
           every NFT is unique and stored on celo blockchain,
           you can verify each one of them on celo block explorer.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
