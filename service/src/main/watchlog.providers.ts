import type { Provider } from "@nestjs/common";
import { GetAnalytics } from "../application/analytics/get-analytics.js";
import { ExitJournalTrade } from "../application/journal/exit-journal-trade.js";
import { GetJournalTrade } from "../application/journal/get-journal-trade.js";
import { ListJournalTrades } from "../application/journal/list-journal-trades.js";
import { OpenJournalTrade } from "../application/journal/open-journal-trade.js";
import { GetMarketContext } from "../application/market/get-market-context.js";
import { GetModelSignals } from "../application/market/get-model-signals.js";
import { ListSectors } from "../application/market/list-sectors.js";
import { GetWeeklyReview } from "../application/review/get-weekly-review.js";
import { ListWeeklyReviews } from "../application/review/list-weekly-reviews.js";
import { SaveWeeklyReview } from "../application/review/save-weekly-review.js";
import { GetCurrentUser } from "../application/user/get-current-user.js";
import { LoginUser } from "../application/user/login-user.js";
import { RegisterUser } from "../application/user/register-user.js";
import { DecideWatchlistRow } from "../application/watchlist/decide-watchlist-row.js";
import { GetConsensusWatchlist } from "../application/watchlist/get-consensus-watchlist.js";
import { GetDailyModelWatchlist } from "../application/watchlist/get-daily-model-watchlist.js";
import { GetWatchlistRow } from "../application/watchlist/get-watchlist-row.js";
import { ListAllWatchlist } from "../application/watchlist/list-all-watchlist.js";
import { ListDailyWatchlist } from "../application/watchlist/list-daily-plan.js";
import { PatchWatchlistRow } from "../application/watchlist/patch-watchlist-row.js";
import { SaveWatchlistRow } from "../application/watchlist/save-watchlist-row.js";
import { SaveWatchlistSelection } from "../application/watchlist/save-watchlist-selection.js";
import { SaveWatchlistSignals } from "../application/watchlist/save-watchlist-signals.js";
import { UpdateWatchlistOutcomes } from "../application/watchlist/update-watchlist-outcomes.js";
import { HmacTokenIssuer } from "../infrastructure/auth/hmac-token-issuer.js";
import { ScryptPasswordHasher } from "../infrastructure/auth/scrypt-password-hasher.js";
import { USER_STORE } from "../application/ports/user-store.js";
import { env } from "../infrastructure/config/env.js";
import {
  DSE_CONFIG,
  PG_POOL,
  type DseConfig
} from "../infrastructure/database/postgres/injection-tokens.js";
import {
  checkDatabaseConnection,
  type PostgresPool
} from "../infrastructure/database/postgres/pool.js";
import { DATABASE_HEALTH } from "../interface/http/database-health.js";
import { createWatchlogPool } from "../infrastructure/database/postgres/watchlog-pool.js";
import { DseMarketDataClient } from "../infrastructure/dse-service/dse-market-data-client.js";
import { DseModelSignalClient } from "../infrastructure/dse-service/dse-model-signal-client.js";
import { PostgresJournalStore } from "../infrastructure/repositories/postgres-journal-store.js";
import { PostgresMlWatchlistStore } from "../infrastructure/repositories/postgres-ml-watchlist-store.js";
import { PostgresReviewStore } from "../infrastructure/repositories/postgres-review-store.js";
import { PostgresSectorStore } from "../infrastructure/repositories/postgres-sector-store.js";
import { PostgresUserStore } from "../infrastructure/repositories/postgres-user-store.js";
import { PostgresWatchlistStore } from "../infrastructure/repositories/postgres-watchlist-store.js";
import { PostgresConnection } from "./postgres-connection.js";

