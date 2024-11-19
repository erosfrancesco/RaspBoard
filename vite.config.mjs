import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        preprocessorOptions: {
            scss: {
                api: 'modern-compiler' // or "modern"
            }
        }
    },
    plugins: [react()],
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src')
            },
            {
                find: 'components',
                replacement: path.resolve(__dirname, 'src/components')
            },
            {
                find: 'store',
                replacement: path.resolve(__dirname, 'src/store')
            },
            {
                find: '~bootstrap',
                replacement: path.resolve(__dirname, 'node_modules/bootstrap'),
            }
        ],
    },

    server: {
        port: 8080,
        hot: true
    }
});