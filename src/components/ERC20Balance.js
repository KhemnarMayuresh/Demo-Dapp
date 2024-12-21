import React, { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import { ethers } from "ethers";
import ERC20Token from "../abi/ERC20Token.json";

const ERC20Balance = () => {
    const { walletAddress } = useWallet();
    const [firstTokenData, setFirstTokenData] = useState({ name: "", symbol: "", balance: "0" });
    const [secondTokenData, setSecondTokenData] = useState({ name: "", symbol: "", balance: "0" });
    const [loading, setLoading] = useState(false);

    //accessing contract address using env
    const tokenAddress1 = process.env.REACT_APP_ERC20_TOKEN_1_ADDRESS;
    const tokenAddress2 = process.env.REACT_APP_ERC20_TOKEN_2_ADDRESS;

    //accessing contract address using env
    const tokenAbi = ERC20Token.abi;

    useEffect(() => {
        if (!walletAddress) {
            setFirstTokenData({ name: "", symbol: "", balance: "0" });
            setSecondTokenData({ name: "", symbol: "", balance: "0" });
        } else {
            getTokenInfo();
        }
    }, [walletAddress]);

    const getTokenContractDetails = async (tokenContract) => {
        try {
            // Fetch the token name and symbol
            const tokenName = await tokenContract.name();
            const tokenSymbol = await tokenContract.symbol();

            // Fetch the balance of the specified wallet address
            const balanceInWei = await tokenContract.balanceOf(walletAddress);

            // Format the balance (assuming 18 decimals, typical for ERC-20 tokens)
            const formattedBalance = ethers.formatUnits(balanceInWei, 18); // Format balance in human-readable units
            const bal = parseFloat(formattedBalance.toString());
            return { name: tokenName, symbol: tokenSymbol, balance: bal };
        } catch (error) {
            console.error("Error fetching token data:", error);
        }
    }

    // getTokenContracts 
    const getTokenInfo = async () => {
        setLoading(true);
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            // Create a contract instance
            const tokenContract = new ethers.Contract(tokenAddress1, tokenAbi, provider);
            // fetch details
            const token1_data = await getTokenContractDetails(tokenContract);
            setFirstTokenData(token1_data);

            // Create a contract instance
            const tokenContract2 = new ethers.Contract(tokenAddress2, tokenAbi, provider);
            // fetch details
            const token2_data = await getTokenContractDetails(tokenContract2);
            setSecondTokenData(token2_data);

        } catch (error) {
            console.error("Error minting NFT:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="token-container">
            {walletAddress ?
                <>
                    <h3>Show Balance of ERC20 Tokens</h3>
                    <button className="refresh-button" onClick={getTokenInfo}>
                        <span className="refresh-icon" id="refreshIcon">&#8635;</span> Refresh Balance
                    </button>
                    <div className={`balance-info ${loading ? 'loading' : ''}`}>
                        <div className="erc20-balance">
                            <strong>{`Balance of ${firstTokenData?.name || ""}`}:</strong> {firstTokenData?.balance || "0"} {firstTokenData?.symbol || ""}
                        </div>
                        <div className="erc20-balance">
                            <strong>{`Balance of ${secondTokenData?.name || ""}`}:</strong> {secondTokenData?.balance || "0"} {secondTokenData?.symbol || ""}
                        </div>
                    </div>
                </> :
                <h3>Connect Wallet to view ERC20 balance</h3>}
        </div>
    );
};

export default ERC20Balance;
