import React, { ReactElement } from 'react'
import HeroSection from './HeroSection'
import Collections from './Collections'

interface Props {}

function EventDetailsContainer({}: Props): ReactElement {
  return (
    <div>
      <HeroSection />
      <Collections />
    </div>
  )
}

export default EventDetailsContainer
