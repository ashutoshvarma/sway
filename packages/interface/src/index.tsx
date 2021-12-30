import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals'
import { ContractKitProvider, Alfajores } from '@celo-tools/use-contractkit'
import '@celo-tools/use-contractkit/lib/styles.css'
import icon from './assets/logo192.png'

ReactDOM.render(
  <React.StrictMode>
    <ContractKitProvider
      dapp={{
        name: 'Sway',
        description:
          'The interface for Sway, a decentralized souvenir protocol',
        url: 'https://example.com',
        icon: icon,
        supportedNetworks: [Alfajores],
      }}
      network={Alfajores}
      networks={[Alfajores]}
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
