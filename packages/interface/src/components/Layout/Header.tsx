import { ReactElement } from 'react'
import styles from './Header.module.css'
import Logo from '../../assets/logos/logonew.svg'
import Shape1 from '../../assets/shapes/shape1.svg'
import Shape1Dark from '../../assets/shapes/nav-shape-dark.svg'
import Nav from './Nav'
import { Link } from 'react-router-dom'

interface Props {
  dark?: boolean
}

function Header({ dark }: Props): ReactElement {
  return (
    <header className={styles['Header']}>
      <div className="wrapper">
        <div className={styles['HeaderContent']}>
          <img
            src={dark ? Shape1Dark : Shape1}
            className={styles['Shape']}
            alt=""
          />
          <Link to="/" className={styles['LogoDiv']}>
            <img src={Logo} alt="Sway-logo" />
            {/* <h1>Sway</h1> */}
          </Link>
          <Nav dark={dark} />
        </div>
      </div>
    </header>
  )
}

export default Header
