import 'reflect-metadata'
import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'
import { plainToInstance } from 'class-transformer'
import { Event as SwayEvent } from './events'
import { validateOrReject } from 'class-validator'

export const DIR_DATA = path.resolve(__dirname, '.', 'data')
export const DIR_IMAGE = path.resolve(DIR_DATA, 'images')
export const DIR_DETAILS = path.resolve(DIR_DATA, 'details')
export const DIR_METADATA = path.resolve(DIR_DATA, 'metadata')
export const DIR_MERKLE = path.resolve(DIR_DATA, 'merkle')
export const IMG_EXT = 'png'

export function getEventImagePath(id: number): string {
  return path.resolve(DIR_IMAGE, `${id.toString()}.${IMG_EXT}`)
}

export async function generateEventMetadata() {
  const files: string[] = await new Promise((resolve, reject) => {
    glob(`*.json`, { cwd: DIR_DETAILS }, (err, files) =>
      err === null ? resolve(files) : reject(err),
    )
  })
  for (const fname of files) {
    const fpath = path.resolve(DIR_DETAILS, fname)
    // const fmeta = path.resolve(DIR_METADATA, fname.split('.')[0])
    const fmeta = path.resolve(DIR_METADATA, fname)
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

    const metadataJson = JSON.stringify(event.metadata(), null, 2)
    await fs.promises.writeFile(fmeta, metadataJson)
  }
}

generateEventMetadata()
