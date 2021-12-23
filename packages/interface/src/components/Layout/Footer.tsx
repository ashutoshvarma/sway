import React, { ReactElement } from 'react'
import styles from './Footer.module.css'
import shape from '../../assets/shapes/footershape.svg'
import logo from '../../assets/logos/sway.svg'
import reddit from '../../assets/logos/reddit.svg'
import discord from '../../assets/logos/discord.svg'
import github from '../../assets/logos/github.svg'

function Footer(): ReactElement {
  return (
    <footer className={styles.Footer}>
      <img src={shape} className={styles.Shape} alt="" />
      <div className={styles.FooterContent}>
        <div className="wrapper">
          <div className={styles.FooterGrid}>
            <div>
              <div className={styles.LogoDiv}>
                <img src={logo} alt="sway logo" />
                <h2>Sway</h2>
              </div>
              <p className={styles.Desc}>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable you are going to use a passage.
              </p>
            </div>
            <div className={styles.Menu}>
              <h4>Menu</h4>
              <ul className={styles.Nav}>
                <li>Explore</li>
                <li>Create</li>
                <li>My Account</li>
                <li>Details</li>
                <li>Career</li>
              </ul>
            </div>
            <div className={styles.Contact1}>
              <h4>Contact us</h4>
              <p>Mobile: +44 9089 8765-32</p>
              <p>Email: mailbox@address.com</p>
              <p>
                Address: 10/A, Jonshon Street,
                <br /> New York, USA - 34657
              </p>
            </div>
            <div className={styles.Contact2}>
              <h4>Contact us</h4>
              <div className={styles.ContactLinksContainer}>
                <a href="#">
                  <img src={reddit} alt="reddit" />
                  <span>Reddit</span>
                </a>
                <a href="#">
                  <img src={github} alt="github" />
                  <span>Github</span>
                </a>
                <a href="#">
                  <img src={discord} alt="discord" />
                  <span>Discord</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.Footnote}>
        <div className="wrapper">Copyright © 2021 | All Rights Reserved</div>
      </div>
    </footer>
  )
}

export default Footer
