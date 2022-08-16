import { Interface } from 'ethers/lib/utils';
import { task } from 'hardhat/config';
import { default as NounsAuctionHouseABI } from '../abi/contracts//NounsAuctionHouse.sol/NounsAuctionHouse.json';

type ContractName =
  | 'PoopToken'
  | 'NFTDescriptor'
  | 'NounsDescriptor'
  | 'NounsSeeder'
  | 'NounsToken'
  | 'NounsAuctionHouse'
  | 'NounsAuctionHouseProxyAdmin'
  | 'NounsAuctionHouseProxy'
  | 'NounsDAOExecutor'
  | 'NounsDAOLogicV1'
  | 'NounsDAOProxy';


  const bytes = new Interface(NounsAuctionHouseABI).encodeFunctionData('initialize', [
    "0xeea7043D9f76fdbC2EaC81Abbab4d1bcBEf3c279", // nouns token
    "0xd6E2C08fb0A9BE79c31A11a3500D25667a064b36", // poop token
    "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // weth (mainnet)
    "90", // auctionTimeBuffer,
    "1", // auctionReservePrice,
    "5", // auctionMinIncrementBidPercentage,
    "3600", // auctionDuration,
   ])
  

interface VerifyArgs {
  address: string;
  constructorArguments?: (string | number)[];
  libraries?: Record<string, string>;
}

const lilgoblinkings = '0xFb2710C5FF60e85130b1a941386433c898D102CE'
const expectedAuctionHouseProxyAddress = '0x152f0b7d70f1bB56F9118972b6A9009bAf6D20a8'
const expectedNounsDAOProxyAddress = '0x152f2CcD58266451DC03f89023dEA2bf167245B9'

const contracts: Record<ContractName, VerifyArgs> = {
  PoopToken: {
    address: '0xd6E2C08fb0A9BE79c31A11a3500D25667a064b36',
    constructorArguments: [
      lilgoblinkings,
      expectedAuctionHouseProxyAddress,
      "0xa5409ec958c83c3f309868babaca7c86dcb077c1",
    ]
  },
  NFTDescriptor: {
    address: '0x0fd3Fb251E1112e46efD8c0da199E6245FaE1F77',
  },
  NounsDescriptor: {
    address: '0x1197Ec597045403bBae28B72488eB952C71705F3',
    libraries: {
      NFTDescriptor: '0x0fd3Fb251E1112e46efD8c0da199E6245FaE1F77',
    },
  },
  NounsSeeder: {
    address: '0x8400ADF672198D4948aeAe846398F1088E722640',
  },
  NounsToken: {
    address: '0xeea7043D9f76fdbC2EaC81Abbab4d1bcBEf3c279',
    constructorArguments: [
      lilgoblinkings,
      expectedAuctionHouseProxyAddress, // nounsAuctionHouseProxy //expectedAuctionHouseProxyAddress = '0x55790b9183638981cEfbD5627C5C47C1f0f2Af29'
      '0x1197Ec597045403bBae28B72488eB952C71705F3', // nounsDescriptor
      '0x8400ADF672198D4948aeAe846398F1088E722640', // nounsSeeder
      '0xa5409ec958c83c3f309868babaca7c86dcb077c1', // mainnet opensea registry
    ],
  },
  NounsAuctionHouse: {
    address: '0x69434BA9fb52b361ADe9a3f229DCBD862d573Ac1',
  },

  // *this one
  NounsAuctionHouseProxyAdmin: {
    address: '0xB9BF0CbBF90fda18457758DE13dE4ee97461223B',
  },

  NounsAuctionHouseProxy: {
    address: expectedAuctionHouseProxyAddress,
    constructorArguments: [
      '0x69434BA9fb52b361ADe9a3f229DCBD862d573Ac1', // NounAuctionHouse
      '0xB9BF0CbBF90fda18457758DE13dE4ee97461223B', // nounsAuctionHouseProxyAdmin
      bytes,
    ],
  },


  NounsDAOExecutor: {
    address: '0xDC55b504D121A2B19C77247Bf23B0dAe5F07B705',
    constructorArguments: [expectedNounsDAOProxyAddress,  60 * 60 * 24 * 2], // nounsDAOProxy, timelock-delay
  },
  NounsDAOLogicV1: {
    address: '0x1316c44D62e0dEA71E2C7221C99e1dE4C64d6b27', // nounsDAOLogicV1
  },
  NounsDAOProxy: {
    address: '0x152f2CcD58266451DC03f89023dEA2bf167245B9', // nounsDAOProxy
    constructorArguments: [
      '0xDC55b504D121A2B19C77247Bf23B0dAe5F07B705', // nounsDaoExecutor
      '0x28fD525153Bdc46d868Fe90aE5303cE0b3Ef6922', // nounsToken
      lilgoblinkings, // lilnounders dao multisig
      '0xDC55b504D121A2B19C77247Bf23B0dAe5F07B705', // nounsDaoExecutor
      '0x1316c44D62e0dEA71E2C7221C99e1dE4C64d6b27', // nounsDAOLogicV1
      33230, // voting-period 
      26585, // voting-delay
      100, // proposal-threshold-bps
      1_000, // quorum-votes-bps
    ],
  },
};

task('verify-etherscan', 'Verify the Solidity contracts on Etherscan').setAction(async (_, hre) => {
  for (const [name, args] of Object.entries(contracts)) {
    console.log(`verifying ${name}...`);
    try {
      await hre.run('verify:verify', {
        ...args,
      });
    } catch (e) {
      console.error(e);
    }
  }
});
