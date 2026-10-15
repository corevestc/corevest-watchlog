import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const root = path.dirname(fileURLToPath(import.meta.url));

function readJsString(source, start) {
  const quote = source[start];
  if (quote !== "\"" && quote !== "'") {
    return null;
  }
  let i = start + 1;
  while (i < source.length) {
    if (source[i] === "\\") {
      i += 2;
      continue;
    }
    if (source[i] === quote) {
      const literal = source.slice(start, i + 1);
      return { value: JSON.parse(literal), end: i + 1 };
    }
    i += 1;
  }
  return null;
}

export default defineConfig({
  plugins: [
    react({
      exclude: [/node_modules/, /\.cache[\\/]/]
    }),
    tailwindcss(),
    {
      name: "watchlog-watchlist-page",
      enforce: "pre",
      transform(code, id) {
        const normalized = id.replace(/\\/g, "/");
        if (normalized.endsWith("/presentation/features/watchlist/WatchlistPage.tsx")) {
          return 'export { WatchlistWorkspace as WatchlistPage } from "./WatchlistWorkspace";\n';
        }
        return code;
      }
    },
    {
      name: "watchlog-orange-last",
      enforce: "pre",
      transform(code, id) {
        const normalized = id.replace(/\\/g, "/");
        if (!normalized.endsWith("/presentation/assets/styles/index.css")) {
          return null;
        }
        if (code.includes("watchlog-orange-last")) {
          return null;
        }
        const orange = fs.readFileSync(
          path.resolve(root, "./src/presentation/assets/styles/themes/orange.css"),
          "utf8"
        );
        const block = `\n/* watchlog-orange-last */\n${orange}`;
        const marker = "const __vite__css = ";
        const at = code.indexOf(marker);
        if (at === -1) {
          return `${code}${block}`;
        }
        const literalAt = at + marker.length;
        const parsed = readJsString(code, literalAt);
        if (!parsed) {
          return null;
        }
        return (
          code.slice(0, literalAt) +
          JSON.stringify(parsed.value + block) +
          code.slice(parsed.end)
        );
      }
    },
    {
      name: "watchlog-require-login",
      transformIndexHtml(html) {
        return html.replace(
          "<head>",
          `<head>
    <link rel="stylesheet" href="/orange.css" />
    <script>
      (function () {
        try {
          var raw = localStorage.getItem("watchlog.auth");
          var parsed = raw ? JSON.parse(raw) : null;
          var token = parsed && (parsed.state && parsed.state.token || parsed.token);
          if (!token) {
            location.replace("/account.html?mode=login");
          }
        } catch (err) {
          location.replace("/account.html?mode=login");
        }
      })();
    </script>`
        );
      }
    }
  ],
  // Keep the prebundle cache outside node_modules. On Windows a rebundle
  // cannot rename node_modules/.vite/deps while those files are open (EPERM).
  cacheDir: path.resolve(root, ".cache/vite"),
  optimizeDeps: {
    holdUntilCrawlEnd: true,
    noDiscovery: true,
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react-router-dom",
      "react-aria",
      "react-aria-components",
      "react-stately",
      "zustand",
      "zustand/middleware",
      "recharts",
      "clsx",
      "tailwind-merge",
      "class-variance-authority",
      "@tailgrids/icons",
      "@base-ui/react",
      "@floating-ui/react",
      "@internationalized/date",
      "react-resizable-panels"
    ]
  },
  resolve: {
    alias: [
      {
        find: "@/presentation/app/ThemeProvider",
        replacement: path.resolve(
          root,
          "./src/presentation/app/ThemeProviderWithAuth.tsx"
        )
      },
      {
        find: "@/presentation/features/watchlist",
        replacement: path.resolve(
          root,
          "./src/presentation/features/watchlist/watchlist-feature.ts"
        )
      },
      { find: "@", replacement: path.resolve(root, "./src") }
    ]
  },
  server: {
    port: 5173,
    watch: {
      ignored: ["**/.cache/**"]
    },
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
        configure(proxy) {
          proxy.on("error", (_err, _req, res) => {
            if (res && !res.headersSent) {
              res.writeHead(503, { "Content-Type": "application/json" });
              res.end(
                JSON.stringify({
                  error: { message: "API is not running. Restart npm run dev." }
                })
              );
            }
          });
        }
      },
      "/health": {
        target: "http://localhost:3001",
        changeOrigin: true
      }
    }
  }
});
