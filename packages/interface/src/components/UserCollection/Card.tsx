import { ReactElement } from 'react'
import styles from './Card.module.css'
import {Token } from './Collections';
import {shortenAddress} from '../../utils/helpers';

import cardImg from '../../assets/illustrations/hero-illus.svg'
import ig from '../../assets/icons/ig.svg'
import facebook from '../../assets/icons/facebook.svg'
import pinterest from '../../assets/icons/pinterest.svg'
import twitter from '../../assets/icons/twitter.svg'

interface Props {
  loading?: boolean,
  token?: Token
}


function Card({loading,token}:Props): ReactElement {
  let classes = [styles['Card']]
  if(loading) classes.push(styles['Loading'])

  return (
    <div className={classes.join(" ")}>
      <div className={styles['CardThumbContainer']}>
        <img src={cardImg} className={styles['CardThumb']} alt="thumbnail" />
      </div>
      <div className={styles['DetailsGrid']}>
        <span className={styles['Head']}>Status</span>
        <span className={styles['Head']}>Transaction ID</span>
        <span className={styles['Completed']}>Completed</span>
        <span className={styles['Hash']}>{token?.transactionHash ? shortenAddress(token.transactionHash, 100) :"0iyjh8389dh..3iresw12"}</span>
      </div>
      <h4 className={styles['Title']}>Collect Best NFT’s Quickly!</h4>
      <div className={styles['Share']}>
        <img src={facebook} alt="facebook icon" />
        <img src={twitter} alt="twitter icon" />
        <img src={ig} alt="instagram icon" />
        <img src={pinterest} alt="pinterest icon" />
      </div>
    </div>
  )
}

export default Card
