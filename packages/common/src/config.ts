// celo
import SwayCelo from './deployments/celo/Sway.json'
import SwayDropCelo from './deployments/celo/SwayDrop.json'
// alfajores
import SwayAlfajores from './deployments/alfajores/Sway.json'
import SwayDropAlfajores from './deployments/alfajores/SwayDrop.json'
// localhost
import SwayLocalhost from './deployments/localhost/Sway.json'
import SwayDropLocalhost from './deployments/localhost/SwayDrop.json'

export interface SwayConfig {
  contracts: {
    symbol: string
    name: string
    baseUriExtension: string
    // make sure url ends with trailing '/'
    baseUri: string
  }
  server: {
    static: string
    subgraph: string
  }
  deployments: {
    sway: { address: string; abi: any[] }
    swayDrop: { address: string; abi: any[] }
  }
}

export enum SwayNetworkNames {
  Celo = 'Celo',
  Alfajores = 'Alfajores',
  Localhost = 'Localhost',
  Hardhat = 'Hardhat',
}

export const CONFIGS: {
  [key in SwayNetworkNames]: SwayConfig
} = {
  [SwayNetworkNames.Celo]: {
    contracts: {
      symbol: 'SWAY',
      name: 'Sway Protocol',
      baseUriExtension: '',
      // make sure url ends with trailing '/'
      baseUri: 'https://static.sway.community/celo/metadata/',
    },
    server: {
      static: 'https://static.sway.community/celo/',
      subgraph: '',
    },
    deployments: {
      sway: SwayCelo,
      swayDrop: SwayDropCelo,
    },
  },
  [SwayNetworkNames.Alfajores]: {
    contracts: {
      symbol: 'A-SWAY',
      name: 'Sway Protocol on Alfajores Testnet',
      baseUriExtension: '',
      // make sure url ends with trailing '/'
      baseUri: 'https://static.sway.community/alfajores/metadata/',
    },
    server: {
      static: 'https://static.sway.community/alfajores/',
      subgraph:
        'https://api.thegraph.com/subgraphs/name/ashutoshvarma/sway-alfajores',
    },
    deployments: {
      sway: SwayAlfajores,
      swayDrop: SwayDropAlfajores,
    },
  },
  [SwayNetworkNames.Localhost]: {
    contracts: {
      symbol: 'SWAY',
      name: 'Sway Protocol',
      baseUriExtension: '',
      // make sure url ends with trailing '/'
      baseUri: 'https://static.sway.community/localhost/metadata/',
    },
    server: {
      static: 'http://localhost:3001/localhost/',
      subgraph:
        ' http://localhost:8000/subgraphs/name/ashutoshvarma/sway-localhost',
    },
    deployments: {
      sway: SwayLocalhost,
      swayDrop: SwayDropLocalhost,
    },
  },
  [SwayNetworkNames.Hardhat]: {
    contracts: {
      symbol: 'SWAY',
      name: 'Sway Protocol',
      baseUriExtension: '',
      // make sure url ends with trailing '/'
      baseUri: 'https://static.sway.community/localhost/metadata/',
    },
    server: {
      static: 'http://localhost:3001/localhost/',
      subgraph:
        ' http://localhost:8000/subgraphs/name/ashutoshvarma/sway-localhost',
    },
    deployments: {
      sway: SwayLocalhost,
      swayDrop: SwayDropLocalhost,
    },
  },
}
