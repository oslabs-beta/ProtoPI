import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sveltePreprocess from 'svelte-preprocess';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcss from './postcss.config.js';

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
          tsconfigFile: './svelte/tsconfig.json',
        },
      }),
      compilerOptions: {
        dev: !production,
      },
    }),
  ],
  css: {
    postcss,
  },
  build: {
    outDir: production ? 'dist_prod' : 'dist_dev',
    sourcemap: true,
    rollupOptions: {
      input: './index.html', // Ensure it uses the correct index.html
    },
    minify: production,
  },
  resolve: {
    alias: {
      svelte: 'svelte',
    },
    dedupe: ['svelte'],
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