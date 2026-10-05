import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const serviceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const boot = path.join(serviceRoot, "src/main/main.ts");

const child = spawn(process.execPath, ["--import", "tsx", boot], {
  cwd: serviceRoot,
  stdio: "inherit",
  env: process.env
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 1);
});
