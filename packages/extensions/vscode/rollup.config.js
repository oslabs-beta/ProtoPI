const svelte = require("rollup-plugin-svelte");
const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const { terser } = require("@rollup/plugin-terser");
const sveltePreprocess = require("svelte-preprocess");
const typescript = require("@rollup/plugin-typescript");
const postcss = require("rollup-plugin-postcss");
const svg = require("rollup-plugin-svg");
const path = require("path");
const fs = require("fs");

const production = !process.env.ROLLUP_WATCH || false;

module.exports = fs
  .readdirSync(path.join(__dirname, "webviews", "pages"))
  .map((input) => {
    const name = input.split(".")[0];
    return {
      input: "webviews/pages/" + input,
      output: {
        sourcemap: true,
        name: "app",
        file: "out/compiled/" + name + ".js",
      },
      plugins: [
        svelte({
          preprocess: sveltePreprocess({
            postcss: {
              plugins: [require("tailwindcss"), require("autoprefixer")],
            },
          }),
          // enable run-time checks when not in production
          dev: !production,
          // CSCS handling aligns with Svelte 4
          css: (css) => {
            css.write(name + ".css", false);
          },
        }),
        svg(),
        postcss({
          extract: path.resolve("out/compiled/tailwind.css"),
        }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
          browser: true,
          dedupe: ["svelte"],
        }),
        commonjs(),
        typescript({
          tsconfig: "webviews/tsconfig.json",
          sourceMap: !production,
          inlineSources: !production,
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        // !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        // !production && livereload("public"),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
      ],
      watch: {
        clearScreen: false,
        include: "webviews/**",
        exclude: "node_modules/**",
      },
    };
  });
