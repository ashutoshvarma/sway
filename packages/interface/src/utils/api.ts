import { request, gql } from 'graphql-request'
import { MERKLE_URL, METADATA_URL, SUBGRAPH_URL } from './constants'
import {
  Event as SwayEvent,
  SwayDropParticipants,
} from '@sway/events/src/events'

interface EventTransferResponse {
  transfers: {
    token: {
      transferCount: string
      id: string
      created: string
    }
    to: {
      id: string
    }
    transaction: string
  }[]
}

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
      transferCount: string
      transfers: { transaction: string; timestamp: string }[]
    }[]
  }
}

export interface EventInterface {
  metadata: SwayEvent
  id: string
  tokenCount: string
  transferCount: string
  created: string
}

export interface CollectionInterface {
  collection: string
  tokenId: string
  timestamp: string
  transferCount: string
  userTokenCount: number | undefined
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

export const eventTransferQuery = gql`
  query getTransfers($eventId: String) {
    transfers(where: { event: $eventId }) {
      token {
        transferCount
        id
        created
      }
      to {
        id
      }
      transaction
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
        transferCount
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

  getEventMerkleDetails: async (
    eventId: string,
  ): Promise<SwayDropParticipants> => {
    return await (await fetch(`${MERKLE_URL}/${eventId}.json`)).json()
  },

  /**
   * Get all the events from subgraph along with their metadata
   * @param maxCount Maximum events to fetch
   * @param last Last Event
   * @returns Event details
   * @example
   * ```ts
   * // Get the first 10 events (in desc order)
   * let events = await getEventMetadata(10)
   * // save the last event to state
   * let lastEvent = events[events.length]
   * // to get the next 10 events
   * let nextEvents = await getEventMetadata(10, lastEvent)
   * ```
   */
  getEvents: async (
    maxCount: number,
    last: { created: string } = {
      created: Number.MAX_SAFE_INTEGER.toString(),
    },
  ): Promise<EventInterface[]> => {
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

  /**
   * Get the Users' Tokens Info
   * @param address Address of User
   * @returns Token info if user owns one or more token or else null
   */
  getUserTokenInfo: async (
    address: string,
  ): Promise<{
    tokensOwned: string
    tokens: {
      created: string
      metadataUri: string
      transactionHash?: string
      eventId: string
    }[]
  } | null> => {
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
      tokens: account.tokens.map((t) => {
        return {
          created: t.created,
          metadataUri: t.metadataUri,
          transactionHash: t.transfers[0]?.transaction,
          eventId: t.event.id,

        }
      }),
    }
  },

  getEventsTransfer: async (
    eventId: string,
  ): Promise<
    {
      collection: string
      tokenId: string
      timestamp: string
      transferCount: string
      userTokenCount: number | undefined
    }[]
  > => {
    const transfers = (
      await request<EventTransferResponse>(SUBGRAPH_URL, eventTransferQuery, {
        eventId,
      })
    ).transfers

    return Promise.all(
      transfers.map(async (t) => {
        return {
          collection: t.to.id,
          tokenId: t.token.id,
          timestamp: t.token.created,
          transferCount: t.token.transferCount,
          // power
          userTokenCount: (await api.getUserTokenInfo(t.to.id))?.tokens.length,
        }
      }),
    )
  },
}

export default api
