var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var MattAuction = artifacts.require("./MattAuction.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(MattAuction);
};
