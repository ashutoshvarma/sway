import {BigNumber, BigNumberish} from '@ethersproject/bignumber';
import {ethers, getNamedAccounts} from 'hardhat';
import {Sway} from '../typechain';
import {MerkleTree} from 'merkletreejs';
import keccak256 from 'keccak256';

export async function createEvent(minter: string): Promise<BigNumber> {
  const {governorAddr} = await getNamedAccounts();
  const governor = await ethers.getSigner(governorAddr);

  const cSway = (await ethers.getContract('Sway')) as Sway;
  const reciept = await (
    await cSway.connect(governor).createEvent(minter)
  ).wait();

  return BigNumber.from(
    reciept.events?.filter((e) => e.event === 'EventAdded')[0].args?.[0]
  );
}

export function calculateMerkleLeaf(
  index: BigNumberish,
  eventId: BigNumberish,
  recipient: string
): string {
  return ethers.utils.solidityKeccak256(
    ['uint256', 'uint256', 'address'],
    [index, eventId, recipient]
  );
}

export function getMerkleTree(
  participants: string[],
  eventId: BigNumberish
): [MerkleTree, string[]] {
  const leafs = participants.map((p, i) => calculateMerkleLeaf(i, eventId, p));
  const tree = new MerkleTree(leafs, keccak256, {sort: true});
  return [tree, leafs];
}

export function getMerkleProof(
  index: number,
  eventId: BigNumberish,
  participants: string[]
): string[] {
  const [tree, leaves] = getMerkleTree(participants, eventId);
  return tree.getHexProof(leaves[index]);
}

export function getMerkleRoot(
  participants: string[],
  eventId: BigNumberish
): string {
  return getMerkleTree(participants, eventId)[0].getHexRoot();
}
