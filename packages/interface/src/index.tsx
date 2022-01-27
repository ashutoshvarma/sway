import '@celo-tools/use-contractkit/lib/styles.css'
import icon from './assets/logo192.png'

import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import {
  ContractKitProvider,
  Network as UCKNetwork,
} from '@celo-tools/use-contractkit'
import { Celo, Alfajores, Localhost } from '@sway/common/src'
import { NETWORK } from './utils/environment'

if (window.celo) {
  window.celo.autoRefreshOnNetworkChange = false
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
      network={NETWORK as unknown as UCKNetwork}
      networks={[
        Celo as unknown as UCKNetwork,
        Alfajores as unknown as UCKNetwork,
        Localhost as unknown as UCKNetwork,
      ]}
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
