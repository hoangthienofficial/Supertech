import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    // Khi build thành product thì sẽ xoá đi các câu lệnh consle và debugger
    // drop: ['console','debugger']
  },
});
