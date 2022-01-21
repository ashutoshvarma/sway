import { ReactElement } from 'react'
import HeroSection from './HeroSection'
import Collections from './Collections'
import { useParams } from 'react-router-dom'


function EventDetailsContainer(): ReactElement {
  const params = useParams()
  const id = params['id'] as string

  return (
    <div>
      <HeroSection id={id} />
      <Collections eventId={id} />
    </div>
  )
}

export default EventDetailsContainer
