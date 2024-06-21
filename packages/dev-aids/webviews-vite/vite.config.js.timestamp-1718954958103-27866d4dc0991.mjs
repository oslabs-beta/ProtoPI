// vite.config.js
import { defineConfig } from "file:///Users/adamduda/Desktop/Programming/OSP/ProtoPI/node_modules/vite/dist/node/index.js";
import { svelte } from "file:///Users/adamduda/Desktop/Programming/OSP/ProtoPI/node_modules/@sveltejs/vite-plugin-svelte/src/index.js";
import sveltePreprocess from "file:///Users/adamduda/Desktop/Programming/OSP/ProtoPI/packages/dev-aids/webviews-vite/node_modules/svelte-preprocess/dist/index.js";
import tailwindcss2 from "file:///Users/adamduda/Desktop/Programming/OSP/ProtoPI/node_modules/tailwindcss/lib/index.js";
import autoprefixer2 from "file:///Users/adamduda/Desktop/Programming/OSP/ProtoPI/node_modules/autoprefixer/lib/autoprefixer.js";

// postcss.config.js
import tailwindcss from "file:///Users/adamduda/Desktop/Programming/OSP/ProtoPI/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///Users/adamduda/Desktop/Programming/OSP/ProtoPI/node_modules/autoprefixer/lib/autoprefixer.js";
var postcss_config_default = {
  plugins: [tailwindcss, autoprefixer]
};

