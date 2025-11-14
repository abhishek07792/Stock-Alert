import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  publicDir: 'public', // make sure public folder is used
  build: {
    rollupOptions: {
      input: './index.html',
    },
  },
});
