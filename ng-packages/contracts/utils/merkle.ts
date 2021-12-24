import { BigNumberish } from "ethers";
import * as ethers from "ethers";
import MerkleTree from "merkletreejs";
import keccak256 from 'keccak256';


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
  const tree = new MerkleTree(leafs, keccak256, { sort: true });
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