// vite.config.js
var production = process.env.NODE_ENV === "production";
var vite_config_default = defineConfig({
  plugins: [
    svelte({
      preprocess: sveltePreprocess({
        sourceMap: !production,
        postcss: {
          plugins: [tailwindcss2, autoprefixer2]
        },
        typescript: {
          tsconfigFile: "./svelte/tsconfig.json"
        }
      }),
      compilerOptions: {
        dev: !production
      }
    })
  ],
  css: {
    postcss: postcss_config_default
  },
  build: {
    outDir: production ? "dist_prod" : "dist_dev",
    sourcemap: true,
    rollupOptions: {
      input: "./index.html"
      // Ensure it uses the correct index.html
    },
    minify: production
  },
  resolve: {
    alias: {
      svelte: "svelte"
    },
    dedupe: ["svelte"]
  },
  server: {
    open: true,
    port: 4173,
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 4173
    },
    fs: {
      strict: true
    }
  },
  publicDir: "public"
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicG9zdGNzcy5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYWRhbWR1ZGEvRGVza3RvcC9Qcm9ncmFtbWluZy9PU1AvUHJvdG9QSS9wYWNrYWdlcy9kZXYtYWlkcy93ZWJ2aWV3cy12aXRlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvYWRhbWR1ZGEvRGVza3RvcC9Qcm9ncmFtbWluZy9PU1AvUHJvdG9QSS9wYWNrYWdlcy9kZXYtYWlkcy93ZWJ2aWV3cy12aXRlL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9hZGFtZHVkYS9EZXNrdG9wL1Byb2dyYW1taW5nL09TUC9Qcm90b1BJL3BhY2thZ2VzL2Rldi1haWRzL3dlYnZpZXdzLXZpdGUvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHN2ZWx0ZSB9IGZyb20gJ0BzdmVsdGVqcy92aXRlLXBsdWdpbi1zdmVsdGUnO1xuaW1wb3J0IHN2ZWx0ZVByZXByb2Nlc3MgZnJvbSAnc3ZlbHRlLXByZXByb2Nlc3MnO1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcbmltcG9ydCBwb3N0Y3NzIGZyb20gJy4vcG9zdGNzcy5jb25maWcuanMnO1xuXG5jb25zdCBwcm9kdWN0aW9uID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdwcm9kdWN0aW9uJztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHN2ZWx0ZSh7XG4gICAgICBwcmVwcm9jZXNzOiBzdmVsdGVQcmVwcm9jZXNzKHtcbiAgICAgICAgc291cmNlTWFwOiAhcHJvZHVjdGlvbixcbiAgICAgICAgcG9zdGNzczoge1xuICAgICAgICAgIHBsdWdpbnM6IFt0YWlsd2luZGNzcywgYXV0b3ByZWZpeGVyXSxcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZXNjcmlwdDoge1xuICAgICAgICAgIHRzY29uZmlnRmlsZTogJy4vc3ZlbHRlL3RzY29uZmlnLmpzb24nLFxuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgZGV2OiAhcHJvZHVjdGlvbixcbiAgICAgIH0sXG4gICAgfSksXG4gIF0sXG4gIGNzczoge1xuICAgIHBvc3Rjc3MsXG4gIH0sXG4gIGJ1aWxkOiB7XG4gICAgb3V0RGlyOiBwcm9kdWN0aW9uID8gJ2Rpc3RfcHJvZCcgOiAnZGlzdF9kZXYnLFxuICAgIHNvdXJjZW1hcDogdHJ1ZSxcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDogJy4vaW5kZXguaHRtbCcsIC8vIEVuc3VyZSBpdCB1c2VzIHRoZSBjb3JyZWN0IGluZGV4Lmh0bWxcbiAgICB9LFxuICAgIG1pbmlmeTogcHJvZHVjdGlvbixcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBzdmVsdGU6ICdzdmVsdGUnLFxuICAgIH0sXG4gICAgZGVkdXBlOiBbJ3N2ZWx0ZSddLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICBvcGVuOiB0cnVlLFxuICAgIHBvcnQ6IDQxNzMsXG4gICAgaG1yOiB7XG4gICAgICBwcm90b2NvbDogJ3dzJyxcbiAgICAgIGhvc3Q6ICdsb2NhbGhvc3QnLFxuICAgICAgcG9ydDogNDE3MyxcbiAgICB9LFxuICAgIGZzOiB7XG4gICAgICBzdHJpY3Q6IHRydWUsXG4gICAgfSxcbiAgfSxcbiAgcHVibGljRGlyOiAncHVibGljJyxcbn0pOyIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2FkYW1kdWRhL0Rlc2t0b3AvUHJvZ3JhbW1pbmcvT1NQL1Byb3RvUEkvcGFja2FnZXMvZGV2LWFpZHMvd2Vidmlld3Mtdml0ZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2FkYW1kdWRhL0Rlc2t0b3AvUHJvZ3JhbW1pbmcvT1NQL1Byb3RvUEkvcGFja2FnZXMvZGV2LWFpZHMvd2Vidmlld3Mtdml0ZS9wb3N0Y3NzLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYWRhbWR1ZGEvRGVza3RvcC9Qcm9ncmFtbWluZy9PU1AvUHJvdG9QSS9wYWNrYWdlcy9kZXYtYWlkcy93ZWJ2aWV3cy12aXRlL3Bvc3Rjc3MuY29uZmlnLmpzXCI7aW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJztcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJztcblxuZXhwb3J0IGRlZmF1bHQge1xuICBwbHVnaW5zOiBbdGFpbHdpbmRjc3MsIGF1dG9wcmVmaXhlcl0sXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUErWixTQUFTLG9CQUFvQjtBQUM1YixTQUFTLGNBQWM7QUFDdkIsT0FBTyxzQkFBc0I7QUFDN0IsT0FBT0Esa0JBQWlCO0FBQ3hCLE9BQU9DLG1CQUFrQjs7O0FDSjRZLE9BQU8saUJBQWlCO0FBQzdiLE9BQU8sa0JBQWtCO0FBRXpCLElBQU8seUJBQVE7QUFBQSxFQUNiLFNBQVMsQ0FBQyxhQUFhLFlBQVk7QUFDckM7OztBREVBLElBQU0sYUFBYSxRQUFRLElBQUksYUFBYTtBQUU1QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxZQUFZLGlCQUFpQjtBQUFBLFFBQzNCLFdBQVcsQ0FBQztBQUFBLFFBQ1osU0FBUztBQUFBLFVBQ1AsU0FBUyxDQUFDQyxjQUFhQyxhQUFZO0FBQUEsUUFDckM7QUFBQSxRQUNBLFlBQVk7QUFBQSxVQUNWLGNBQWM7QUFBQSxRQUNoQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsaUJBQWlCO0FBQUEsUUFDZixLQUFLLENBQUM7QUFBQSxNQUNSO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxRQUFRLGFBQWEsY0FBYztBQUFBLElBQ25DLFdBQVc7QUFBQSxJQUNYLGVBQWU7QUFBQSxNQUNiLE9BQU87QUFBQTtBQUFBLElBQ1Q7QUFBQSxJQUNBLFFBQVE7QUFBQSxFQUNWO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsUUFBUSxDQUFDLFFBQVE7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsVUFBVTtBQUFBLE1BQ1YsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQSxJQUNWO0FBQUEsRUFDRjtBQUFBLEVBQ0EsV0FBVztBQUNiLENBQUM7IiwKICAibmFtZXMiOiBbInRhaWx3aW5kY3NzIiwgImF1dG9wcmVmaXhlciIsICJ0YWlsd2luZGNzcyIsICJhdXRvcHJlZml4ZXIiXQp9Cg==
