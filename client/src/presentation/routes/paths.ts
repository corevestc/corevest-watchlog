export const paths = {
  dashboard: "/",
  watchlist: "/watchlist",
  trades: "/trades",
  openPositions: "/trades/open",
  closedTrades: "/trades/closed",
  journal: "/journal",
  reviews: "/reviews",
  analytics: "/analytics"
} as const;

export type AppPath = (typeof paths)[keyof typeof paths];
