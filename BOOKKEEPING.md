## DevOps & Domains
- ### `https://static.sway.community` 
  Static metadata, merkle and badges files (with rewrites) from [`events/data`](./ng-packages/contracts/events/data)

- ### `https://alfajores.sway.community`
  Alfajores testnet instance

## Add/Update Event Metadata
1. Create new file in [`data/details`](./ng-packages/contracts/events/data/details) with name `{NEW_EVENT_ID}.json`
2. Copy the badge image in [`data/badges`](./ng-packages/contracts/events/data/details)
3. Run `yarn metadata` inside `contracts` to validate and generate metadata
4. Push the changes (vercel will again run `yarn metadata` to gen metadata during build)

## Create & Manage Events
Use hardhat tasks


