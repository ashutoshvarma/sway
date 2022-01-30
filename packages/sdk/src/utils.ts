export function throwError(funcName: string, msg: string) {
  throw new Error(`${funcName}: ${msg}`)
}
