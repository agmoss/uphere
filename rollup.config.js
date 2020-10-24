import resolve from "@rollup/plugin-node-resolve";
import cjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import babel from "@rollup/plugin-babel";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import shim from "rollup-plugin-shim";
import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      sourcemap: true,
      format: "umd",
      exports: "named",
      name: "main",
    },
  ],
  plugins: [
    shim({
      fs: `
        export function stat() { }
        export function createReadStream() { }
        export function createWriteStream() { }
      `,
      os: `
        export const type = 1;
        export const release = 1;
      `,
      util: `
          export function promisify() { }
      `,
    }),
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: "**/__tests__/**",
      clean: true,
      tsconfig: "./tsconfig.json",
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
      mainFields: ["module", "browser"],
    }),
    peerDepsExternal(),
    cjs({
      include: "node_modules/**",
    }),
    json(),
    babel({ babelHelpers: "bundled", exclude: "node_modules/**" }),
  ],
};
