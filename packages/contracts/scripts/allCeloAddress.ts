import { ethers } from 'hardhat'
import * as fs from 'fs'

async function main() {
  // const signer = (await ethers.getSigners())[0]
  // await ethers.provider.ready
  // const provider = ethers.provider
  const provider = new ethers.providers.JsonRpcProvider(
    'https://celo-mainnet--rpc.datahub.figment.io/apikey/0818e746067b0d274b7bb06370d04892/',
  )
  const latestBLock = await provider.getBlockNumber()

  console.log(`Latest block is ${latestBLock}`)

  const address = []

  for (let i = 1; i <= latestBLock; i++) {
    console.log(`Processing Block ${i}`)
    try {
      const block = await provider.getBlockWithTransactions(i)
      for (const tx of block.transactions) {
        console.log(`${tx.hash}`)
        address.push(tx.from)
      }
    } catch (err) {
      if ((err.message as string).includes('invalid')) {
        console.log(`Skipping ${i}, probably empty`)
      } else {
        throw err
      }
    }
  }

  fs.writeFileSync('dump.json', JSON.stringify(address, null, 2))
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
