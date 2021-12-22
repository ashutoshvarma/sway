import 'reflect-metadata'
import * as fs from 'fs'
import * as path from 'path'
import { glob } from 'glob'

export const DIR_DATA = path.resolve(__dirname, 'data')
export const DIR_IMAGE = path.resolve(DIR_DATA, 'images')
export const DIR_METADATA = path.resolve(DIR_DATA, 'metadata')
export const IMG_EXT = 'png'

export function getEventImagePath(id: number): string {
  return path.resolve(DIR_IMAGE, `${id.toString()}.${IMG_EXT}`)
}

export function exportEventData(dir: string) {
  const files = await new Promise((resolve, reject) => {
    glob(`${DIR_DATA}/*.json`, options, (err, files) =>
      err === null ? resolve(files) : reject(err),
    )
  })
}
