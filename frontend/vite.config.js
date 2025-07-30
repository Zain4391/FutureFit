import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/pdf.worker.min.js': {
        target: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/pdf.worker.min.js/, ''),
      },
    },
  },
});
