import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { getConfig } from '../utils/constants'
import { SwayDrop__factory, Sway__factory } from '../typechain'
import { saveProxy, sleep } from '../utils/deploy'

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, upgrades, ethers } = hre
  const { governorAddr } = await getNamedAccounts()
  const sDeployer = await ethers.getNamedSigner('deployerAddr')
  const { save } = deployments
  const config = getConfig(hre.network.name)

  console.log(
    `Deploy Config: ${JSON.stringify(
      {
        server: config.server,
        contracts: config.contracts,
      },
      null,
      2,
    )}`,
  )

  const Sway = (await ethers.getContractFactory<Sway__factory>('Sway')).connect(
    sDeployer,
  )
  const swayProxy = await upgrades.deployProxy(
    Sway,
    [
      config.contracts.name,
      config.contracts.symbol,
      config.contracts.baseUri,
      config.contracts.baseUriExtension,
      governorAddr,
    ],
    {
      kind: 'uups',
    },
  )
  await swayProxy.deployed()
  console.log(`deploy Sway with Proxy at ${swayProxy.address}`)

  // deploy SwayDrop
  const SwayDrop = await (
    await ethers.getContractFactory<SwayDrop__factory>('SwayDrop')
  ).connect(sDeployer)
  const swayDropProxy = await upgrades.deployProxy(
    SwayDrop,
    ['SwayDrop', swayProxy.address],
    {
      kind: 'uups',
    },
  )
  await swayDropProxy.deployed()
  console.log(`deploy SwayDrop with Proxy at ${swayDropProxy.address}`)

  await sleep(5000)

  const swayDropImplAddr = await upgrades.erc1967.getImplementationAddress(
    swayDropProxy.address,
  )
  const swayImplAddr = await upgrades.erc1967.getImplementationAddress(
    swayProxy.address,
  )

  const swayDeployment = await deployments.getExtendedArtifact('Sway')
  const swayArtifact = {
    address: swayProxy.address,
    ...swayDeployment,
  }
  const swayDropDeployment = await deployments.getExtendedArtifact('SwayDrop')
  const swayDropArtifact = {
    address: swayDropProxy.address,
    ...swayDropDeployment,
  }

  await save('Sway_Implementation', {
    address: swayImplAddr,
    ...swayDeployment,
  })
  await save('SwayDrop_Implementation', {
    address: swayDropImplAddr,
    ...swayDropDeployment,
  })
  await saveProxy(hre, 'Sway', swayProxy.address)
  await saveProxy(hre, 'SwayDrop', swayProxy.address)
  await save('Sway', swayArtifact)
  await save('SwayDrop', swayDropArtifact)

  return hre.network.live ? true : false
}

export default func
func.id = '001_deploy_core'
func.tags = ['Sway', 'SwayDrop']
