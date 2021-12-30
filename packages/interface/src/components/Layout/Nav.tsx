import React, { ReactElement, useState } from 'react'
import { useContractKit } from '@celo-tools/use-contractkit'
import styles from './Nav.module.css'
import walleticon from '../../assets/icons/wallet.svg'
import hamburger from '../../assets/icons/hamburger.svg'
import cross from '../../assets/icons/cross.svg'

interface Props {
  dark?: Boolean
}

function Nav({ dark }: Props): ReactElement {
  const { connect, address, destroy } = useContractKit()
  const [navOpen, setNavOpen] = useState<Boolean>(false)
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
          <NavItem>Explore</NavItem>
          <NavItem>Create</NavItem>
          <NavItem>My Account</NavItem>
          <NavItem primary>
            {address ? (
              <a onClick={() => destroy().catch(console.log)}>
                <img src={walleticon} alt="wallet icon" />
                Disconnect
              </a>
            ) : (
              <a onClick={() => connect().catch(console.log)}>
                <img src={walleticon} alt="wallet icon" />
                Connect
              </a>
            )}
          </NavItem>
        </div>
      </div>
    </nav>
  )
}

interface NavItemProps {
  children: React.ReactNode
  primary?: Boolean
  // to: String
}

function NavItem({ children, primary }: NavItemProps): ReactElement {
  let classes = [styles['NavItem']]
  if (primary) classes.push(styles['Primary'])

  return <div className={classes.join(' ')}>{children}</div>
}

export default Nav
