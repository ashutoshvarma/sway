import { ReactElement, useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import Collections from './Collections'
import { useParams } from 'react-router-dom'
import api, { CollectionInterface } from '../../utils/api'
import { Event as SwayEvent } from '@sway/events/src/events'

function EventDetailsContainer(): ReactElement {
  const params = useParams()
  const id = params['id'] as string
  const [event, setEvent] = useState<SwayEvent>()
  const [collections, setCollection] = useState<
    CollectionInterface[] | undefined
  >()
  const [eventLoading, setEventLoading] = useState<boolean>(true)
  const [collectionsLoading, setCollectionsLoading] = useState<boolean>(true)

  useEffect(() => {
    ;(async () => {
      setEventLoading(true)
      let eventData = await api.getEventMetadata(id)
      setEvent(eventData)
      setEventLoading(false)
    })()
  }, [id])

  useEffect(() => {
    ;(async () => {
      setCollectionsLoading(true)
      let collectionsData = await api.getEventsTransfer(id)
      setCollection(collectionsData)
      setCollectionsLoading(false)
    })()
  }, [id])

  return (
    <div>
      <HeroSection event={event} id={id} loading={eventLoading} />
      <Collections collections={collections} loading={collectionsLoading} />
    </div>
  )
}

export default EventDetailsContainer
