import { ReactElement } from 'react'
import HeroSection from './HeroSection'
import Collections from './Collections'
import { Helmet } from 'react-helmet'

function UserCollectionsContainer(): ReactElement {
  return (
    <div>
      <Helmet>
        <title>My Collection | Sway</title>
        <meta property="og:title" content="My Collection | Sway" />
        <meta name="description" content="Checkout all the NFT collections you have."></meta>
      </Helmet>
      <HeroSection />
      <Collections />
    </div>
  )
}

export default UserCollectionsContainer
