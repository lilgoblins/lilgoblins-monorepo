import { default as NounsAuctionHouseABI } from '../abi/contracts/NounsAuctionHouse.sol/NounsAuctionHouse.json';
import { Interface } from 'ethers/lib/utils';
import { task, types } from 'hardhat/config';
import promptjs from 'prompt';

promptjs.colors = false;
promptjs.message = '> ';
promptjs.delimiter = '';

type ContractName =
  | 'NounsDescriptor';

interface Contract {
  args?: (string | number | (() => string | undefined))[];
  address?: string;
  libraries?: () => Record<string, string>;
  waitForConfirmation?: boolean;
}

task('deploy-descriptor', 'Deploys NFTDescriptor, NounsDescriptor, NounsSeeder, and NounsToken')
  .addOptionalParam('lilgoblinkings', 'The lilgoblinkings DAO contract address', "0xFb2710C5FF60e85130b1a941386433c898D102CE", types.string)
  .addOptionalParam('weth', 'The WETH contract address', "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", types.string)

  .addOptionalParam('auctionTimeBuffer', 'The auction time buffer (seconds)', 1.5 * 60, types.int) //Default ever 24 hrs Revised: every 15 minutes
  .addOptionalParam('auctionReservePrice', 'The auction reserve price (wei)', 1, types.int)
  .addOptionalParam('auctionMinIncrementBidPercentage', 'The auction min increment bid percentage (out of 100)', 5, types.int,)
  .addOptionalParam('auctionDuration', 'The auction duration (seconds)', 60 * 60 * 1, types.int) // Default: 1 day Revised: 60 minutes

  .addOptionalParam('timelockDelay', 'The timelock delay (seconds)', 60 * 60 * 24 * 2, types.int) // Default: 2 days

  //  .addOptionalParam('votingPeriod', 'The voting period (blocks)', 4 * 60 * 24 * 3, types.int) // Default: 3 days
  .addOptionalParam('votingPeriod', 'The voting period (blocks)', 33230, types.int) // Default: 3 days Revised 5 days
  .addOptionalParam('votingDelay', 'The voting delay (blocks)', 26585, types.int) // Default: (2 days) Revised: 4 days 26585 blocks
  .addOptionalParam('proposalThresholdBps', 'The proposal threshold (basis points)', 100, types.int) // Default: 5% Revised 1%
  .addOptionalParam('quorumVotesBps', 'Votes required for quorum (basis points)', 1_000, types.int) // Default: 10%
  .setAction(async (args, { ethers }) => {
    const network = await ethers.provider.getNetwork();
    console.log("DEPLOYING TO: ", network.name)
    const proxyRegistryAddress =
      network.chainId === 1
        ? '0xa5409ec958c83c3f309868babaca7c86dcb077c1'
        : '0xf57b2c51ded3a29e6891aba85459d600256cf317';

    const AUCTION_HOUSE_PROXY_NONCE_OFFSET = 7;
    const GOVERNOR_N_DELEGATOR_NONCE_OFFSET = 10;

    const [deployer] = await ethers.getSigners();
    const nonce = await deployer.getTransactionCount();
    console.log("DEPLOYER: ", deployer)
    console.log("NONCE: ", nonce)

    const expectedAuctionHouseProxyAddress = ethers.utils.getContractAddress({
      from: deployer.address,
      nonce: nonce + AUCTION_HOUSE_PROXY_NONCE_OFFSET,
    });

    const expectedNounsDAOProxyAddress = ethers.utils.getContractAddress({
      from: deployer.address,
      nonce: nonce + GOVERNOR_N_DELEGATOR_NONCE_OFFSET,
    });

    console.log(`expectedAuctionHouseProxyAddress = ${expectedAuctionHouseProxyAddress}`)
    console.log(`expectedNounsDAOProxyAddress = ${expectedNounsDAOProxyAddress}`)

    const contracts: Record<ContractName, Contract> = {
      NounsDescriptor: {
        libraries: () => ({
          NFTDescriptor: "0x0fd3Fb251E1112e46efD8c0da199E6245FaE1F77",
        }),
      },
    };

    let gasPrice = await ethers.provider.getGasPrice();
    const gasInGwei = Math.round(Number(ethers.utils.formatUnits(gasPrice, 'gwei')));

    promptjs.start();

    let result = await promptjs.get([
      {
        properties: {
          gasPrice: {
            type: 'integer',
            required: true,
            description: 'Enter a gas price (gwei)',
            default: gasInGwei,
          },
        },
      },
    ]);

    gasPrice = ethers.utils.parseUnits(result.gasPrice.toString(), 'gwei');

    for (const [name, contract] of Object.entries(contracts)) {
      const factory = await ethers.getContractFactory(name, {
        libraries: contract?.libraries?.(),
      });

      const deploymentGas = await factory.signer.estimateGas(
        factory.getDeployTransaction(
          ...(contract.args?.map(a => (typeof a === 'function' ? a() : a)) ?? []),
          {
            gasPrice,
          },
        ),
      );
      const deploymentCost = deploymentGas.mul(gasPrice);

      console.log(
        `Estimated cost to deploy ${name}: ${ethers.utils.formatUnits(
          deploymentCost,
          'ether',
        )} ETH`,
      );

      result = await promptjs.get([
        {
          properties: {
            confirm: {
              type: 'string',
              description: 'Type "DEPLOY" to confirm:',
            },
          },
        },
      ]);

      if (result.confirm != 'DEPLOY') {
        console.log('Exiting');
        return;
      }

      console.log('Deploying...');

      const deployedContract = await factory.deploy(
        ...(contract.args?.map(a => (typeof a === 'function' ? a() : a)) ?? []),
        {
          gasPrice,
        },
      );

      if (contract.waitForConfirmation) {
        console.log("Waiting for confirmation...")
        await deployedContract.deployed();
      }

      contracts[name as ContractName].address = deployedContract.address;

      console.log(`${name} contract deployed to ${deployedContract.address}`);
    }

    return contracts;
  });
