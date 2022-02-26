import 'reflect-metadata'
import * as fs from 'fs'
import * as path from 'path'
import { plainToInstance } from 'class-transformer'
import { SwayDropParticipants } from './events'
import { validateOrReject } from 'class-validator'
import { isAddress } from '@ethersproject/address'
import { SwayNetworkNames } from '@sway/common/src'

export const DIR_DATA = path.resolve(__dirname, '..', 'data')
export const IMG_EXT = 'png'
export interface SwayStaticDirs {
  baseData: string
  images: string
  details: string
  merkle: string
  metadata: string
}

export function getStaticDirs(network: SwayNetworkNames): SwayStaticDirs {
  const baseData = path.resolve(DIR_DATA, network.toLowerCase())
  return {
    baseData,
    details: path.resolve(baseData, 'details'),
    images: path.resolve(baseData, 'images'),
    merkle: path.resolve(baseData, 'merkle'),
    metadata: path.resolve(baseData, 'metadata'),
  }
}

export function getEventMerkleJSONPath(id: number, network: string): string {
  if (
    Object.values(SwayNetworkNames)
      .map((v) => v.toLowerCase())
      .includes(network as SwayNetworkNames)
  ) {
    const merkleDir = getStaticDirs(network as SwayNetworkNames).merkle
    const p = path.resolve(merkleDir, `${id.toString()}.json`)
    if (!fs.existsSync(p))
      throw new Error(`Cannot find merkle json file for event ${id}`)
    return p
  } else {
    throw new Error(`Network ${network} is not a valid SwayNetwork`)
  }
}

export async function getEventMerkleParticipants(
  id: number,
  network: string,
  participantsJsonPath?: string,
): Promise<SwayDropParticipants> {
  const jsonPath = participantsJsonPath || getEventMerkleJSONPath(id, network)
  const participants = plainToInstance(
    SwayDropParticipants,
    JSON.parse(await fs.promises.readFile(jsonPath, { encoding: 'utf8' })),
  )

  await validateOrReject(participants)
  // verify all are address
  if (!participants.participants.every((a: string) => isAddress(a)))
    throw new Error('Not all Participants are valid')

  return participants
}
