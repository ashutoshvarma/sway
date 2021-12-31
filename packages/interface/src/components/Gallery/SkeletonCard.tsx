import { ReactElement } from 'react'
import Card from './Card'
import { EventInterface } from '../../utils/api'

const SAMPLE_DATA = {
  created: '1640523288',
  id: '12',
  tokenCount: '3',
  transferCount: '6',
  metadata: {
    description: 'This is an event description',
    external_url: 'https://static.sway.community/metadata/12',
    image_url: 'https://static.sway.community/badges/2',
    image: 'https://static.sway.community/badges/2',
    name: 'This is a name',
    year: 2021,
    tags: ['sway', 'event'],
    start_date: '2021-01-22',
    end_date: '2021-02-22',
    virtual_event: true,
    city: 'city name ',
    country: 'small country',
    event_url: 'https://www.sway.community/',
  },
}

interface Props {}

function SkeletonCard({}: Props): ReactElement {
  return (
    <>
      <Card event={SAMPLE_DATA as EventInterface} loading={true} />
    </>
  )
}

export default SkeletonCard
