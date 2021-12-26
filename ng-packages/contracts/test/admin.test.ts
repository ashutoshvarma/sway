import {expect} from './chai-setup';
import {defaultFixture, singleEventFixture} from './fixture';

describe('SwayAdmin', () => {
  it('initialize should run only once during proxy', async () => {
    const {sway, matt} = await defaultFixture();
    await expect(sway.initialize('', '', '', '', await matt.getAddress())).to
      .reverted;
  });

  it('check pause, unpause', async () => {
    const {governor, sway} = await defaultFixture();
    // should fail if not governor
    await expect(sway.pause()).to.revertedWith(
      'SwayAdmin: sender does not have Governor Role'
    );
    await expect(sway.unpause()).to.revertedWith(
      'SwayAdmin: sender does not have Governor Role'
    );

    // governor should be able to pause, unpause
    await sway.connect(governor).pause();
    // should fail if already paused
    await expect(sway.connect(governor).pause()).to.revertedWith(
      'Pausable: paused'
    );
    await sway.connect(governor).unpause();
    // should fail if already unpaused
    await expect(sway.connect(governor).unpause()).to.revertedWith(
      'Pausable: not paused'
    );
  });

  it('check is governor role guard', async () => {
    const {governor, sway, matt} = await defaultFixture();
    const governorAddr = await governor.getAddress();
    const mattAddr = await matt.getAddress();
    await expect(await sway.isGovernor(governorAddr)).to.true;
    await expect(await sway.isGovernor(mattAddr)).to.false;
    // add matt as governor
    await sway
      .connect(governor)
      .grantRole(await sway.GOVERNOR_ROLE(), mattAddr);
    await expect(await sway.isGovernor(mattAddr)).to.true;
    // remove matt as governor
    await sway
      .connect(governor)
      .revokeRole(await sway.GOVERNOR_ROLE(), mattAddr);
    await expect(await sway.isGovernor(mattAddr)).to.false;
  });

  it('should be able to create event', async () => {
    const {governor, sway, matt, josh} = await defaultFixture();
    const mattAddr = await matt.getAddress();
    const joshAddr = await josh.getAddress();

    // only governor can create event
    await expect(sway.createEvent(mattAddr)).to.be.reverted;
    // should be able to create events
    await expect(sway.connect(governor).createEvent(mattAddr))
      .to.emit(sway, 'EventAdded')
      .withArgs(
        '1',
        mattAddr,
        '0xc89efdaa54c0f20c7adf612882df0950f5a951637e0307cdcb4c672f298b8bc6'
      );
    await expect(sway.connect(governor).createEvent(joshAddr))
      .to.emit(sway, 'EventAdded')
      .withArgs(
        '2',
        joshAddr,
        '0xad7c5bef027816a800da1736444fb58a807ef4c9603b7848673f7e3a68eb14a5'
      );

    // matt should be minter for eventId 1
    await expect(await sway.isEventMinter('1', mattAddr)).to.true;
    // josh should be minter for eventId 2
    await expect(await sway.isEventMinter('2', joshAddr)).to.true;
  });

  it('should be able to add event minters', async () => {
    const {governor, matt, josh, sway} = await singleEventFixture();
    const mattAddr = await matt.getAddress();
    const joshAddr = await josh.getAddress();
    // matt should be event minter
    await expect(await sway.isEventMinter('1', mattAddr)).to.be.true;
    // josh should not be a event minter
    await expect(await sway.isEventMinter('1', joshAddr)).to.be.false;
    // add josh as event minter
    await sway.connect(governor).addEventMinter('1', joshAddr);
    await expect(await sway.isEventMinter('1', joshAddr)).to.be.true;

    // only governor can add minters
    await expect(sway.addEventMinter('1', mattAddr)).to.reverted;
  });

  it('should be able to add additional governor', async () => {
    const {governor, matt, josh, sway} = await singleEventFixture();
    const GOVERNOR_ROLE = await sway.GOVERNOR_ROLE();
    const joshAddr = await josh.getAddress();
    await sway.connect(governor).grantRole(GOVERNOR_ROLE, joshAddr);
    // josh should now be governor
    await expect(await sway.isGovernor(joshAddr)).to.be.true;
    // josh should be able to access governor gaurded functions
    await sway.connect(josh).pause();
  });
});
