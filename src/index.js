import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { WagmiConfig, createConfig, configureChains /*mainnet*/ } from 'wagmi'
import { bscTestnet } from 'viem/chains';
import { publicProvider } from 'wagmi/providers/public'

import { Chain } from 'wagmi'

/*
export const ganache = {
  id: 1337,
  name: 'Ganache',
  network: '5777',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['HTTP://127.0.0.1:7545'] },
    default: { http: ['HTTP://127.0.0.1:7545'] },
  },
  blockExplorers: {
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  contracts: {
    multicall3: {
      address: '0x464bFb52175310C0F002928C6379D6CCb212F3D5',
      blockCreated: 1662,//11_907_934,
    },
  },
}
*/


const { chains, publicClient, webSocketPublicClient } = configureChains(
  [bscTestnet],//mainnet],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
})



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  //<React.StrictMode>
    <WagmiConfig config={config}>
      <App />
    </WagmiConfig>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
console.log(reportWebVitals());
