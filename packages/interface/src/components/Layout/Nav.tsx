import React, { ReactElement, useState } from 'react'
import { useContractKit } from '@celo-tools/use-contractkit'
import styles from './Nav.module.css'
import walleticon from '../../assets/icons/wallet.svg'
import hamburger from '../../assets/icons/hamburger.svg'
import cross from '../../assets/icons/cross.svg'
import { NavLink } from 'react-router-dom'

interface Props {
  dark?: boolean
}

function Nav({ dark }: Props): ReactElement {
  const { connect, address, destroy } = useContractKit()
  const [navOpen, setNavOpen] = useState<boolean>(false)
  const toggleNav = () => {
    setNavOpen((state) => !state)
  }
  return (
    <nav>
      <button
        className={[styles['Hamburger'], dark ? styles['Dark'] : null].join(
          ' ',
        )}
        onClick={toggleNav}
      >
        <img src={hamburger} alt="hamburger icon" />
      </button>
      <div
        className={[styles['NavList'], navOpen ? styles['NavOpen'] : null].join(
          ' ',
        )}
      >
        <button className={styles['Cross']} onClick={toggleNav}>
          <img src={cross} alt="cross icon" />
        </button>
        <div className={styles['NavListContent']}>
          <NavItem to="/gallery">Explore</NavItem>
          <NavItem to="/event">Create</NavItem>
          <NavItem to="/user_collection">My Account</NavItem>
          <NavItem to="#" primary>
            {address ? (
              <span onClick={() => destroy().catch(console.log)}>
                <img src={walleticon} alt="wallet icon" />
                Disconnect
              </span>
            ) : (
              <span onClick={() => connect().catch(console.log)}>
                <img src={walleticon} alt="wallet icon" />
                Connect
              </span>
            )}
          </NavItem>
        </div>
      </div>
    </nav>
  )
}

interface NavItemProps {
  children: React.ReactNode
  primary?: boolean
  to: string
}

function NavItem({ children, to, primary }: NavItemProps): ReactElement {
  const classes = [styles['NavItem']]
  if (primary) classes.push(styles['Primary'])

  return (
    <NavLink to={to} className={classes.join(' ')}>
      {children}
    </NavLink>
  )
}

export default Nav
