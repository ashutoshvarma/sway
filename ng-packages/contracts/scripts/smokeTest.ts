import {deployments, ethers, getUnnamedAccounts} from 'hardhat';
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

  await sway.connect(josh)['safeTransferFrom(address,address,uint256)'](
    josh.address,
    patt.address,
    joshTokenId
  );
}

async function main() {
  await swayTest();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
