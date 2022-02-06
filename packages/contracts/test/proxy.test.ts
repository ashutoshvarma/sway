import { expect } from './chai-setup'
import { defaultFixture } from './fixture'
import * as hre from 'hardhat'
import { Sway } from '../typechain'
// import {getConfig} from '../utils/constants';

describe('Proxy', () => {
  it('Sway should be initialized properly', async () => {
    const { ethers } = hre
    const { governor } = await defaultFixture()
    const swayImpl = (await ethers.getContract('Sway_Implementation')) as Sway
    // const config = getConfig(hre.network.name);

    // expect(await swayImpl.name()).equals(config.swayName);
    // expect(await swayImpl.symbol()).equals(config.swaySymbol);
    // expect(await swayImpl.isGovernor(await governor.getAddress())).to.be.true;

    await expect(
      swayImpl.initialize(
        'TEST',
        'TEST',
        'TEST',
        'TEST',
        await governor.getAddress(),
      ),
    ).to.reverted
  })
})
