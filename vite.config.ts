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
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id, meta) => {
          if (id.includes("commonjsHelpers")) {
            return "commonjsHelpers";
          }

          if (id.includes("redux")) {
            return "vendor_redux";
          }

          if (id.includes("video-react")) {
            return "vendor_video-react";
          }

          if (id.includes("bootstrap")) {
            return "vendor_bootstrap";
          }

          if (id.includes("react")) {
            return "vendor_react";
          }

          if (id.includes("antd") || id.includes("@ant-design")) {
            return "vendor_ant-design";
          }

          if (id.includes("rc-")) {
            return "vendor_rc";
          }

          if (id.includes("@ffmpeg")) {
            return "vendor_ffmpeg";
          }

          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
