import { CONFIGS, SwayConfig, SwayNetworkNames } from '../src/config'

export function getConfig(network: string): SwayConfig {
  // convert to camel case
  network = network.split('')[0]?.toUpperCase() + network.slice(1)
  if (!(network in SwayNetworkNames))
    throw new Error(`Network ${network} not found in SwayNetworkNames`)

  return CONFIGS[network as SwayNetworkNames]
}
