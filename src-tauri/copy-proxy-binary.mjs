<<<<<<< HEAD
import { execSync, execFileSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const MANIFEST_DIR = dirname(fileURLToPath(import.meta.url));
const PROFILE = process.env.PROFILE || "debug";
=======
import { execFileSync, execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { downloadXray } from "./download-xray.mjs";

const MANIFEST_DIR = dirname(fileURLToPath(import.meta.url));
const PROFILE =
  process.argv.includes("--release") || process.env.PROFILE === "release"
    ? "release"
    : "debug";
>>>>>>> v0.29.6

function getTarget() {
  if (process.env.TARGET) return process.env.TARGET;
  try {
    const output = execSync("rustc -vV", { encoding: "utf-8" });
    const match = output.match(/host:\s*(.+)/);
    if (match) return match[1].trim();
  } catch {}
  return "unknown";
}

function getHostTarget() {
  try {
    const output = execSync("rustc -vV", { encoding: "utf-8" });
    const match = output.match(/host:\s*(.+)/);
    if (match) return match[1].trim();
  } catch {}
  return "unknown";
}

const TARGET = getTarget();
const HOST_TARGET = getHostTarget();
const isWindows = TARGET.includes("windows");

// Determine source directory
let srcDir;
if (TARGET === HOST_TARGET || TARGET === "unknown") {
<<<<<<< HEAD
  srcDir = join(MANIFEST_DIR, "target", PROFILE === "release" ? "release" : "debug");
} else {
  srcDir = join(MANIFEST_DIR, "target", TARGET, PROFILE === "release" ? "release" : "debug");
=======
  srcDir = join(
    MANIFEST_DIR,
    "target",
    PROFILE === "release" ? "release" : "debug",
  );
} else {
  srcDir = join(
    MANIFEST_DIR,
    "target",
    TARGET,
    PROFILE === "release" ? "release" : "debug",
  );
>>>>>>> v0.29.6
}

const destDir = join(MANIFEST_DIR, "binaries");
mkdirSync(destDir, { recursive: true });

function copyBinary(baseName) {
  const binName = isWindows ? `${baseName}.exe` : baseName;
  const source = join(srcDir, binName);

  let destName = `${baseName}-${TARGET}`;
  if (isWindows) destName += ".exe";
  const dest = join(destDir, destName);

<<<<<<< HEAD
  if (existsSync(source)) {
    copyFileSync(source, dest);
    console.log(`Copied ${binName} to ${dest}`);
  } else {
    console.log(`Warning: Binary not found at ${source}`);
    console.log(`Building ${baseName} binary...`);

    const buildArgs = ["build", "--bin", baseName];
    if (PROFILE === "release") buildArgs.push("--release");
    if (TARGET !== "unknown" && TARGET !== HOST_TARGET) {
      buildArgs.push("--target", TARGET);
    }

    execFileSync("cargo", buildArgs, {
      cwd: MANIFEST_DIR,
      stdio: "inherit",
    });

    if (existsSync(source)) {
      copyFileSync(source, dest);
      console.log(`Built and copied ${binName} to ${dest}`);
    } else {
      console.error(`Error: Failed to build ${baseName} binary`);
      process.exit(1);
    }
  }
}

copyBinary("donut-proxy");
=======
  const buildArgs = ["build", "--bin", baseName];
  if (PROFILE === "release") buildArgs.push("--release");
  if (TARGET !== "unknown" && TARGET !== HOST_TARGET) {
    buildArgs.push("--target", TARGET);
  }
  execFileSync("cargo", buildArgs, {
    cwd: MANIFEST_DIR,
    stdio: "inherit",
  });

  if (!existsSync(source)) {
    console.error(`Error: Failed to build ${baseName} binary`);
    process.exit(1);
  }
  copyFileSync(source, dest);
  console.log(`Built and copied ${binName} to ${dest}`);
}

copyBinary("donut-proxy");
await downloadXray(TARGET);
>>>>>>> v0.29.6
