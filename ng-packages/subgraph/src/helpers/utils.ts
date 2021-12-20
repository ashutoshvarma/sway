import { BigInt } from '@graphprotocol/graph-ts'
import { Transfer as TransferEvent } from '../../generated/Sway/Sway'

export const Zero = BigInt.fromI32(0)
export const One = BigInt.fromI32(1)

export function createTransferID(ev: TransferEvent): string {
  return ev.block.number.toString().concat('-').concat(ev.logIndex.toString())
}
