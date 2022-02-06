import {
  ethers,
  deployments,
  getUnnamedAccounts,
  getNamedAccounts,
  tracer,
} from 'hardhat'
import { Sway, SwayDrop } from '../typechain'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function defaultFixture() {
  await deployments.fixture()

  const { governorAddr, deployerAddr } = await getNamedAccounts()
  const governor = await ethers.provider.getSigner(governorAddr)

  const sway = (await ethers.getContract('Sway')) as Sway
  const swayDrop = (await ethers.getContract('SwayDrop')) as SwayDrop

  const accounts = await getUnnamedAccounts()
  const matt = await ethers.provider.getSigner(accounts[0])
  const josh = await ethers.provider.getSigner(accounts[1])
  const anna = await ethers.provider.getSigner(accounts[2])

  try {
    tracer.nameTags[governorAddr!] = 'Governor'
    tracer.nameTags[deployerAddr!] = 'Deployer'
    tracer.nameTags[accounts[0]!] = 'Matt'
    tracer.nameTags[accounts[1]!] = 'Josh'
    tracer.nameTags[accounts[2]!] = 'Anna'
  } catch {}

  return {
    governor,
    sway,
    swayDrop,
    matt,
    josh,
    anna,
  }
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function singleEventFixture() {
  const fixture = await defaultFixture()
  const mattAddr = await fixture.matt.getAddress()
  await fixture.sway.connect(fixture.governor).createEvent(mattAddr)
  return fixture
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function singleMintFixture() {
  const fixture = await defaultFixture()
  const mattAddr = await fixture.matt.getAddress()
  const joshAddr = await fixture.josh.getAddress()
  await fixture.sway.connect(fixture.governor).createEvent(mattAddr)
  await fixture.sway
    .connect(fixture.governor)
    ['mintToken(uint256,address)']('1', joshAddr)
  return fixture
}
