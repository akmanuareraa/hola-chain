// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract holaContract {

    uint256 totalWaves;

    constructor() {
        console.log("Welcome to HolaChain!!");
    }

    function wave() public {
        totalWaves += 1;
        console.log(msg.sender, " waved at you !!");
    }

    function getTotalWaves() public view returns (uint256) {
        console.log("You've got ", totalWaves, " waves");
        return totalWaves;
    }
}