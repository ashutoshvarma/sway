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
}

export enum SwayNetworkNames {
  celo = 'celo',
  alfajores = 'alfajores',
  localhost = 'localhost',
  hardhat = 'hardhat',
}

export const CONFIGS: {
  [key in SwayNetworkNames]: SwayConfig
} = {
  [SwayNetworkNames.celo]: {
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
  },
  [SwayNetworkNames.alfajores]: {
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
        'https://thegraph.com/hosted-service/subgraph/ashutoshvarma/sway-alfajores',
    },
  },
  [SwayNetworkNames.localhost]: {
    contracts: {
      symbol: 'SWAY',
      name: 'Sway Protocol',
      baseUriExtension: '',
      // make sure url ends with trailing '/'
      baseUri: 'https://static.sway.community/lo/metadata/',
    },
    server: {
      static: 'http://localhost:8000/localhost/',
      subgraph: 'http://localhost:5000/localhost/',
    },
  },
  [SwayNetworkNames.hardhat]: {
    contracts: {
      symbol: 'SWAY',
      name: 'Sway Protocol',
      baseUriExtension: '',
      // make sure url ends with trailing '/'
      baseUri: 'https://static.sway.community/lo/metadata/',
    },
    server: {
      static: 'http://localhost:8000/localhost/',
      subgraph: 'http://localhost:5000/localhost/',
    },
  },
}
