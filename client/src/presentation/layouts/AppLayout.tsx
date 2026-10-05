import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart2,
  Book4,
  CheckCircle1,
  DashboardSquare1,
  MenuHamburger1,
  MoonStar1,
  Newspaper,
  Sun1,
  TrendUp2
} from "@tailgrids/icons";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { useThemeStore } from "@/presentation/hooks/useThemeStore";
import { paths } from "@/presentation/routes/paths";

const navItems = [
  { label: "Dashboard", to: paths.dashboard, icon: DashboardSquare1 },
  { label: "Watchlist", to: paths.watchlist, icon: CheckCircle1 },
  { label: "Trades", to: paths.trades, icon: TrendUp2 },
  { label: "Journal", to: paths.journal, icon: Book4 },
  { label: "Reviews", to: paths.reviews, icon: Newspaper },
  { label: "Analytics", to: paths.analytics, icon: BarChart2 }
];

function isNavActive(pathname: string, to: string) {
  if (to === paths.dashboard) {
    return pathname === to;
  }
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function AppLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <SidebarProvider className="min-h-svh bg-background-soft-50">
      <Sidebar className="border-r border-base-100 bg-background-50">
        <SidebarHeader className="px-4 py-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary-500 text-sm font-semibold text-white-100">
              WL
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-title-50">
                WatchLog
              </p>
              <p className="truncate text-xs text-text-100">CoreVest Capital</p>
            </div>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarMenu>
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <SidebarMenuItem key={item.to}>
                    <SidebarMenuButton
                      isActive={isNavActive(pathname, item.to)}
                      onPress={() => navigate(item.to)}
                    >
                      <Icon />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-3 py-3">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start"
            onPress={toggleTheme}
          >
            {theme === "dark" ? <Sun1 /> : <MoonStar1 />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
        </SidebarFooter>
      </Sidebar>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-14 items-center gap-3 border-b border-base-100 bg-background-50 px-4">
          <SidebarTrigger className="md:hidden">
            <MenuHamburger1 />
          </SidebarTrigger>
          <p className="text-sm text-text-100">
            Rules-based trading discipline
          </p>
        </header>
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
