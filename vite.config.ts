import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      input: {
        popup: resolve(import.meta.dirname, "index.html"),

        checkout: resolve(import.meta.dirname, "checkout.html"),

        "service-worker": resolve(
          import.meta.dirname,
          "src/background/service-worker.ts",
        ),
      },

      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "service-worker") {
            return "service-worker.js";
          }

          return "assets/[name]-[hash].js";
        },

        chunkFileNames: "assets/[name]-[hash].js",

        assetFileNames: "assets/[name]-[hash][extname]",
      },
    },
  },
});
