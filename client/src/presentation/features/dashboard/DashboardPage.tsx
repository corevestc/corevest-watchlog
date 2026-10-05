import type { ComponentType } from "react";
import { NavLink } from "react-router-dom";
import {
  Book4,
  CheckCircle1,
  ChevronRight,
  Shield1Check,
  TrendUp2
} from "@tailgrids/icons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { PageHeader } from "@/presentation/layouts/PageHeader";
import { paths } from "@/presentation/routes/paths";

interface DashboardModule {
  title: string;
  description: string;
  to: string;
  icon: ComponentType<{ className?: string }>;
}

const modules: DashboardModule[] = [
  {
    title: "Daily Watchlist",
    description:
      "Grades, planned reward-to-risk, and completed plan status for today's candidates.",
    to: paths.watchlist,
    icon: CheckCircle1
  },
  {
    title: "Open Positions",
    description:
      "Active risk, planned stops and targets, and later MFE/MAE tracking.",
    to: paths.openPositions,
    icon: TrendUp2
  },
  {
    title: "Journal",
    description:
      "Planned entry, stop, target, risk, and quantity, plus post-exit lessons and violations.",
    to: paths.journal,
    icon: Book4
  },
  {
    title: "Discipline",
    description:
      "Violation counts, rule adherence, and performance analytics over time.",
    to: paths.analytics,
    icon: Shield1Check
  }
];

export function DashboardPage() {
  return (
    <section>
      <PageHeader
        title="Dashboard"
        description="Workspace overview for watchlist discipline, planned trades, journal, and review cadence."
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <NavLink
              key={module.to}
              to={module.to}
              aria-label={`View ${module.title} details`}
              className="group block h-full rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
            >
              <Card className="h-full min-w-0 border border-base-100 shadow-xs transition duration-200 group-hover:border-primary-200 group-hover:shadow-md group-focus-visible:border-primary-300 md:min-w-0">
                <CardHeader className="flex items-start justify-between gap-3">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-500">
                    <Icon className="size-6" />
                  </span>
                  <Badge color="gray" size="sm">
                    Awaiting data
                  </Badge>
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg md:text-xl">
                    {module.title}
                  </CardTitle>
                  <CardDescription className="mt-1.5 text-sm md:text-base">
                    {module.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="mt-auto flex items-center justify-between pt-1">
                  <span className="text-sm font-medium text-primary-500 group-hover:text-primary-600">
                    View details
                  </span>
                  <ChevronRight className="size-5 text-primary-500 transition group-hover:translate-x-0.5" />
                </CardFooter>
              </Card>
            </NavLink>
          );
        })}
      </div>
    </section>
  );
}
