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
      // Redireciona todas as requisições para /api1 para o servidor remoto
      '/api1': {
        target: 'http://20.206.249.58:1026',  // O endereço do seu servidor de API
        changeOrigin: true,              // Ajusta o "host" da requisição para coincidir com o destino
        rewrite: (path) => path.replace(/^\/api1/, '') // Remove o prefixo "/api1" antes de enviar a requisição
      },
      '/api2': {
        target: 'http://20.206.249.58:8666',  // O endereço do seu servidor de API
        changeOrigin: true,              // Ajusta o "host" da requisição para coincidir com o destino
        rewrite: (path) => path.replace(/^\/api2/, '') // Remove o prefixo "/api1" antes de enviar a requisição
      }
    }
  }

});
