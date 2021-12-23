import React, { ReactElement } from 'react'
import HeroSection from './HeroSection'
import Collections from './Collections'
function UserCollectionsContainer(): ReactElement {
  return (
    <div>
      <HeroSection />
      <Collections />
    </div>
  )
}

export default UserCollectionsContainer
