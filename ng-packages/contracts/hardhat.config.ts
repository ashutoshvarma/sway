import 'dotenv/config';
import {HardhatUserConfig} from 'hardhat/types';
import {task} from 'hardhat/config';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers';
import 'hardhat-gas-reporter';
import 'hardhat-contract-sizer';
import 'hardhat-tracer';
import '@typechain/hardhat';
import 'solidity-coverage';
import '@ubeswap/hardhat-celo';
import {fornoURLs, ICeloNetwork, derivationPath} from '@ubeswap/hardhat-celo';
import {node_url, accounts} from './utils/network';

task('accounts', 'Prints the list of accounts', async (args, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(await account.address);
  }
});

// While waiting for hardhat PR: https://github.com/nomiclabs/hardhat/pull/1542
if (process.env.HARDHAT_FORK) {
  process.env['HARDHAT_DEPLOY_FORK'] = process.env.HARDHAT_FORK;
}

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.4',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  namedAccounts: {
    deployerAddr: 0,
    governorAddr: 1,
    proxyAdminAddr: 2,
  },
  networks: {
    hardhat: {
      // process.env.HARDHAT_FORK will specify the network that the fork is made from.
      // this line ensure the use of the corresponding accounts
      accounts: {
        ...accounts(process.env.HARDHAT_FORK),
        count: 8,
        path: derivationPath,
        accountsBalance: '10000000000000000000000',
      },
      forking: process.env.HARDHAT_FORK
        ? {
            // TODO once PR merged : network: process.env.HARDHAT_FORK,
            url: node_url(process.env.HARDHAT_FORK),
            blockNumber: process.env.HARDHAT_FORK_NUMBER
              ? parseInt(process.env.HARDHAT_FORK_NUMBER)
              : undefined,
          }
        : undefined,
    },
    localhost: {
      url: node_url('localhost'),
      accounts: {
        ...accounts(),
        count: 8,
        path: derivationPath,
        accountsBalance: '10000000000000000000000',
      },
    },
    alfajores: {
      url: fornoURLs[ICeloNetwork.ALFAJORES],
      accounts: {
        ...accounts('alfajores'),
        count: 8,
        path: derivationPath,
      },
      chainId: ICeloNetwork.ALFAJORES,
      live: true,
      gasPrice: 0.5 * 10 ** 9,
      gas: 8000000,
    },
    celo: {
      url: fornoURLs[ICeloNetwork.MAINNET],
      accounts: {
        ...accounts('celo'),
        count: 8,
        path: derivationPath,
      },
      chainId: ICeloNetwork.ALFAJORES,
      live: true,
      gasPrice: 0.5 * 10 ** 9,
      gas: 8000000,
    },
  },
  paths: {
    sources: 'src',
  },
  gasReporter: {
    currency: 'USD',
    gasPrice: 100,
    enabled: process.env.REPORT_GAS ? true : false,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    maxMethodDiff: 10,
  },
  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  mocha: {
    timeout: 0,
  },
  contractSizer: {
    runOnCompile: true,
  },
};

export default config;
