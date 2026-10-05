import { createBrowserRouter, Navigate } from "react-router-dom";
import { AppLayout } from "@/presentation/layouts/AppLayout";
import { DashboardPage } from "@/presentation/features/dashboard";
import { WatchlistPage } from "@/presentation/features/watchlist/watchlist-feature";
import { ClosedTradesPage, OpenPositionsPage, TradesPage } from "@/presentation/features/trades";
import { JournalPage } from "@/presentation/features/journal";
import { ReviewsPage } from "@/presentation/features/reviews";
import { AnalyticsPage } from "@/presentation/features/analytics";
import { LoginPage, RegisterPage } from "@/presentation/features/auth/AuthPages";
import { RequireAuth } from "@/presentation/routes/RequireAuth";
import { authPaths } from "@/presentation/routes/auth-paths";
import { paths } from "@/presentation/routes/paths";

export const router = createBrowserRouter([
  { path: authPaths.login, element: <LoginPage /> },
  { path: authPaths.register, element: <RegisterPage /> },
  {
    path: "/",
    element: <RequireAuth />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: paths.watchlist.slice(1), element: <WatchlistPage /> },
          { path: "trades", element: <TradesPage /> },
          { path: "trades/open", element: <OpenPositionsPage /> },
          { path: "trades/closed", element: <ClosedTradesPage /> },
          { path: paths.journal.slice(1), element: <JournalPage /> },
          { path: paths.reviews.slice(1), element: <ReviewsPage /> },
          { path: paths.analytics.slice(1), element: <AnalyticsPage /> },
          { path: "*", element: <Navigate to={paths.dashboard} replace /> }
        ]
      }
    ]
  }
]);
