import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  BarChart2,
  Book4,
  CheckCircle1,
  Shield1Check,
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
  { label: "My Watchlist", to: paths.myWatchlist, icon: Shield1Check },
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
        <SidebarHeader className="px-2 py-4">
          <img
            src="/corevest-logo.jpg?v=2"
            alt="CoreVest Capital"
            className="h-auto w-full rounded-lg bg-white object-contain object-left"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-2">Workspace</SidebarGroupLabel>
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
        <SidebarFooter className="px-0 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-full justify-start px-2"
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
