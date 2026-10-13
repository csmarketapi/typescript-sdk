import { Currency, Market, Phase } from "./enums";
import type {
    Account,
    ItemContents,
    Items,
    ListingsHistoryAggregated,
    ListingsLatestAggregated,
    Markets,
    PlayerCountsHistory,
    PlayerCountsLatest,
    SalesHistoryAggregated,
    SalesLatestAggregated
} from "./models";
import {
    AccountModel,
    ItemContentsModel,
    ItemsModel,
    PlayerCountsLatestModel,
    PlayerCountsHistoryModel,
    ListingsLatestAggregatedModel,
    ListingsHistoryAggregatedModel,
    SalesLatestAggregatedModel,
    SalesHistoryAggregatedModel,
    MarketsModel
} from "./models";

type FetchLike = typeof fetch

export type ClientOptions = {
    apiKey: string
    fetch?: FetchLike
}

export class CSMarketAPI {
    private baseUrl: string = "https://api.csmarketapi.com"
    private apiKey: string
    private fetchImpl: FetchLike

    constructor(options: ClientOptions | string) {
        if (typeof options === "string") {
            this.apiKey = options
            this.fetchImpl = fetch
        } else {
            this.apiKey = options.apiKey
            this.fetchImpl = options.fetch ?? fetch
        }
    }

    private toParamValue(v: unknown): string {
        if (v instanceof Date) return v.toISOString()
        return String(v)
    }

    private buildUrl(path: string, params?: Record<string, unknown>): string {
        const url = new URL(path, this.baseUrl)
        const allParams: Record<string, unknown> = { key: this.apiKey, ...(params ?? {}) }
        for (const [key, value] of Object.entries(allParams)) {
            if (value == null){
                continue
            }
            const values = Array.isArray(value) ? value : [value]
            for (const v of values) { 
                url.searchParams.append(key, this.toParamValue(v)) 
            }
        }
        return url.toString()
    }

    private async request<T>(path: string, params?: Record<string, unknown>): Promise<T> {
        const url = this.buildUrl(path, params)
        const r = await this.fetchImpl(url, { redirect: "follow" })
        if (!r.ok) {
            const text = await r.text().catch(() => "")
            throw new Error(`HTTP ${r.status} ${r.statusText} ${text}`)
        }
        return r.json() as Promise<T>
    }

    async getListingsLatestAggregated(args: {
        marketHashName: string
        markets?: ReadonlyArray<Market>
        currency?: Currency
        phase?: Phase | null
    }): Promise<ListingsLatestAggregated> {
        const { marketHashName, markets, currency = Currency.USD, phase } = args
        const result = await this.request<ListingsLatestAggregated>("/v2/listings/latest/aggregate", {
            market_hash_name: marketHashName,
            markets,
            currency,
            ...(phase ? { phase } : {})
        })
        return ListingsLatestAggregatedModel.parse(result) 
    }

    async getListingsHistoryAggregated(args: {
        marketHashName: string
        markets?: ReadonlyArray<Market>
        currency?: Currency
        since?: string | Date | null
        phase?: Phase | null
    }): Promise<ListingsHistoryAggregated> {
        const { marketHashName, markets, currency = Currency.USD, since, phase } = args
        const result = await this.request<ListingsHistoryAggregated>(
            "/v2/listings/history/aggregate",
            {
                market_hash_name: marketHashName,
                markets,
                currency,
                ...(since ? { since } : {}),
                ...(phase ? { phase } : {})
            }
        )
        return ListingsHistoryAggregatedModel.parse(result) 
    }

    async getSalesLatestAggregated(args: {
        marketHashName: string
        markets?: ReadonlyArray<Market>
        currency?: Currency
    }): Promise<SalesLatestAggregated> {
        const { marketHashName, markets, currency = Currency.USD } = args
        const result = await this.request<SalesLatestAggregated>("/v2/sales/latest/aggregate", {
            market_hash_name: marketHashName,
            markets,
            currency
        })
        return SalesLatestAggregatedModel.parse(result) 
    }

    async getSalesHistoryAggregated(args: {
        marketHashName: string
        markets?: ReadonlyArray<Market>
        start?: string | Date | null
        end?: string | Date | null
        currency?: Currency
    }): Promise<SalesHistoryAggregated> {
        const { marketHashName, markets, start, end, currency = Currency.USD } = args
        const items = await this.request<SalesHistoryAggregated["items"]>(
            "/v2/sales/history/aggregate",
            {
                market_hash_name: marketHashName,
                markets,
                ...(start ? { start } : {}),
                ...(end ? { end } : {}),
                currency
            }
        )
        const result = { items }
        return SalesHistoryAggregatedModel.parse(result) 
    }

    async getItems(args?: { q?: string | null; unlisted?: boolean }): Promise<Items> {
        const { q, unlisted = false } = args ?? {}
        const items = await this.request<Items["items"]>("/v2/items/", {
            ...(q != null ? { q } : {}),
            unlisted
        })
        const result = { items }
        return ItemsModel.parse(result) 
    }

    async getItemContents(args: { marketHashName: string }): Promise<ItemContents> {
        const { marketHashName } = args
        const result = await this.request<ItemContents>("/v2/items/contents", {
            market_hash_name: marketHashName
        })
        return ItemContentsModel.parse(result) 
    }

    async getMarkets(): Promise<Markets> {
        const result = await this.request<Markets>("/v2/markets/")
        return MarketsModel.parse(result) 
    }

    async getAccount(): Promise<Account> {
        const result = await this.request<Account>("/v2/account")
        return AccountModel.parse(result) 
    }

    async getPlayerCountsLatest(): Promise<PlayerCountsLatest> {
        const result = await this.request<PlayerCountsLatest>("/v2/player_counts/latest")
        return PlayerCountsLatestModel.parse(result) 
    }

    async getPlayerCountsHistory(args?: { start?: string | Date | null; end?: string | Date | null }): Promise<PlayerCountsHistory> {
        const { start, end } = args ?? {}
        const items = await this.request<PlayerCountsHistory["items"]>("/v2/player_counts/history", {
            ...(start ? { start } : {}),
            ...(end ? { end } : {})
        })
        const result = { items }
        return PlayerCountsHistoryModel.parse(result)
    }
}

export { Market, Currency, Phase }


