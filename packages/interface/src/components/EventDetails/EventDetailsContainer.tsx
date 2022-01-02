import { ReactElement, useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import Collections from './Collections'
import { useParams } from 'react-router-dom'
import api from '../../utils/api'
import { Event as SwayEvent } from '@sway/events/src/events'
// import { useContractKit } from '@celo-tools/use-contractkit'

function EventDetailsContainer(): ReactElement {
  const params = useParams()
  const id = params['id'] as string
  const [event, setEvent] = useState<SwayEvent>()
  // const { connect, address, destroy } = useContractKit()

  useEffect(() => {
    ;(async () => {
      // if(address)
      // {
      // let data = await api.getUserTokenInfo(address)

      // }
      let eventData = await api.getEventMetadata(id)
      setEvent(eventData)
    })()
  }, [id])
  return (
    <div>
      <HeroSection event={event} id={id} />
      <Collections />
    </div>
  )
}

export default EventDetailsContainer
