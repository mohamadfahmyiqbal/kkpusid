const { spawnSync } = require("node:child_process");
const path = require("node:path");

const result = spawnSync(
  process.execPath,
  [path.join(path.dirname(require.resolve("eslint/package.json")), "bin", "eslint.js"), ...process.argv.slice(2)],
  {
    stdio: "inherit",
    env: { ...process.env, ESLINT_USE_FLAT_CONFIG: "false" },
  }
);

if (result.error) {
  console.error(result.error.message);
}
process.exitCode = result.status ?? 1;
