# Demo Decentralized Application (dApp)

This project is a simple decentralized application (dApp) showcasing Web3 capabilities, including wallet integration, token interactions, NFT functionality, and marketplace integration.

---

## Features

### Core Features
1. **Wallet Integration**:
   - Connects to MetaMask.
   - Displays the connected wallet address.
   - Shows ETH balance.

2. **Token Integration**:
   - Fetches and displays balances for two ERC-20 tokens.
   - Handles errors for token load failures.

3. **NFT Functionality**:
   - Mint NFTs using a simple interface.
   - Displays minted NFTs (token ID and metadata URI).

4. **Marketplace Connection**:
   - Integrates with OpenSea testnet (Goerli).
   - Includes a button to view minted NFTs on OpenSea.
   - Optional: Allows NFT approval for listing.

---

## Project Setup

### Prerequisites
1. **Node.js**: Install Node.js from [https://nodejs.org](https://nodejs.org).
2. **MetaMask Wallet**: Install MetaMask browser extension and set up a wallet.
3. **Testnet ETH**: Get testnet ETH from a faucet for Sepolia.

### Installation Steps
1.  Install dependencies:
   ```bash
   npm install
   ```
   incase it not worked, try with --force.

2. Start the React application:
   ```bash
   npm start
   ```

---