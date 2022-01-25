import { ReactElement } from 'react'
import HeroSection from './HeroSection'
import Gallery from './Gallery'

function GalleryContainer(): ReactElement {
  return (
    <div>
      <HeroSection />
      <Gallery />
    </div>
  )
}

export default GalleryContainer
