import { CONFIGS, SwayConfig, SwayNetworkNames } from './config'
import * as networks from './networks'
import { isNumeric } from './utils'

export type { Sway, SwayDrop } from '@sway/contracts/typechain'
export * from './config'
export * from './networks'

export function getConfigFromChainId(
  chainId: number | string,
): SwayConfig | undefined {
  const cId = Number(chainId)
  const network = Object.values(networks).filter((n) => n.chainId === cId)[0]
  if (network) {
    return CONFIGS[network.name]
  } else {
    return undefined
  }
}

export function getConfigFromName(
  network: string | SwayNetworkNames,
): SwayConfig | undefined {
  // convert to camel case
  network = network.split('')[0]?.toUpperCase() + network.slice(1)
  if (!(network in SwayNetworkNames)) return undefined

  return CONFIGS[network as SwayNetworkNames]
}

export function getSwayConfig(
  networkNameOrChainId: number | string | SwayNetworkNames,
): SwayConfig | undefined {
  if (isNumeric(networkNameOrChainId)) {
    return getConfigFromChainId(networkNameOrChainId)
  } else {
    return getConfigFromName(networkNameOrChainId as string)
  }
}
