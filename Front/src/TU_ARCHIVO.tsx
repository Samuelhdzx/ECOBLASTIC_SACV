import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    historyApiFallback: true,
  },
  build: {
    outDir: 'dist',
  },
})

// Importa useMediaQuery desde @mui/material/useMediaQuery en el archivo donde lo estés utilizando
import useMediaQuery from '@mui/material/useMediaQuery';