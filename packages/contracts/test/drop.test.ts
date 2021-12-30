import {expect} from './chai-setup';
import {defaultFixture} from './fixture';
import {getUnnamedAccounts} from 'hardhat';
import * as hre from 'hardhat';
import {createEvent} from '../utils/helpers';
import {getMerkleProof, getMerkleRoot} from '../utils/merkle';

describe('SwayDrop', () => {
  it('should be able to claim with valid proof', async () => {
    const {governor, sway, swayDrop, matt} = await defaultFixture();
    const mattAddr = await matt.getAddress();
    const accounts = await getUnnamedAccounts();

    const participants = [accounts[3]!, accounts[4]!];

    const [eventId, _hash] = await createEvent(hre, mattAddr);
    const rootHash = getMerkleRoot(participants, eventId);
    const index = 1;
    const proof = getMerkleProof(index, eventId, participants);
    await sway.connect(governor).addEventDrop(eventId, rootHash);
    // should be able to claim
    await expect(swayDrop.claim(index, eventId, participants[index]!, proof))
      .to.emit(swayDrop, 'TokenClaimed')
      .withArgs(eventId, participants[index]);
    // revert if wrong details
    await expect(
      swayDrop.claim(index + 1, eventId, mattAddr, proof)
    ).to.revertedWith('SwayDrop: recipient not in merkle tree!');
  });
});
