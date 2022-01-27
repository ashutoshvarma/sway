import { CONFIGS, Celo, Alfajores, Localhost } from '@sway/common/src'

export const SUPPORTED_NETWORKS = [Alfajores, Celo, Localhost]
export const NETWORK_CHAIN_ID = Number(
  process.env['REACT_APP_NETWORK_CHAIN_ID'],
)
export const NETWORK = getNetwork()
export const CONFIG = CONFIGS[NETWORK.name]

function getNetwork() {
  const chainIds = SUPPORTED_NETWORKS.map((n) => n.chainId)
  if (!isNaN(NETWORK_CHAIN_ID) && chainIds.includes(NETWORK_CHAIN_ID)) {
    const network = SUPPORTED_NETWORKS.filter(
      (n) => n.chainId === NETWORK_CHAIN_ID,
    )
    console.log(
      `Using network ${network[0]?.name}, with config - ${JSON.stringify(
        network,
        null,
        2,
      )}`,
    )
    return network[0]!
  } else {
    throw new Error(
      `Please set valid REACT_APP_NETWORK_CHAIN_ID. Supported chainIds are ${SUPPORTED_NETWORKS.map(
        (n) => n.chainId,
      )}`,
    )
  }
}
