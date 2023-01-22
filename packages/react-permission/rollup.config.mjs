import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";

import pkg from "./package.json" assert { type: "json" };

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: "./lib/cjs/index.js",
                format: "cjs",
            },
            {
                file: "./lib/esm/index.js",
                format: "es",
            },
        ],
        external: [...Object.keys(pkg.peerDependencies || {})],
        plugins: [nodeResolve(), commonjs(), typescript()],
    },
    {
        input: "src/types/index.d.ts",
        output: [
            {
                file: "./lib/cjs/types/index.d.ts",
                format: "cjs",
            },
            {
                file: "./lib/esm/types/index.d.ts",
                format: "es",
            },
        ],
        plugins: [dts()],
    },
];
