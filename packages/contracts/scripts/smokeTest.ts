import {BigNumber} from '@ethersproject/bignumber';
import {deployments, ethers, getUnnamedAccounts, run, network} from 'hardhat';
import {Sway} from '../typechain';
const {execute} = deployments;

async function swayTest() {
  const sway = (await ethers.getContract('Sway')) as Sway;
  const accounts = await ethers.getSigners();
  const matt = accounts[3];
  const josh = accounts[4];
  const patt = accounts[5];
  const sGovernor = await ethers.getNamedSigner('governorAddr');
  console.log(`using Sway at ${sway.address}`);

  await (await sway.connect(sGovernor).createEvent(matt.address)).wait();
  const mattEventId = await sway.lastEventId();
  console.log(
    `Event(${mattEventId.toString()}) created with ${matt.address} as minter`
  );

  await (
    await sway
      .connect(matt)
      ['mintToken(uint256,address)'](mattEventId, josh.address)
  ).wait();
  console.log(`Minted token to ${josh.address}`);

  const [joshTokenId, joshTokenEventId] = await sway.tokenDetailsOfOwnerByIndex(
    josh.address,
    0
  );

  await sway
    .connect(josh)
    ['safeTransferFrom(address,address,uint256)'](
      josh.address,
      patt.address,
      joshTokenId
    );
}

async function swaySimple() {
  const accounts = await ethers.getSigners();
  const matt = accounts[3];
  const josh = accounts[4];
  const patt = accounts[5];
  const amy = accounts[6];

  const ids: BigNumber[] = [];
  // mint 5 events with matt as minter
  for (let i = 0; i < 5; i++) {
    ids.push(await run('event:create', {minter: matt.address}));
  }
  // mint 5 events with with josh as minter
  for (let i = 0; i < 5; i++) {
    ids.push(await run('event:create', {minter: josh.address}));
  }
  // mint 5 events with with josh as minter
  for (let i = 0; i < 5; i++) {
    ids.push(await run('event:create', {minter: patt.address}));
  }
  console.log(ids.map((v) => v.toString()));

  for (const id of ids) {
    if (id.toNumber() % 2 === 0) {
      await run('event:mint', {event: id.toNumber(), to: matt.address});
    } else {
      await run('event:mint', {event: id.toNumber(), to: patt.address});
    }
    await run('event:mint', {event: id.toNumber(), to: josh.address});
    await run('event:mint', {event: id.toNumber(), to: amy.address});
  }

  for (const id of ids) {
    if (id.toNumber() % 2 === 0) {
      await run('event:minter', {event: id.toNumber(), minter: amy.address});
    }
  }
}

async function main() {
  if (network.name === 'celo')
    throw new Error('Cannot run smokeTest in celo mainnet');

  await swaySimple();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
