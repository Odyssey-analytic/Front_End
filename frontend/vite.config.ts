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


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'react-date-object/calendars/persian': path.resolve(__dirname, 'node_modules/react-date-object/calendars/persian.js'),
      'react-date-object/locales/persian_fa': path.resolve(__dirname, 'node_modules/react-date-object/locales/persian_fa.js')
    }
  }
});