import React from 'react';
import { WalletProvider } from "./context/WalletContext";
import WalletStatus from './components/WalletStatus';
import ERC20Balance from './components/ERC20Balance';
import MintNFT from './components/MintNFT';
import './App.css';

function App() {
  return (
    <WalletProvider>
      <div className="App">
        <div className="header-bar">
          <WalletStatus />
        </div>
        <div className="main-content">
          <h1>Wallet Connect DApp</h1>
          <ERC20Balance />
          <MintNFT />
        </div>
      </div>
    </WalletProvider>
  );
}

export default App;
