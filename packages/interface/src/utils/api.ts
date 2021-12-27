import { request, gql } from 'graphql-request'
import { METADATA_URL, SUBGRAPH_URL } from './constants'
import { Event as SwayEvent } from '@sway/contracts/events/events'

interface EventDataResponse {
  events: {
    id: string
    tokenCount: string
    transferCount: string
    created: string
  }[]
}

interface UserTokenDataResponse {
  account: {
    id: string
    tokensOwned: string
    tokens: {
      id: string
      metadataUri: string
      event: { id: string }
      created: string
      transfers: { transaction: string; timestamp: string }[]
    }[]
  }
}

export const eventsQuery = gql`
  query getEvents($maxCount: Int, $lastCreated: String) {
    events(
      orderBy: created
      orderDirection: desc
      first: $maxCount
      where: { created_lt: $lastCreated }
    ) {
      id
      tokenCount
      transferCount
      created
    }
  }
`

export const userTokensQuery = gql`
  query getUserTokens($userID: String) {
    account(id: $userID) {
      id
      tokensOwned
      tokens {
        id
        metadataUri
        event {
          id
        }
        created
        transfers(
          where: { from: "0x0000000000000000000000000000000000000000" }
        ) {
          transaction
          timestamp
        }
      }
    }
  }
`

const api = {
  getEventMetadata: async (eventId: string): Promise<SwayEvent> => {
    return await (await fetch(`${METADATA_URL}/${eventId}`)).json()
  },

  /**
   * Get all the events from subgraph along with their metadata
   * @param maxCount Maximum events to fetch
   * @param last Last Event
   * @returns Event details
   */
  getEvents: async (
    maxCount: number,
    last: { created: string } = {
      created: Number.MAX_SAFE_INTEGER.toString(),
    },
  ) => {
    // run the graphql query to fetch event ids
    const events = (
      await request<EventDataResponse>(SUBGRAPH_URL, eventsQuery, {
        maxCount,
        lastCreated: last.created,
      })
    ).events

    return await Promise.all(
      events.map(async (e) => {
        // get the metadata for event
        const metadata: SwayEvent = await api.getEventMetadata(e.id)
        return {
          ...e,
          metadata,
        }
      }),
    )
  },

  getUserTokenInfo: async (address: string) => {
    // subgraph has lowercase address
    const userID = address.toLowerCase()
    const account = (
      await request<UserTokenDataResponse>(SUBGRAPH_URL, userTokensQuery, {
        userID,
      })
    ).account
    if (!account) return null
    return {
      tokensOwned: account.tokensOwned,
      tokens: await Promise.all(
        account.tokens.map(async (t) => {
          const metadata = await api.getEventMetadata(t.event.id)
          return {
            created: t.created,
            metadataUri: t.metadataUri,
            transactionHash: t.transfers[0].transaction,
            metadata,
          }
        }),
      ),
    }
  },
}

export default api
