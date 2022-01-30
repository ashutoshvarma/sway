import { Sway, SwayConfig } from '@sway/common'
import { ethers } from 'ethers'
import { SwaySDKBase } from './sdk'
import { TokenInfo } from './types'

async function ethersUserSwayInfo(
  userAddress: string,
  swayConfig: SwayConfig,
  provider: ethers.providers.Provider,
): Promise<TokenInfo[]> {
  const deployment = swayConfig.deployments.sway
  const sway = new ethers.Contract(
    deployment.address,
    deployment.abi,
    provider,
  ) as Sway
  const tokensInfo: TokenInfo[] = []
  for (let idx = 0; ; idx++) {
    try {
      const tokenInfo = await sway.tokenDetailsOfOwnerByIndex(userAddress, idx)
      tokensInfo.push({
        eventId: tokenInfo.eventId.toString(),
        tokenId: tokenInfo.tokenId.toString(),
      })
    } catch (e: any) {
      if (e.message.includes('Internal JSON-RPC error')) {
        return tokensInfo
      } else {
        throw e
      }
    }
  }
}

export class EthersSwaySDK extends SwaySDKBase {
  async getUserTokenInfo(userAddress: string): Promise<TokenInfo[]> {
    this.ensureProvider()
    return ethersUserSwayInfo(userAddress, this.config, this.provider!)
  }
}
