import { Mainnet } from '@celo-tools/use-contractkit'
import { DEPLOYMENTS, NETWORK } from './environment'
import { isAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers'
import { Sway, SwayDrop } from '@sway/contracts/typechain'
import { SwayDropParticipants } from '@sway/events/src/events'

export const truncate = (str: string, max_length: number): string => {
  if (str.length > max_length) {
    return str.slice(0, max_length) + '...'
  } else return str
}

/**
 * Shorten the eth address
 * @param address Valid ETH 42byte hex address
 * @param chars chars to show from start and end
 * @returns shortened address
 * @throws If given address is not a valid eth address
 */
export function shortenAddress(address: string, chars = 4): string {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}

export function indexInParticipants(
  address: string,
  participants: SwayDropParticipants,
): number {
  return participants.participants
    .map((p) => p.toLowerCase())
    .indexOf(address.toLowerCase())
}

export const explorerLink = (hash: string, isTx = false) => {
  const explorer = NETWORK ? NETWORK.explorer : Mainnet.explorer
  return isTx ? `${explorer}/tx/${hash}` : `${explorer}/address/${hash}`
}

// account is not optional
export function getSigner(
  library: Web3Provider,
  account: string,
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(
  library: Web3Provider,
  account?: string,
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(
  address: string,
  ABI: any,
  library: Web3Provider,
  account?: string,
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(
    address,
    ABI,
    getProviderOrSigner(library, account) as any,
  )
}

export function getSwayContract(library: Web3Provider, account?: string) {
  return getContract(
    DEPLOYMENTS?.Sway.address!,
    DEPLOYMENTS?.Sway.abi!,
    library,
    account,
  ) as Sway
}

export function getSwayDropContract(library: Web3Provider, account?: string) {
  return getContract(
    DEPLOYMENTS?.SwayDrop.address!,
    DEPLOYMENTS?.SwayDrop.abi!,
    library,
    account,
  ) as SwayDrop
}
