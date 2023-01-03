
<p align="center">
  <img src="https://user-images.githubusercontent.com/17181457/210296904-f6418633-e0a8-410c-aac4-18e5f144a44e.png" width="350" title="hover text">
</p>

<h1 align="center">
  Sway Protocol
</h1>

SWAY creates one of a kind, crypto secured digital memories in the form of NFTs that is stored on blockchain forever. Create and Collect Free
Souvenir NFTs.

## Project Structure
This repo is structured as a yarn v3 monorepo.
Linitng and Formating for code is configured globally for whole monorepo using yarn global scripts.

```
└── packages
    ├── contracts             // core smart contracts and utilities
    ├── events                // generate & store events metadata helper package 
    ├── interface             // web app package
    └── subgraph              // Subgraph package
```

### `contracts`
This package contains core smart contracts and various toolings to interact and control the protocol (using hardhat tasks & scripts). Look inside [`hardhat.config.ts`](./packages/contracts/hardhat.config.ts) for tasks and scripts.

## `events`
This typescript package generate the SWAY NFTs metadata and merkle trees 

## `interface`
This is the React Web App for Sway Protocol

## `subgraph`
Subgraph for sway protocol

## Setup Monorepo

1. Install `yarn` if you don't have it.
2. Run `yarn`

# License
The files in this repository are licensed under GPLv3 ([LICENSE](./LICENSE)).

Unless you explicitly state otherwise, any contribution submitted for inclusion in this repository by you shall be licensed as above , without any additional terms or conditions.
