import type { ReactNode } from "react";
import "@/presentation/assets/styles/themes/orange.css";
import { ThemeProvider as Theme } from "./ThemeProvider.tsx";
import { SessionGate } from "./SessionGate";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <Theme>
      <SessionGate>{children}</SessionGate>
    </Theme>
  );
}
