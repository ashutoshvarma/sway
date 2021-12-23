import React, { ReactElement } from 'react'
import HeroSection from './HeroSection'
import Form from './Form'

function CreateEventContainer(): ReactElement {
  return (
    <div>
      <HeroSection />
      <Form />
    </div>
  )
}

export default CreateEventContainer
