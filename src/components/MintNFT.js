import React, { useEffect, useState } from "react";
import { useWallet } from "../context/WalletContext";
import NFTCards from "./NFTCards";
import { ethers } from "ethers";
import MyNFT from "../abi/MyNFT.json";

const MintNFT = () => {
    const { walletAddress, connectWallet, disconnectWallet } = useWallet();
    const [mintedTokenId, setMintedTokenId] = useState(null);
    const [nftMetadata, setNftMetadata] = useState([]);
    const [totalSupply, setTotalSupply] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //accessing contract address using env
    const nftContractAddress = process.env.REACT_APP_NFT_CONTRACT_ADDRESS;

    //accessing contract address using env
    const nftAbi = MyNFT.abi;

    useEffect(() => {
        if (!walletAddress) {
        } else {
            loadNFTData();
        }
    }, [walletAddress]);

    const loadNFTData = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet first.");
            return;
        }

        try {
            setError(null);
            setLoading(true);

            const provider = new ethers.BrowserProvider(window.ethereum);
            // Get the signer from the provider
            const signer = await provider.getSigner();

            // Create a contract instance
            const nftContract = new ethers.Contract(nftContractAddress, nftAbi, signer);
            // Call the totalSupply function
            const supply = await nftContract.totalSupply();
            const total = parseInt(supply.toString());
            setTotalSupply(total);

            // Fetch all token metadata in parallel with batching
            const batchSize = 1; // Adjust batch size as needed
            const allMetadata = [];
            for (let i = 0; i < total; i += batchSize) {
                const batch = Array.from(
                    { length: Math.min(batchSize, total - i) },
                    (_, idx) => i + idx + 1
                ).map(async (tokenId) => {
                    try {
                        const tokenURI = await nftContract.tokenURI(tokenId);
                        const response = await fetch(tokenURI);
                        if (!response.ok) {
                            throw new Error(`Failed to fetch metadata for Token ID ${tokenId}`);
                        }
                        const metadata = await response.json();
                        return { ...metadata, tokenId };
                    } catch (error) {
                        console.error(`Error fetching metadata for Token ID ${tokenId}:`, error);
                        return null; // Handle individual errors gracefully
                    }
                });
                const metadataBatch = await Promise.all(batch);
                allMetadata.push(...metadataBatch.filter((meta) => meta)); // Filter out null results
            }

            setNftMetadata(allMetadata);
        } catch (error) {
            console.error("Error fetching metadata URIs:", error);
            setError("Failed to fetch metadata URIs. Check the contract address and network.");
        } finally {
            setLoading(false);
        }
    };

    // Mint the NFT
    const mintNFT = async () => {
        if (!walletAddress) {
            alert("Please connect your wallet first.");
            return;
        }

        try {
            setError(null);
            setLoading(true);

            const provider = new ethers.BrowserProvider(window.ethereum);
            // Get the signer from the provider
            const signer = await provider.getSigner();

            // Create a contract instance
            const nftContract = new ethers.Contract(nftContractAddress, nftAbi, signer);

            // Call the mint function of the contract
            const tx = await nftContract.mint(walletAddress);
            const receipt = await tx.wait();
            console.log("receipt", receipt);

            alert("Nft Minted");
            // Fetch the token's metadata
            loadNFTData();
        } catch (error) {
            console.error("Error minting NFT:", error);
            setError("Failed to mint NFT.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="nft-container">
            {walletAddress ? <>
                <h1>Mint Your NFT</h1>
                <h3> Total NFT Minted ({totalSupply})</h3>
                <button className={`mint-button ${loading ? 'loading' : ''}`} onClick={mintNFT} disabled={loading}>
                    {loading ? "Minting..." : "Mint NFT"}
                </button>
                <h4 style={{ textColor: "red" }}>{error}</h4>

                <NFTCards nftMetadata={nftMetadata} nftContractAddress={nftContractAddress} />
            </> :
                <h3>Connect Wallet to Mint ERC721 Token</h3>}
        </div>
    );
};

export default MintNFT;