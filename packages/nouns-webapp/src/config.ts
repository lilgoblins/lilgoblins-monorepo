import {
  ContractAddresses as NounsContractAddresses,
  getContractAddressesForChainOrThrow,
} from '@nouns/sdk';
import { ChainId } from '@usedapp/core';

interface ExternalContractAddresses {
  lidoToken: string | undefined;
}

export type ContractAddresses = NounsContractAddresses & ExternalContractAddresses;

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
  nounsDAOSubgraphApiUri: string;
  enableHistory: boolean;
  nounsApiUri: string;
  enableRollbar: boolean;
}

type SupportedChains = ChainId.Mainnet;

export const CHAIN_ID: SupportedChains = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1');

export const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY ?? '';

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

//TODO: replaced infura for prod
export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_JSONRPC`];

  if (network === 'goerli') {
    return custom || `https://eth-mainnet.g.alchemy.com/v2/06ijGb0mR4IObNvIRJLK_jQqla4hPpK8`;
  } else {
    return custom || `https://eth-mainnet.g.alchemy.com/v2/06ijGb0mR4IObNvIRJLK_jQqla4hPpK8`;
  }
};

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_WSRPC`];

  if (network === 'goerli') {
    return custom || `wss://eth-mainnet.g.alchemy.com/v2/06ijGb0mR4IObNvIRJLK_jQqla4hPpK8`;
  } else {
    return custom || 'wss://eth-mainnet.g.alchemy.com/v2/06ijGb0mR4IObNvIRJLK_jQqla4hPpK8';
  }
};

const app: Record<SupportedChains, AppConfig> = {
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/keon/lilgoblins',
    nounsDAOSubgraphApiUri: 'https://api.thegraph.com/subgraphs/name/nounsdao/nouns-subgraph',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
    nounsApiUri: process.env[`REACT_APP_MAINNET_NOUNSAPI`] || '',
    enableRollbar: process.env.REACT_APP_ENABLE_ROLLBAR === 'true',
  },
};

const externalAddresses: Record<SupportedChains, ExternalContractAddresses> = {
  [ChainId.Mainnet]: {
    lidoToken: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  },
};

const getAddresses = (): ContractAddresses => {
  let nounsAddresses = {} as NounsContractAddresses;
  try {
    nounsAddresses = getContractAddressesForChainOrThrow(CHAIN_ID);
  } catch {}
  return { ...nounsAddresses, ...externalAddresses[CHAIN_ID] };
};

const config = {
  app: app[CHAIN_ID],
  isPreLaunch: process.env.REACT_APP_IS_PRELAUNCH || 'false',
  addresses: getAddresses(),
};

export default config;
