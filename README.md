# csmarketapi

Lightweight JS/TS client for csmarketapi.com ESM, typed, fetch-based, runtime validated with Zod.

## Install
```bash
bun add csmarketapi
# or
npm i csmarketapi
```

## Quickstart
```ts
import { CSMarketAPI, Market, Currency } from "csmarketapi"

const client = new CSMarketAPI({ apiKey: process.env.API_KEY! })
const latest = await client.getListingsLatestAggregated({
  marketHashName: "Chroma 2 Case",
  currency: Currency.USD,
})
console.log(latest.market_hash_name, latest.listings.length)
```

## API
- Listings: `getListingsLatestAggregated`, `getListingsHistoryAggregated`
- Sales: `getSalesLatestAggregated`, `getSalesHistoryAggregated`
- Meta: `getItems`, `getItemContents`, `getMarkets`, `getAccount`, `getPlayerCountsLatest`, `getPlayerCountsHistory`

Enums: `Market`, `Currency`, `Phase`

## Requirements
- Node 18+ (or Bun 1+) with global `fetch`

## License
MIT
