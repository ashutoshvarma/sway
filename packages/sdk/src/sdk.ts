import { SignatureLike } from '@ethersproject/bytes'
import { SwayConfig } from '@sway/common'
import { ethers } from 'ethers'
import { TokenInfo } from './types'
import { throwError } from './utils'

export abstract class SwaySDKBase {
  constructor(
    public config: SwayConfig,
    public provider?: ethers.providers.Provider,
  ) {}

  ensureProvider() {
    if (!this.provider)
      throwError('SwaySDKBase::ensureProvider()', 'Missing valid provider')
  }

  async getSignedMessage(
    message: string,
    signer: ethers.Signer,
  ): Promise<string> {
    return await signer.signMessage(message)
  }

  verifySignedMessage(
    address: string,
    message: string,
    signature: SignatureLike,
  ): boolean {
    const recovered = ethers.utils.verifyMessage(message, signature)
    return address.toLowerCase() === recovered.toLowerCase()
  }

  abstract getUserTokenInfo(userAddress: string): Promise<TokenInfo[]>
}
