import { ReactElement, useEffect, useState } from 'react'
import styles from './Collections.module.css'

import { explorerLink } from '../../utils/helpers'
import api, { CollectionInterface } from '../../utils/api'

import moment from 'moment'

interface Props {
  eventId: string
}

interface RowProps {
  collection?: CollectionInterface
  loading?: boolean
}

function Collections({ eventId: id }: Props): ReactElement {
  const [loading, setLoading] = useState<boolean>(true)
  const [collections, setCollection] = useState<
    CollectionInterface[] | undefined
  >()
  //Fetching Collections
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const collectionsData = (await api.getEventsTransfer(id)).sort(
        (a, b) => Number(b.timestamp) - Number(a.timestamp),
      )
      setCollection(collectionsData)
      setLoading(false)
    })()
  }, [id])

  return (
    <section className={styles['Collections']}>
      <div className="wrapper narrow">
        <h3>Collection</h3>
        <table className={styles['CollectionGrid']}>
          <thead>
            <tr>
              <th className={styles['TableHeader']}>SwayId</th>
              <th className={styles['TableHeader']}>Collections</th>
              <th className={styles['TableHeader']}>Minting Date</th>
              <th className={styles['TableHeader']}>TX Count</th>
              <th className={styles['TableHeader']}>
                Power
                <span className={`${styles['Info']} popover-container`}>
                  ?
                  <div className={`${styles['InfoContent']} popover-content`}>
                    Total amount of SWAY held by this address
                  </div>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {collections?.map((collection) => (
              <TableRow key={collection.tokenId} collection={collection} />
            ))}
            {loading ? (
              <>
                <TableRow loading />
                <TableRow loading />
                <TableRow loading />
                <TableRow loading />
              </>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function TableRow({ collection, loading }: RowProps) {
  return (
    <tr className={loading ? styles['Loading'] : undefined}>
      <td className={styles['MobileLabel']}>SwayId</td>
      <td>{collection?.tokenId}</td>
      <td className={styles['MobileLabel']}>Collections</td>
      <td>
        <a
          href={collection?.collection && explorerLink(collection?.collection)}
          target="_blank"
          rel="noreferrer"
          className={styles['Link']}
        >
          {collection?.collection}
        </a>
      </td>
      <td className={styles['MobileLabel']}>Minting Date</td>
      <td>
        {collection && moment(Number(collection.timestamp) * 1000).fromNow()}
      </td>
      <td className={styles['MobileLabel']}>TX Count</td>
      <td>{collection?.transferCount}</td>
      <td className={styles['MobileLabel']}>Power</td>
      <td>{collection?.userTokenCount}</td>
    </tr>
  )
}

export default Collections
