import 'reflect-metadata';
import * as fs from 'fs';
import * as path from 'path';
import {glob} from 'glob';
import {plainToInstance} from 'class-transformer';
import {Event as SwayEvent, SwayDropParticipants} from './events';
import {validateOrReject} from 'class-validator';
import {isAddress} from '@ethersproject/address';

export const DIR_DATA = path.resolve(__dirname, 'data');
export const DIR_IMAGE = path.resolve(DIR_DATA, 'images');
export const DIR_DETAILS = path.resolve(DIR_DATA, 'details');
export const DIR_METADATA = path.resolve(DIR_DATA, 'metadata');
export const DIR_MERKLE = path.resolve(DIR_DATA, 'merkle');
export const IMG_EXT = 'png';

export function getEventImagePath(id: number): string {
  const p = path.resolve(DIR_IMAGE, `${id.toString()}.${IMG_EXT}`);
  if (!fs.existsSync(p))
    throw new Error(`Cannot find image file for event ${id}`);
  return p;
}

export function getEventMerkleJSONPath(id: number): string {
  const p = path.resolve(DIR_MERKLE, `${id.toString()}.json`);
  if (!fs.existsSync(p))
    throw new Error(`Cannot find merkle json file for event ${id}`);
  return p;
}

export async function getEventMerkleParticipants(
  id: number,
  participantsJsonPath?: string
): Promise<SwayDropParticipants> {
  const jsonPath = participantsJsonPath || getEventMerkleJSONPath(id);
  const participants = plainToInstance(
    SwayDropParticipants,
    JSON.parse(await fs.promises.readFile(jsonPath, {encoding: 'utf8'}))
  );

  await validateOrReject(participants);
  // verify all are address
  if (!participants.participants.every((a: string) => isAddress(a)))
    throw new Error('Not all Participants are valid');

  return participants;
}
