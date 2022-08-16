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
    "0x0937aFfabadb7C6D351A6d9685F574c84d0Ef249", // nouns token
    "0xB9fa3A2d8386F9dc487b1c6bC1A0748b139CA9Ac", // poop token
    "0x60d4db9b534ef9260a88b0bed6c486fe13e604fc", // weth (mainnet)
    "90", // auctionTimeBuffer,
    "1", // auctionReservePrice,
    "5", // auctionMinIncrementBidPercentage,
    "900", // auctionDuration,
   ])
  

interface VerifyArgs {
  address: string;
  constructorArguments?: (string | number)[];
  libraries?: Record<string, string>;
}

const lilgoblinkings = '0x2198378B73dD7D7BC08d1B9837d374d895186207'
const expectedAuctionHouseProxyAddress = '0x152f0b7d70f1bB56F9118972b6A9009bAf6D20a8'
const expectedNounsDAOProxyAddress = '0x152f2CcD58266451DC03f89023dEA2bf167245B9'
// address _lilgoblinkings,
// address _minter,
// IProxyRegistry _proxyRegistry
const contracts: Record<ContractName, VerifyArgs> = {
  PoopToken: {
    address: '0xB9fa3A2d8386F9dc487b1c6bC1A0748b139CA9Ac',
    constructorArguments: [
      lilgoblinkings,
      expectedAuctionHouseProxyAddress,
      "0xf57b2c51ded3a29e6891aba85459d600256cf317",
    ]
  },
  NFTDescriptor: {
    address: '0xB29C9d34f736Ce78EceC7EFB964Feb3508B79dA9',
  },
  NounsDescriptor: {
    address: '0x6994AE600820e78a9AA1E45268efaAC114367D5E',
    libraries: {
      NFTDescriptor: '0xB29C9d34f736Ce78EceC7EFB964Feb3508B79dA9',
    },
  },
  NounsSeeder: {
    address: '0x560a6eD6FAC73E03580c0c6Df066d5716F1186bc',
  },
  NounsToken: {
    address: '0x0937aFfabadb7C6D351A6d9685F574c84d0Ef249',
    constructorArguments: [
      lilgoblinkings,
      expectedAuctionHouseProxyAddress, // nounsAuctionHouseProxy //expectedAuctionHouseProxyAddress = '0x55790b9183638981cEfbD5627C5C47C1f0f2Af29'
      '0x6994AE600820e78a9AA1E45268efaAC114367D5E', // nounsDescriptor
      '0x560a6eD6FAC73E03580c0c6Df066d5716F1186bc', // nounsSeeder
      '0xf57b2c51ded3a29e6891aba85459d600256cf317', // mainnet opensea registry
    ],
  },
  NounsAuctionHouse: {
    address: '0xD9F123980d49c37Be07Ee7333515E4C4c17b3256',
  },

  // *this one
  NounsAuctionHouseProxyAdmin: {
    address: '0xac5848aE0fe3BB94Ce8a0e1BD2e02976069d6302',
  },

  NounsAuctionHouseProxy: {
    address: expectedAuctionHouseProxyAddress,
    constructorArguments: [
      '0xD9F123980d49c37Be07Ee7333515E4C4c17b3256', // NounAuctionHouse
      '0xac5848aE0fe3BB94Ce8a0e1BD2e02976069d6302', // nounsAuctionHouseProxyAdmin
      bytes,
    ],
  },


  NounsDAOExecutor: {
    address: '0x59A309a6EF28d7efdCf6B47F0727B69a34d65F28',
    constructorArguments: [expectedNounsDAOProxyAddress,  60 * 60 * 24 * 2], // nounsDAOProxy, timelock-delay
  },
  NounsDAOLogicV1: {
    address: '0x954435b67b52c2BcdbEcca9624945E00159429a7', // nounsDAOLogicV1
  },
  NounsDAOProxy: {
    address: '0x3A5b6edd83658dFAD076286f002CFe7688993852', // nounsDAOProxy
    constructorArguments: [
      '0x59A309a6EF28d7efdCf6B47F0727B69a34d65F28', // nounsDaoExecutor
      '0x28fD525153Bdc46d868Fe90aE5303cE0b3Ef6922', // nounsToken
      '0x2198378B73dD7D7BC08d1B9837d374d895186207', // lilnounders dao multisig
      '0x59A309a6EF28d7efdCf6B47F0727B69a34d65F28', // nounsDaoExecutor
      '0x954435b67b52c2BcdbEcca9624945E00159429a7', // nounsDAOLogicV1
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
