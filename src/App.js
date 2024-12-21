import React from 'react';
import WalletConnect from './components/WalletConnect';
import WalletConnectWeb3 from './components/WalletConnectWeb3';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header-bar">
        <WalletConnect />
      </div>
      <div className="main-content">
      <h1>Wallet Connect DApp</h1>
      {/* <div className="balance-info">
        <div className="erc20-balance">
          <strong>Balance ERC20:</strong> 10
        </div>
        <div className="erc20-balance">
          <strong>Balance ERC20:</strong> 10
        </div>
      </div> */}
      </div>
    </div>
  );
}

export default App;
