const { deployProxy, upgradeProxy } = require("@openzeppelin/truffle-upgrades");
const CROSToken = artifacts.require("CROSToken");

module.exports = async function (deployer, network, accounts) {
  const owner = accounts[0];
  console.log("Owner:", owner);

  // const totalSupply = web3.utils.toWei("300000000");
  // const marketingDevelopment = "0x7b886Ad472bC2C4B33DD4EE643024CfF9c10eBA8";
  // const privateSale = "0x289De875cE4BE823a15F8270739a88C668eBc49F";
  // const publicSale = "0x5597edA0df517B6E4c7CA8e8A8C2Cc3DD1208a4C";
  // const treasury = "0x9FaD7AFb72eEe131c267438f025259E3Bc907101";
  // const floatLiquidity = "0x0037425866EB224eF3986a983819125A95Ef4C61";
  // const liquidityMining = "0xebED732Cb373DAeE27fba8FD69C8a568bbF86532";
  // const team = "0x14130dcA52cD132F545301f51dcc3EacF3287497";
  // const advisors = "0xAb43a30269064e866C0b097b4Ea5AAd98B30a5d0";
  // const ecoSystemFund = "0xc58e996F18D3C319C4B32c889B1e1647b1d18fEf";

  // await deployProxy(
  //   CROSToken,
  //   [
  //     totalSupply,
  //     marketingDevelopment,
  //     privateSale,
  //     publicSale,
  //     treasury,
  //     floatLiquidity,
  //     liquidityMining,
  //     team,
  //     advisors,
  //     ecoSystemFund,
  //   ],
  //   { deployer: deployer, initializer: "__CROSToken_init" }
  // );
  // const instanceToken = await CROSToken.deployed();
  // console.log("Token address:", instanceToken.address);
};
