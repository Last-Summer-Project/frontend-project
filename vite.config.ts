import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { reactScopedCssPlugin } from "rollup-plugin-react-scoped-css";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    react(),
    reactScopedCssPlugin(),
    {
      name: "configure-response-headers",
      configureServer: (server) => {
        server.middlewares.use((_req, res, next) => {
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://172.30.1.3",
        changeOrigin: true,
      },
      "/image": {
        target: "http://172.30.1.3",
        changeOrigin: true,
      },
      "/video": {
        target: "http://172.30.1.3",
        changeOrigin: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Disable sass warnings on bootstrap
        quietDeps: true,
      },
    },
  },
});
