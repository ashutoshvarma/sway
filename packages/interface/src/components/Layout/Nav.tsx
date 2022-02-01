import React, { ReactElement, useState } from 'react'
import { useContractKit } from '@celo-tools/use-contractkit'
import styles from './Nav.module.css'
import walleticon from '../../assets/icons/wallet.svg'
import hamburger from '../../assets/icons/hamburger.svg'
import cross from '../../assets/icons/cross.svg'
import { NavLink } from 'react-router-dom'
import { shortenAddress } from '../../utils/helpers'

interface Props {
  dark?: boolean
}

function Nav({ dark }: Props): ReactElement {
  const { connect, address, destroy } = useContractKit()
  const [navOpen, setNavOpen] = useState<boolean>(false)
  const toggleNav = () => {
    setNavOpen((state) => !state)
  }
  const closeNav = () => setNavOpen(false)

  return (
    <nav className={dark ? styles['Dark'] : ''}>
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
          <NavItem to="/gallery" click={closeNav}>
            Explore
          </NavItem>
          <NavItem to="/account" click={closeNav}>
            My Collection
          </NavItem>
          <NavItem
            to="#"
            primary
            click={
              address
                ? () => destroy().catch(console.log)
                : () => connect().catch(console.log)
            }
          >
            {address ? (
              <span>
                <img src={walleticon} alt="wallet icon" />
                {shortenAddress(address, 4)}
              </span>
            ) : (
              <span>
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
  click?: () => void
}

function NavItem({ children, to, primary, click }: NavItemProps): ReactElement {
  const classes = [styles['NavItem']]
  if (primary) {
    classes.push(styles['Primary'])
    return (
      <span onClick={click} className={classes.join(' ')}>
        {' '}
        {children}
      </span>
    )
  }
  return (
    <NavLink to={to} onClick={click} className={classes.join(' ')}>
      {children}
    </NavLink>
  )
}

export default Nav
