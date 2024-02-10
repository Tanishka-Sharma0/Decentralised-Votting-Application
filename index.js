require('dotenv').config();
const express = require("express");
const fileUpload = require('express-fileupload');
const app = express();
app.use(fileUpload({
    extended:true
}));
app.use(express.static(__dirname));
app.use(express.json());
const path = require("path");
const ethers = require("ethers");
   var port = process.env.PORT;
   const Api_url = process.env.API_URL;
   const private_Key = process.env.PRIVATE_KEY;
   const contract_Address = process.env.CONTRACT_ADDRESS;

   const {abi} = require("./artifacts/contracts/Voting.sol/Votting.json");
   const provider = new ethers.providers.JsonRpcProvider(Api_url);
   const signer = new ethers.Wallet(private_Key,provider);
   const contractInstance = new ethers.Contract(contract_Address,abi,signer);
   app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
   });
   app.get("/index.html",(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"));
   });
   app.post("/addcandidate",async(req,res)=>{
    var vote =  req.body.vote;
    console.log(vote);
    async function storeDataInBlockchain(vote){
        console.log("adding the candidate into contract.....");
        const tx = await contractInstance.addCandidate(vote);
        await tx.wait();
    }
    const bool = await contractInstance.getvotingStatus();
    if(bool == true){
     await storeDataInBlockchain(vote);
     res.send ("Thecandidate has been sucessfully registeredin the smart contract");
    }
    else{
        res.send("voting is finished");
    }

   })
   app.listen(port,()=>{
    console.log(`Yippi , we learnt something new on this port ${port}`);
   })

   
