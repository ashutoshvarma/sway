import { ReactElement, useEffect, useState } from 'react'
import styles from './Collections.module.css'
import Card from './Card'
import api from '../../utils/api'

import { useContractKit } from '@celo-tools/use-contractkit'
import 'react-dropdown/style.css'
import Dropdown from 'react-dropdown'

const options: [string, string, string, string] = [
  'Created: High to Low',
  'Created: Low to High',
  'Event Id: High to Low',
  'Event Id: Low to High',
]
// created by, event idy
const defaultOption = options[0]

export interface Token {
  created: string
  metadataUri: string
  transactionHash?: string | undefined
  eventId: string
  image_url?: string
}

function Collections(): ReactElement {
  const { connect, address } = useContractKit()
  const [tokens, setTokens] = useState<Token[] | null>(null)
  const [sorting, setSorting] = useState<string>(options[0])
  const [tokenLoading, setTokenLoading] = useState<Boolean>(false)
  useEffect(() => {
    ; (async () => {
      if (address) {
        setTokenLoading(true)
        let data = await api.getUserTokenInfo(address)
        let newTokens: Token[] = data ? data.tokens : []
        newTokens = sortTokens(newTokens)

        // fetching metadata
        let metadataPromises = newTokens.map(async (t, i) => {
          let metadata = await api.getEventMetadata(t.eventId)
          // if(account?.tokens?.length > i)
          newTokens[i]!.image_url = metadata.image
        })
        await Promise.all(metadataPromises)

        setTokens(newTokens)
        setTokenLoading(false)
      } else setTokens(null)
    })()
    // eslint-disable-next-line
  }, [address])

  useEffect(() => {
    if (tokens) {
      let sortedTokens = sortTokens(tokens)
      setTokens(sortedTokens)
    }
    // eslint-disable-next-line
  }, [sorting])

  const sortTokens = (tokens: Token[]) => {
    let newTokens = [...tokens]
    switch (sorting) {
      case 'Created: High to Low':
        newTokens.sort((a, b) => Number(Number(b.created) - Number(a.created)))
        break

      case 'Created: Low to High':
        newTokens.sort((a, b) => Number(Number(a.created) - Number(b.created)))
        break

      case 'Event Id: High to Low':
        newTokens.sort((a, b) => Number(Number(b.eventId) - Number(a.eventId)))
        break
      case 'Event Id: Low to High':
        newTokens.sort((a, b) => Number(Number(a.eventId) - Number(b.eventId)))
        break
    }
    return newTokens
  }

  const renderTokens = () => {
    if (!address)
      return (
        <div className={styles['ConnectDiv']}>
          <h3>
            You are not connected to any wallet right now.
            <br />
            Please connect to a wallet to see your collections.
          </h3>
          <button onClick={connect}>Connect</button>
        </div>
      )
    else if (tokenLoading)
      return (
        <div className={styles['CollectionGrid']}>
          <Card loading />
          <Card loading />
          <Card loading />
        </div>
      )
    else if (!tokenLoading && !tokens?.length)
      return (
        <div className={styles['ConnectDiv']}>
          <h3>You're yet to own a Sway!</h3>
        </div>
      )
    else
      return (
        <div className={styles['CollectionGrid']}>
          {tokens?.map((token, i) => (
            <Card key={i} token={token} />
          ))}
        </div>
      )
  }

  return (
    <section className={styles['Collection']}>
      <div className="wrapper narrow">
        <div className={styles['Header']}>
          <h3>Collection</h3>
          <div style={{ display: 'flex' }}>
            <Dropdown
              options={options}
              onChange={(op) => {
                setSorting(op.value)
                console.log(op.value)
              }}
              className={styles['DropdownRoot']}
              controlClassName={styles['Dropdown']}
              placeholderClassName={styles['DropdownPlaceholder']}
              menuClassName={styles['DropdownMenu']}
              value={defaultOption}
              placeholder="Select an option"
            />
          </div>
        </div>
        {renderTokens()}
      </div>
    </section>
  )
}

export default Collections
