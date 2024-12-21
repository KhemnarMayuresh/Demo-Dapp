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

2. Configure environment variables:
   Create a `.env` file in the root directory with the following content:
   ```env
   REACT_APP_INFURA_RPC_URL=<Your_Infura_RPC_URL_FOR_SEPOLIA_NETWORK>(https://sepolia.infura.io/v3/12db852b0e8849a1b5ab0abc0822206d)
   REACT_APP_TESTNET_PRIVATE_KEY=<CONTRACT_DEPLOYER_WALLET_PRIVATE_KEY>
   REACT_APP_ERC20_TOKEN_1_ADDRESS=<DEPLOYED_CONTRACT_ADDRESS_OF_ERC20_TOKEN_CONTRACT>
   REACT_APP_ERC20_TOKEN_2_ADDRESS=<DEPLOYED_CONTRACT_ADDRESS_OF_ERC20_TOKEN_CONTRACT>
   REACT_APP_NFT_ADDRESS=<DEPLOYED_CONTRACT_ADDRESS_OF_ERC721_NFT_CONTRACT>
   ```

3. Deploy the smart contract:
   - Configure your `hardhat.config.js` with a testnet URL and private key.
   - Compile the smartcontracts using command
     ```bash
     npx hardhat compile
     ```
   - Deploy the ERC20-1 contract using the Hardhat script:
     ```bash
     npx hardhat ignition deploy ./ignition/modules/ERC20-1.js --network sepolia --verify
     ```
   - Similarly, deploy the ERC20-2 contract using the Hardhat script:
     ```bash
     npx hardhat ignition deploy ./ignition/modules/ERC20-2.js --network sepolia --verify
     ```
   - Deploy the NFT contract using the Hardhat script:
     ```bash
     npx hardhat ignition deploy ./ignition/modules/MyNFT.js --network sepolia --verify
     ```
     In case, you are getting runtime error or connection timeout, try after sometime or deploy contract first then verify it using below command
     ```bash
     npx hardhat ignition deploy ./ignition/modules/MyNFT.js --network sepolia
     npx hardhat ignition verify chain-11155111
     ```

   - Note the deployed contract address will be in folder `./ignition/deployments/chain-11155111/deployed_addresses.json`. Update contract address accordingly in `.env`.


4. Start the React application:
   ```bash
   npm start
   ```

---

## Smart Contract Details

### Contract: **MyNFT.sol**
- Implements ERC-721 standard.
- Provides `mint` functionality to mint NFTs with to address.
- Contract is deployed on the **Sepolia** testnet.
- using pinata to save metadata of NFT's.

### Contract: **ERC20Token.sol**
- Implements ERC-20 standard.
- Contract is deployed on the **Sepolia** testnet.
---

## Usage

### Wallet Integration
1. Open the app and click "Connect Wallet".
2. Authorize MetaMask to connect.
3. View wallet address and ETH balance.

### Token Balances
1. After connecting the wallet, token balances for two ERC-20 tokens are displayed.
2. Ensure the wallet holds these tokens on the testnet.

### NFT Functionality
1. Enter metadata URI and click "Mint NFT".
2. View minted NFTs with token IDs and URIs in the NFT section.

### Marketplace Connection
1. Click "View on OpenSea" to see the NFT on the OpenSea testnet.
2. (Optional) Approve the NFT for listing on OpenSea.

---

## Known Issues

1. Token balances may not update immediately after a transaction.
2. OpenSea metadata refresh may take a few minutes.
3. Ensure the wallet holds enough testnet ETH for minting and transactions.
4. Because of time contraints, I am not able to add more error handling regarding errors of why minting transaction is failed.

---


## Resources Used

- Used previously created personal modules for connecting wallet and smart contract integration
- [simple Smart Contracts](https://docs.openzeppelin.com/contracts/5.x/wizard)
- [Hardhat Documentation](https://hardhat.org/hardhat-runner/docs/getting-started#quick-start)
- [Etherscan API](https://etherscan.io/myapikey)
- [Pinata to store the metadata for NFT's](https://app.pinata.cloud/ipfs/files)
---

## License

This project is licensed under the MIT License. See the LICENSE file for details.

