/// <reference types="react-scripts" />
interface Window {
    ethereum?: {
      isMetaMask?: boolean
      request: (args: { method: string; params: unknown[] }) => Promise<void>
    }
    celo?: {
      on?: (...args: any[]) => void
      removeListener?: (...args: any[]) => void
      autoRefreshOnNetworkChange?: boolean
    }
    web3?: unknown
    MSStream: any
  }
