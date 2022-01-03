import { ReactElement } from 'react'
import styles from './Collections.module.css'
import { CollectionInterface } from '../../utils/api'
import moment from 'moment'

interface Props {
  collections: CollectionInterface[] | undefined
  loading: boolean
}

interface RowProps {
  collection?: CollectionInterface
  loading?: boolean
}

function Collections({ collections, loading }: Props): ReactElement {
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
              <th className={styles['TableHeader']}>Power</th>
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
      <td>{collection?.collection}</td>
      <td className={styles['MobileLabel']}>Minting Date</td>
      <td>{collection && moment(Number(collection.timestamp)).fromNow()}</td>
      <td className={styles['MobileLabel']}>TX Count</td>
      <td>{collection?.transferCount}</td>
      <td className={styles['MobileLabel']}>Power</td>
      <td>{collection?.userTokenCount}</td>
    </tr>
  )
}

export default Collections
