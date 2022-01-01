import { readdirSync } from 'fs'
import * as path from 'path'
import type { VercelRequest, VercelResponse } from '@vercel/node'

// const DETAILS_DIR = path.resolve(__dirname, 'details')

export default (request: VercelRequest, response: VercelResponse) => {
  // const files = readdirSync(DETAILS_DIR, { withFileTypes: true })
  const { p } = request.query
  response.json({
    __dirname: readdirSync(__dirname),
    __parent: readdirSync(path.resolve(__dirname, '..')),
    __data: readdirSync(path.resolve(__dirname, '..', 'data')),
    __details: readdirSync(path.resolve(__dirname, '..', 'data/details')),
    __p: readdirSync(path.resolve(__dirname, '..', p ? (p as string) : '')),
  })
}
