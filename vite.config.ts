import { resolve, dirname } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// https://vitejs.dev/guide/build.html#library-mode
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "next-i18n-middleware",
      fileName: "next-i18n-middleware",
    },
  },
  plugins: [dts()],
});
