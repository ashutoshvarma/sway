import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
// import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from './reportWebVitals'
import {
  ContractKitProvider,
  Alfajores,
  CeloMainnet,
} from '@celo-tools/use-contractkit'
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
      }}
      network={Alfajores}
      networks={[Alfajores]}
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
