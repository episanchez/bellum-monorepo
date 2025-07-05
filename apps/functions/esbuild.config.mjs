import { build } from "esbuild";

build({
  entryPoints: ["src/index.ts"],
  outdir: "dist",
  bundle: true,
  platform: "node",
  format: "esm",
  sourcemap: true,
  target: "es2022"
}).catch(() => process.exit(1));
