import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/presentation/app/ThemeProvider";
import { router } from "@/presentation/routes/app-router";

export function AppWithAuth() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
