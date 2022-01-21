import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from '@celo-tools/use-contractkit'
import { SwayDropParticipants } from '@sway/events/src/events'
import { getMerkleProof } from '@sway/contracts/utils/merkle'
import { useEffect, useMemo, useState, useRef } from 'react'
import { getSwayDropContract, indexInParticipants } from '../utils/helpers'
import api, { EventInterface } from '../utils/api'
import { Document } from 'flexsearch'

export const MAX_EVENTS_GRAPH_FETCH = 999

export enum EventSortBy {
  ID = 'id',
  TokenCount = 'tokenCount',
  TransferCount = 'transferCount',
  Created = 'created',
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}
export interface EventSearchOptions {
  page: number
  maxCount: number
  query?: string
  sortBy: EventSortBy
  sortDirection: SortDirection
}

export enum ClaimStatus {
  // already claimed
  CLAIMED,
  // can claim
  AVAIL,
  // cannot claim as not in list
  NOT_AVAIL,
  // wallet not connected
  NOT_CONNECTED,
}

export function useClaimStatus(
  eventId: string,
  participants?: SwayDropParticipants,
): [ClaimStatus, boolean] {
  const { network, address: account } = useContractKit()
  const chainId = network.chainId
  const library = useProvider()
  const [status, setStatus] = useState<ClaimStatus>(ClaimStatus.NOT_AVAIL)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    try {
      setLoading(true)
      if (!account) setStatus(ClaimStatus.NOT_CONNECTED)
      else if (account && participants?.participants) {
        // check if account in drop list
        if (indexInParticipants(account, participants) !== -1) {
          // get if already claimed
          getSwayDropContract(library)
            .claimed(eventId, account)
            .then((c) => {
              setStatus(c === true ? ClaimStatus.CLAIMED : ClaimStatus.AVAIL)
            })
        } else {
          setStatus(ClaimStatus.NOT_AVAIL)
        }
      }
    } catch (error) {
      console.error(error, { account, eventId })
    } finally {
      setLoading(false)
    }
  }, [account, participants, eventId, chainId, library])

  return [status, loading]
}

export function useClaimCallback(
  eventId: string,
  participants?: SwayDropParticipants,
): {
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const { network, address: account } = useContractKit()
  const chainId = network.chainId
  const library = useProvider()
  const getConnectedSigner = useGetConnectedSigner()

  return useMemo(() => {
    if (!library || !account || !chainId || !participants) {
      return {
        callback: null,
        error: 'Missing dependencies',
      }
    }

    return {
      callback: async function onSwap(): Promise<string> {
        try {
          const signer = await getConnectedSigner()
          const swayDrop = getSwayDropContract(library, account).connect(signer)
          const index = indexInParticipants(account, participants)
          const proof = getMerkleProof(
            index,
            eventId,
            participants.participants,
          )
          const hash = (
            await (await swayDrop.claim(index, eventId, account, proof)).wait()
          ).transactionHash
          return hash
        } catch (error: any) {
          // if the user rejected the tx, pass this along
          if (error?.code === 4001) {
            throw new Error('Transaction rejected.')
          } else {
            // otherwise, the error was unexpected and we need to convey that
            console.error(`Claim failed`, error, {
              eventId,
              account,
              participants,
            })
            throw new Error(`Claim failed: ${error.message}`)
          }
        }
      },
      error: null,
    }
  }, [account, eventId, chainId, library, getConnectedSigner, participants])
}

export function useGetFetchEvents() {
  const [loading, setLoading] = useState(true)
  const [events, setEvents] = useState<EventInterface[]>([])

  const documentRef = useRef<Document<EventInterface>>(
    new Document({
      preset: 'match',
      document: {
        id: 'id',
        index: ['metadata:name', 'metadata:description'],
      },
    }),
  )
  const document = documentRef.current

  const fetchAllEvents = async () => {
    const fetchedEvents = await api.getEvents(MAX_EVENTS_GRAPH_FETCH)
    let newEvents = fetchedEvents
    while (newEvents.length > 0) {
      const lastEvent = newEvents[newEvents.length - 1]
      newEvents = await api.getEvents(MAX_EVENTS_GRAPH_FETCH, lastEvent)
      fetchedEvents.push(...newEvents)
    }

    // populate document
    await Promise.all(
      fetchedEvents.map(async (e) => {
        await document.addAsync(e.id, e)
      }),
    )

    // set events
    setEvents(fetchedEvents)
    // we need to set loading false first
    setLoading(false)
  }

  useEffect(() => {
    setLoading(true)
    fetchAllEvents().finally(() => setLoading(false))
    // eslint-disable-next-line
  }, [])

  /**
   * Fetch Events
   * @param options Search Options, page index starts at 0
   * @param appendList max events in a page
   * @returns
   */
  return {
    fetchEvents: (
      options: EventSearchOptions,
      appendList?: EventInterface[],
    ) => {
      let filtered = events
      if (options.query) {
        const results = document.search(options.query)
        const resSet = new Set<string>()
        for (const res of results) {
          res.result.every((r) => resSet.add(r as string))
        }
        console.log({
          options,
          results,
          resSet,
          t: document.export(console.log),
        })
        filtered = filtered.filter((v) => resSet.has(v.id))
      }

      filtered.sort((a, b) =>
        options.sortDirection === SortDirection.Ascending
          ? Number(a[options.sortBy]) - Number(b[options.sortBy])
          : Number(b[options.sortBy]) - Number(a[options.sortBy]),
      )

      const startIdx = options.page * options.maxCount
      const endIdx = startIdx + options.maxCount
      const paginated = filtered.slice(startIdx, endIdx)
      const next = endIdx <= filtered.length ? options.page + 1 : undefined
      return {
        events: appendList ? [...appendList, ...paginated] : paginated,
        loading,
        next,
        maxCount: options.maxCount,
      }
    },
    loading,
  }
}
