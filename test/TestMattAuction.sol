pragma solidity ^0.8.4;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/MattAuction.sol";

contract TestMattAuction {

  function testItStoresAValue() public {
    MattAuction mattAuction = MattAuction(DeployedAddresses.MattAuction());
  }

}
