let Wallet_connected = "";
let Contract_Address = "0xff8b521ac939a71922b035abc2d83aef0dddac65";
let Contract_Abi = [
    {
      "inputs": [
        {
          "internalType": "string[]",
          "name": "_candidatesNames",
          "type": "string[]"
        },
        {
          "internalType": "uint256",
          "name": "_durationInMinutes",
          "type": "uint256"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_candidateIndex",
          "type": "uint256"
        }
      ],
      "name": "Vote",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        }
      ],
      "name": "addCandidate",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "candidates",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "votingCount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllVotesOfCandidates",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "votingCount",
              "type": "uint256"
            }
          ],
          "internalType": "struct Votting.Candidate[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getRemainingTime",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getvotingStatus",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingEnd",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "votingStart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
   const connectMetamask =async()=>{
   const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
   const signer = provider.getSigner();
   const Wallet_connected = await signer.getAddress();
   var element = document.getElementById("metamasknotification");
   element.innerHTML = "Metamask is connected"+Wallet_connected;
   }


   const getAllCandidates= async()=>{
   var p3 = document.getElementById("p3");
   const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
   const signer = provider.getSigner();
  const contractInstance = new ethers.Contract(Contract_Address,Contract_Abi,signer);
   p3.innerHTML = "Please wait, getting all the candidates from Smart Contract..";
   var candidates =  await contractInstance.getAllVotesOfCandidates();
   console.log(candidates);
   var table = document.getElementById("mytable");
     for(i=0; i<candidates.length; i++){
      var row = table.insertRow();
      var idcell = row.insertCell();
      var desccell = row.insertCell();
      var votecount = row.insertCell();

      idcell.innerHTML= i;
      desccell.innerHTML = candidates[i].name;
      votecount.innerHTML = candidates[i].votingCount;
     }
     p3.innerHTML = "The Candidate List is updated!!! ";
   }

   const addvote =async()=>{
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
     const signer = provider.getSigner();
     const Wallet_connected = await signer.getAddress();
     console.log(Wallet_connected);
    if(Wallet_connected !=0){
      var name = document.getElementById("vote");
      const contractInstance = new ethers.Contract(Contract_Address,Contract_Abi,signer);
      var cand = document.getElementById("cand");
      cand.innerHTML = "Please wait, adding a vote in the smart contract";
      const tx = await contractInstance.Vote(name.value);
      await tx.wait();
      cand.innerHTML = "Vote added!!!"; 
    }
    else{
      var cand = document.getElementById("cand");
      cand.innerHTML ="Please connect Metamask First!!"
    }
  }

  const voteStatus = async()=>{
   const provider = new ethers.providers.Web3Provider(window.ethereum);
   await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const Wallet_connected = await signer.getAddress();
   if(Wallet_connected !=0){
    var status = document.getElementById("status");
    var remainingtime = document.getElementById("time");
   const contractInstance = new ethers.Contract(Contract_Address,Contract_Abi,signer);
   const currentStatus =  await contractInstance.getvotingStatus();
    const time = await contractInstance.getRemainingTime();
    console.log(time);
    status.innerHTML = currentStatus ==1 ? "Voting is currently open":"voting is Finished";
    remainingtime.innerHTML = `Remaninig time is  ${parseInt(time,16)} seconds`;
   }
   else{
        var status = document.getElementById("status");
        status.innerHTML = "Please first connect your metamask";
      }
  }

