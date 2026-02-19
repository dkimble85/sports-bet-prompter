import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import wasm from 'vite-plugin-wasm'
import topLevelAwait from 'vite-plugin-top-level-await'

const config = defineConfig({
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    wasm(),
    topLevelAwait(),
  ],
  optimizeDeps: {
    exclude: ['tiktoken'],
  },
  build: {
    target: 'esnext',
  },
  esbuild: {
    target: 'esnext',
  },
  worker: {
    format: 'es',
  },
  resolve: {
    conditions: ['import', 'module'],
  },
})

export default config
