import React from "react";
import { useWallet } from "../context/WalletContext";

const WalletStatus = () => {
  const { walletAddress, balance, connectWallet, disconnectWallet } = useWallet();

  return (
    <div>
      {walletAddress ? (
        <div>
           <div className="wallet-info">
            <span className="wallet-address">
              <strong>Address:</strong> {walletAddress.slice(0, 6)}...
              {walletAddress.slice(-4)}
            </span>
            <span className="wallet-balance">
              <strong>Balance:</strong> {balance} ETH
            </span>
            <button className="disconnect-btn" onClick={disconnectWallet}>
              <span className="disconnect-icon">✖</span>
            </button>
          </div>
        </div>
      ) : (
        <button className="connect-wallet" onClick={connectWallet}>
            Connect Wallet
          </button>
      )}
    </div>
  );
};

export default WalletStatus;
