import deepmerge from "deepmerge";
import run from "@rollup/plugin-run";

import defConfig from "./rollup.config";

export default deepmerge(defConfig, {
  plugins: [run()],
  watch: {
    include: "src/**/*",
  },
});
