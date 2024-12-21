// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ERC721Module", (m) => {
    const erc721 = m.contract("MyNFT", ["MyNFTToken", "MNFT","https://gateway.pinata.cloud/ipfs/bafybeicdfpgp7pb2yww2zmqdy6oc7wgi5fqquqeardt43jrl4lqc7c65wu/"]);

    return { erc721 };
});
