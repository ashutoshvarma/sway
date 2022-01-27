import { SwayNetworkNames } from './config'

export const Celo = {
  name: SwayNetworkNames.Celo,
  rpcUrl: 'https://forno.celo.org',
  graphQl: 'https://explorer.celo.org/graphiql',
  explorer: 'https://explorer.celo.org',
  chainId: 42220,
}

export const Alfajores = {
  name: SwayNetworkNames.Alfajores,
  rpcUrl: 'https://alfajores-forno.celo-testnet.org',
  graphQl: 'https://alfajores-blockscout.celo-testnet.org/graphiql',
  explorer: 'https://alfajores-blockscout.celo-testnet.org',
  chainId: 44787,
}

export const Localhost = {
  name: SwayNetworkNames.Localhost,
  rpcUrl: 'http://localhost:8545',
  graphQl: '',
  explorer: '',
  chainId: 1337,
}
