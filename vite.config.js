import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { manualChunksPlugin } from 'vite-plugin-webpackchunkname';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    manualChunksPlugin(),
    vue(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          template: 'sunburst',
          filename: 'build-stats.html',
          gzipSize: true,
          brotliSize: true,
        }),
      ],
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
