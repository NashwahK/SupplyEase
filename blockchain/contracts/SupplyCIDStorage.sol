// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SupplyCIDStorage {
    mapping(string => string) private tagToCID;

    event CIDStored(string tagId, string cid);

    function storeCID(string memory tagId, string memory cid) public {
        tagToCID[tagId] = cid;
        emit CIDStored(tagId, cid);
    }

    function getCID(string memory tagId) public view returns (string memory) {
        return tagToCID[tagId];
    }
}