import {getConfig} from '../utils/constants';
import {expect} from './chai-setup';
import {defaultFixture, singleEventFixture, singleMintFixture} from './fixture';
import {network} from 'hardhat';
import {BigNumber} from '@ethersproject/bignumber';

describe('Sway', () => {
  it('should have correct name, symbol', async () => {
    const {sway} = await defaultFixture();
    const config = getConfig(network.name);
    await expect(await sway.name()).equals(config.swayName);
    await expect(await sway.symbol()).equals(config.swaySymbol);
  });

  it('minter should be able to mint', async () => {
    const {matt, sway, josh} = await singleEventFixture();
    const joshAddr = await josh.getAddress();
    await expect(await sway.isEventMinter('1', await matt.getAddress())).to
      .true;

    await expect(
      sway['mintToken(uint256,address)']('1', joshAddr)
    ).to.revertedWith('SwayAdmin: sender does not have Minter Role in Event');
    await expect(
      sway.connect(matt)['mintToken(uint256,address)']('1', joshAddr)
    )
      .to.emit(sway, 'EventToken')
      .withArgs('1', '1');
  });

  it('tokenUri() should work correctly', async () => {
    const {sway, josh} = await singleMintFixture();
    const config = getConfig(network.name);
    await expect(await sway.ownerOf('1')).equals(await josh.getAddress());

    await expect(await sway.tokenURI('1')).equals(`${config.swayBaseUri}1/1.json`);
    await expect(sway.tokenURI('99999')).to.revertedWith(
      'Sway: URI query for nonexistent token'
    );
  });

  it('setBaseURI() should work correctly ', async () => {
    const {sway, governor} = await singleMintFixture();
    await sway.connect(governor).setBaseURI('abc/');
    await expect(await sway.tokenURI('1')).equals('abc/1/1.json');
  });

  it('setBaseURIExtension() should work correctly ', async () => {
    const {sway, governor} = await singleMintFixture();
    await sway.connect(governor).setBaseURI('abc/');
    await sway.connect(governor).setBaseURIExtension('');
    await expect(await sway.tokenURI('1')).equals('abc/1/1');
  });

  it('tokenDetailsOfOwnerByIndex() should work correctly', async () => {
    const {sway, josh} = await singleMintFixture();
    await expect(
      await (
        await sway.tokenDetailsOfOwnerByIndex(await josh.getAddress(), '0')
      ).map((t) => t.toString())
    ).to.deep.members(['1', '1']);
  });
});
