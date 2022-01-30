import { Address, BigInt, log } from '@graphprotocol/graph-ts'
import {
  Sway,
  Approval,
  ApprovalForAll,
  EventAdded,
  EventToken,
  Paused,
  RoleAdminChanged,
  RoleGranted,
  RoleRevoked,
  Transfer as TransferEvent,
  Unpaused,
} from '../generated/Sway/Sway'
import { Transfer } from '../generated/schema'
import {
  getOrInitAccount,
  getOrInitToken,
  getOrInitEvent,
} from './helpers/initializers'
import { createTransferID, One } from './helpers/utils'

export function handleEventAdded(ev: EventAdded): void {
  getOrInitEvent(ev.params.eventId, ev)
}

export function handleEventToken(ev: EventToken): void {
  const event = getOrInitEvent(ev.params.eventId, ev)
  const token = getOrInitToken(ev.params.tokenId, ev)

  event.tokenCount += One
  token.event = event.id

  event.save()
  token.save()
}

export function handleTransfer(ev: TransferEvent): void {
  log.info('handleTransfer', [])
  const token = getOrInitToken(ev.params.tokenId, ev)
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const event = getOrInitEvent(BigInt.fromString(token.event), ev)
  const from = getOrInitAccount(ev.params.from)
  const to = getOrInitAccount(ev.params.to)
  const transfer = new Transfer(createTransferID(ev))

  // If from is Address(0) then skip
  if (from.id != Address.zero().toHex()) {
    from.tokensOwned -= One
  }

  // increase count in 'to'
  to.tokensOwned += One

  // update token owner and transfer count
  token.owner = to.id
  token.transferCount += One

  // update event
  event.transferCount += One
  // Burning the token
  if (to.id == Address.zero().toHex()) {
    event.tokenCount -= One
    // Subtract all the transfers from the burned token
    event.transferCount -= token.transferCount
  }

  transfer.token = token.id
  transfer.from = from.id
  transfer.to = to.id
  transfer.transaction = ev.transaction.hash
  transfer.timestamp = ev.block.timestamp
  transfer.event = token.event

  token.save()
  from.save()
  to.save()
  event.save()
  transfer.save()
}
