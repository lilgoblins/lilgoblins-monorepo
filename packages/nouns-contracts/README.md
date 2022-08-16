# @nouns/contracts

## Background

Nouns are an experimental attempt to improve the formation of on-chain avatar communities. While projects such as CryptoPunks have attempted to bootstrap digital community and identity, Nouns attempt to bootstrap identity, community, governance and a treasury that can be used by the community for the creation of long-term value.

One Noun is generated and auctioned every day, forever. All Noun artwork is stored and rendered on-chain. See more information at [nouns.wtf](https://nouns.wtf/).

## Contracts

| Contract                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Address                                                                                                               |
| --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| [NounsToken](./contracts/NounsToken.sol)                        | This is the Nouns ERC721 Token contract. Unlike other Nouns contracts, it cannot be replaced or upgraded. Beyond the responsibilities of a standard ERC721 token, it is used to lock and replace periphery contracts, store checkpointing data required by our Governance contracts, and control Noun minting/burning. This contract contains two main roles - `minter` and `owner`. The `minter` will be set to the Nouns Auction House in the constructor and ownership will be transferred to the Nouns DAO following deployment.                                                                                                    | [0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03](https://etherscan.io/address/0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03) |
| [NounsSeeder](./contracts/NounsSeeder.sol)                      | This contract is used to determine Noun traits during the minting process. It can be replaced to allow for future trait generation algorithm upgrades. Additionally, it can be locked by the Nouns DAO to prevent any future updates. Currently, Noun traits are determined using pseudo-random number generation: `keccak256(abi.encodePacked(blockhash(block.number - 1), nounId))`. Trait generation is not truly random. Traits can be predicted when minting a Noun on the pending block.                                                                                                                                          | [0xCC8a0FB5ab3C7132c1b2A0109142Fb112c4Ce515](https://etherscan.io/address/0xCC8a0FB5ab3C7132c1b2A0109142Fb112c4Ce515) |
| [NounsDescriptor](./contracts/NounsDescriptor.sol)              | This contract is used to store/render Noun artwork and build token URIs. Noun 'parts' are compressed in the following format before being stored in their respective byte arrays: `Palette Index, Bounds [Top (Y), Right (X), Bottom (Y), Left (X)] (4 Bytes), [Pixel Length (1 Byte), Color Index (1 Byte)][]`. When `tokenURI` is called, Noun parts are read from storage and converted into a series of SVG rects to build an SVG image on-chain. Once the entire SVG has been generated, it is base64 encoded. The token URI consists of base64 encoded data URI with the JSON contents directly inlined, including the SVG image. | [0x0Cfdb3Ba1694c2bb2CFACB0339ad7b1Ae5932B63](https://etherscan.io/address/0x0Cfdb3Ba1694c2bb2CFACB0339ad7b1Ae5932B63) |
| [NounsAuctionHouse](./contracts/NounsAuctionHouse.sol)          | This contract acts as a self-sufficient noun generation and distribution mechanism, auctioning one noun every 24 hours, forever. 100% of auction proceeds (ETH) are automatically deposited in the Nouns DAO treasury, where they are governed by noun owners. Each time an auction is settled, the settlement transaction will also cause a new noun to be minted and a new 24 hour auction to begin. While settlement is most heavily incentivized for the winning bidder, it can be triggered by anyone, allowing the system to trustlessly auction nouns as long as Ethereum is operational and there are interested bidders.       | [0xF15a943787014461d94da08aD4040f79Cd7c124e](https://etherscan.io/address/0xF15a943787014461d94da08aD4040f79Cd7c124e) |
| [NounsDAOExecutor](./contracts/governance/NounsDAOExecutor.sol) | This contract is a fork of Compound's `Timelock`. It acts as a timelocked treasury for the Nouns DAO. This contract is controlled by the governance contract (`NounsDAOProxy`).                                                                                                                                                                                                                                                                                                                                                                                                                                                         | [0x0BC3807Ec262cB779b38D65b38158acC3bfedE10](https://etherscan.io/address/0x0BC3807Ec262cB779b38D65b38158acC3bfedE10) |
| [NounsDAOProxy](./contracts/governance/NounsDAOProxy.sol)       | This contract is a fork of Compound's `GovernorBravoDelegator`. It can be used to create, vote on, and execute governance proposals.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | [0x6f3E6272A167e8AcCb32072d08E0957F9c79223d](https://etherscan.io/address/0x6f3E6272A167e8AcCb32072d08E0957F9c79223d) |
| [NounsDAOLogicV1](./contracts/governance/NounsDAOLogicV1.sol)   | This contract is a fork of Compound's `GovernorBravoDelegate`. It's the logic contract used by the `NounsDAOProxy`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | [0xa43aFE317985726E4e194eb061Af77fbCb43F944](https://etherscan.io/address/0xa43aFE317985726E4e194eb061Af77fbCb43F944) |

## Development

### Install dependencies

```sh
yarn
```

### Compile typescript, contracts, and generate typechain wrappers

```sh
yarn build
```

### Run tests

```sh
yarn test
```

### Environment Setup

Copy `.env.example` to `.env` and fill in fields

### Commands

```sh
# compiling
npx hardhat compile

# deploying
npx hardhat run --network rinkeby scripts/deploy.js

# verifying on etherscan
npx hardhat verify --network rinkeby {DEPLOYED_ADDRESS}

# replace `rinkeby` with `mainnet` to productionize
```

### Automated Testnet Deployments

The contracts are deployed to Rinkeby on each push to master and each PR using the account `0x387d301d92AE0a87fD450975e8Aef66b72fBD718`. This account's mnemonic is stored in GitHub Actions as a secret and is injected as the environment variable `MNEMONIC`. This mnemonic _shouldn't be considered safe for mainnet use_.



##  TESTNET

expectedAuctionHouseProxyAddress = 0x077eFEE39dfd3A6c99998F56cf83C1b740e8e7A8
expectedNounsDAOProxyAddress = 0x3A5b6edd83658dFAD076286f002CFe7688993852
> Enter a gas price (gwei) (0) 1
Estimated cost to deploy PoopToken: 0.002244291 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
PoopToken contract deployed to 0xB9fa3A2d8386F9dc487b1c6bC1A0748b139CA9Ac
Estimated cost to deploy NFTDescriptor: 0.001533581 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NFTDescriptor contract deployed to 0xB29C9d34f736Ce78EceC7EFB964Feb3508B79dA9
Estimated cost to deploy NounsDescriptor: 0.002725623 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsDescriptor contract deployed to 0x6994AE600820e78a9AA1E45268efaAC114367D5E
Estimated cost to deploy NounsSeeder: 0.000389909 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsSeeder contract deployed to 0x560a6eD6FAC73E03580c0c6Df066d5716F1186bc
Estimated cost to deploy NounsToken: 0.004093851 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsToken contract deployed to 0x28fD525153Bdc46d868Fe90aE5303cE0b3Ef6922
Estimated cost to deploy NounsAuctionHouse: 0.00227732 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
Waiting for confirmation...
NounsAuctionHouse contract deployed to 0xD9F123980d49c37Be07Ee7333515E4C4c17b3256
Estimated cost to deploy NounsAuctionHouseProxyAdmin: 0.000642227 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsAuctionHouseProxyAdmin contract deployed to 0xac5848aE0fe3BB94Ce8a0e1BD2e02976069d6302
Estimated cost to deploy NounsAuctionHouseProxy: 0.000960327 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsAuctionHouseProxy contract deployed to 0x077eFEE39dfd3A6c99998F56cf83C1b740e8e7A8
Estimated cost to deploy NounsDAOExecutor: 0.001120642 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsDAOExecutor contract deployed to 0x59A309a6EF28d7efdCf6B47F0727B69a34d65F28
Estimated cost to deploy NounsDAOLogicV1: 0.004003106 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
Waiting for confirmation...
NounsDAOLogicV1 contract deployed to 0x954435b67b52c2BcdbEcca9624945E00159429a7
Estimated cost to deploy NounsDAOProxy: 0.000512164 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsDAOProxy contract deployed to 0x3A5b6edd83658dFAD076286f002CFe7688993852
✨  Done in 625.84s.



## Mainnet

NONCE:  2
expectedAuctionHouseProxyAddress = 0x152f0b7d70f1bB56F9118972b6A9009bAf6D20a8
expectedNounsDAOProxyAddress = 0x152f2CcD58266451DC03f89023dEA2bf167245B9
> Enter a gas price (gwei) (17) 
Estimated cost to deploy PoopToken: 0.038152947 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
PoopToken contract deployed to 0xd6E2C08fb0A9BE79c31A11a3500D25667a064b36
Estimated cost to deploy NFTDescriptor: 0.026070877 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NFTDescriptor contract deployed to 0x0fd3Fb251E1112e46efD8c0da199E6245FaE1F77
Estimated cost to deploy NounsDescriptor: 0.046335591 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsDescriptor contract deployed to 0x1197Ec597045403bBae28B72488eB952C71705F3
Estimated cost to deploy NounsSeeder: 0.006628453 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsSeeder contract deployed to 0x8400ADF672198D4948aeAe846398F1088E722640
Estimated cost to deploy NounsToken: 0.069595263 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsToken contract deployed to 0xeea7043D9f76fdbC2EaC81Abbab4d1bcBEf3c279
Estimated cost to deploy NounsAuctionHouse: 0.03871444 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
Waiting for confirmation...
NounsAuctionHouse contract deployed to 0x69434BA9fb52b361ADe9a3f229DCBD862d573Ac1
Estimated cost to deploy NounsAuctionHouseProxyAdmin: 0.010917859 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsAuctionHouseProxyAdmin contract deployed to 0xB9BF0CbBF90fda18457758DE13dE4ee97461223B
Estimated cost to deploy NounsAuctionHouseProxy: 0.016325559 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsAuctionHouseProxy contract deployed to 0x152f0b7d70f1bB56F9118972b6A9009bAf6D20a8
Estimated cost to deploy NounsDAOExecutor: 0.019051118 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
NounsDAOExecutor contract deployed to 0xDC55b504D121A2B19C77247Bf23B0dAe5F07B705
Estimated cost to deploy NounsDAOLogicV1: 0.068052802 ETH
> Type "DEPLOY" to confirm: DEPLOY
Deploying...
Waiting for confirmation...
NounsDAOLogicV1 contract deployed to 0x1316c44D62e0dEA71E2C7221C99e1dE4C64d6b27
Estimated cost to deploy NounsDAOProxy: 0.008706992 ETH
> Type "DEPLOY" to confirm: Deploy
NounsDAOProxy contract deployed to 0x152f2CcD58266451DC03f89023dEA2bf167245B9
✨  Done in 16.25s.