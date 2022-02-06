import { BigNumber } from '@ethersproject/bignumber'
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { Sway } from '../typechain'

export async function createEvent(
  hre: HardhatRuntimeEnvironment,
  minter: string,
): Promise<[BigNumber, string]> {
  const { ethers } = hre
  const { governorAddr } = await hre.getNamedAccounts()
  const governor = await ethers.getSigner(governorAddr!)

  const cSway = (await ethers.getContract('Sway')) as Sway
  const receipt = await (
    await cSway.connect(governor).createEvent(minter)
  ).wait()

  // const reciept = await execute(
  //   'Sway',
  //   {
  //     from: governorAddr,
  //     log: true,
  //   },
  //   'createEvent',
  //   minter
  // );

  return [
    BigNumber.from(
      receipt.events?.filter((e) => e.event === 'EventAdded')[0]?.args?.[0],
    ),
    receipt.transactionHash,
  ]
}
