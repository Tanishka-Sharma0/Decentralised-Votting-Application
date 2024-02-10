// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
contract Votting{
    struct Candidate{
        string name;
        uint256 votingCount;
    }
    Candidate[] public candidates;
    address owner;
    mapping (address=>bool) voters;

    uint256 public votingStart;
    uint256 public votingEnd;

    constructor(string[] memory _candidatesNames, uint256 _durationInMinutes){
             for(uint256 i=0; i<_candidatesNames.length;i++){
                 candidates.push(Candidate({
                     name:_candidatesNames[i],
                     votingCount:0
                 }));
                 owner= msg.sender;
                 votingStart= block.timestamp;
                 votingEnd = block.timestamp +(_durationInMinutes * 1 minutes);
             }
    }

    modifier onlyOwner{
          require(msg.sender==owner, "You are Not Permitted");
          _;
    }

    function addCandidate(string memory  _name) public onlyOwner{
              candidates.push(Candidate({
                  name:_name,
                 votingCount:0
              }));
    }


    function Vote(uint256 _candidateIndex) public{
        require(!voters[msg.sender],"You have already voted");
        require( _candidateIndex < candidates.length,"Invalid candidate Index");
        candidates[_candidateIndex].votingCount++;
        voters[msg.sender] == true;

    }


    function getAllVotesOfCandidates() public view returns(Candidate[] memory){
        return candidates;
    }

    function getvotingStatus() public view returns(bool){
         return(block.timestamp>=votingStart && block.timestamp<votingEnd);
    }

    function getRemainingTime() public view returns(uint256)
    {
          require(block.timestamp>=votingStart,"Voting has not started Yet!!!");
            if(block.timestamp>=votingEnd){
                return 0;
            }
            return votingEnd-block.timestamp;
    }
}