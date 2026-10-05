import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const serviceRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "service"
);

const child = spawn(
  process.execPath,
  [
    path.join(serviceRoot, "node_modules/tsx/dist/cli.mjs"),
    "watch",
    "src/main/main.ts"
  ],
  {
    cwd: serviceRoot,
    stdio: "inherit",
    env: process.env
  }
);

child.on("exit", (code, signal) => {
  if (signal) {
    process.exit(0);
    return;
  }
  process.exit(code ?? 1);
});

function stop() {
  if (child.pid && child.exitCode == null) {
    if (process.platform === "win32") {
      spawn(
        process.env.SystemRoot + "\\System32\\taskkill.exe",
        ["/PID", String(child.pid), "/T", "/F"],
        { stdio: "ignore" }
      );
    } else {
      child.kill("SIGTERM");
    }
  }
}

process.on("SIGINT", stop);
process.on("SIGTERM", stop);
