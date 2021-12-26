import {
  ActionType,
  HardhatRuntimeEnvironment,
  RunSuperFunction,
} from 'hardhat/types';
import {Sway} from '../typechain';

export async function debug(
  taskArgs: any,
  hre: HardhatRuntimeEnvironment,
  runSuper: RunSuperFunction<any>
) {
  const {ethers} = hre;
  const sway = (await ethers.getContract('Sway')) as Sway;

  // admin roles
  const GOVERNOR_ROLE = await sway.GOVERNOR_ROLE();
  const gCount = await sway.getRoleMemberCount(GOVERNOR_ROLE);
  const governors = [];
  for (let i = 0; i < gCount.toNumber(); i++) {
    governors.push(await sway.getRoleMember(GOVERNOR_ROLE, i));
  }

  console.log(`===================`);
  console.log(`Sway Protocol Debug`);
  console.log(`===================`);
  console.log(`=> Governance`);
  console.log(`  Governors Count:          ${gCount.toString()}`);
  console.log(`  Governors:                ${governors}`);
  console.log(`  Paused:                   ${await sway.paused()}`);
  console.log(`=> Sway`);
  console.log(`  Total Supply:             ${await sway.totalSupply()}`);
  console.log(`  Last Event ID:            ${await sway.lastEventId()}`);
}

export async function toggle_pause(
  taskArgs: any,
  hre: HardhatRuntimeEnvironment,
  runSuper: RunSuperFunction<any>
) {
  const {ethers} = hre;
  const sway = (await ethers.getContract('Sway')) as Sway;
  const sGovernor = await ethers.getNamedSigner('governorAddr');

  const paused = await sway.paused();
  console.log(`Paused: ${paused}`);
  const hash = await (
    await (await sway.connect(sGovernor)[paused ? 'unpause' : 'pause']()).wait()
  ).transactionHash;
  console.log(
    `Successfully toggled pause state (Paused: ${await sway.paused()}), txHash - ${hash}`
  );
}