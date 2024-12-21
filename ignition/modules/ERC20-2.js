// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ERC20Module2", (m) => {
    const name = "TestUSDC";
    const symbol = "TUSDC";
    const initialSupply = 1000000;

    const erc20 = m.contract("ERC20Token", [name, symbol, initialSupply]);

    return { erc20 };
});
