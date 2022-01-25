import 'reflect-metadata'
import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'
import { plainToInstance } from 'class-transformer'
import { Event as SwayEvent } from './events'
import { validateOrReject } from 'class-validator'
import { SwayNetworkNames } from '@sway/common/src'
import { getStaticDirs, SwayStaticDirs } from './index'

export async function generateMetadata(network: SwayNetworkNames) {
  console.log(`Building Metadata for ${network}`)
  const dirs = getStaticDirs(network)
  await _generate(dirs)
  console.log()
}

async function _generate(dirs: SwayStaticDirs) {
  const files: string[] = await new Promise((resolve, reject) => {
    glob(`*.json`, { cwd: dirs.details }, (err, files) =>
      err === null ? resolve(files) : reject(err),
    )
  })
  for (const fname of files) {
    const fpath = path.resolve(dirs.details, fname)
    // const fmeta = path.resolve(DIR_METADATA, fname.split('.')[0])
    const fmeta = path.resolve(dirs.metadata, fname)
    console.log(`Processing ${fname}`)

    const event = plainToInstance(
      SwayEvent,
      JSON.parse(await fs.promises.readFile(fpath, { encoding: 'utf8' })),
    )
    // validate
    try {
      await validateOrReject(event)
    } catch (errors) {
      console.log(
        'Caught promise rejection (validation failed). Errors: ',
        errors,
      )
      console.log(`Skipping ${fname}`)
      continue
    }

    const eventId = fname.split('.')[0]
    if (!eventId)
      throw new Error(`Cannot extract eventId from file name - ${fname}`)

    const metadataJson = JSON.stringify(event.metadata(eventId), null, 2)
    await fs.promises.writeFile(fmeta, metadataJson)
  }
}

async function main() {
  for (const network in SwayNetworkNames) {
    if (network === SwayNetworkNames.hardhat) continue
    await generateMetadata(network as SwayNetworkNames)
  }
}

main()
  .catch((error) => {
    console.error(error)
  })
  .then(() => process.exit(0))
