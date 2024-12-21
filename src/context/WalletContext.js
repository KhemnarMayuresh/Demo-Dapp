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
      if (accounts.length === 0) {
        alert("No accounts found. Please make sure your MetaMask wallet is unlocked and try again.");
        return;
    }
      const address = accounts[0];
      setWalletAddress(address);

      // Get the balance of the connected wallet (in Ether)
      const balanceInWei = await provider.getBalance(address);
      const balanceInEth = ethers.formatEther(balanceInWei);
      const bal = parseFloat(balanceInEth.toString());
      setBalance(bal?.toFixed(4));
    } catch (error) {
      console.error("Error connecting to wallet:", error);
      // Handle different types of errors and provide specific messages
      if (error.code === 4001) {
          alert("User rejected the request to connect to MetaMask.");
      } else if (error.code === -32002) {
          alert("MetaMask is already open and requesting a connection. Please approve the connection.");
      } else if (error.message.includes("network")) {
          alert("Failed to connect to the Sepolia network. Please check your network settings.");
      } else if (error.message.includes("denied")) {
          alert("Connection to MetaMask was denied. Please try again.");
      } else {
          alert("An error occurred while connecting to MetaMask. Please try again later.");
      }
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
