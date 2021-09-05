import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";

export default defineConfig({
  esbuild: {
    jsxInject: `import React from "react"`,
  },
  optimizeDeps: { include: ["@roomruler/messages"] },
  plugins: [svgrPlugin()],
});
