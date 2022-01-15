import {
  useContractKit,
  useGetConnectedSigner,
  useProvider,
} from '@celo-tools/use-contractkit'
import { SwayDropParticipants } from '@sway/events/src/events'
import { getMerkleProof } from '@sway/contracts/utils/merkle'
import { useEffect, useMemo, useState } from 'react'
import { getSwayDropContract, indexInParticipants } from '../utils/helpers'

export enum ClaimStatus {
  // already claimed
  CLAIMED,
  // can claim
  AVAIL,
  // cannot claim as not in list
  NOT_AVAIL,
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
      if (account && participants) {
        // check if account in drop list
        if (indexInParticipants(account, participants) !== -1) {
          // get if already claimed
          getSwayDropContract(library)
            .claimed(eventId, account)
            .then((c) =>
              setStatus(c === true ? ClaimStatus.CLAIMED : ClaimStatus.AVAIL),
            )
        } else {
          setStatus(ClaimStatus.NOT_AVAIL)
        }
      }
    } catch (error) {
      console.error(error, { account, eventId })
    } finally {
      setLoading(false)
    }
  }, [eventId, chainId, library])

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
  }, [eventId, chainId, library, getConnectedSigner, participants])
}
