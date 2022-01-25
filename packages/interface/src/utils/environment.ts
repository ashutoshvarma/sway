import { Alfajores, Mainnet } from '@celo-tools/use-contractkit'

// we don't have celo deployments so temporality using alfajores ones as
// placeholder
import SwayCelo from '@sway/contracts/deployments/alfajores/Sway.json'
import SwayDropCelo from '@sway/contracts/deployments/alfajores/SwayDrop.json'
// alfajores
import SwayAlfajores from '@sway/contracts/deployments/alfajores/Sway.json'
import SwayDropAlfajores from '@sway/contracts/deployments/alfajores/SwayDrop.json'
import { CONFIGS, SwayNetworkNames } from '@sway/common/src'

export const NETWORK_CHAIN_ID = Number(
  process.env['REACT_APP_NETWORK_CHAIN_ID'],
)
export const NETWORK =
  NETWORK_CHAIN_ID === Mainnet.chainId
    ? Mainnet
    : NETWORK_CHAIN_ID === Alfajores.chainId
    ? Alfajores
    : null

export const DEPLOYMENTS =
  NETWORK && NETWORK.chainId === Mainnet.chainId
    ? {
        Sway: SwayCelo,
        SwayDrop: SwayDropCelo,
      }
    : NETWORK && NETWORK.chainId === Alfajores.chainId
    ? {
        Sway: SwayAlfajores,
        SwayDrop: SwayDropAlfajores,
      }
    : null

export const CONFIG =
  NETWORK && NETWORK.chainId === Mainnet.chainId
    ? CONFIGS[SwayNetworkNames.celo]
    : CONFIGS[SwayNetworkNames.alfajores]
