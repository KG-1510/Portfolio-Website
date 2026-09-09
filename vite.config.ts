import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Served from https://kg-1510.github.io/Portfolio-Website/ so every asset and route
// needs the repo name as its base. Local dev keeps the same base for parity.
export default defineConfig({
  base: "/Portfolio-Website/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
