import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppWithAuth } from "@/presentation/app/AppWithAuth";
import "@/presentation/assets/styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithAuth />
  </StrictMode>
);
