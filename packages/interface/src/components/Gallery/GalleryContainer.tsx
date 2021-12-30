import { ReactElement } from 'react'
import HeroSection from './HeroSection'
import Gallery from './Gallery'

interface Props {}

function GalleryContainer({}: Props): ReactElement {
  return (
    <div>
      <HeroSection />
      <Gallery />
    </div>
  )
}

export default GalleryContainer
