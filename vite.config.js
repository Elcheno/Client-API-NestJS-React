import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      "@": path.resolve(__dirname, "./src"),
    },
  },
})


// export default defineConfig(({ command, mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');
//   return {
//       define: {
//           'process.env.YOUR_STRING_VARIABLE': JSON.stringify(env.YOUR_STRING_VARIABLE),
//           'process.env.YOUR_BOOLEAN_VARIABLE': env.YOUR_BOOLEAN_VARIABLE,
//           'process.versions.node': JSON.stringify("18.16.0"),
//       },
//       plugins: [react()],
//       resolve: {
//         alias: {
//           // eslint-disable-next-line no-undef
//           "@": path.resolve(__dirname, "./src"),
//         },
//       },
//   };
// });
