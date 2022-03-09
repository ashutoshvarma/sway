import { ReactElement } from 'react'
import styles from './Card.module.css'
import { Token } from './Collections'
import { explorerLink, shortenTxHash } from '../../utils/helpers'
import { Link } from 'react-router-dom'
import { FacebookShareButton, TwitterShareButton } from 'react-share'

import cardImg from '../../assets/illustrations/hero-illus.svg'
// import ig from '../../assets/icons/ig.svg'
import facebook from '../../assets/icons/facebook.svg'
// import pinterest from '../../assets/icons/pinterest.svg'
import twitter from '../../assets/icons/twitter.svg'
// import { useContractKit } from '@celo-tools/use-contractkit'

const getSocialQuote = () =>
  `Hey there, checkout this NFT that I just minted on SWAY. Create and Collect events' NFT on SWAY for free.`
interface Props {
  loading?: boolean
  token?: Token
}

function Card({ loading, token }: Props): ReactElement {
  // const { account } = useContractKit()
  const classes = [styles['Card']]
  if (loading) classes.push(styles['Loading'])

  return (
    <div className={classes.join(' ')}>
      <div className={styles['CardThumbContainer']}>
        <img
          src={token?.image_url || cardImg}
          className={styles['CardThumb']}
          alt="thumbnail"
        />
      </div>
      <div className={styles['EventId']}>
        <Link to={`/event/${token?.eventId}`}>
          <span>#{token?.eventId || 'No Id'}</span>
        </Link>
      </div>
      <div className={styles['DetailsGrid']}>
        <span className={styles['Head']}>Status</span>
        <span className={styles['Head']}>Transaction ID</span>
        <span className={styles['Completed']}>Completed</span>
        <span className={styles['Hash']}>
          {token?.transactionHash ? (
            <a
              href={explorerLink(token.transactionHash, true)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {shortenTxHash(token.transactionHash, 6)}
            </a>
          ) : (
            '0i9dh..3i12'
          )}
        </span>
      </div>
      <h4 className={styles['Title']}>Collect Best NFT’s Quickly!</h4>
      <div className={styles['Share']}>
        <div>
          <FacebookShareButton
            url={
              new URL(
                `/event/${token?.eventId.toString()}`,
                window.location.href,
              ).href
            }
            quote={getSocialQuote()}
            hashtag="#swaynft"
          >
            <img src={facebook} alt="facebook icon" />
          </FacebookShareButton>
        </div>
        <div>
          <TwitterShareButton
            url={
              new URL(
                `/event/${token?.eventId.toString()}`,
                window.location.href,
              ).href
            }
            title={getSocialQuote()}
            hashtags={['sway', 'swaynft']}
          >
            <img src={twitter} alt="twitter icon" />
          </TwitterShareButton>
        </div>
        {/* <div>
          <img src={ig} alt="instagram icon" />
        </div> */}
        {/* <div>
          <img src={pinterest} alt="pinterest icon" />
        </div> */}
      </div>
    </div>
  )
}

export default Card
