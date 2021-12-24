import {BigNumber} from 'ethers';
import {
  ActionType,
  HardhatRuntimeEnvironment,
  RunSuperFunction,
} from 'hardhat/types';
import {createEvent} from '../utils/helpers';
import {getMerkleRoot, getMerkleProof} from '../utils/merkle';
import {Sway, SwayDrop} from '../typechain';
import assert from 'assert';
import {getEventMerkleParticipants} from '../events';

export type CreateEventArgs = {minter: string};
export type MintArgs = {event: number; to: string; minter?: number};
export type ClaimArgs = {
  event: number;
  to: string;
  json?: string;
};
export type AddEventDropArgs = {
  event: number;
  json?: string;
  update?: boolean;
};

export async function create_event(
  taskArgs: CreateEventArgs,
  hre: HardhatRuntimeEnvironment,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: RunSuperFunction<CreateEventArgs>
): Promise<BigNumber> {
  const {ethers} = hre;
  const sway = (await ethers.getContract('Sway')) as Sway;

  console.log(taskArgs);

  const eventId = (await sway.lastEventId()).add(1);
  console.log(
    `Creating Event(${eventId.toString()}) with minter(${taskArgs.minter})...`
  );
  // creating event
  const [id, hash] = await createEvent(hre, taskArgs.minter);
  console.log(`Successfully created Event(${id.toString()}), txHash - ${hash}`);
  assert(
    id.eq(eventId),
    `create_event: Expected Event ID ${eventId.toString()} but got ${id.toString()}`
  );
  return id;
}

export async function add_event_drop(
  taskArgs: AddEventDropArgs,
  hre: HardhatRuntimeEnvironment,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: RunSuperFunction<AddEventDropArgs>
): Promise<void> {
  const {ethers} = hre;
  const sway = (await ethers.getContract('Sway')) as Sway;
  const swayDrop = (await ethers.getContract('SwayDrop')) as SwayDrop;
  const sGovernor = await ethers.getNamedSigner('governorAddr');
  console.log(taskArgs);
  const participants = await getEventMerkleParticipants(
    taskArgs.event,
    taskArgs.json
  );
  const root = getMerkleRoot(participants.participants, taskArgs.event);
  console.log(`Total Participants - ${participants.participants.length}`);
  console.log(`Calculated Merkle Root Hash - ${root}`);

  let hash;
  if (taskArgs.update) {
    hash = await (
      await (
        await swayDrop.connect(sGovernor).updateEvent(taskArgs.event, root)
      ).wait()
    ).transactionHash;
  } else {
    hash = await (
      await (
        await sway.connect(sGovernor).addEventDrop(taskArgs.event, root)
      ).wait()
    ).transactionHash;
  }
  console.log(
    `Successfully add/update drop for Event(${taskArgs.event.toString()}), txHash - ${hash}`
  );
}

export async function mint(
  taskArgs: MintArgs,
  hre: HardhatRuntimeEnvironment,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: RunSuperFunction<MintArgs>
): Promise<void> {
  const {ethers} = hre;
  const sway = (await ethers.getContract('Sway')) as Sway;
  const accounts = await ethers.getSigners();
  const minter = taskArgs.minter ? accounts[taskArgs.minter] : accounts[1];

  console.log(
    `Minting token for Event(${taskArgs.event.toString()}) for ${
      taskArgs.to
    }...`
  );
  const reciept = await (
    await sway
      .connect(minter)
      ['mintToken(uint256,address)'](taskArgs.event, taskArgs.to)
  ).wait();
  const tokenId = reciept.events?.filter((e) => e.event === 'EventToken')[0]
    .args?.[1];
  console.log(
    `Successfully minted Token(${tokenId}), txHash - ${reciept.transactionHash}`
  );
}

export async function claim(
  taskArgs: ClaimArgs,
  hre: HardhatRuntimeEnvironment,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _: RunSuperFunction<ClaimArgs>
): Promise<void> {
  const {ethers} = hre;
  const sway = (await ethers.getContract('Sway')) as Sway;
  const swayDrop = (await ethers.getContract('SwayDrop')) as SwayDrop;

  const dropParticipants = await getEventMerkleParticipants(
    taskArgs.event,
    taskArgs.json
  );

  const index = dropParticipants.participants.indexOf(taskArgs.to);
  if (index === -1)
    throw new Error(`Couldn't find ${taskArgs.to} in participants`);

  const proof = getMerkleProof(
    index,
    taskArgs.event,
    dropParticipants.participants
  );

  console.log(
    `Claiming token for Event(${taskArgs.event.toString()}) for ${
      taskArgs.to
    }...`
  );

  const reciept = await (
    await swayDrop.claim(index, taskArgs.event, taskArgs.to, proof)
  ).wait();

  console.log(
    `Successfully claimed Token, txHash - ${reciept.transactionHash}`
  );
}
