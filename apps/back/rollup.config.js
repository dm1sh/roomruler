import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "tsc-out/index.js",
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [nodeResolve({ resolveOnly: [/^@roomruler\/.*$/] })],
};
