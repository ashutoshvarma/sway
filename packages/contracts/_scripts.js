#!/usr/bin/env node
'use strict'
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')
require('dotenv').config()

const commandlineArgs = process.argv.slice(2)

const SUBGRAPH_NETWORK_MAPPING = {
  localhost: 'localhost',
  celo: 'celo',
  alfajores: 'celo-alfajores',
}
const CHAIN_ID_MAPPING = {
  localhost: '31337',
  hardhat: '31337',
  alfajores: '44787',
  celo: '42220',
}

function parseArgs(rawArgs, numFixedArgs, expectedOptions) {
  const fixedArgs = []
  const options = {}
  const extra = []
  const alreadyCounted = {}
  for (let i = 0; i < rawArgs.length; i++) {
    const rawArg = rawArgs[i]
    if (rawArg.startsWith('--')) {
      const optionName = rawArg.slice(2)
      const optionDetected = expectedOptions[optionName]
      if (!alreadyCounted[optionName] && optionDetected) {
        alreadyCounted[optionName] = true
        if (optionDetected === 'boolean') {
          options[optionName] = true
        } else {
          i++
          options[optionName] = rawArgs[i]
        }
      } else {
        if (fixedArgs.length < numFixedArgs) {
          throw new Error(
            `expected ${numFixedArgs} fixed args, got only ${fixedArgs.length}`,
          )
        } else {
          extra.push(rawArg)
        }
      }
    } else {
      if (fixedArgs.length < numFixedArgs) {
        fixedArgs.push(rawArg)
      } else {
        for (const opt of Object.keys(expectedOptions)) {
          alreadyCounted[opt] = true
        }
        extra.push(rawArg)
      }
    }
  }
  return { options, extra, fixedArgs }
}

function execute(command) {
  return new Promise((resolve, reject) => {
    const onExit = (error) => {
      if (error) {
        return reject(error)
      }
      resolve()
    }
    spawn(command.split(' ')[0], command.split(' ').slice(1), {
      stdio: 'inherit',
      shell: true,
    }).on('exit', onExit)
  })
}

