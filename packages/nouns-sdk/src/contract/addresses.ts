import { ChainId, ContractAddresses } from './types';

const chainIdToAddresses: { [chainId: number]: ContractAddresses } = {
  [ChainId.Mainnet]: {
    nounsToken: '0xeea7043D9f76fdbC2EaC81Abbab4d1bcBEf3c279',
    nounsSeeder: '0x8400ADF672198D4948aeAe846398F1088E722640',
    nounsDescriptor: '0x1197Ec597045403bBae28B72488eB952C71705F3 ',
    nftDescriptor: '0x0fd3Fb251E1112e46efD8c0da199E6245FaE1F77',
    nounsAuctionHouse: '0x69434BA9fb52b361ADe9a3f229DCBD862d573Ac1',
    nounsAuctionHouseProxy: '0x152f0b7d70f1bB56F9118972b6A9009bAf6D20a8',
    nounsAuctionHouseProxyAdmin: '0xB9BF0CbBF90fda18457758DE13dE4ee97461223B',
    nounsDaoExecutor: '0xDC55b504D121A2B19C77247Bf23B0dAe5F07B705',
    nounsDAOProxy: '0x152f2CcD58266451DC03f89023dEA2bf167245B9',
    nounsDAOLogicV1: '0x1316c44D62e0dEA71E2C7221C99e1dE4C64d6b27',
  },
};

/**
 * Get addresses of contracts that have been deployed to the
 * Ethereum mainnet or a supported testnet. Throws if there are
 * no known contracts deployed on the corresponding chain.
 * @param chainId The desired chainId
 */
export const getContractAddressesForChainOrThrow = (chainId: number): ContractAddresses => {
  if (!chainIdToAddresses[chainId]) {
    throw new Error(
      `Unknown chain id (${chainId}). No known contracts have been deployed on this chain.`,
    );
  }
  return chainIdToAddresses[chainId];
};