export const watchlogProviders: Provider[] = [
  PostgresConnection,
  {
    provide: PG_POOL,
    useFactory: () => createWatchlogPool()
  },
  {
    provide: DSE_CONFIG,
    useFactory: (): DseConfig => ({
      baseUrl: env.DSE_DATA_BASE_URL,
      apiKey: env.DSE_DATA_API_KEY
    })
  },
  {
    provide: PostgresWatchlistStore,
    useFactory: (pool: PostgresPool) => new PostgresWatchlistStore(pool),
    inject: [PG_POOL]
  },
  {
    provide: PostgresMlWatchlistStore,
    useFactory: (pool: PostgresPool) => new PostgresMlWatchlistStore(pool),
    inject: [PG_POOL]
  },
  {
    provide: PostgresJournalStore,
    useFactory: (pool: PostgresPool) => new PostgresJournalStore(pool),
    inject: [PG_POOL]
  },
  {
    provide: PostgresReviewStore,
    useFactory: (pool: PostgresPool) => new PostgresReviewStore(pool),
    inject: [PG_POOL]
  },
  {
    provide: PostgresUserStore,
    useFactory: (pool: PostgresPool) => new PostgresUserStore(pool),
    inject: [PG_POOL]
  },
  { provide: USER_STORE, useExisting: PostgresUserStore },
  {
    provide: DATABASE_HEALTH,
    useFactory: (pool: PostgresPool) => () => checkDatabaseConnection(pool),
    inject: [PG_POOL]
  },
  {
    provide: PostgresSectorStore,
    useFactory: (pool: PostgresPool) => new PostgresSectorStore(pool),
    inject: [PG_POOL]
  },
  {
    provide: DseModelSignalClient,
    useFactory: (config: DseConfig) => new DseModelSignalClient(config),
    inject: [DSE_CONFIG]
  },
  {
    provide: DseMarketDataClient,
    useFactory: (config: DseConfig) => new DseMarketDataClient(config),
    inject: [DSE_CONFIG]
  },
  { provide: ScryptPasswordHasher, useFactory: () => new ScryptPasswordHasher() },
  { provide: HmacTokenIssuer, useFactory: () => new HmacTokenIssuer() },
  {
    provide: ListDailyWatchlist,
    useFactory: (watchlists: PostgresWatchlistStore) => new ListDailyWatchlist(watchlists),
    inject: [PostgresWatchlistStore]
  },
  {
    provide: ListAllWatchlist,
    useFactory: (watchlists: PostgresWatchlistStore) => new ListAllWatchlist(watchlists),
    inject: [PostgresWatchlistStore]
  },
  {
    provide: GetWatchlistRow,
    useFactory: (watchlists: PostgresWatchlistStore) => new GetWatchlistRow(watchlists),
    inject: [PostgresWatchlistStore]
  },
  {
    provide: SaveWatchlistRow,
    useFactory: (watchlists: PostgresWatchlistStore) => new SaveWatchlistRow(watchlists),
    inject: [PostgresWatchlistStore]
  },
  {
    provide: PatchWatchlistRow,
    useFactory: (watchlists: PostgresWatchlistStore) => new PatchWatchlistRow(watchlists),
    inject: [PostgresWatchlistStore]
  },
  {
    provide: DecideWatchlistRow,
    useFactory: (watchlists: PostgresWatchlistStore) => new DecideWatchlistRow(watchlists),
    inject: [PostgresWatchlistStore]
  },
  {
    provide: SaveWatchlistSignals,
    useFactory: (rows: PostgresMlWatchlistStore) => new SaveWatchlistSignals(rows),
    inject: [PostgresMlWatchlistStore]
  },
  {
    provide: GetConsensusWatchlist,
    useFactory: (rows: PostgresMlWatchlistStore) => new GetConsensusWatchlist(rows),
    inject: [PostgresMlWatchlistStore]
  },
  {
    provide: SaveWatchlistSelection,
    useFactory: (rows: PostgresMlWatchlistStore) => new SaveWatchlistSelection(rows),
    inject: [PostgresMlWatchlistStore]
  },
  {
    provide: GetDailyModelWatchlist,
    useFactory: (rows: PostgresMlWatchlistStore) => new GetDailyModelWatchlist(rows),
    inject: [PostgresMlWatchlistStore]
  },
  {
    provide: UpdateWatchlistOutcomes,
    useFactory: (rows: PostgresMlWatchlistStore) => new UpdateWatchlistOutcomes(rows),
    inject: [PostgresMlWatchlistStore]
  },
  {
    provide: ListJournalTrades,
    useFactory: (journal: PostgresJournalStore) => new ListJournalTrades(journal),
    inject: [PostgresJournalStore]
  },
  {
    provide: GetJournalTrade,
    useFactory: (journal: PostgresJournalStore) => new GetJournalTrade(journal),
    inject: [PostgresJournalStore]
  },
  {
    provide: OpenJournalTrade,
    useFactory: (journal: PostgresJournalStore, watchlists: PostgresWatchlistStore) =>
      new OpenJournalTrade(journal, watchlists),
    inject: [PostgresJournalStore, PostgresWatchlistStore]
  },
  {
    provide: ExitJournalTrade,
    useFactory: (journal: PostgresJournalStore, watchlists: PostgresWatchlistStore) =>
      new ExitJournalTrade(journal, watchlists),
    inject: [PostgresJournalStore, PostgresWatchlistStore]
  },
  {
    provide: ListWeeklyReviews,
    useFactory: (reviews: PostgresReviewStore) => new ListWeeklyReviews(reviews),
    inject: [PostgresReviewStore]
  },
  {
    provide: GetWeeklyReview,
    useFactory: (reviews: PostgresReviewStore) => new GetWeeklyReview(reviews),
    inject: [PostgresReviewStore]
  },
  {
    provide: SaveWeeklyReview,
    useFactory: (
      reviews: PostgresReviewStore,
      journal: PostgresJournalStore,
      watchlists: PostgresWatchlistStore
    ) => new SaveWeeklyReview(reviews, journal, watchlists),
    inject: [PostgresReviewStore, PostgresJournalStore, PostgresWatchlistStore]
  },
  {
    provide: RegisterUser,
    useFactory: (
      users: PostgresUserStore,
      passwords: ScryptPasswordHasher,
      tokens: HmacTokenIssuer
    ) => new RegisterUser(users, passwords, tokens),
    inject: [PostgresUserStore, ScryptPasswordHasher, HmacTokenIssuer]
  },
  {
    provide: LoginUser,
    useFactory: (
      users: PostgresUserStore,
      passwords: ScryptPasswordHasher,
      tokens: HmacTokenIssuer
    ) => new LoginUser(users, passwords, tokens),
    inject: [PostgresUserStore, ScryptPasswordHasher, HmacTokenIssuer]
  },
  {
    provide: GetCurrentUser,
    useFactory: (users: PostgresUserStore) => new GetCurrentUser(users),
    inject: [PostgresUserStore]
  },
  { provide: GetAnalytics, useFactory: () => new GetAnalytics() },
  {
    provide: GetMarketContext,
    useFactory: (market: DseMarketDataClient) => new GetMarketContext(market),
    inject: [DseMarketDataClient]
  },
  {
    provide: ListSectors,
    useFactory: (sectors: PostgresSectorStore) => new ListSectors(sectors),
    inject: [PostgresSectorStore]
  },
  {
    provide: GetModelSignals,
    useFactory: (signals: DseModelSignalClient) => new GetModelSignals(signals),
    inject: [DseModelSignalClient]
  }
];
