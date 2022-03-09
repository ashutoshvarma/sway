import { ReactElement } from 'react'
import styles from './Home.module.css'
import hero from '../../assets/illustrations/hero-illus.svg'
import shape2 from '../../assets/shapes/shape2.svg'
import shape3 from '../../assets/shapes/shape3.svg'
import shape4 from '../../assets/shapes/shape4.svg'
import shape5 from '../../assets/shapes/shape5.svg'

import shape2mobile from '../../assets/shapes/shape2mobile.svg'
import shape3mobile from '../../assets/shapes/shape3mobile.svg'
import shape4mobile from '../../assets/shapes/shape4mobile.svg'
import shape5mobile from '../../assets/shapes/shape5mobile.svg'

import netflix from '../../assets/logos/netflix.png'
import google from '../../assets/logos/google.png'
import dropbox from '../../assets/logos/dropbox.png'
import intrum from '../../assets/logos/intrum.png'
import bitcoin from '../../assets/logos/bitcoin.png'
import reformation from '../../assets/logos/reformation.png'
import intercom from '../../assets/logos/intercom.png'

import illus2 from '../../assets/illustrations/illus2.svg'
import illus3 from '../../assets/illustrations/illus3.svg'
import illus4 from '../../assets/illustrations/illus4.svg'
import illus5 from '../../assets/illustrations/illus5.svg'

import Faqs from './Faqs'
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom'

function HomePage(): ReactElement {
  const navigate = useNavigate()
  return (
    <>
      <Helmet>
        <title>Sway - Create and Collect Free Souvenir NFTs!</title>
        <meta
          property="og:title"
          content="Sway - Create and Collect Free
          Souvenir NFTs!"
        />
        <meta
          name="description"
          content="Create one of a kind, crypto secured digital memories in the form of NFTs and share with your friends"
        ></meta>
      </Helmet>
      <section className={styles['HeroSection']}>
        <div style={{ position: 'relative', width: '100%' }}>
          <div className={`wrapper ${styles['SectionContentWrapper']}`}>
            <div className={styles['SectionContentDiv']}>
              <h2>
                <span className={styles['Primary']}>Create</span> and{' '}
                <span className={styles['Primary']}>Collect</span> Free
                <br /> Souvenir NFTs!
              </h2>
              <p>
                Create one of a kind, crypto secured digital memories in the
                form of NFTs and share with your friends
              </p>
            </div>
            <div className={styles['IllusContainer']}>
              <img src={hero} alt="illustration" />
            </div>
          </div>
          <img src={shape2} className={styles['Shape2']} alt="" />
          <img src={shape2mobile} className={styles['Shape2Mobile']} alt="" />
        </div>
      </section>

      <section className={`wrapper ${styles['LogoSection']}`}>
        <img src={google} alt="google" />
        <img src={dropbox} alt="dropbox" />
        <img src={intercom} alt="intercom" />
        <img src={bitcoin} alt="bitcoin" />
        <img src={intrum} alt="intrum" />
        <img src={reformation} alt="reformation" />
        <img src={netflix} alt="netflix" />
      </section>

      <section className={styles['MidSection']}>
        <div
          className={`wrapper narrow ${styles['SectionContentWrapper']}`}
          style={{ gridTemplateColumns: '7fr 5fr' }}
        >
          <div className={styles['IllusContainer']}>
            <img src={illus2} style={{ marginLeft: -20 }} alt="illustration" />
          </div>
          <div className={styles['SectionContentDiv']}>
            <h3>NFTs That Define You</h3>
            <h4>Every human is unique and so are NFTs</h4>
            <p>
              LNFTs are a wonderful thing and can be used to represent any
              event. Use SWAY to create and collect NFTs for Meaningful Events
              that define you.
            </p>
            <button onClick={() => navigate('/gallery')}>Get started</button>
          </div>
        </div>
      </section>

      <section className={styles['MidSection']} id={styles['MidSection2']}>
        <div className={`wrapper narrow ${styles['SectionContentWrapper']}`}>
          <div className={styles['SectionContentDiv']}>
            <h3>Earn The Bragging Rights</h3>
            <h4>Share your NFT collection with your friends</h4>
            <p>
              The NFT you own will define your identity in the pseudo-anonymous
              world of blockchain. Build your social reputation using SWAY.
            </p>
            <button onClick={() => navigate('/gallery')}>Get started</button>
          </div>
          <div className={styles['IllusContainer']}>
            <img src={illus3} alt="illustration" />
          </div>
        </div>
        <img src={shape3} className={styles['Shape3']} alt="" />
        <img src={shape3mobile} className={styles['Shape3Mobile']} alt="" />
      </section>

      <section className={styles['MidSection']} id={styles['MidSection3']}>
        <div className={`wrapper narrow ${styles['SectionContentWrapper']}`}>
          <div className={styles['SectionContentDiv']}>
            <h3>How does Sway work?</h3>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable you are going to use a passage.
              <br />
              <br />
              Randomised words which don’t look even slightly believable. If you
              are going to use a passage of Lorem Ipsum, you need to be sure
              there isn’t anything embarrassing hidden.
            </p>
          </div>
          <div className={styles['IllusContainer']}>
            <img src={illus4} alt="illustration" />
          </div>
        </div>
        <img src={shape4} className={styles['Shape4']} alt="" />
        <img src={shape4mobile} className={styles['Shape4Mobile']} alt="" />
      </section>

      <section
        className={styles['MidSection']}
        id={styles['MidSection4']}
        style={{ paddingTop: 0 }}
      >
        <div className={`wrapper narrow ${styles['SectionContentWrapper']}`}>
          <div className={styles['IllusContainer']}>
            <img src={illus5} alt="illustration" />
          </div>
          <div className={styles['SectionContentDiv']}>
            <h3>Make Your Step Toward Sway!</h3>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable you are going to use a passage.
            </p>
            <button onClick={() => navigate('/gallery')}>Get started</button>
          </div>
        </div>
      </section>
      <section className={styles['FaqSection']}>
        <div className="wrapper narrow">
          <h3>Frequently Asked Questions</h3>
          <Faqs />
          <img src={shape5} className={styles['Shape5']} alt="" />
          <img src={shape5mobile} className={styles['Shape5Mobile']} alt="" />
        </div>
      </section>
    </>
  )
}

export default HomePage
