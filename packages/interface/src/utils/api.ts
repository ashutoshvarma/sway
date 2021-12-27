import { request, gql } from 'graphql-request'
import { METADATA_URL, SUBGRAPH_URL } from './constants'
import { Event as SwayEvent } from '@sway/contracts/events/events'

interface EventDataResponse {
  events: { id: string; tokenCount: string; transferCount: string }[]
}

export const eventsQuery = gql`
  query getEvents($lastID: String) {
    events(
      orderBy: created
      orderDirection: desc
      first: 1000
      where: { id_gt: $lastID }
    ) {
      id
      tokenCount
      transferCount
    }
  }
`

const api = {
  getEvents: async (maxCount: number, lastID: string = '') => {
    // run the graphql query to fetch event ids
    const events = (
      await request<EventDataResponse>(SUBGRAPH_URL, eventsQuery, {
        lastID,
      })
    ).events

    return await Promise.all(
      events.map(async (e) => {
        // get the metadata for event
        const metadata: SwayEvent = await (
          await fetch(`${METADATA_URL}/${e.id}`)
        ).json()
        return {
          ...e,
          ...metadata,
        }
      }),
    )
  },
}
