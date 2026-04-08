import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const targetHost = env.VITE_API_URL || 'http://localhost:77777';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: targetHost,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  };
});
