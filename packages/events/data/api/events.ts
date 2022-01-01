import { readdirSync } from 'fs'
import type { VercelRequest, VercelResponse } from '@vercel/node'

// const DETAILS_DIR = path.resolve(__dirname, 'details')

export default (_request: VercelRequest, response: VercelResponse) => {
  // const files = readdirSync(DETAILS_DIR, { withFileTypes: true })
  response.json(readdirSync(__dirname))
}
