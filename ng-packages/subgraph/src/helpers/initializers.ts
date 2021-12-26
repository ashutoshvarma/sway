import { Address, BigInt, ethereum, log } from '@graphprotocol/graph-ts'
import { Token, Account, Event } from '../../generated/schema'
import { Sway } from '../../generated/Sway/Sway'
import { Zero } from './utils'

export function getOrInitToken(tokenId: BigInt, ev: ethereum.Event): Token {
  let token = Token.load(tokenId.toString())
  if (!token) {
    const sway = Sway.bind(ev.address)
    token = new Token(tokenId.toString())
    token.owner = sway.ownerOf(tokenId).toString()
    token.event = sway.tokenEvent(tokenId).toString()
    token.created = ev.block.timestamp
    token.metadataUri = sway.tokenURI(tokenId)
    token.transferCount = Zero
  }
  return token
}

export function getOrInitEvent(eventId: BigInt, ev: ethereum.Event): Event {
  let event = Event.load(eventId.toString())
  if (!event) {
    event = new Event(eventId.toString())
    event.created = ev.block.timestamp
    event.tokenCount = Zero
    event.transferCount = Zero
  }
  return event
}

export function getOrInitAccount(userId: Address): Account {
  let account = Account.load(userId.toHex())
  if (!account) {
    account = new Account(userId.toHex())
    account.tokensOwned = Zero
  }
  return account
}
