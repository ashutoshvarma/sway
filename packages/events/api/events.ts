import * as fs from 'fs'
import * as path from 'path'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { NFTMetadata } from '../src/events'

const METADATA_DIR = path.resolve(__dirname, '..', 'data/metadata')
const EVENTS_METADATA = fs
  .readdirSync(METADATA_DIR, { withFileTypes: true })
  .map((f) => {
    if (f.isFile() && f.name.includes('json')) {
      return <NFTMetadata>JSON.parse(
        fs.readFileSync(path.join(METADATA_DIR, f.name), {
          encoding: 'utf8',
        }),
      )
    }
    return undefined
  })

export default async (_request: VercelRequest, response: VercelResponse) => {
  response.json(EVENTS_METADATA)
}
