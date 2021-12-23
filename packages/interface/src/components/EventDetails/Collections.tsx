import React, { ReactElement } from 'react'
import styles from './Collections.module.css'

interface Props {}

function Collections({}: Props): ReactElement {
  return (
    <section className={styles.Collections}>
      <div className="wrapper narrow">
        <h3>Collection</h3>
        <div className={styles.CollectionGrid}>
          <thead>
            <tr>
              <th className={styles.TableHeader}>SwayId</th>
              <th className={styles.TableHeader}>Collections</th>
              <th className={styles.TableHeader}>Minting Date</th>
              <th className={styles.TableHeader}>TX Count</th>
              <th className={styles.TableHeader}>Power</th>
            </tr>
          </thead>
          <tbody>
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
            <TableRow />
          </tbody>
        </div>
      </div>
    </section>
  )
}

function TableRow({}) {
  return (
    <tr>
      <td className={styles.MobileLabel}>SwayId</td>
      <td>#1222</td>
      <td className={styles.MobileLabel}>Collections</td>
      <td>O9238ud89ud48hd7744993</td>
      <td className={styles.MobileLabel}>Minting Date</td>
      <td>3 days ago</td>
      <td className={styles.MobileLabel}>TX Count</td>
      <td>1</td>
      <td className={styles.MobileLabel}>Power</td>
      <td>1</td>
    </tr>
  )
}

export default Collections
