pragma solidity ^0.4.23;

contract Voting {
    // constructor
    bytes32[] public candidateList;
    mapping (bytes32 => uint8) public votesReceived;
    constructor(bytes32[] canditateNames) public {
        candidateList = canditateNames;
    }

    function voteForCandidate(bytes32 candidate) public {
        require(validCandidate(candidate));
        votesReceived[candidate] += 1;
    }

    function totalVotesFor(bytes32 candidate) view public returns(uint8) {
        return votesReceived[candidate];
    }

    function validCandidate(bytes32 candidate) view public returns(bool) {
        for(uint i=0; i < candidateList.length; i++) {
            if (candidateList[i] == candidate) {
                return true;
            }
        }
        return false;
    }
    
     function addCandidate(bytes32 candidate) public {
        if(validCandidate(candidate)==false) {
            candidateList.push(candidate);
        }
    }
    
    function getCandidatesCount() view public returns(uint256) {
        return candidateList.length;
    }
    
    function bytes32ToStr(bytes32 _bytes32) public constant returns (string){

    // string memory str = string(_bytes32);
    // TypeError: Explicit type conversion not allowed from "bytes32" to "string storage pointer"
    // thus we should fist convert bytes32 to bytes (to dynamically-sized byte array)

    bytes memory bytesArray = new bytes(32);
    for (uint256 i; i < 32; i++) {
        bytesArray[i] = _bytes32[i];
        }
    return string(bytesArray);
    }
    
    function getCandidateName(uint8 candidateNumber) view public returns(string) {
        return bytes32ToStr(candidateList[candidateNumber]);
    }
}