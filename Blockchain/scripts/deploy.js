const hre = require("hardhat");

async function main() {
  const MernDapp = await hre.ethers.getContractFactory("MernDapp"); 
  const contract = await MernDapp.deploy(); 
  console.log("Address of contract:", contract.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


