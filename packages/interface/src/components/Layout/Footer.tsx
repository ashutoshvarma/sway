import { ReactElement } from 'react'
import styles from './Footer.module.css'
import shape from '../../assets/shapes/footershape.svg'
import logo from '../../assets/logos/logonew.svg'
// import reddit from '../../assets/logos/reddit.svg'
// import discord from '../../assets/logos/discord.svg'
// import github from '../../assets/logos/github.svg'
import twitter from '../../assets/logos/twitter.svg'

import { Link } from 'react-router-dom'

function Footer(): ReactElement {
  return (
    <footer className={styles['Footer']}>
      <img src={shape} className={styles['Shape']} alt="" />
      <div className={styles['FooterContent']}>
        <div className="wrapper">
          <div className={styles['FooterGrid']}>
            <div>
              <div className={styles['LogoDiv']}>
                <img src={logo} alt="sway logo" />
                {/* <h2>Sway</h2> */}
              </div>
              <p className={styles['Desc']}>
                Sway NFTs is an initiative that helps people
                create and distribute NFTs easily. Ask your 
                community manager to connect with SWAY and 
                make unlimited NFT events.
              </p>
            </div>
            <div className={styles['Menu']}>
              <h4>Menu</h4>
              <ul className={styles['Nav']}>
                <li>
                  <Link to="/gallery">Explore</Link>
                </li>
                {/* <li>
                  <Link to="/event/create">Create</Link>
                </li> */}
                <li>
                  <Link to="/account">My Collection</Link>
                </li>
                {/* <li>
                  <Link to="/event">Details</Link>
                </li>
                <li>
                  <Link to="#">Career</Link>
                </li> */}
              </ul>
            </div>
            <div className={styles['Contact1']}>
              <h4>Mail us at</h4>
              
              <p>info@sway.community</p>
              
            </div>
            <div className={styles['Contact2']}>
              <h4>Join us at</h4>
              <div className={styles['ContactLinksContainer']}>
                {/* <a href="#sdsd">
                  <img src={reddit} alt="reddit" />
                  <span>Reddit</span>
                </a>
                <a href="#sdssd">
                  <img src={github} alt="github" />
                  <span>Github</span>
                </a>
                <a href="#sdf">
                  <img src={discord} alt="discord" />
                  <span>Discord</span>
                </a> */}
                <a href="#sdf">
                  <img src={twitter} alt="twitter" />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['Footnote']}>
        <div className="wrapper">Copyright © 2022 | All Rights Reserved</div>
      </div>
    </footer>
  )
}

export default Footer
