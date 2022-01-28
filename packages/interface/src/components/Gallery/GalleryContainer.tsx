import { ReactElement } from 'react'
import HeroSection from './HeroSection'
import Gallery from './Gallery'
import { Helmet } from 'react-helmet'

function GalleryContainer(): ReactElement {
  return (
    <div>
      <Helmet>
        <title>Explore - Make NFTs for your
          Community | Sway</title>
        <meta property="og:title" content="Explore - Make NFTs for your
          Community | Sway" />
        <meta name="description" content="We believe that NFTs should define your community and people should be proud of it. Join us in this revolution and make your own NFTs"></meta>
      </Helmet>
      <HeroSection />
      <Gallery />
    </div>
  )
}

export default GalleryContainer