async function performAction(rawArgs) {
  const firstArg = rawArgs[0]
  const args = rawArgs.slice(1)
  if (firstArg === 'run') {
    const { fixedArgs, extra } = parseArgs(args, 2, {})
    await execute(
      `cross-env HARDHAT_DEPLOY_LOG=true HARDHAT_NETWORK=${
        fixedArgs[0]
      } ts-node --files ${fixedArgs[1]} ${extra.join(' ')}`,
    )
  } else if (firstArg === 'deploy') {
    const { fixedArgs, extra } = parseArgs(args, 1, {})
    await execute(`hardhat --network ${fixedArgs[0]} deploy ${extra.join(' ')}`)
  } else if (firstArg === 'export') {
    const { fixedArgs } = parseArgs(args, 2, {})
    await execute(
      `hardhat --network ${fixedArgs[0]} export --export ${fixedArgs[1]}`,
    )
  } else if (firstArg === 'fork:run') {
    const { fixedArgs, options, extra } = parseArgs(args, 2, {
      deploy: 'boolean',
      blockNumber: 'string',
      'no-impersonation': 'boolean',
    })
    await execute(
      `cross-env ${
        options.deploy ? 'HARDHAT_DEPLOY_FIXTURE=true' : ''
      } HARDHAT_DEPLOY_LOG=true HARDHAT_FORK=${fixedArgs[0]} ${
        options.blockNumber ? `HARDHAT_FORK_NUMBER=${options.blockNumber}` : ''
      } ${
        options['no-impersonation']
          ? `HARDHAT_DEPLOY_NO_IMPERSONATION=true`
          : ''
      } ts-node --files ${fixedArgs[1]} ${extra.join(' ')}`,
    )
  } else if (firstArg === 'fork:deploy') {
    const { fixedArgs, options, extra } = parseArgs(args, 1, {
      blockNumber: 'string',
      'no-impersonation': 'boolean',
    })
    await execute(
      `cross-env HARDHAT_FORK=${fixedArgs[0]} ${
        options.blockNumber ? `HARDHAT_FORK_NUMBER=${options.blockNumber}` : ''
      } ${
        options['no-impersonation']
          ? `HARDHAT_DEPLOY_NO_IMPERSONATION=true`
          : ''
      } hardhat deploy ${extra.join(' ')}`,
    )
  } else if (firstArg === 'fork:node') {
    const { fixedArgs, options, extra } = parseArgs(args, 1, {
      blockNumber: 'string',
      'no-impersonation': 'boolean',
    })
    await execute(
      `cross-env HARDHAT_FORK=${fixedArgs[0]} ${
        options.blockNumber ? `HARDHAT_FORK_NUMBER=${options.blockNumber}` : ''
      } ${
        options['no-impersonation']
          ? `HARDHAT_DEPLOY_NO_IMPERSONATION=true`
          : ''
      } hardhat node ${extra.join(' ')}`,
    )
  } else if (firstArg === 'fork:test') {
    const { fixedArgs, options, extra } = parseArgs(args, 1, {
      blockNumber: 'string',
      'no-impersonation': 'boolean',
    })
    console.log({ fixedArgs, options, extra })
    await execute(
      `cross-env HARDHAT_FORK=${fixedArgs[0]} ${
        options.blockNumber ? `HARDHAT_FORK_NUMBER=${options.blockNumber}` : ''
      } ${
        options['no-impersonation']
          ? `HARDHAT_DEPLOY_NO_IMPERSONATION=true`
          : ''
      } HARDHAT_DEPLOY_FIXTURE=true HARDHAT_COMPILE=true mocha --bail --recursive test ${extra.join(
        ' ',
      )}`,
    )
  } else if (firstArg === 'fork:dev') {
    const { fixedArgs, options, extra } = parseArgs(args, 1, {
      blockNumber: 'string',
      'no-impersonation': 'boolean',
    })
    await execute(
      `cross-env HARDHAT_FORK=${fixedArgs[0]} ${
        options.blockNumber ? `HARDHAT_FORK_NUMBER=${options.blockNumber}` : ''
      } ${
        options['no-impersonation']
          ? `HARDHAT_DEPLOY_NO_IMPERSONATION=true`
          : ''
      } hardhat node --watch --export contractsInfo.json ${extra.join(' ')}`,
    )
  } else if (firstArg === 'subgraph:abi') {
    const { fixedArgs } = parseArgs(args, 1, {})
    const network = fixedArgs[0] ? fixedArgs[0] : 'localhost'
    const swayDeployment = JSON.parse(
      fs.readFileSync(
        path.resolve(
          __dirname,
          'deployments',
          network,
          'Sway_Implementation.json',
        ),
      ),
    )
    const swayDropDeployment = JSON.parse(
      fs.readFileSync(
        path.resolve(
          __dirname,
          'deployments',
          network,
          'SwayDrop_Implementation.json',
        ),
      ),
    )
    fs.writeFileSync(
      path.resolve(__dirname, '../subgraph/abis/Sway.json'),
      JSON.stringify(swayDeployment.abi, null, 2),
    )
    fs.writeFileSync(
      path.resolve(__dirname, '../subgraph/abis/SwayDrop.json'),
      JSON.stringify(swayDropDeployment.abi, null, 2),
    )
  } else if (firstArg === 'subgraph:config') {
    const { fixedArgs } = parseArgs(args, 1, {})
    const network = fixedArgs[0] ? fixedArgs[0] : 'localhost'
    const configPath = path.resolve(
      __dirname,
      '../subgraph/config',
      `${network}.json`,
    )

    const config = JSON.parse(fs.readFileSync(configPath))
    const deployments = JSON.parse(
      fs.readFileSync(path.resolve(__dirname, 'deployments.json')),
    )[CHAIN_ID_MAPPING[network]][0].contracts

    config.network =
      network === 'localhost' ? 'celo' : SUBGRAPH_NETWORK_MAPPING[network]
    config['SwayAddress'] = deployments['Sway'].address
    config['SwayDropAddress'] = deployments['SwayDrop'].address
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2))

    fs.writeFileSync(
      path.resolve(__dirname, '../subgraph/abis/Sway.json'),
      JSON.stringify(deployments['Sway'].abi, null, 2),
    )
    fs.writeFileSync(
      path.resolve(__dirname, '../subgraph/abis/SwayDrop.json'),
      JSON.stringify(deployments['SwayDrop'].abi, null, 2),
    )
  }
}

performAction(commandlineArgs)
