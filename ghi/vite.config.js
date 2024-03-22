import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react({ include: '**/*.jsx' })],
    optimizeDeps: {
        include: ['@emotion/styled'],
    },
    server: {
        hmr: true,
        host: true,
        strictPort: true,
        watch: {
            usePolling: true,
        },
    },
})
