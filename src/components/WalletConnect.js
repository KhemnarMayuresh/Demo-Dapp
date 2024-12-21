import React, { useState } from "react";
import { ethers } from "ethers";

const WalletConnect = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("MetaMask is not installed!");
      return;
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      const balanceInWei = await provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balanceInWei);

      setWalletAddress(address);
      setBalance(balanceInEth);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
  };

  return (
    <div>
        {!walletAddress ? (
          <button className="connect-wallet" onClick={connectWallet}>
            Connect Wallet
          </button>
        ) : (
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
        )}
      </div>
  );
};

export default WalletConnect;
