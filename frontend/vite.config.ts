// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: '0.0.0.0', // Allow access from outside the container
//     port: 5173,      // Ensure this matches the port in your docker-compose file
//   },
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    rollupOptions: {
      external: [
        'react-date-object',
        'react-date-object/calendars/persian',
        'react-date-object/locales/persian_fa'
      ],
    }
  },
  resolve: {
    alias: {
      'react-date-object/calendars/persian': path.resolve(__dirname, 'node_modules/react-date-object/calendars/persian'),
      'react-date-object/locales/persian_fa': path.resolve(__dirname, 'node_modules/react-date-object/locales/persian_fa')
    }
  }
})