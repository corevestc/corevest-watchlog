import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const node = process.execPath;

const jobs = [
  {
    cwd: path.join(root, "service"),
    args: [
      path.join(root, "service/node_modules/tsx/dist/cli.mjs"),
      "watch",
      "src/main/main.ts"
    ]
  },
  {
    cwd: path.join(root, "client"),
    args: [path.join(root, "client/node_modules/vite/bin/vite.js")]
  }
];

const children = [];
let shuttingDown = false;

function start(cwd, args) {
  const child = spawn(node, args, {
    cwd,
    stdio: "inherit",
    env: process.env
  });
  children.push(child);
  child.on("exit", (code) => {
    if (!shuttingDown && code) {
      process.exitCode = code;
      shutdown();
    }
  });
}

function killTree(pid) {
  if (process.platform === "win32") {
    spawn(process.env.SystemRoot + "\\System32\\taskkill.exe", ["/PID", String(pid), "/T", "/F"], {
      stdio: "ignore"
    });
    return;
  }
  try {
    process.kill(pid, "SIGTERM");
  } catch {
    // already gone
  }
}

function shutdown() {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  for (const child of children) {
    if (child.pid && child.exitCode == null) {
      killTree(child.pid);
    }
  }
}

for (const job of jobs) {
  start(job.cwd, job.args);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
