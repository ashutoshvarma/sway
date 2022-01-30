import { ReactElement, useEffect, useState } from 'react'
import {
  useContractKit,
  useGetConnectedSigner,
} from '@celo-tools/use-contractkit'
import { EthersSwaySDK, getSwayConfig } from '@sway/sdk'

const MESSAGE = 'HALO_PEPAL'
const EVENT_ID = '1'

export function MembershipDemo(): ReactElement {
  const { account, network, connect } = useContractKit()
  const getSigner = useGetConnectedSigner()
  const [eligible, setEligible] = useState<boolean>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setEligible(undefined)
  }, [account])

  const checkVerified = async () => {
    const signer = await getSigner()
    const provider = signer.provider
    const config = getSwayConfig(network.chainId)
    if (!config || !account) return
    const sdk = new EthersSwaySDK(config, provider)
    const signedMsg = await sdk.getSignedMessage(MESSAGE, signer)
    const result = sdk.verifySignedMessage(account, MESSAGE, signedMsg)

    if (!result) return

    const tokens = await sdk.getUserTokenInfo(account)
    const isEligible = tokens.filter((t) => t.eventId === EVENT_ID).length > 0
    setEligible(isEligible)
  }

  return (
    <section
      style={{
        marginTop: '400px',
        marginBottom: '200px',
        alignContent: 'center',
        justifyContent: 'center',
        display: 'flex',
      }}
    >
      {eligible === true && (
        <div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/OE6RXetj_X0"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
      {!account && (
        <button
          onClick={() => connect()}
          style={{ width: '100px', height: '50px' }}
        >
          Connect
        </button>
      )}
      {account && eligible === undefined && (
        <button
          onClick={() => {
            setLoading(true)
            checkVerified().finally(() => setLoading(false))
          }}
          style={{ width: '100px', height: '50px' }}
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Unlock'}
        </button>
      )}
      {account && eligible === false && (
        <p>
          The address {account} doesn't own NFT for Event {EVENT_ID}.
        </p>
      )}
    </section>
  )
}
