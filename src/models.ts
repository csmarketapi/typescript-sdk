import { z } from 'zod';
import { Market, Phase } from "./enums";

const ListingsItemModel = z.object({
  market: z.enum(Market),
  market_link: z.string(),
  mean_price: z.number().nullable().optional(),
  ask_price: z.number().nullable().optional(),
  max_price: z.number().nullable().optional(),
  median_price: z.number().nullable().optional(),
  bid_price: z.number().nullable().optional(),
  listings: z.number(),
  bid_volume: z.number().nullable().optional(),
  volume_24h: z.number().nullable().optional(),
  available: z.boolean().nullable().optional(),
  phase: z.enum(Phase).nullable().optional(),
  timestamp: z.coerce.date()
});

export const ListingsLatestAggregatedModel = z.object({
  market_hash_name: z.string(),
  listings: z.array(ListingsItemModel)
});

export const ListingsHistoryAggregatedModel = z.object({
  markets: z.partialRecord(z.enum(Market), z.object({
    market_link: z.string()
  })),
  series: z.partialRecord(z.enum(Market), z.array(z.object({
    mean_price: z.number().nullable().optional(),
    ask_price: z.number().nullable().optional(),
    max_price: z.number().nullable().optional(),
    median_price: z.number().nullable().optional(),
    bid_price: z.number().nullable().optional(),
    listings: z.number(),
    bid_volume: z.number().nullable().optional(),
    volume_24h: z.number().nullable().optional(),
    available: z.boolean().nullable().optional(),
    phase: z.enum(Phase).nullable().optional(),
    fetched_at: z.coerce.date()
  })))
});

const SalesItemModel = z.object({
  id: z.number(),
  market: z.string(),
  mean_price: z.number().nullable().optional(),
  min_price: z.number().nullable().optional(),
  max_price: z.number().nullable().optional(),
  median_price: z.number().nullable().optional(),
  volume: z.number().nullable().optional(),
  day: z.coerce.date()
});

export const SalesLatestAggregatedModel = z.object({
  market_hash_name: z.string(),
  sales: z.array(SalesItemModel)
});

export const SalesHistoryAggregatedModel = z.object({
  items: z.array(z.object({
    day: z.string(),
    sales: z.array(z.object({
      id: z.number(),
      market: z.string(),
      mean_price: z.number().nullable().optional(),
      min_price: z.number().nullable().optional(),
      max_price: z.number().nullable().optional(),
      median_price: z.number().nullable().optional(),
      volume: z.number().nullable().optional()
    }))
  }))
});

const ItemModel = z.object({
  market_hash_name: z.string(),
  item_type: z.string().nullable().optional(),
  weapon: z.string().nullable().optional(),
  wear: z.string().nullable().optional(),
  collection: z.string().nullable().optional(),
  rarity: z.number().nullable().optional(),
  icon_url: z.string().nullable().optional(),
  min_float: z.number().nullable().optional(),
  max_float: z.number().nullable().optional(),
  is_stattrak: z.boolean().default(false),
  is_souvenir: z.boolean().default(false)
});

export const ItemsModel = z.object({
  items: z.array(ItemModel)
});

export const ItemContentsModel = z.object({
  market_hash_name: z.string(),
  contents: z.array(z.object({
    name: z.string(),
    icon_url: z.string().nullable().optional(),
    rarity: z.string().nullable().optional(),
    rarity_color: z.string().nullable().optional(),
    is_rare: z.boolean()
  }))
});

export const PlayerCountsLatestModel = z.object({
  timestamp: z.coerce.date(),
  count: z.number()
});

export const PlayerCountsHistoryModel = z.object({
  items: z.array(z.object({
    timestamp: z.coerce.date(),
    count: z.number()
  }))
});

const MarketInfoModel = z.object({
  market: z.string(),
  url: z.string(),
  currency: z.string(),
  active: z.boolean()
});

export const MarketsModel = z.array(MarketInfoModel);

export const AccountModel = z.object({
  email: z.string().nullable(),
  name: z.string(),
  plan: z.string(),
  quota_unlimited: z.boolean(),
  usage: z.object({
    used: z.number(),
    used_percent: z.number(),
    limit: z.number(),
    remaining: z.number(),
    resets_in_days: z.number(),
    quota_unlimited: z.boolean().default(false),
    usage_billing_enabled: z.boolean().default(false),
    usage_budget_cents: z.number().nullable().optional(),
    usage_overage_credits: z.number().default(0),
    usage_overage_limit: z.number().default(0),
    usage_billing_paused: z.boolean().default(false),
    discount_percent: z.number().default(0),
    list_price_cents: z.number().default(999),
    price_cents: z.number().default(999),
    savings_cents: z.number().default(0)
  })
});


export type ListingsLatestAggregated = z.infer<typeof ListingsLatestAggregatedModel>;
export type ListingsHistoryAggregated = z.infer<typeof ListingsHistoryAggregatedModel>;
export type SalesLatestAggregated = z.infer<typeof SalesLatestAggregatedModel>;
export type SalesHistoryAggregated = z.infer<typeof SalesHistoryAggregatedModel>;
export type Items = z.infer<typeof ItemsModel>;
export type ItemContents = z.infer<typeof ItemContentsModel>;
export type PlayerCountsLatest = z.infer<typeof PlayerCountsLatestModel>;
export type PlayerCountsHistory = z.infer<typeof PlayerCountsHistoryModel>;
export type MarketInfo = z.infer<typeof MarketInfoModel>;
export type Markets = z.infer<typeof MarketsModel>;
export type Account = z.infer<typeof AccountModel>;

