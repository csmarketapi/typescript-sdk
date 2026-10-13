import { CSMarketAPI, Market, Currency } from '../src/index';
import { test, expect, beforeAll, describe } from 'bun:test';

const apiKey = process.env.API_KEY;
let client: CSMarketAPI | undefined;

beforeAll(() => {
  if (!apiKey) {
    throw new Error('API_KEY environment variable is required for tests');
  }
  client = new CSMarketAPI({ apiKey });
});

describe('CSMarketAPI Tests', () => {
  test('getItems', async () => {
    await client!.getItems();
  });

  test('getMarkets', async () => {
    await client!.getMarkets();
  });

  test('getItemContents', async () => {
    await client!.getItemContents({ marketHashName: 'Shadow Case' });
  });

  test('getAccount', async () => {
    await client!.getAccount();
  });

  test('getPlayerCountsLatest', async () => {
    await client!.getPlayerCountsLatest();
  });

  test('getPlayerCountsHistory', async () => {
    await client!.getPlayerCountsHistory();
  });

  test('getListingsLatestAggregated', async () => {
    await client!.getListingsLatestAggregated({
      marketHashName: 'Shadow Case',
      currency: Currency.USD
    });
  });

  test('getListingsHistoryAggregated', async () => {
    await client!.getListingsHistoryAggregated({
      marketHashName: 'Shadow Case',
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD
    });
  });

  test('getSalesLatestAggregated', async () => {
    await client!.getSalesLatestAggregated({
      marketHashName: 'Shadow Case',
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD
    });
  });

  test('getSalesHistoryAggregated', async () => {
    await client!.getSalesHistoryAggregated({
      marketHashName: 'Shadow Case',
      markets: [Market.STEAMCOMMUNITY],
      currency: Currency.USD
    });
  });
});
