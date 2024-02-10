const hre = require("hardhat");
async function main() {
 const voting= await ethers.getContractFactory("Votting"); 
const Voting_ = await voting.deploy(["Rhea","Kushi","Ruhi"],10);
console.log('contract Address:' ,Voting_.address);
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

