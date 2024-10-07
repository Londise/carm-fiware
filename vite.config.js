import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: false, // Desativa a minificação durante o desenvolvimento
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://20.206.249.58:8666',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    }
  }
  
});
