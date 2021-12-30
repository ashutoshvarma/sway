import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {getConfig} from '../utils/constants';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy, execute} = deployments;
  const config = getConfig(hre.network.name);

  const {deployerAddr, governorAddr, proxyAdminAddr} = await getNamedAccounts();

  const dSway = await deploy('Sway', {
    contract: 'Sway',
    from: deployerAddr!,
    proxy: {
      owner: proxyAdminAddr,
      proxyContract: 'OpenZeppelinTransparentProxy',
      execute: {
        methodName: 'initialize',
        args: [
          config.swayName,
          config.swaySymbol,
          config.swayBaseUri,
          config.swayBaseUriExtension,
          governorAddr,
        ],
      },
    },
    log: true,
  });

  const dSwayDrop = await deploy('SwayDrop', {
    contract: 'SwayDrop',
    from: deployerAddr!,
    proxy: {
      owner: proxyAdminAddr,
      proxyContract: 'OpenZeppelinTransparentProxy',
      execute: {
        methodName: 'initialize',
        args: ['SwayDrop', dSway.address, governorAddr],
      },
    },
    log: true,
  });

  await execute(
    'Sway',
    {from: governorAddr!, log: true},
    'setDrop',
    dSwayDrop.address
  );
};

export default func;
func.tags = ['Sway', 'SwayDrop'];
