import React, { useState, useEffect } from "react";
import Web3 from "web3";


const WalletConnect = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [web3, setWeb3] = useState(null);

    // Connect to MetaMask
    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);

                // Request account access
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccount(accounts[0]);

                // Get account balance
                const balanceInWei = await web3Instance.eth.getBalance(accounts[0]);
                setBalance(web3Instance.utils.fromWei(balanceInWei, "ether"));
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert("MetaMask is not installed. Please install it to use this feature.");
        }
    };

    // Disconnect the wallet
    const disconnectWallet = () => {
        setAccount(null);
        setBalance(null);
        setWeb3(null);
    };

    useEffect(() => {
        // Detect account changes
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    web3.eth.getBalance(accounts[0]).then((balanceInWei) => {
                        setBalance(web3.utils.fromWei(balanceInWei, "ether"));
                    });
                } else {
                    disconnectWallet();
                }
            });
        }
    }, [web3]);

    return (
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
            <h2>Connect Using Web3.js</h2>
            {account ? (
                <div>
                    <p>
                        <strong>Wallet Address:</strong> {account}
                    </p>
                    <p>
                        <strong>Balance:</strong> {balance} ETH
                    </p>
                    <button onClick={disconnectWallet} style={{ padding: "10px 20px", cursor: "pointer" }}>
                        Disconnect
                    </button>
                </div>
            ) : (
                <button onClick={connectWallet} style={{ padding: "10px 20px", cursor: "pointer" }}>
                    Connect Wallet
                </button>
            )}
        </div>
    );
};

export default WalletConnect;
