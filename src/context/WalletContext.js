import React, { createContext, useContext, useState, useEffect } from "react";
import { ethers } from "ethers";

// Create the Wallet Context
const WalletContext = createContext();

// Wallet Context Provider Component
export const WalletProvider = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);

  // Connect to MetaMask wallet
  const connectWallet = async () => {
    try {
      setLoading(true);
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask is not installed!");
        return;
      }
      const provider = new ethers.BrowserProvider(window.ethereum);
       // Check the network ID to confirm it's Sepolia Testnet
       const network = await provider.getNetwork();
       if (network.name !== "sepolia") {
         alert("Please switch to Sepolia Testnet in MetaMask!");
         return;
       }
       // get account 
      const accounts = await provider.send("eth_requestAccounts", []);
      const address = accounts[0];
      setWalletAddress(address);

      // Get the balance of the connected wallet (in Ether)
      const balanceInWei = await provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balanceInWei);
      const bal = parseFloat(balanceInEth.toString());
      setBalance(bal?.toFixed(4));
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = () => {
    setWalletAddress(null);
    setBalance(null);
  };

  // Use Effect to check if the wallet is already connected when the page reloads
  // useEffect(() => {
  //   if (typeof window.ethereum !== "undefined") {
  //     const provider = new ethers.BrowserProvider(window.ethereum);
  //     if (provider) {
  //       provider.send("eth_requestAccounts", [])
  //         .then(accounts => {
  //           const walletAddress = accounts?.[0] ?? null;
  //           setWalletAddress(walletAddress);
  //         })
  //         .catch(() => setWalletAddress(null));

  //     }
  //   }
  // }, []);

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        balance,
        loading,
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the Wallet Context
export const useWallet = () => useContext(WalletContext);
