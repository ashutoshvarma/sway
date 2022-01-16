import { CONFIG } from './environment'

export const SUBGRAPH_URL =
  process.env['REACT_APP_SUBGRAPH_URL'] || CONFIG.server.subgraph
export const METADATA_URL =
  process.env['REACT_APP_METADATA_URL'] || `${CONFIG.server.static}metadata`
export const MERKLE_URL =
  process.env['REACT_APP_MERKLE_URL'] || `${CONFIG.server.static}merkle`
