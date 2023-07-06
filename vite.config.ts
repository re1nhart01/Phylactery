import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(async () => ({
  plugins: [react()],
  resolve: {
    alias: {
      '#': path.resolve(__dirname, './src'),
      '#assets': path.resolve(__dirname, './src/assets'),
      '#components': path.resolve(__dirname, './src/components'),
      '#hooks': path.resolve(__dirname, './src/hooks'),
      '#modules': path.resolve(__dirname, './src/modules'),
      '#services': path.resolve(__dirname, './src/services'),
      '#store': path.resolve(__dirname, './src/store'),
      '#styles': path.resolve(__dirname, './src/styles'),
      '#type': path.resolve(__dirname, './src/types'),
    },
  },
  clearScreen: false,
  server: {
    port: 1420,
    strictPort: true,
  },
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
    minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
    sourcemap: !!process.env.TAURI_DEBUG,
  },
}));
