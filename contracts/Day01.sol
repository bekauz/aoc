// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Day01 {
  
  function p1(uint[] memory depths) public pure returns (uint256) {
    
    uint256 depthIncreases = 0;
    
    for (uint i = 1; i < depths.length; i++) {
        if (depths[i] > depths[i - 1]) {
            depthIncreases++;
        }
    }

    return depthIncreases;
  }

  function p2(uint[] memory depths) public pure returns (uint256) {

    uint256 depthIncreases = 0;
    if (depths.length < 3) {
      return depthIncreases;
    }
    
    uint256 prevSum = depths[0] + depths[1] + depths[2];

    for (uint i = 3; i < depths.length; i++) {
      uint256 sum = depths[i] + depths[i - 1] + depths[i - 2];
      if (sum > prevSum) {
        depthIncreases = depthIncreases + 1;
      }
      prevSum = sum;
    }

    return depthIncreases;
  }
}

