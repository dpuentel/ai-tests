import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(
    mode,
    process.cwd(),
    ''
  )
  const processEnvValues = {
    'process.env': Object.entries(env).reduce(
      (prev, [key, val]) => {
        return {
          ...prev,
          [key]: val
        }
      },
      {}
    )
  }

  return {
    plugins: [react()],
    server: {
      port: parseInt(processEnvValues['process.env'].CLIENT_PORT || '5173')
    }
  }
})
