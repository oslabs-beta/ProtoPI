import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssConfig from './postcss.config.js';  // Ensure correct import for postcss config

const production = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
        postcss: {
          plugins: [tailwindcss, autoprefixer],
        },
        typescript: {
          tsconfigFile: './svelte/tsconfig.json',  // Ensure this path is correct
        },
      }),
      compilerOptions: {
        dev: !production,
      },
    }),
  ],
  css: {
    postcss: postcssConfig,  // Ensure correct reference to postcss config
  },
  build: {
    outDir: production ? 'dist_prod' : 'dist_dev',
    sourcemap: true,
    rollupOptions: {
      input: './index.html',  // Ensure this path is correct and exists
    },
    minify: production,
  },
  resolve: {
    alias: {
      '@': '/src',  // Alias '@' to your source directory for cleaner imports
    },
    dedupe: ['svelte'],
    extensions: ['.js', '.svelte', '.ts', '.json'],
  },
  server: {
    open: true,
    port: 4173,
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 4173,
    },
    fs: {
      strict: true,
    },
  },
  publicDir: 'public',
});
