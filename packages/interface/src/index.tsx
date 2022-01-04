import '@celo-tools/use-contractkit/lib/styles.css'
import icon from './assets/logo192.png'

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  Alfajores,
  ContractKitProvider,
  Mainnet,
} from '@celo-tools/use-contractkit'
import { NETWORK } from './utils/environment'

if (window.celo) {
  window.celo.autoRefreshOnNetworkChange = false
}

if (!NETWORK) {
  throw new Error('Please set the valid network')
} else {
  console.log(
    `Using network ${NETWORK.name}, with config - ${JSON.stringify(NETWORK)}`,
  )
}

ReactDOM.render(
  <React.StrictMode>
    <ContractKitProvider
      dapp={{
        name: 'Sway',
        description:
          'The interface for Sway, a decentralized souvenir protocol',
        url: 'https://sway.community',
        icon: icon,
      }}
      network={NETWORK}
      networks={[Mainnet, Alfajores]}
      connectModal={{
        reactModalProps: {
          style: {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              transform: 'translate(-50%, -50%)',
              border: 'unset',
              background: 'unset',
              padding: 'unset',
              color: 'black',
            },
            overlay: {
              zIndex: 100,
            },
          },
          ariaHideApp: false,
          overlayClassName:
            'tw-fixed tw-bg-gray-100 dark:tw-bg-gray-700 tw-bg-opacity-75 tw-inset-0',
        },
      }}
    >
      <App />
    </ContractKitProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
