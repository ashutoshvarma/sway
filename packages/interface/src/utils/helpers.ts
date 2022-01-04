import { Mainnet } from '@celo-tools/use-contractkit'
import { DEPLOYMENTS, NETWORK } from './environment'
import { isAddress } from '@ethersproject/address'
import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers'
import { Sway, SwayDrop } from '@sway/contracts/typechain'

export const truncate = (str: string, max_length: number): string => {
  if (str.length > max_length) {
    return str.slice(0, max_length) + '...'
  } else return str
}

export function shortenAddress(address: string, chars = 4): string {
  if (!isAddress(address)) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }
  return `${address.substring(0, chars + 2)}...${address.substring(42 - chars)}`
}

export const explorerLink = (hash: string) => {
  const explorer = NETWORK ? NETWORK.explorer : Mainnet.explorer
  return `${explorer}/tx/${hash}`
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
