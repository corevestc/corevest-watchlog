import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/presentation/app/ThemeProvider";
import { router } from "@/presentation/routes";

export function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
