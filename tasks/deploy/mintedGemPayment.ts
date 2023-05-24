import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { MintedGemPayment } from "../../src/types/MintedGemPayment";
import { MintedGemPayment__factory } from "../../src/types/factories/MintedGemPayment__factory";

task("deploy:MintedGemPayment")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const mintedGemPaymentFactory: MintedGemPayment__factory = <MintedGemPayment__factory>(
      await ethers.getContractFactory("MintedGemPayment")
    );
    const gasPrice = await mintedGemPaymentFactory.signer.getGasPrice();
    console.log(`Current gas price: ${gasPrice}`);

    const estimatedGas = await mintedGemPaymentFactory.signer.estimateGas(
      mintedGemPaymentFactory.getDeployTransaction(),
    );
    console.log(`Estimated gas: ${estimatedGas}`);
    const deploymentPrice = gasPrice.mul(estimatedGas);
    const deployerBalance = await mintedGemPaymentFactory.signer.getBalance();
    console.log(`Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`);
    console.log(`Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`);


    const mintedGemPayment: MintedGemPayment = <MintedGemPayment>(
      await mintedGemPaymentFactory.deploy()
    );
    await mintedGemPayment.deployed();
    console.log("MintedGemPayment deployed to: ", mintedGemPayment.address);
  });
